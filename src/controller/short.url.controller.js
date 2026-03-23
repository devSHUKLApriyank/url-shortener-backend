import { createShortUrlService } from "../services/short_url.service.js";

export const createShortUrl = async (req, res) => {
    try {
        const { url } = req.body;

        const result = await createShortUrlService(url);

        res.status(201).json(result);
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }

    res.send(process.env.APP_URL + result.shortId);
};