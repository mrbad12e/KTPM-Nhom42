import Class from '../../models/School/class.js';
import client from '../../config/db.js';

export default class ClassControllers {
    static async createClass(req, res, next) {
        try {
            await Class.createClass(req, res, next);
            res.status(201).json({ message: 'Class created successfully' });
        } catch (error) {
            res.status(500).json({ error: error });
        }
    }

    static async getClass(req, res, next) {
        try {
            res.status(200).json({ class: await Class.getClass(req, res, next) });
        } catch (error) {
            res.status(500).json({ error: error });
        }
    }

    static async readClass(req, res, next){
        try {
            let query = `SELECT * FROM public.class JOIN public.timetable ON public.class.id = public.timetable.class_id`;
            if (Object.keys(req.query).length > 0) {
                query += ' WHERE ';
                const conditions = [];
                for (const key in req.query) {
                    // Prevent SQL injection by using parameterized queries
                    conditions.push(`${key} = $${conditions.length + 1}`);
                }
                query += conditions.join(' AND ');
            }
            const queryParams = Object.values(req.query);
            const { rows } = await client.query(query, queryParams);
            res.status(200).json({ class: rows, message: 'Class fetched successfully' });
        } catch (error) {
            res.status(500).json({ error: error })
        }
    }

    static async updateClass(req, res, next) {
        try {
            const updatedClass = await Class.updateClass(req, res, next);
            res.status(200).json({ updatedClass });
        } catch (error) {
            res.status(500).json({ error: error });
        }
    }

    // static async deleteClass(req, res, next) {}

    static async assignLecturer(req, res, next) {
        try {
            await Class.assignLecturer(req, res, next);
            res.status(200).json({
                message: 'Lecturer assigned successfully',
            });
        } catch (error) {
            res.status(500).json({ error: error });
        }
    }

    static async enrollClass(req, res, next) {
        try {
            await Class.enrollClass(req, res, next);
            res.status(200).json({
                message: 'Class enrolled successfully',
            });
        } catch (error) {
            res.status(500).json({ error: error });
        }
    }

    static async readStudents(req, res, next) {
        try {
            const students = await Class.readStudents(req, res, next);
            res.status(200).json({ students });
        } catch (error) {
            res.status(500).json({ error: error });
        }
    }

    static async add_Timetable(req, res, next) {
        try {
            await Class.add_Timetable(req, res, next);
            res.status(200).json({ message: 'Timetable added successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Time conflict' });
        }
    }
}