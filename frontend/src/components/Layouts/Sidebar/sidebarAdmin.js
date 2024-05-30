import React, { useState, useEffect } from 'react';
import { Col, Button } from 'react-bootstrap';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import MenuIcon from '../../../../assets/img/Menu.jpg';
import styles from './Sidebar.module.css';

const Sidebar_admin = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [showMenu, setShowMenu] = useState(window.innerWidth > 1000); 
    const [showOverlay, setShowOverlay] = useState(false); 

    const handleLogout = async () => {
        try {
            await axios.get('/admin/logout');
            console.log('Logged out successfully');
            localStorage.clear();
            navigate('/');
        } catch (error) {
            console.log(error);
        }
    };

    const handleHamburgerButtonClick = () => {
        const shouldShow = !showMenu && window.innerWidth <= 1000;
        setShowMenu(shouldShow);
        setShowOverlay(shouldShow); 
    };

    const handleOutsideClick = (event) => {
        if (!event.target.closest(`.${styles['left-content']}`) && showMenu && window.innerWidth <= 1000) {
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

    useEffect(() => {
        const handleResize = () => {
            setShowMenu(window.innerWidth > 1000);
            setShowOverlay(false); 
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <Col>
            {!showMenu && (
                <div className={styles['hamburger-button']} onClick={handleHamburgerButtonClick}>
                    <img src={MenuIcon} alt="Menu" style={{ width: '100%', height: '100%', borderRadius: '5px' }} />
                </div>
            )}
            {showOverlay && <div className={styles['overlay']} onClick={handleHamburgerButtonClick}></div>}
            <div className={`${styles['left-content']} ${showMenu ? styles['show'] : ''}`}>
                <ul className={styles['sitemap']} onClick={window.innerWidth <= 1000 ? handleHamburgerButtonClick : null}>
                    <li><NavLink to="/faculty" className={['/faculty', '/program'].some(path => location.pathname.includes(path)) ? styles.active : ''}>Khoa</NavLink></li>
                    <hr className={styles.separator} />
                    <li><NavLink to="/subject" className={location.pathname === '/subject' ? styles.active : ''}>Học phần</NavLink></li>
                    <hr className={styles.separator} />
                    <li><NavLink to="/class" className={['/class', '/addClass', '/updateClass'].some(path => location.pathname.includes(path)) ? styles.active : ''}>Lớp</NavLink></li>
                    <hr className={styles.separator} />
                    <li><NavLink to="/lecturer" className={['/lecturer', '/addLecturer', '/updateLecturer'].some(path => location.pathname.includes(path)) ? styles.active : ''}>Giảng viên</NavLink></li>
                    <hr className={styles.separator} />
                    <li>
                    <NavLink to="/student" className={['/student', '/addStudent', '/updateStudent'].some(path => location.pathname.includes(path)) ? styles.active : ''}>
                        Sinh viên
                    </NavLink>
                    </li>
                    <hr className={styles.separator} />
                    <li><Button variant="primary" onClick={handleLogout} className={styles['logout-button']}>Đăng xuất</Button></li>
                </ul>
            </div>
        </Col>
    );
};

export default Sidebar_admin;
