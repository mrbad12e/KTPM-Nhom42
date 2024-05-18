import Subject from "../../models/School/subject.js";

export default class SubjectControllers {
    static async createSubject(req, res, next) {
        try {
            await Subject.createSubject(req, res, next);
            res.status(200).json({ message: 'Subject created successfully' });
        } catch (error) {
            res.status(500).json({ error: error });
        }
    }

    static async getSubject(req, res, next) {
        try {
            res.status(200).json({
                subject: await Subject.getSubject(req, res, next),
                message: 'Subject fetched successfully',
            });
        } catch (error) {
            res.status(500).json({ error: error });
        }
    }

    static async updateSubject(req, res, next) {
        try {
            const updatedSubject = await Subject.updateSubject(req, res, next);
            res.status(200).json({ updatedSubject });
        } catch (error) {
            res.status(500).json({ error: error });
        }
    }
}