import client from "../../config/db.js";

export default class Class {
    static async createClass(req, res, next) {
        try {
            
        } catch (error) {
            throw error;
        }
    }

    static async getClass(req, res, next) {
        try {
            const query = 'SELECT * FROM show_class_info()';
            const { rows } = await client.query(query);
            res.status(200).json({
                classes: rows,
                message: 'Classes fetched successfully',
            });
        } catch (error) {
            throw error;
        }
    }

    static async updateClass(req, res, next) {
        try {
            
        } catch (error) {
            throw error;
        }
    }

    static async deleteClass(req, res, next) {
        try {
            
        } catch (error) {
            throw error;
        }
    }

    static async assignLecturer(req, res, next) {
        try {
            
        } catch (error) {
            throw error;
        }
    }

    static async enrollClass(req, res, next) {
        try {
            
        } catch (error) {
            throw error;
        }
    }

    
}