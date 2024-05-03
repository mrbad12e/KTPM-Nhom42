import React, { useState } from 'react';
import { Col, Row, Nav, Navbar, Container, NavDropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import styles from './Header.module.css';
import axios from 'axios';

export const Header = () => {
    const navigate = useNavigate();
    const [showChangePassword, setShowChangePassword] = useState(false);

    const handleLogout = () => {
        try {
            axios.get('/student/logout');
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
        <Navbar className={styles['header-background']}>
            <Navbar.Brand className={styles["header-title"]}>ĐẠI HỌC BÁCH KHOA HÀ NỘI</Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
                <NavDropdown title="Xin chào sinh viên" id="basic-nav-dropdown">
                    <NavDropdown.Item onClick={handleChangePassword}>Đổi mật khẩu</NavDropdown.Item>
                    <NavDropdown.Item onClick={handleLogout}>Đăng xuất</NavDropdown.Item>
                </NavDropdown>
            </Navbar.Collapse>
            {showChangePassword && (
                <div className={styles["overlay"]}>
                    <div className={styles["change-password-form"]}>
                        <span className={styles["close"]} onClick={handleCloseChangePassword}>&times;</span>
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
        </Navbar>
    );
};
