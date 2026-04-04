import { errorHandler } from "./src/middlewares/errorHandler.js";
import { AppError } from "../errors/AppError.js";
import { AppError } from "../errors/AppError.js";

export class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    }
}

export const errorHandler = (err, req, res, next) => {
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            success: false,
            message: err.message,
        });
    }

    // Handle Mongoose duplicate key error
    if (err.code === 11000) {
        return res.status(400).json({
            success: false,
            message: "Duplicate entry, please try again",
        });
    }

    // Fallback for unhandled errors
    console.error(err);
    res.status(500).json({
        success: false,
        message: "Internal Server Error",
    });
};

export const createShortUrl = async (req, res, next) => {
    try {
        const { url } = req.body;

        if (!url) {
            return next(new AppError("URL is required", 400));
        }

        try { new URL(url); }
        catch { return next(new AppError("Invalid URL format", 400)); }

        const shortUrl = await createShortUrlWithoutUser(url);
        res.status(201).json({
            success: true,
            shortUrl: process.env.APP_URL + "/" + shortUrl.short_url
        });

    } catch (error) {
        next(error);  // passes to errorHandler
    }
};

export const redirectFromShortUrl = async (req, res, next) => {
    try {
        const { id } = req.params;
        const url = await getShortUrl(id);

        if (!url) {
            return next(new AppError("Short URL not found", 404));
        }

        res.redirect(url.full_url);

    } catch (error) {
        next(error);
    }
};



// all routes above...
app.use('/api/create', shortUrlRoutes);
app.get('/:id', redirectFromShortUrl);

// ✅ always last
app.use(errorHandler);