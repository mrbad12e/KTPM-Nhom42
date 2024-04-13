import client from '../../config/db.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import 'dotenv/config';

export default class User {
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
