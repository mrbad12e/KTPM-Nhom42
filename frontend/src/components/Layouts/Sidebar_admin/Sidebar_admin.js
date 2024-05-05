import React from 'react';
import { Col, Button } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import './Sidebar_admin.css';
import axios from 'axios';
import DeleteIcon from '../../../../assets/img/Delete.png';

const Sidebar_admin = () => {
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

    const handleSearchButtonClick = () => {
        console.log('Search button clicked');
    };

    return (
        <Col>
            <div className="hamburger-button">
                <div onClick={handleSearchButtonClick} style={{ cursor: 'pointer', position: 'absolute', width: '100%', height: '100%', zIndex: '1' }}>
                    <img src={DeleteIcon} alt="Search" style={{ width: '100%', height: '100%', borderRadius: '5px' }} />
                </div>
            </div>
            <div className="left-content">
                <ul className="sitemap">
                    <li className="item-link">
                        <NavLink to="/student">Khoa</NavLink>
                    </li>
                    <li className="item-link">
                        <NavLink to="/student">Lớp</NavLink>
                    </li>
                    <li className="item-link">
                        <NavLink to="/student">Môn học</NavLink>
                    </li>
                    <li className="item-link">
                        <NavLink to="/student">Giảng viên</NavLink>
                    </li>
                    <li className="item-link">
                        <NavLink to="/student">Sinh viên</NavLink>
                    </li>
                    <li className="item-link">
                        <Button variant="primary" onClick={handleLogout} className="logout-button">Đăng xuất</Button>
                    </li>
                </ul>
            </div>
        </Col>
    );
};

export default Sidebar_admin;