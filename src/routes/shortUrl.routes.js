import express from 'express';
import { createShortUrl, redirectFromShortUrl, createShortUrlAuth } from "../controller/short.url.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js"; // ✅ import it

const router = express.Router();

router.post("/", authMiddleware, createShortUrl);      
router.post("/guest", createShortUrlAuth);              

router.get("/:id", redirectFromShortUrl);

export default router;