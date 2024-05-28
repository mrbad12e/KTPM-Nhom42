import client from "../../config/db.js";

export default class Class {
    static async createClass(req, res, next) {
        try {
            const query = 'CALL public.add_class($1, $2, $3, $4, $5, $6, $7, $8, $9)';
            const values = [
                req.body.id,
                req.body.type,
                req.body.semester,
                req.body.require_lab,
                req.body.current_cap,
                req.body.max_cap,
                req.body.company_id,
                req.body.lecturer_id,
                req.body.subject_id,
            ];
            await client.query(query, values);
        } catch (error) {
            throw error;
        }
    }

    static async getClass(req, res, next) {
        // For student login only
        try {
            const query = 'SELECT * FROM student.show_class_info($1, $2)';
            let values = [null, null];
            if (req.query.class_id) values[0] = req.query.class_id;
            if (req.query.semester) values[1] = req.query.semester;
            const { rows } = await client.query(query, values);
            return rows;
        } catch (error) {
            throw error;
        }
    }

    static async updateClass(req, res, next) {
        try {
            const id = req.query.id;
            const updates = req.body;
    
            const columnsToUpdate = Object.keys(updates);
            const valuesToUpdate = Object.values(updates);
    
            let placeholders = columnsToUpdate.map((col, index) => `${col} = $${index + 1}`).join(', ');
            const query = `UPDATE public.class SET ${placeholders} WHERE id = $${columnsToUpdate.length + 1};`;
    
            const queryValues = [...valuesToUpdate, id];
            await client.query(query, queryValues);
        } catch (error) {
            throw error;
        }
    }

    // static async deleteClass(req, res, next) {}

    static async assignLecturer(req, res, next) {
        try {
            const query = 'CALL public.assign_lecturer($1, $2)';
            const values = [req.query.lecturer_id, req.query.class_id];
            await client.query(query, values);
        } catch (error) {
            throw error;
        }
    }

    static async enrollClass(req, res, next) {
        try {
            const values = [req.query.student_id, req.query.class_id];
            const query = 'CALL student.enroll_class($1, $2)';
            await client.query(query, values);
        } catch (error) {
            throw error;
        }
    }

    static async add_Timetable(req, res, next) {
        // Add timetable for a class
        try {
            const query = 'CALL public.add_timetable($1, $2, $3, $4, $5)';
            const values = [
                req.body.class_id,
                req.body.weekday,
                req.body.start_time,
                req.body.end_time,
                req.body.location,
            ];
            await client.query(query, values);
        } catch (error) {
            throw error;
        }
    }

    static async readStudents(req, res, next) {
        try {
            const query = `
                SELECT e.*, st.last_name || ' ' || st.first_name as student_name FROM public.enrollment e
                    Join public.student st ON e.student_id = st.id
                WHERE class_id = $1`;
            const values = [req.query.class_id];
            const { rows } = await client.query(query, values);
            return rows;
        } catch (error) {
            throw error;
        }
    }
}