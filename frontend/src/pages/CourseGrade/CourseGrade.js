import React, { useState } from 'react';
import { Table, Container, Row, Col, Button } from 'react-bootstrap';
import Sidebar_student from '../../components/Layouts/Sidebar/sidebarStudent'; 
import styles from './CourseGrade.module.css';
import globalstyles from '../../CSSglobal.module.css';

export const CourseGrade = () => {


    return (
        <div >
            <Sidebar_student/>
            <Container fluid className={globalstyles['main-background']}>
            </Container>
        </div>
    );
};

export default CourseGrade;
