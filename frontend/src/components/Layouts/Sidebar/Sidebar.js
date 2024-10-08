import React from 'react';
import { Col,Button } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom'; 
import './Sidebar.css';
import axios from 'axios';


export const Sidebar = () => {
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

    return (
        <Col md={3} className="left-content">
            <ul className="sitemap">
                <li>
                    <NavLink to="/profile">Thông tin sinh viên</NavLink>
                </li>
                <li>
                    <NavLink to="/timetable">Thời khóa biểu</NavLink>
                </li>
                <li>
                    <NavLink to="/registration">Đăng kí học tập</NavLink>
                </li>
                <li>
                    <NavLink to="/">Kết quả học tập</NavLink>
                </li>
                <li>
                    <NavLink to="/">Công nợ học phí</NavLink>
                </li>
                <li>
                    <Button variant="primary" onClick={handleLogout} className="logout-button">Đăng xuất</Button>
                </li>
            </ul>
        </Col>
    );
};
