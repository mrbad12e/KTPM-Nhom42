import React, { useState } from 'react';
import { Table, Container, Row, Col, Button } from 'react-bootstrap';
import Sidebar_student from '../../components/Layouts/Sidebar/sidebarStudent'; 
import './CourseGrade.module.css';

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
