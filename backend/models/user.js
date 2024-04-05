import client from '../config/db.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import 'dotenv/config';

export default class User {
    static async createUser(req, res, next) {
        try {
            // -----------------------------------

            // -----------------------------------
        } catch (error) {
            throw error;
        }
    }

    static async getUserInfomation(req, res, next) {  
        try {
            let query = `SELECT * FROM public.${req.path.split('/')[1]}`;
            // Check if there are additional conditions to add to the query
            const keys = Object.keys(req.query);
            if (keys.length > 0) {
                query += ' WHERE ';
                for (const key of keys) {
                    query += `${key} = '${req.query[key]}' AND `;
                }
                // Remove the last 'AND' from the query string
                query = query.slice(0, -5);
            }
            // Add semicolon to end the query
            query += ';';
            // console.log(query);
            const result = await client.query(query);
            res.status(200).json(result.rows);
        } catch (error) {
            throw error;
        }
    }

    static async updateUser(req, res, next) {
        try {
            // -----------------------------------

            // -----------------------------------
        } catch (error) {
            throw error;
        }
    }

    static async deleteUser(req, res, next) {
        try {
            let query = `DELETE FROM public.${req.path.split('/')[1]} `;
            // Check if there are additional conditions to add to the query
            const keys = Object.keys(req.query);
            if (keys.length > 1) {
                query += ' WHERE ';
                for (const key in req.query) {
                    if (key !== 'table') {
                        query += `${key} = '${req.query[key]}' AND `;
                    }
                }
                // Remove the last 'AND' from the query string
                query = query.slice(0, -5);
            }
            // console.log(query);
            const result = await client.query(query);
            return result;
        } catch (error) {
            throw error;
        }
    }

    static async comparePassword(req, res, next) {
        try {
            // -----------------------------------
            let query = `SELECT password FROM public.${req.baseUrl.split('/')[1]} WHERE email = '${req.body.email}';`;
            const result = await client.query(query);
            return bcrypt.compare(req.body.password, result.rows[0].password);
            // -----------------------------------
        } catch (error) {
            throw error;
        }
    }

    static async getJsonWebToken(req, res, next) {
        try {
            let query = `SELECT email FROM public.${req.baseUrl.split('/')[1]} WHERE email = $1;`;
            const { rows } = await client.query(query, [req.body.email]);
            if (rows.length === 0) {
                return res.status(404).json({ error: 'Email not found' });
            }
            const email = rows[0].email;
            let token = jwt.sign({ email: email }, process.env.JWT_SECRET);
    
            res.status(200).cookie('token', token, { httpOnly: true, expires: new Date(Date.now() + 24 * 60 * 60 * 1000)});
        } catch (error) {
            throw error;
        }
    }

}
