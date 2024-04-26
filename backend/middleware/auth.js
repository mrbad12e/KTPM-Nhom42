import jwt from 'jsonwebtoken';
<<<<<<< HEAD
import User from '../models/user.js';
=======
import User from '../models/User/user.js';
>>>>>>> b04113d587dc18bb02ee98c4acf785bacebf2d93

export const isAuthUser = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // req.user = await User.getUserInfomation(req, res, next);

        next();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}