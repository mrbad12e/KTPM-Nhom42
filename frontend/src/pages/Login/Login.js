import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
// import loginCSS from './Login.css';
import axios from 'axios';

export const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async () => {
        try {
            const config = { headers: { 'Content-Type': 'application/json' } };
            const { data } = await axios.post('/student/login', { email, password }, config);
            localStorage.setItem('auth', data.success);
            navigate('/home');
        } catch (error) {
            // Nếu có lỗi, hiển thị thông báo lỗi
            setError(error.response.data.message);
        }
    };
    useEffect(() => {
        if (error) {
            console.log(error);
        }
        if (localStorage.getItem('auth')) {
            console.log('Logged in successfully');
            navigate('/home');
        }
    }, [error]);

    return (
        <div className="login-background">
            <div className="login-container">
                <div className="login-content row">
                    <div className="col-12 text-login">Login</div>
                    <div className="col-12 form-group login-input">
                        <label for="">Email:</label>
                        <input
                            type="text"
                            placeholder="Enter your email"
                            className="form-control"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        ></input>
                    </div>
                    <div className="col-12 form-group login-input">
                        <label for="">Password:</label>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            className="form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        ></input>
                        <i className="fas fa-eye-slash"></i>
                    </div>
                    <div className="col-12 " style={{ color: 'red' }}>
                        {error && <p>{error}</p>}
                    </div>
                    <div className="col-12">
                        <button className="btn-login" onClick={handleLogin}>
                            Log in
                        </button>
                    </div>

                    <div className="col-12">
                        <span className="forgot-password">Fogot your password</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
