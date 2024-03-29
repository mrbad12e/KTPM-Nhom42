const express = require('express');
const router = express.Router();
const { Pool } = require('pg');
const dotenv = require('dotenv');
dotenv.config();
const app = express();

const pool = new Pool({
    'user': process.env.DB_USER,
    'host': process.env.DB_HOST,
    'database': process.env.DB_DATABASE,
    'password': process.env.DB_PASSWORD,
    'port': process.env.DB_PORT
});

router.get('/api', (req, res) => {
    pool.query('SELECT * FROM student', (err, result) => {
        if (err) {
            console.log(err);
        }
        res.send(result.rows);
    });
});

app.use('/', router);
app.listen(3001, () => {
    console.log('Server is running on port 3001');
});
