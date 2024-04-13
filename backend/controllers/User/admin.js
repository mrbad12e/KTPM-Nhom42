import Student from '../../models/User/student.js';
import Lecturer from '../../models/User/lecturer.js';
import UserControllers from './user.js';

export default class AdminController extends UserControllers {
    static async createStudent(req, res, next) {
        try {
            await Student.createStudent(req, res, next);
            res.status(200).json({ message: 'Student created successfully' });
        } catch (error) {
            res.status(500).json({ error: error });
        }
    }
    static async createLecturer(req, res, next) {
        try {
            await Lecturer.createLecturer(req, res, next);
            res.status(200).json({ message: 'Lecturer created successfully' });
        } catch (error) {
            res.status(500).json({ error: error });
        }
    }

    static async readStudents(req, res, next) {
        try {
            res.status(200).json({
                students: await Student.readStudent(req, res, next),
                message: 'Students fetched successfully',
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
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

    static async updateLecturer(req, res, next) {
        try {
            await Lecturer.updateLecturer(req, res, next);
            res.status(200).json({ message: 'Lecturer updated successfully' });
        } catch (error) {
            res.status(500).json({ error: error });
        }
    }

    static async deleteStudent(req, res, next) {
        try {
            await Student.deleteStudent(req, res, next);
            res.status(200).json({ message: 'Student deleted successfully' });
        } catch (error) {
            res.status(500).json({ error: error });
        }
    }

    static async deleteLecturer(req, res, next) {
        try {
            await Lecturer.deleteLecturer(req, res, next);
            res.status(200).json({ message: 'Lecturer deleted successfully' });
        } catch (error) {
            res.status(500).json({ error: error });
        }
    }
}
