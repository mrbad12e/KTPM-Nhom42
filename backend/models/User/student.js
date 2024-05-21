import User from "./user.js";
import client from "../../config/db.js";
import { hashPassword } from "../../middleware/hashPassword.js";
import 'dotenv/config';

export default class Student extends User {
    constructor(id, role){
        super(id, role);
        this.studentSetup();
    }

    async studentSetup(){
        try {
            await this.setup();
            const query = `
            REVOKE SELECT ON TABLE public.admin FROM "${this.id}";
            GRANT ALL PRIVILEGES ON TABLE public.enrollment TO "${this.id}";

            GRANT USAGE ON SCHEMA student TO "${this.id}";
            GRANT SELECT ON ALL TABLES IN SCHEMA student TO "${this.id}";
            GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA student TO "${this.id}";

            SET SESSION AUTHORIZATION "${this.id}"
            `;
            await client.query(query);
        } catch (error) {
            throw error;
        }
    }

    static async add_Student(req, res, next) {
        try {
            const query = 'CALL public.add_student($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)';
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
                const query = 'SELECT * FROM student.show_estimated_fees()';
                const { rows } = await client.query(query);
                return rows;
            } else {
                const query = 'SELECT * FROM student.show_estimated_fees($1)';
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
                const query = 'SELECT * FROM student.report_student()';
                const { rows } = await client.query(query);
                return rows;
            } else {
                const query = 'SELECT * FROM student.report_student($1)';
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

    //=======================
   
    static async getClassDetailFromDatabase(req, res, next) {
        try {
            const { email, class_id } = req.body; 
            
            // Lấy thông tin giáo viên
            const query1 = `SELECT CONCAT(lecturer.first_name, ' ', lecturer.last_name) AS name, lecturer.email, lecturer.phone 
                            FROM lecturer 
                            LEFT JOIN class ON lecturer.id = class.lecturer_id 
                            WHERE class.id = $1;`;
            const lecturerInfo = await client.query(query1, [class_id]);
    
            // Lấy số học sinh trong lớp
            const query2 = `SELECT current_cap, type FROM class WHERE class.id = $1`;
            const classInfo = await client.query(query2, [class_id]);
            
            // Lấy chi tiết từng học sinh trong lớp
            const query3 = `SELECT student.id, CONCAT(student.first_name, ' ', student.last_name) AS name, program.name AS program_name, student.email  
                            FROM student
                            JOIN enrollment ON student.id = enrollment.student_id
                            JOIN program ON student.program_id = program.id 
                            WHERE class_id = $1`;
            const studentDetails = await client.query(query3, [class_id]);
    
            // Lấy ID của sinh viên dựa trên email
            const query4 = `SELECT id FROM student WHERE email = $1`;
            const studentIdResult = await client.query(query4, [email]);
            const studentId = studentIdResult.rows[0].id;
    
            // Lấy điểm cá nhân của sinh viên trong lớp
            const query5 = `SELECT midterm_score, final_score, absent_count 
                            FROM enrollment 
                            WHERE class_id = $1 AND student_id = $2`;
            const studentScores = await client.query(query5, [class_id, studentId]);
    
            // Trả về kết quả của các truy vấn
            return {
                lecturerInfo: lecturerInfo.rows,
                classInfo: classInfo.rows[0],
                studentDetails: studentDetails.rows,
                studentScores: studentScores.rows[0],
                // Trả về sĩ số bằng số lượng sinh viên vì trong database chưa cập nhật đúng sĩ số
                studentCount: studentDetails.rows.length
            };
    
        } catch (error) {
            next(error); 
        }
    }
  
    static async getSubjectFromDatabase(req, res, next) {
        try {
            const { subject_name, subject_id } = req.body; 
    
            let query1 = `SELECT class.id, class.subject_id, subject.name, class.current_cap, 
                            class.max_cap, timetable.weekday, timetable.start_time, timetable.end_time
                            FROM class 
                            JOIN subject ON class.subject_id = subject.id 
                            JOIN timetable ON class.id = timetable.class_id `;
            if (subject_name && subject_id) {
                query1 += 'WHERE (LOWER(subject.name) LIKE LOWER($1) OR LOWER(subject.id) LIKE LOWER($2) )ORDER BY subject.id';
                const { rows } = await client.query(query1, [`${subject_name}%`, `${subject_id}%`]);
                return rows;
            }
            else if (subject_name && !subject_id) {
                query1 += 'WHERE LOWER(subject.name) LIKE LOWER($1) ORDER BY subject.id';
                const { rows } = await client.query(query1, [`${subject_name}%`]);
                return rows;
            }
            else if (!subject_name && subject_id) {                    
                query1 += 'WHERE LOWER(subject.id) LIKE LOWER($1) ORDER BY subject.id';
                const { rows } = await client.query(query1, [`${subject_id}%`]);
                return rows;
            } else {
                const { rows } = await client.query(query1);
                return rows;
            }
        } catch (error) {
            next(error); 
        }
    }
}