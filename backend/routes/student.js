import express from 'express';
import { loginUser, logoutUser, getUserInfomation, deleteUser, updateUser } from '../controllers/user.js';
import { isAuthUser } from '../middleware/auth.js';
const router = express.Router();

router.route('/')
    .get(isAuthUser, getUserInfomation)
    .patch(isAuthUser, updateUser);
    
router.route('/lecturer')
    .get(getUserInfomation)

router.route('/login')
    .post(loginUser);
router.route('/logout')
    .get(logoutUser);

export default router;