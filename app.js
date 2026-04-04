import express from 'express';
import dotenv from 'dotenv';
import connectDB from './src/config/mongodb.js';
import shortUrlRoutes from "./src/routes/shortUrl.routes.js";  // ✅                              // ✅
import { redirectFromShortUrl } from './src/controller/short.url.controller.js';

import cors from 'cors';

app.use(cors({ origin: 'http://localhost:5173' })); 

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ CREATE SHORT URL
app.use('/api/create', shortUrlRoutes);


// ✅ REDIRECT
app.get('/:id', redirectFromShortUrl);


// ✅ START SERVER AFTER DB
connectDB().then(() => {
    app.listen(3000, () => {
        console.log('Server is running on http://localhost:3000');
    });
});