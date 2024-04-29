import express from 'express';
import StudentController from '../../controllers/User/student.js';
import { isAuthUser } from '../../middleware/auth.js';
const router = express.Router();

router.route('/')
    //.get(isAuthUser, StudentController.readStudent)
    .patch(isAuthUser, StudentController.updateStudent);

router.route('/profile')
    .post(StudentController.getUserInfo);       
    
router.route('/registration')
    .post(isAuthUser,StudentController.getSubject); 
    
// Bo qua doc thong tin giang vien vi thong tin giang vien public

router.route('/login')
    .post(StudentController.loginUser);
router.route('/logout')
    .get(StudentController.logoutUser);

export default router;