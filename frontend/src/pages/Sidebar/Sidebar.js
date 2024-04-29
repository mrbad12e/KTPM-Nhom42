import React from 'react';
import { Col,Button } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom'; // Thêm import useNavigate
import './Sidebar.css';
import axios from 'axios';


const Sidebar = () => {
    const navigate = useNavigate();
    
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

    return (
        <Col md={3} className="left-content">
            <h3 className="text-name">Quang</h3>
            <ul className="sitemap">
                <li>
                    <NavLink to="/">Trang chủ</NavLink>
                </li>
                <li>
                    <NavLink to="/profile">Thông tin sinh viên</NavLink>
                </li>
                <li>
                    <NavLink to="/">Thời khóa biểu</NavLink>
                </li>
                <li>
                    <NavLink to="/registration">Đăng kí học tập</NavLink>
                </li>
                <li>
                    <NavLink to="/">Thành tích học tập</NavLink>
                </li>
                <li>
                    <NavLink to="/">Học phí</NavLink>
                </li>
                <li>
                    <Button variant="primary" onClick={handleLogout}>Đăng xuất</Button>
                </li>
            </ul>
        </Col>
    );
};

export default Sidebar;
