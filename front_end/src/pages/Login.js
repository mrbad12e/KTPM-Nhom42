import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';
import './Login.css';
import axios from 'axios';
import {handleLoginApi} from '../Service/userService';

export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);

    const handleLogin = async() => {
        try {
            // Gọi hàm handleLoginApi với email và password hiện tại
            const response = await handleLoginApi(email, password);
            
            // Nếu yêu cầu thành công, đánh dấu đã đăng nhập thành công
            if (response.status === 200) {
                setLoggedIn(true);
            }
        } catch (error) {
            // Nếu có lỗi, hiển thị thông báo lỗi
            setError('Incorrect email or password');
        }
        
    };
    if (loggedIn) {
        // Nếu đã đăng nhập thành công, chuyển hướng đến trang chính
        return <Navigate to="/homepage" />;
    }


    
    return (
    <div class="login-background">
        <div class="login-container">
            <div class="login-content row">
                <div class="col-12 text-login">
                    Login
                </div>
                <div class="col-12 form-group login-input">
                    <label for="">Email:</label>
                    <input 
                        type="text" 
                        placeholder="Enter your email" 
                        class="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    ></input>
                </div>
                <div class="col-12 form-group login-input">
                    <label for="">Password:</label>
                    <input 
                        type="password" 
                        placeholder="Enter your password" 
                        class="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    ></input>
                    <i class="fas fa-eye-slash"></i>
                </div>
                <div class="col-12">
                    <button class="btn-login" onClick={handleLogin} >Log in</button>
                </div>

                <div class="col-12">
                    <span class="forgot-password">Fogot your password</span>
                </div>
                
            </div>
        </div>
       
    </div>
    );
};
