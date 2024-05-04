import React from 'react';
import { Col,Button } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom'; 
import './Sidebar_admin.css';
import axios from 'axios';


export const Sidebar_admin = () => {
    const navigate = useNavigate();

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

    return (
        <Col md={3} className="left-content">
            <ul className="sitemap">
                <li>
                    <NavLink to="">Khoa</NavLink>
                </li>
                <li>
                    <NavLink to="">Lớp</NavLink>
                </li>
                <li>
                    <NavLink to="">Môn học</NavLink>
                </li>
                <li>
                    <NavLink to="">Giảng viên</NavLink>
                </li>
                <li>
                    <NavLink to="/student">Sinh viên</NavLink>
                </li>
                <li>
                    <Button variant="primary" onClick={handleLogout} className="logout-button">Đăng xuất</Button>
                </li>
            </ul>
        </Col>
    );
};