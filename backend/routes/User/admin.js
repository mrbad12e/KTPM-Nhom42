import express from 'express';
import AdminController from '../../controllers/User/admin.js';
import { isAuthUser } from '../../middleware/auth.js';
const router = express.Router();

router.route('/student')
    .get(isAuthUser, AdminController.readStudents)
    .delete(isAuthUser, AdminController.deleteStudent)
    .patch(isAuthUser, AdminController.updateStudent);
router.route('/lecturer')
    .get(isAuthUser, AdminController.readLecturers)
    .delete(isAuthUser, AdminController.deleteLecturer)
    .patch(isAuthUser, AdminController.updateLecturer);

router.route('/login')
    .post(AdminController.loginUser);
router.route('/logout')
    .get(AdminController.logoutUser);

export default router;