import { JsonWebTokenError } from "jsonwebtoken";
import User from "../models/user.model.js";
import { findUserByEmail,createUser } from "../config/dao/user.dao.js";
import { json } from "express";

export const registerUser = async (name, email, password) => {
    const user = await findUserByEmail(email);
    if (user) {
        throw new Error('User already exists');
    }
    const newUser = await createUser(name, email, password);
    const token = jsonwebtoken.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return token ;
};