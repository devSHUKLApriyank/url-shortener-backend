export const saveShortUrl = async (shortUrl , longUrl, userId) => {
    try {
        const newUrl = new urlSchema({
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
  