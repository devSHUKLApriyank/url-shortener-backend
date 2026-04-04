import urlSchema from "../../models/url.model.js";

export const saveShortUrl = async (shortUrl , longUrl, userId) => {
    try {
        const newUrl = new shortUrl({
            short_url: shortUrl,
            full_url: longUrl,
        });
        if(userId){
            newUrl.user_id = userId;
        }
        await newUrl.save();
    } catch (error) {
        console.error('Error saving short URL:', error);
    }
}
 export const getShortUrl = async (shortUrl)=>{
     return await urlSchema.findOne({short_url:shortUrl})
 }
 
  