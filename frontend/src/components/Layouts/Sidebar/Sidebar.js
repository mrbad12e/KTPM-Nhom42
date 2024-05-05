import React, { useState, useEffect } from 'react';
import { Col, Button } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import './Sidebar.css';
import axios from 'axios';
import DeleteIcon from '../../../../assets/img/Menu.jpg';

const Sidebar = () => {
    const navigate = useNavigate();
    const [showMenu, setShowMenu] = useState(true); // Ban đầu hiển thị sidebar
    const [showOverlay, setShowOverlay] = useState(false); // Trạng thái hiển thị lớp phủ

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

    const handleHamburgerButtonClick = () => {
        setShowMenu(!showMenu);
        setShowOverlay(!showMenu && window.innerWidth <= 1000); // Hiển thị lớp phủ khi ẩn sidebar
    };

    const handleOutsideClick = (event) => {
        // Kiểm tra xem có click ra ngoài sidebar không và sidebar đang hiển thị
        if (!event.target.closest('.left-content') && showMenu && window.innerWidth <= 1000) {
            setShowMenu(false);
            setShowOverlay(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleOutsideClick);
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, [showMenu]);

    const handleTouchStart = (event) => {
        const startX = event.touches[0].clientX;

        const handleTouchMove = (event) => {
            const currentX = event.touches[0].clientX;
            const diffX = startX - currentX;

            if (diffX > 100) {
                setShowMenu(false);
                setShowOverlay(false);
            }
        };

        const handleTouchEnd = () => {
            document.removeEventListener('touchmove', handleTouchMove);
            document.removeEventListener('touchend', handleTouchEnd);
        };

        document.addEventListener('touchmove', handleTouchMove);
        document.addEventListener('touchend', handleTouchEnd);
    };

    useEffect(() => {
        document.addEventListener('touchstart', handleTouchStart);
        return () => {
            document.removeEventListener('touchstart', handleTouchStart);
        };
    }, []);

    useEffect(() => {
        const handleResize = () => {
            setShowMenu(window.innerWidth > 1000);
            setShowOverlay(false); // Ẩn lớp phủ khi resize màn hình
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <Col>
            {!showMenu && (
                <div className="hamburger-button" onClick={handleHamburgerButtonClick}>
                    <img src={DeleteIcon} alt="Menu" style={{ width: '100%', height: '100%', borderRadius: '5px' }} />
                </div>
            )}
            {showOverlay && <div className="overlay" onClick={handleHamburgerButtonClick}></div>}
            <div className={`left-content ${showMenu ? 'show' : ''}`}>
                <ul className="sitemap">
                    <li className="item-link" onClick={handleHamburgerButtonClick}>
                        <NavLink to="/home">Trang chủ</NavLink>
                    </li>
                    <li className="item-link" onClick={handleHamburgerButtonClick}>
                        <NavLink to="/timetable">Thời khóa biểu</NavLink>
                    </li>
                    <li className="item-link" onClick={handleHamburgerButtonClick}>
                        <NavLink to="/registration">Đăng kí học tập</NavLink>
                    </li>
                    <li className="item-link" onClick={handleHamburgerButtonClick}>
                        <NavLink to="/courseGrade">Kết quả học tập</NavLink>
                    </li>
                    <li className="item-link" onClick={handleHamburgerButtonClick}>
                        <NavLink to="/feePayment">Công nợ học phí</NavLink>
                    </li>
                    <li className="item-link" onClick={handleHamburgerButtonClick}>
                        <Button variant="primary" onClick={handleLogout} className="logout-button">Đăng xuất</Button>
                    </li>
                </ul>
            </div>
        </Col>
    );
};

export default Sidebar;
