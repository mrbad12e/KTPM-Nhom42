import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import loginstyles from './Login.module.css'; 
import axios from 'axios'; 

export const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [role, setRole] = useState('student'); 

    const handleLogin = async () => {
        try {
            const config = { headers: { 'Content-Type': 'application/json' } };
            let response;
            if (role === 'admin') {
                response = await axios.post('/admin/login', { email, password }, config);
            } else {
                response = await axios.post('/student/login', { email, password }, config);
            }
            
            if (response && response.data) {
                const { data } = response;
                localStorage.setItem('auth', data.success);
                localStorage.setItem('email', email); // Lưu email vào localStorage
                if (role === 'admin') {
                    navigate('/student');
                } else {
                    navigate('/home');
                }
            } else {
                setError('Unexpected response from server');
            }
        } catch (error) {
            setError(error.response ? error.response.data.message : 'An error occurred');
        }
    };


    useEffect(() => {
        if (error) {
            console.log(error);
        }
        if (localStorage.getItem('auth')) {
            console.log('Logged in successfully');
            if (role === 'admin') {
                navigate('/student');
            } else {
                navigate('/home');
            }
        }
    }, [error]);

    return (
        <div style={{marginTop: '50px'}}>
        <Container className={loginstyles['login-container']}>
            <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Login</h2>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Email:</Form.Label>
                <Form.Control type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)}/>
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
                <Form.Label>Password:</Form.Label>
                <Form.Control type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)}/>
            </Form.Group>            
            <Form.Group controlId="formBasicRole">
                <Form.Label>Role:</Form.Label>
                <Form.Select value={role} onChange={(e) => setRole(e.target.value)}>
                    <option value="admin">Admin</option>
                    <option value="student">Student</option>
                    <option value="lecturer">Lecturer</option>
                </Form.Select>
            </Form.Group>
            <div style={{ color: 'red' }}>{error && <p>{error}</p>}</div>
            <Button variant="primary" className={loginstyles['btn-login']} onClick={handleLogin}>Log in</Button>
            <div style={{textAlign: 'right',marginRight: '20px'}}>Forgot your password</div>
        </Container>
        </div>
    );
};