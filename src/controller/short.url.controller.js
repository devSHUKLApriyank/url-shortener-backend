import { getShortUrl } from "../config/dao/short.url.js";           // ✅
import { createShortUrlWithoutUser, createShortUrlWithUser } from "../services/short_url.service.js"; // ✅

export const createShortUrl = async (req, res) => {
    try {
        const { url } = req.body;

        const shortUrl = await createShortUrlWithoutUser(url);

        res.status(201).json({
            shortUrl: process.env.APP_URL + "/" + shortUrl.short_url  // ✅ matches schema
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const redirectFromShortUrl = async (req, res) => {
    try {
        const { id } = req.params;

        const url = await getShortUrl(id);  // queries { short_url: id }

        if (url) {
            res.redirect(url.full_url);
        } else {
            res.status(404).json({ message: "Short URL not found" });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};