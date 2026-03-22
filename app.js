import express from 'express';
import { nanoid } from 'nanoid';
import dotenv from 'dotenv';
import connectDB from './src/config/mongodb.js';
import URL from './src/config/models/shoturlschema.js';

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ CREATE SHORT URL
app.post('/api/create', async (req, res) => {
    const { url } = req.body;

    if (!url) {
        return res.status(400).send("URL is required");
    }

    const shortId = nanoid(6);

    const newUrl = new URL({
        full_url: url,
        short_url: shortId
    });

    await newUrl.save();

    // ✅ send SAME ID
    res.json({
        shortId,
        shortUrl: `http://localhost:3000/${shortId}`
    });
});


// ✅ REDIRECT
app.get('/:id', async (req, res) => {
    const { id } = req.params;

    const entry = await URL.findOne({ short_url: id });

    if (entry) {
        return res.redirect(entry.full_url);
    } else {
        return res.status(404).send('URL not found');
    }
});


// ✅ START SERVER AFTER DB
connectDB().then(() => {
    app.listen(3000, () => {
        console.log('Server is running on http://localhost:3000');
    });
});