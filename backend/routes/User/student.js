import express from 'express';
import StudentController from '../../controllers/User/student.js';
import { isAuthUser } from '../../middleware/auth.js';
const router = express.Router();

router.route('/')
    //.get(isAuthUser, StudentController.readStudent)
    .patch(isAuthUser, StudentController.updateStudent)
    .post(StudentController.getUserInfo);                        // test
// Bo qua doc thong tin giang vien vi thong tin giang vien public


router.route('/profile')
    .post(StudentController.getUserInfo); 

router.route('/timetable')
    .post(StudentController.getTimetable);  
        
router.route('/login')
    .post(StudentController.loginUser);

router.route('/logout')
    .get(StudentController.logoutUser);

export default router;