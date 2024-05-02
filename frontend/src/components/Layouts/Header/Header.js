import React, { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import './Header.css';
import axios from 'axios'; 

export const Header = () => {
    const navigate = useNavigate();
    const [showChangePassword, setShowChangePassword] = useState(false);

    const handleLogout = () => {
        try {
            axios.get('/admin/logout');
            console.log('Logged out successfully');
            localStorage.clear();
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

    const handleSubmit = (event) => {
        event.preventDefault();
        // Xử lý logic đổi mật khẩu ở đây
    };

    return (
        <header className="container-fluid header-background">
            <Row>
                <Col sm="auto">
                    <h1><NavLink className="header-title" to="/home">ĐẠI HỌC BÁCH KHOA HÀ NỘI</NavLink></h1>
                </Col>
                <Col >
                    <div className="dropdown-container">
                        <div className="dropdown">
                            <button className="dropbtn">Xin chào sinh viên</button>
                            <div className="dropdown-content">
                                <a onClick={handleChangePassword} className="dropdown-text">Đổi mật khẩu</a>
                                <a onClick={handleLogout} className="dropdown-text">Đăng xuất</a>
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

                            <button type="button" className="confirm-button" onClick={handleSubmit}>Xác nhận</button>

                        </form>
                    </div>
                </div>
            )}
        </header>
    );
};
