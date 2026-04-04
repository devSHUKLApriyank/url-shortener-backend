import express from 'express';
import { nanoid } from 'nanoid';
import dotenv from 'dotenv';
import connectDB from './src/config/mongodb.js';
import URL from './src/models/url.model.js';
import short_url from './src/routes/shorturl.routes.js';
import { redirectFromShortUrl } from './src/controller/short.url.controller.js';

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ CREATE SHORT URL
app.use('/api/create',short_url);


// ✅ REDIRECT
app.get('/:id', redirectFromShortUrl);


// ✅ START SERVER AFTER DB
connectDB().then(() => {
    app.listen(3000, () => {
        console.log('Server is running on http://localhost:3000');
    });
});