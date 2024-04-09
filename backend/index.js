import express from 'express';
import http from 'http';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import 'dotenv/config';

const app = express();
app.use(cors());
app.use(cookieParser());
app.use(express.json());

// Routes declaration
import adminRoute from './routes/admin.js';


// Use routes
app.use('/admin', adminRoute);


const server = http.createServer(app);
server.listen(process.env.PORT || 5000, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
})