import React, { useState } from 'react';
import { Table, Container, Row, Col, Button } from 'react-bootstrap';
import Sidebar_student from '../../components/Layouts/Sidebar/sidebarStudent'; 
import styles from './feePayment.module.css';
import globalstyles from '../../CSSglobal.module.css';

export const FeePayment = () => {


    return (
        <div >
            <Sidebar_student/>
            <Container fluid className={globalstyles['main-background']}>
            </Container>
        </div>
    );
};

export default FeePayment;
