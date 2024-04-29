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

    //-----------------------------------------------------------------------------------------------------------------------------
    //test 
    static async getUserInfoFromDatabase(req, res, next) {
        try {
            const { email } = req.body; // Lấy email từ body của yêu cầu HTTP
            let query = `SELECT id, CONCAT(first_name, ' ', last_name) AS name, phone, birthday, gender, address, program_id 
                            FROM student WHERE email = $1`;
            const { rows: studentRows } = await client.query(query, [email]); // Truyền email vào câu truy vấn
            const programId = studentRows[0].program_id;
            
            // Truy vấn tên chương trình dựa trên program_id
            let query1 = `SELECT name FROM program WHERE id = $1`;    
            const { rows: programRows } = await client.query(query1, [programId]);           
            const rows = { ...studentRows[0], programName: programRows[0].name };
            rows.birthday = rows.birthday.toISOString().split('T')[0];
            // Chuyển đổi ngày sinh thành định dạng "DD-MM-YY"
            const birthday = new Date(rows.birthday);   // Chuyển đổi ngày sinh thành định dạng "YY-MM-DD"
            const formattedBirthday = `${birthday.getDate().toString().padStart(2, '0')}-${(birthday.getMonth() + 1).toString().padStart(2, '0')}-${birthday.getFullYear().toString()}`;
            rows.birthday = formattedBirthday;
            // chuyển đổi giới tính về dạng nam, nữ
            rows.gender = rows.gender === "M" ? "Nam" : "Nữ";
            // Gửi phản hồi chỉ khi tất cả các truy vấn đã hoàn thành
            return rows;
        } catch (error) {
            next(error); // Chuyển lỗi tới middleware xử lý lỗi tiếp theo
        }
    }
}