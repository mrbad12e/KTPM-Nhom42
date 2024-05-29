import ClassControllers from "../../controllers/School/class.js";
import express from "express";
import { isAuthUser } from "../../middleware/auth.js";
const router = express.Router();

router.route('/')
    .get(isAuthUser, ClassControllers.getClass)  // Phai dang nhap moi co the xem class
    .post(isAuthUser, ClassControllers.createClass)
    .patch(isAuthUser, ClassControllers.updateClass)
    // Phai la admin/lecturer moi co the tao, sua, xoa class
router.route('/add').post(isAuthUser, ClassControllers.add_Timetable);

router.route('/assign').patch(isAuthUser, ClassControllers.assignLecturer);

router.route('/students').get(isAuthUser, ClassControllers.readStudents);

router.route('/enroll')
    .patch(isAuthUser, ClassControllers.enrollClass);
    // Phai la student moi co the enroll class

export default router;