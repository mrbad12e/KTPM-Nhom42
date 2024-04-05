import User from "../models/user.js";

export const getStudentInfomation = async (req, res, next) => {
    try {
        const user = new User();
        req.query.table = 'student';
        const result = await user.getUserInfomation(req, res, next);
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}