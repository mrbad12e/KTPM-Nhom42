import express from 'express';
import { getStudentInfomation } from '../controllers/user.js';

const router = express.Router();

router.get('/student', getStudentInfomation);

export default router;