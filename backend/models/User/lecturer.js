import User from './user.js';
import client from '../../config/db.js';
import { hashPassword } from '../../middleware/hashPassword.js';

export default class Lecturer extends User {
    constructor(id, role) {
        super(id, role);
        this.lecturerSetup();
    }

    async lecturerSetup() {
        try {
            await this.setup();
            const query = `
            REVOKE SELECT ON TABLE public.admin FROM "${this.id}";
            GRANT ALL PRIVILEGES ON TABLE public.enrollment TO "${this.id}";

            GRANT USAGE ON SCHEMA lecturer TO "${this.id}";
            GRANT SELECT ON ALL TABLES IN SCHEMA lecturer TO "${this.id}";
            GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA lecturer TO "${this.id}";

            SET SESSION AUTHORIZATION "${this.id}"
            `;
            await client.query(query);
        } catch (error) {
            throw error;
        }
    }

    static async add_Lecturer(req, res, next) {
        try {
            const query = 'CALL add_lecturer($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)';
            const values = [
                req.body.id,
                req.body.first_name,
                req.body.last_name,
                req.body.gender,
                req.body.birthday,
                req.body.status,
                req.body.join_date,
                req.body.address,
                req.body.email,
                req.body.phone,
                req.body.faculty_id,
            ];
            await client.query(query, values);
            await client.query('Update public.lecturer set password = $1 where lecturer_id = $2', [hashPassword('lecturer'), req.body.id])
            res.status(200).json({ message: 'Lecturer added successfully' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    
    static async readLecturer(req, res, next) {
        try {
            let query = `SELECT * FROM public.lecturer`;

            if (Object.keys(req.query).length > 0) {
                query += ' WHERE ';
                const conditions = [];
                for (const key in req.query) {
                    // Prevent SQL injection by using parameterized queries
                    conditions.push(`${key} = $${conditions.length + 1}`);
                }
                query += conditions.join(' AND ');
            }
            query += ';';
            const queryParams = Object.values(req.query);
            const { rows } = await client.query(query, queryParams);
            return rows;
        } catch (error) {
            throw error;
        }
    }

    static async updateLecturer(req, res, next) {
        try {
            const id = req.query.id;
            const updates = req.body;
    
            const columnsToUpdate = Object.keys(updates);
            const valuesToUpdate = Object.values(updates);
    
            let placeholders = columnsToUpdate.map((col, index) => `${col} = $${index + 1}`).join(', ');
            const query = `UPDATE public.lecturer SET ${placeholders} WHERE id = $${columnsToUpdate.length + 1};`;
    
            const queryValues = [...valuesToUpdate, id];
            await client.query(query, queryValues);
        } catch (error) {
            throw error;
        }
    }

    // static async deleteLecturer(req, res, next) {}
}
