import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Form, Button, InputGroup, InputGroupText } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // Đảm bảo import CSS đúng cách
import axios from 'axios'; // Thêm import axios
import NotEye from '../../../../assets/img/noteyes.jpg'
import Eye from '../../../../assets/img/eye.jpg'

export const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [role, setRole] = useState('student'); // Mặc định là sinh viên

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
                    navigate('/profile');
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
                navigate('/profile');
            }
        }
    }, [error]);

    return (
        <div className="login-background">
            <Container>
                <Row className="justify-content-md-center">
                    <Col xs={12} md={6}>
                        <div className="login-container">
                            <div className="login-content">
                                <h2 className="text-login">Login</h2>
                                <Form>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Email:</Form.Label>
                                        <Form.Control
                                            type="email"
                                            placeholder="Enter your email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="formBasicPassword" style={{ position: 'relative' }}>
                                        <Form.Label>Password:</Form.Label>
                                        <Form.Control
                                            type={showPassword ? "text" : "password"}
                                            placeholder="Enter your password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            style={{ paddingRight: '40px' }} // Thêm padding bên phải để không che khuất biểu tượng mắt
                                        />
                                        <img
                                            src={showPassword ? Eye : NotEye}
                                            style={{
                                                position: 'absolute',
                                                right: '10px', // Điều chỉnh vị trí của biểu tượng mắt từ phía bên phải
                                                top: '50%', // Điều chỉnh vị trí của biểu tượng mắt theo chiều dọc
                                                transform: 'translateY(15%)', // Dịch chuyển biểu tượng mắt theo chiều dọc
                                                cursor: 'pointer'
                                            }}
                                            onClick={() => setShowPassword(!showPassword)}
                                        />
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
                                    <Button variant="primary" className="btn-login" onClick={handleLogin}>
                                        Log in
                                    </Button>
                                    <div className="forgot-password">Forgot your password</div>
                                </Form>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};
