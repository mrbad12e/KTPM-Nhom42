import client from '../../config/db.js';

export default class Program {
    static async createProgram(req, res, next) {
        try {
            
        } catch (error) {
            throw error;
        }
    }

    static async getProgram(req, res, next) {
        try {
            const query = 'SELECT * FROM public.program';
            if (Object.keys(req.query).length > 0) {
                query += ' WHERE ';
                const conditions = [];
                for (const key in req.query) {
                    // Prevent SQL injection by using parameterized queries
                    conditions.push(`${key} = $${conditions.length + 1}`);
                }
                query += conditions.join(' AND ');
            }
            const queryParams = Object.values(req.query);
            const { rows } = await client.query(query, queryParams);
            return rows;
        } catch (error) {
            throw error;
        }
    }

    static async updateProgram(req, res, next) {
        try {
            
        } catch (error) {
            throw error;
        }
    }

    static async deleteProgram(req, res, next) {
        try {
            
        } catch (error) {
            throw error;
        }
    }
}