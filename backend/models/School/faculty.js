import client from "../../config/db.js";

export default class Faculty {
    // static async createFaculty(req, res, next) {}

    static async getFaculty(req, res, next) {
        try {
            const query = 'SELECT * FROM public.faculty';
            const { rows } = await client.query(query);
            return rows;
        } catch (error) {
            throw error;
        }
    }
    
    // static async updateFaculty(req, res, next) {}

    // static async deleteFaculty(req, res, next) {}
}