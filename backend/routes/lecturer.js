import express from 'express';
import { loginUser, logoutUser, getUserInfomation, deleteUser, updateUser } from '../controllers/user.js';
import { isAuthUser } from '../middleware/auth.js';
const router = express.Router();

router.route('/student')
    .get(isAuthUser, getUserInfomation); // tam thoi

router.route('/lecturer')
    .get(getUserInfomation)
    .patch(updateUser);

router.route('/login')
    .post(loginUser);
router.route('/logout')
    .get(logoutUser);

export default router;