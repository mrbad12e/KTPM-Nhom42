import User from "../models/user.js";


export const loginUser = async (req, res, next) => {
    try {
        const isPasswordCorrect = await User.comparePassword(req, res, next);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const token = await User.getJsonWebToken(req, res, next);
        res.status(200)
            .cookie('token', token, { httpOnly: true })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const logoutUser = async (req, res, next) => {
    try {
        res.clearCookie('token');
        res.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getUserInfomation = async (req, res, next) => {
    try {
        const result = await User.getUserInfomation(req, res, next);
        res.json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const updateUser = async (req, res, next) => {
    try {
        const result = await User.updateUser(req, res, next);
        res.json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const deleteUser = async (req, res, next) => {
    try {
        const result = await User.deleteUser(req, res, next);
        res.json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}