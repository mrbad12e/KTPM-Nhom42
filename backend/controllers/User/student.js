import Student from '../../models/User/student.js';
import Lecturer from '../../models/User/lecturer.js';
import UserControllers from './user.js';
import Class from '../../models/School/class.js';
import client from '../../config/db.js';

export default class StudentController extends UserControllers {
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

    static async self_view_class_enrolled(req, res, next) {
        try {
            if (!req.query.semester) {
                const query = 'SELECT * FROM student.self_view_class_enrolled()';
                const { rows } = await client.query(query);
                res.status(200).json({
                    classes: rows,
                    message: 'Classes fetched successfully',
                });
            } else {
                const semester = req.query.semester;
                const query = 'SELECT * FROM student.self_view_class_enrolled($1)';
                const { rows } = await client.query(query, [semester]);
                res.status(200).json({
                    classes: rows,
                    message: 'Classes fetched successfully',
                });
            }
        } catch (error) {
            res.status(500).json({ error: error });
        }
    }

    static async self_view_results(req, res, next) {
        try {
            const semester = req.query.semester;
            const query = 'SELECT * FROM self_view_results($1)';
            const { rows } = await client.query(query, [semester]);
            res.status(200).json({
                results: rows,
                message: 'Results fetched successfully',
            });
        } catch (error) {
            res.status(500).json({ error: error });
        }
    }

    static async self_view_timetable(req, res, next) {
        try {
            const semester = req.query.semester;
            const query = 'SELECT * FROM self_view_timetable($1)';
            const { rows } = await client.query(query, [semester]);
            res.status(200).json({
                timetable: rows,
                message: 'Timetable fetched successfully',
            });
        } catch (error) {
            res.status(500).json({ error: error });
        }
    }

    static async show_estimated_fees(req, res, next) {
        try {
            res.status(200).json({
                fees: await Student.show_estimated_fees(req, res, next),
                message: 'Fees fetched successfully',
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
}