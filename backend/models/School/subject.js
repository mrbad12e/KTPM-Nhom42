import client from "../../config/db.js";

export default class Subject {
    static async createSubject(req, res, next) {
        try {
            const query = 'CALL add_subject($1, $2, $3, $4, $5, $6, $7)';
            const values = [
                req.body.id,
                req.body.name,
                req.body.study_credits,
                req.body.tuition_credits,
                req.body.final_weight,
                req.body.prerequisite_id,
                req.body.faculty_id,
            ];
            await client.query(query, values);
        } catch (error) {
            throw error;
        }
    }

    static async getSubject(req, res, next) {
        try {
            const query = `SELECT * FROM subject WHERE id = $1`;
            const { rows } = await client.query(query, [req.query.id]);
            return rows;
        } catch (error) {
            throw error;
        }
    }

    static async updateSubject(req, res, next) {
        try {
            const id = req.query.id;
            const updates = req.body;
    
            const columnsToUpdate = Object.keys(updates);
            const valuesToUpdate = Object.values(updates);
    
            let placeholders = columnsToUpdate.map((col, index) => `${col} = $${index + 1}`).join(', ');
            const query = `UPDATE public.subject SET ${placeholders} WHERE id = $${columnsToUpdate.length + 1};`;
    
            const queryValues = [...valuesToUpdate, id];
            await client.query(query, queryValues);
        } catch (error) {
            throw error;
        }
    }

    // static async deleteSubject(req, res, next) {}
}