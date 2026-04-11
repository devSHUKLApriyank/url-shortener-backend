import { cookiesOptions } from "../config/config.js";
import { registerUser as registerUserService, loginUser as loginUserService } from "../services/auth.service.js";

export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
          
        const token = await registerUserService(name, email, password);

       
        res.cookie('accesstoken', token, cookiesOptions); 
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(' login attempt:', { email, password })
        const token = await loginUserService(email, password);
        
        res.cookie('accesstoken', token, cookiesOptions); 
        res.status(200).json({ message: "User logged in successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};