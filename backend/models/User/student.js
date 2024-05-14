import User from "./user.js";
import client from "../../config/db.js";
import { hashPassword } from "../../middleware/hashPassword.js";

export default class Student extends User {
    constructor(id, role){
        super(id, role);
        this.studentSetup();
    }

    async studentSetup(){
        try {
            const query = `
            REVOKE SELECT ON TABLE public.admin FROM "${this.id}";
            GRANT ALL PRIVILEGES ON TABLE public.enrollment TO "${this.id}";

            GRANT USAGE ON SCHEMA student TO "${this.id}";
            GRANT SELECT ON ALL TABLES IN SCHEMA student TO "${this.id}";
            GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA student TO "${this.id}";

            SET ROLE "${this.id}"
            `;
            await client.query(query);
        } catch (error) {
            throw error;
        }
    }

    static async add_Student(req, res, next) {
        try {
            const query = 'CALL add_student($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)';
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
                req.body.program_id,
            ];
            await client.query(query, values);
            await client.query('Update public.student set password = $1 where student_id = $2', [hashPassword('student'), req.body.id])
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    
    static async readStudent(req, res, next){
        try {
            let query = `SELECT * FROM public.student`;
            // if req.query.id is undefined then it will return all students
            // else loop through the query string and add the query to the query string
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

    static async show_estimated_fees(req, res, next){
        try {
            if (!req.query.id) {
                const query = 'SELECT * FROM show_estimated_fees()';
                const { rows } = await client.query(query);
                return rows;
            } else {
                const query = 'SELECT * FROM show_estimated_fees($1)';
                const { rows } = await client.query(query, [req.query.id]);
                return rows;
            }
        } catch (error) {
            throw error;
        }
    }

    static async report_student(req, res, next){
        try {
            if (!req.query.id) {
                const query = 'SELECT * FROM report_student()';
                const { rows } = await client.query(query);
                return rows;
            } else {
                const query = 'SELECT * FROM report_student($1)';
                const { rows } = await client.query(query, [req.query.id]);
                return rows;
            }
        } catch (error) {
            throw error;
        }
    }

    static async updateStudent(req, res, next){
        try {
            const id = req.query.id;
            const updates = req.body;
    
            const columnsToUpdate = Object.keys(updates);
            const valuesToUpdate = Object.values(updates);
    
            let placeholders = columnsToUpdate.map((col, index) => `${col} = $${index + 1}`).join(', ');
            const query = `UPDATE public.student SET ${placeholders} WHERE id = $${columnsToUpdate.length + 1};`;
    
            const queryValues = [...valuesToUpdate, id];
            await client.query(query, queryValues);
        } catch (error) {
            throw error;
        }
    }

    // static async deleteStudent(req, res, next) {}
}