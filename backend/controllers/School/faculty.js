import Faculty from "../../models/School/faculty.js";

export default class FacultyControllers {
    static async getFaculty(req, res, next) {
        try {
            res.status(200).json({ 
                faculty: await Faculty.getFaculty(req, res, next),
            });
        } catch (error) {
            res.status(500).json({ error: error });
        }
    }

    // static async updateFaculty(req, res, next) {}

    // static async deleteFaculty(req, res, next) {}
}