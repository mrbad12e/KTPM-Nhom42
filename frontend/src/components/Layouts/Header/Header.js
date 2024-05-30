import React, { useState } from 'react';
import { Navbar, Dropdown} from 'react-bootstrap'; 
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './Header.module.css';
import axios from 'axios';

export const Header = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const shouldShowGreeting = location.pathname !== '/';

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

    return (
        <Navbar className={styles['header-background']}>
            <div className={styles["header-title"]}>ĐẠI HỌC BÁCH KHOA HÀ NỘI</div>
            {shouldShowGreeting && (
                <Dropdown className={styles["header-user"]}>
                    <Dropdown.Toggle variant="primary" id="dropdown-basic" className={styles.user}>
                        Xin chào user
                    </Dropdown.Toggle>
                    <Dropdown.Menu style={{ width: '140px'}}>
                        {/* <Dropdown.Item>Đổi mật khẩu</Dropdown.Item> */}
                        <Dropdown.Item onClick={handleLogout}>Đăng xuất</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            )}
        </Navbar>
    );
};
