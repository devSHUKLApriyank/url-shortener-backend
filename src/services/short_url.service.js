import { generateNanoId } from "../utils/helper.js";
import UrlModel from "../models/url.model.js";
import { saveShortUrl } from "../config/dao/short_url.js";

export const createShortUrlWithoutUser = async(url)=>{
    const shortUrl = await generateNanoId(8);
    await saveShortUrl(shortUrl, url);
    return shortUrl;
}
export const createShortUrlWithUser = async(url, userId)=>{
    const shortUrl = await generateNanoId(8);
    await saveShortUrl(shortUrl,url, userId);
    return shortUrl;
}