import Student from '../../models/User/student.js';
import Lecturer from '../../models/User/lecturer.js';
import UserControllers from './user.js';

export default class StudentController extends UserControllers{
    static async readStudent(req, res, next) {
        try {
            res.status(200).json({
                students: await Student.readStudent(req, res, next),
                message: 'Students fetched successfully',
            });
        } catch (error) {
            res.status(500).json({ error: error });
        }
    }

    static async readLecturers(req, res, next) {
        try {
            res.status(200).json({
                lecturers: await Lecturer.readLecturer(req, res, next),
                message: 'Lecturers fetched successfully',
            });
        } catch (error) {
            res.status(500).json({ error: error });
        }
    }

    static async updateStudent(req, res, next) {
        try {
            await Student.updateStudent(req, res, next);
            res.status(200).json({ message: 'Student updated successfully' });
        } catch (error) {
            res.status(500).json({ error: error });
        }
    }

    controller
    //-----------------------------------------------------------------------------------------------------------------------------
       //test
       static async getUserInfo(req, res, next) {
           try {
               const userInfo = await Student.getUserInfoFromDatabase(req, res, next);
               res.status(200).json({
                   userInfo: userInfo
               });
           } catch (error) {
               res.status(500).json({ error: error.message });
           }
       }

    // static async getSubject(req, res, next) {
    //     try {
    //         const userInfo = await Student.getSubjectFromDatabase(req, res, next);
    //         res.status(200).json({
    //             userInfo: userInfo,
    //             message: 'Student info fetched successfully',
    //         });
    //     } catch (error) {
    //         res.status(500).json({ error: error.message });
    //     }
    // }

    static async getTimetable(req, res, next) {
        try {
            const TimetableInfo = await Student.getTimetableFromDatabase(req, res, next);
            res.status(200).json({
                TimetableInfo: TimetableInfo
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

}
