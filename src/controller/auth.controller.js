import { cookiesOptions } from "../config/config.js";
import { registerUser as registerUserService, loginUser as loginUserService } from "../services/auth.service.js";

export const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    const token = await registerUserService(name, email, password);
    res.cookie('AccessToken', token, cookiesOptions);
    res.status(201).json({ message: "User registered successfully" });
};

export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    const token = await loginUserService(email, password);
    res.cookie('AccessToken', token, cookiesOptions);
    res.status(200).json({ message: "User logged in successfully" });
};