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
                    console.log(key, req.query[key]);
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
            client.query(`SELECT password FROM public.${req.path.split('/')[1]} WHERE email = ${req.body.email}`, (error, result) => {
                if (error) {
                    return res.status(500).json({ message: error.message });
                }
                console.log(result.rows[0].password);
                return bcrypt.compare(req.body.password, result.rows[0].password);
            })
            // -----------------------------------
        } catch (error) {
            throw error;
        }
    }

    static async getJsonWebToken(req, res, next) {
        try {
            client.query(`SELECT * FROM public.${req.path.split('/')[1]} WHERE email = ${req.body.email}`, (error, result) => {
                if (error) {
                    return res.status(500).json({ message: error.message });
                }
                const payload = {
                    id: result.rows[0].id,
                    email: result.rows[0].email,
                    role: req.path,
                };
                jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '3h' }, (error, token) => {
                    if (error) {
                        return res.status(500).json({ message: error.message });
                    }
                    return token;
                });
            });
            
        } catch (error) {
            throw error;
        }
    }

}
