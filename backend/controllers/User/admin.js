import Student from '../../models/User/student.js';
import Lecturer from '../../models/User/lecturer.js';
import UserControllers from './user.js';
import client from '../../config/db.js';
import Class from '../../models/School/class.js';

export default class AdminController extends UserControllers {
    static async add_Student(req, res, next) {
        try {
            await Student.add_Student(req, res, next);
            res.status(200).json({ message: 'Student added successfully' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async add_Lecturer(req, res, next) {
        try {
            await Lecturer.add_Lecturer(req, res, next);
            await client.query('Update public.lecturer set password = $1 where lecturer_id = $2', [hashPassword('lecturer'), req.body.id])
            res.status(200).json({ message: 'Lecturer added successfully' });
        } catch (error) {
            res.status(500).json({ error: error.message });
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

    // static async deleteStudent(req, res, next) {}

    // static async deleteLecturer(req, res, next) {}

    static async reset_gpa(req, res, next) {
        try {
            const query = 'CALL reset_gpa()';
            await client.query(query);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async report_enrolled(req, res, next) {
        try {
            if (!req.body.semester) {
                const query = 'SELECT * FROM report_enrolled();';
                const result = await client.query(query);
                res.status(200).json(result.rows);
            } else {
                const query = 'SELECT * FROM report_enrolled($1);';
                const values = [req.body.semester];
                const result = await client.query(query, values);
                res.status(200).json(result.rows);
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async report_credit_debt(req, res, next) {
        try {
            const query = 'CALL report_credit_debt()';
            await client.query(query);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async report_scholarship(req, res, next) {
        try {
            const query = 'CALL report_scholarship()';
            await client.query(query);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}
