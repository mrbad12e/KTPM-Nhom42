import User from '../../models/User/user.js';

export default class UserControllers {
    static async loginUser(req, res, next) {
        try {
            const isPasswordCorrect = await User.comparePassword(req, res, next);
            if (!isPasswordCorrect) {
                return res.status(400).json({ message: 'Invalid credentials' });
            }
            await User.getJsonWebToken(req, res, next);
            res.status(200).json({
                success: true,
                message: 'Login successfully' 
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    static async logoutUser(req, res, next) {
        try {
            res.clearCookie('token');
            res.status(200).json({ message: 'Logged out successfully' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}
