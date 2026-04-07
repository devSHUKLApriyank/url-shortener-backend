import { nanoid } from "nanoid"
import { cookiesOptions } from "../config/config.js";

export const generateNanoId = (length)=>{
    return nanoid(length);
}

export const signToken = (payload) => {
    return jsonwebtoken.sign(payload, process.env.JWT_SECRET, cookiesOptions);
}