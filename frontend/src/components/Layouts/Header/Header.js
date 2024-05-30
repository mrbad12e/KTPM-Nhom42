import React from 'react';
import { Navbar } from 'react-bootstrap'; 
import styles from './Header.module.css';

export const Header = () => {
 
    return (
        <Navbar className={styles['header-background']}>
            <h1 className={styles["header-title"]}>ĐẠI HỌC BÁCH KHOA HÀ NỘI</h1>
        </Navbar>
    );
};
