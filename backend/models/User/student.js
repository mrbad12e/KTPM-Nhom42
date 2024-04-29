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
            const { email } = req.body; 
            let query = `SELECT id, CONCAT(first_name, ' ', last_name) AS name, phone, birthday, gender, address, program_id 
                            FROM student WHERE email = $1`;
            const { rows: studentRows } = await client.query(query, [email]); 
            const programId = studentRows[0].program_id;
            let query1 = `SELECT name FROM program WHERE id = $1`;    
            const { rows: programRows } = await client.query(query1, [programId]);           
            const rows = { ...studentRows[0], programName: programRows[0].name };
            rows.birthday = rows.birthday.toISOString().split('T')[0];
            // Chuyển đổi ngày sinh thành định dạng "DD-MM-YY"
            const birthday = new Date(rows.birthday);   // Chuyển đổi ngày sinh thành định dạng "YY-MM-DD"
            const formattedBirthday = `${birthday.getDate().toString().padStart(2, '0')}-${(birthday.getMonth() + 1).toString().padStart(2, '0')}-${birthday.getFullYear().toString()}`;
            rows.birthday = formattedBirthday;
            rows.gender = rows.gender === "M" ? "Nam" : "Nữ";   // chuyển đổi giới tính về dạng nam, nữ
            return rows;
        } catch (error) {
            next(error); 
        }
    }

    static async getTimetableFromDatabase(req, res, next) {
        try {
            const { email } = req.body; 
            const query1 = `SELECT id FROM student WHERE email = $1`;
            const studentResult = await client.query(query1, [email]);
            const student_Id = studentResult.rows[0].id;
    
            const query2 = `SELECT class_id FROM enrollment WHERE student_id = $1`;    
            const classResult = await client.query(query2, [student_Id]);
            const class_ids = classResult.rows.map(row => row.class_id);
    
            const query3 = `SELECT * FROM timetable WHERE class_id = ANY($1) ORDER BY weekday`;    
            const { rows: timetable } = await client.query(query3, [class_ids]);
    
            const query4 = `SELECT class.id, subject.name FROM class
                            LEFT JOIN subject ON class.subject_id = subject.id
                            WHERE class.id = ANY($1)`;
            let subjectResult = await client.query(query4, [class_ids]);
    
            // Filter the subjectResult to contain only { id, name } objects
            subjectResult = subjectResult.rows.map(row => ({ id: row.id, name: row.name }));
    
            // Join timetable with subjectResult
            const combinedResult = timetable.map(item => {
                const subjectInfo = subjectResult.find(subject => subject.id === item.class_id);
                const startTime = item.start_time.slice(0, 2) + ':' + item.start_time.slice(2);
                const endTime = item.end_time.slice(0, 2) + ':' + item.end_time.slice(2);
                const time = startTime + ' - ' + endTime;
                return { 
                    class_id: item.class_id,
                    weekday: item.weekday,
                    time: time,
                    location: item.location,
                    subject_name: subjectInfo ? subjectInfo.name : null 
                };
            });
    
            return combinedResult;
        } catch (error) {
            next(error); 
        }
    }
    
    
    
    
    
}