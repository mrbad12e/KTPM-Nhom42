import React, { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import './Header.css'; // Import file CSS mới
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; 

export const Header = () => {
    const navigate = useNavigate();
    const [showChangePassword, setShowChangePassword] = useState(false);

    const handleLogout = () => {
        try {
            axios.get('/admin/logout');
            console.log('Logged out successfully');
            localStorage.removeItem('auth');
            navigate('/');
        } catch (error) {
            console.log(error);
        }
    };

    const handleChangePassword = () => {
        setShowChangePassword(true);
    };

    const handleCloseChangePassword = () => {
        setShowChangePassword(false);
    };

    return (
        <header className="container-fluid header-background">
            <Row>
                <Col sm={6}>
                    <h1 className="header-title">ĐẠI HỌC BÁCH KHOA HÀ NỘI</h1>
                </Col>
                <Col sm={{ span: 3, offset: 3 }}>
                    <div className="dropdown-container">
                        <div className="dropdown">
                            <button className="dropbtn">Xin chào sinh viên</button>
                            <i className="bx bx-chevron-down"></i>
                            <div className="dropdown-content">
                                <a onClick={handleChangePassword} className="black-text">Đổi mật khẩu</a>
                                <a onClick={handleLogout} className="black-text">Đăng xuất</a>
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
            {showChangePassword && (
                <div className="overlay">
                    <div className="change-password-form">
                        <span className="close" onClick={handleCloseChangePassword}>&times;</span>
                        <h2>Đổi mật khẩu</h2>
                        <form>
                            <label htmlFor="oldPassword">Mật khẩu cũ:</label>
                            <input type="password" id="oldPassword" name="oldPassword" required />

                            <label htmlFor="newPassword">Mật khẩu mới:</label>
                            <input type="password" id="newPassword" name="newPassword" required />

                            <label htmlFor="confirmPassword">Nhập lại mật khẩu mới:</label>
                            <input type="password" id="confirmPassword" name="confirmPassword" required />

                            <button type="submit" className="confirm-button">Xác nhận</button>
                        </form>
                    </div>
                </div>
            )}
        </header>
    );
};
