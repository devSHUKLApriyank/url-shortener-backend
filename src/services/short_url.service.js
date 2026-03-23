import { generateNanoId } from "../utils/helper.js";
import UrlModel from "../models/url.model.js";

export const createShortUrlService = async (url) => {
    if (!url) {
        throw new Error("URL is required");
    }

    const shortId = generateNanoId(8);

    const newUrl = new UrlModel({
        full_url: url,
        short_url: shortId
    });

    await newUrl.save();

    return {
        shortId,
        shortUrl: `http://localhost:3000/${shortId}`
    };
};