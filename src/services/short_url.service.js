import { generateNanoId } from "../utils/helper.js";        // ✅
import { saveShortUrl } from "../config/dao/short.url.js";  // ✅


export const createShortUrlWithoutUser = async (url) => {
    const shortId = await generateNanoId(8);
    if(!shortId) throw new Error("Failed to generate short ID");
     await saveShortUrl(shortId, url);  // ✅ capture returned doc
    return shortId;                                     // ✅ return the full document
};

export const createShortUrlWithUser = async (url, userId) => {
    const shortId = await generateNanoId(8);
    const savedUrl = await saveShortUrl(shortId, url, userId);  // ✅
    return savedUrl;                                             // ✅
};