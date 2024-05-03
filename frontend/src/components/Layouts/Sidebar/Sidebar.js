import React from 'react';
import { Col, Button, Nav } from 'react-bootstrap';
import { NavLink, useLocation } from 'react-router-dom';
import styles from './Sidebar.module.css';
import axios from 'axios';

const Sidebar = () => {
    const path = useLocation().pathname;

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
        <Nav variant="pills" defaultActiveKey={path} className={"flex-column"}>
            <Nav.Link as={NavLink} to="/profile">
                Thông tin sinh viên
            </Nav.Link>
            <Nav.Link as={NavLink} to="/timetable">
                Thời khóa biểu
            </Nav.Link>
            <Nav.Link as={NavLink} to="/registration">
                Đăng kí học tập
            </Nav.Link>
            <Nav.Link as={NavLink} to="/">
                Kết quả học tập
            </Nav.Link>
            <Nav.Link as={NavLink} to="/">
                Công nợ học phí
            </Nav.Link>
            <Nav.Link as={NavLink} to="/">
                <Button variant="primary" onClick={handleLogout} className={styles["logout-button"]}>
                    Đăng xuất
                </Button>
            </Nav.Link>
        </Nav>
    );
};

export default Sidebar;
