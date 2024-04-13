import User from "./user.js";
import client from "../../config/db.js";

export default class Student extends User {
    static async createStudent(req, res, next){
        try {
            
        } catch (error) {
            throw error;
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