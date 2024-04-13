import Student from '../../models/User/student.js';
import Lecturer from '../../models/User/lecturer.js';
import UserControllers from './user.js';

export default class LecturerController extends UserControllers{
    static async readStudents(req, res, next) {
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

    static async updateLecturer(req, res, next) {
        try {
            await Lecturer.updateLecturer(req, res, next);
            res.status(200).json({ message: 'Lecturer updated successfully' });
        } catch (error) {
            res.status(500).json({ error: error });
        }
    }
}
