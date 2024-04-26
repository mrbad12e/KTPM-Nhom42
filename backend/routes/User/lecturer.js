import express from 'express';
import LecturerController from '../../controllers/User/lecturer.js';
import { isAuthUser } from '../../middleware/auth.js';
const router = express.Router();

router.route('/student')
    .get(isAuthUser, LecturerController.readStudents);

router.route('/')
    .get(LecturerController.readLecturers)
    .patch(isAuthUser, LecturerController.updateLecturer);

router.route('/login')
    .post(LecturerController.loginUser);
router.route('/logout')
    .get(LecturerController.logoutUser);

export default router;