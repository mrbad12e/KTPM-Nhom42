import express from 'express';
import http from 'http';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import 'dotenv/config';

const app = express();
app.use(cors({
    origin: process.env.FRONTEND_URL,
}));
app.use(cookieParser());
app.use(express.json());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // Cho phép truy cập từ domain này
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Routes declaration
import adminRoute from './routes/User/admin.js';
import lectuerRoute from './routes/User/lecturer.js';
import studentRoute from './routes/User/student.js';
import classRoute from './routes/School/class.js';
import facultyRoute from './routes/School/faculty.js';
import programRoute from './routes/School/program.js';
import subjectRoute from './routes/School/subject.js';

// Use routes
app.use('/admin', adminRoute);
app.use('/lecturer', lectuerRoute);
app.use('/student', studentRoute);
app.use('/class', classRoute);
app.use('/faculty', facultyRoute);
app.use('/program', programRoute);
app.use('/subject', subjectRoute);


const server = http.createServer(app);
server.listen(process.env.PORT || 5000, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
})