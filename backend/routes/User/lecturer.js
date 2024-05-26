import express from 'express';
import LecturerController from '../../controllers/User/lecturer.js';
import { isAuthUser } from '../../middleware/auth.js';
const router = express.Router();

router.route('/student')
    .get(isAuthUser, LecturerController.readStudents);

router.route('/')
    .get(LecturerController.readLecturers)
    .patch(isAuthUser, LecturerController.updateLecturer);

router.route('/class')
    .get(isAuthUser, LecturerController.viewClassAssigned);

// Diem danh
router.route('/class/mark_absence').get(isAuthUser, LecturerController.mark_absence);
router.route('/class/undo_absence').get(isAuthUser, LecturerController.undo_absence);
router.route('/attendance')
    .get(isAuthUser, LecturerController.report_attendance);

router.route('/class/grade')
    .get(isAuthUser, LecturerController.report_grade_distribution)
    .patch(isAuthUser, LecturerController.update_grade);

router.route('/login')
    .post(LecturerController.loginUser);
router.route('/logout')
    .get(LecturerController.logoutUser);

export default router;