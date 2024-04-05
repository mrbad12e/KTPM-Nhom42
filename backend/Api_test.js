const { Pool } = require('pg');
const dotenv = require('dotenv');
const Bcrypt = require('bcrypt');
dotenv.config();

const pool = new Pool({
    'user': process.env.DB_USER,
    'host': process.env.DB_HOST,
    'database': process.env.DB_DATABASE,
    'password': process.env.DB_PASSWORD,
    'port': process.env.DB_PORT
});

// Create new table admin
pool.query(`
    DROP TABLE IF EXISTS public.admin;
    CREATE TABLE admin (
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL
    );`, (err, res) => {
        console.log(err, res);
        pool.end();
});

function hashPassword(password) {
    const saltRounds = 10;
    return Bcrypt.hashSync(password, saltRounds);
}

// Add new admin
const plainTextPassword = 'admin';
const saltRounds = 10;
const hashedPassword = Bcrypt.hashSync(plainTextPassword, saltRounds);
pool.query(`
    INSERT INTO public.admin (id, username, password, email) VALUES (1, 'admin', '${hashedPassword}', 'admin1@gmail.com');
`, (err, res) => {
    console.log(err, res);
    pool.end();
});

// Create new password column for student and lecturer
pool.query(`
    ALTER TABLE public.student ADD COLUMN password VARCHAR(255);
    ALTER TABLE public.lecturer ADD COLUMN password VARCHAR(255);
`, (err, res) => {
    console.log(err, res);
    pool.end();
});

// Add new password for student and lecturer
pool.query(`
    UPDATE public.student SET password = '${hashPassword('student')}';
    UPDATE public.lecturer SET password = '${hashPassword('lecturer')}';
`, (err, res) => {
    console.log(err, res);
    pool.end();
});

pool.end();