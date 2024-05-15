import Class from '../../models/School/class.js';

export default class ClassControllers {
    static async createClass(req, res, next) {
        try {
            const newClass = await Class.createClass(req, res, next);
            res.status(201).json({ newClass });
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
}
