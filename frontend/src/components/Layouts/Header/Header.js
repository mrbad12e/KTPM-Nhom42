import React, { useState } from 'react';
import { NavDropdown, Navbar, Dropdown} from 'react-bootstrap'; 
import { useNavigate } from 'react-router-dom';
import styles from './Header.module.css';
import axios from 'axios';

export const Header = () => {
    const navigate = useNavigate();

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
        
    };

    return (
        <Navbar className={styles['header-background']}>
            <Navbar.Brand className={styles["header-title"]}>ĐẠI HỌC BÁCH KHOA HÀ NỘI</Navbar.Brand>
            <Dropdown className={styles["header-user"]}>
                <Dropdown.Toggle variant="dark" style={{ border: 'none' }} id="dropdown-basic">
                    Xin chào sinh viên
                </Dropdown.Toggle>
                <Dropdown.Menu >
                    <Dropdown.Item style={{ fontSize: '14px', padding: '5px 10px' }}>Đổi mật khẩu</Dropdown.Item>
                    <Dropdown.Item style={{ fontSize: '14px', padding: '5px 10px', width: '20px' }}>Đăng xuất</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </Navbar>
    );
};
