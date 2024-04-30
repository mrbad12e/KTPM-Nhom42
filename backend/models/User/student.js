import User from "./user.js";
import client from "../../config/db.js";

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

            SET ROLE "${this.id}";
            `
        } catch (error) {
            
        }
    }
    
    static async readStudent(req, res, next){
        try {
            let query = `SELECT * FROM public.${req._parsedUrl.pathname.split('/')[1]}`;
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

    static async updateStudent(req, res, next){
        try {
            
        } catch (error) {
            throw error;
        }
    }

    static async deleteStudent(req, res, next){
        try {
        } catch (error) {
            throw error;
        }
    }
}