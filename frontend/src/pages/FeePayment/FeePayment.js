import React, { useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Sidebar from '../../components/Layouts/Sidebar/Sidebar'; 
import '../CSSglobal.css';
import './FeePayment.css';

export const FeePayment = () => {
    
    return (
        <div className="gray-background">
            <Row className="content">
                <Sidebar />
                <Container fluid className="main-background">
                    
                </Container>
            </Row>
        </div>
    );
};
