export const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    const user = await registerUser(name, email, password);
    res.status(201).json(user);
};

export const loginUser = async (req, res) => {
    res.send('login'); 
    
};