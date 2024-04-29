import React, { useState, useEffect } from 'react'; 
import { Container, Row, Col } from 'react-bootstrap';
import Sidebar from '../Sidebar/Sidebar'; 
import { NavLink, useNavigate } from 'react-router-dom';

export const Registration = () => {
    const handleLogout = () => {
        // Xử lý đăng xuất
    };

    return (
        <div className="homepage-background px-1">
            <Container fluid>
                <Row className="content">
                    <Sidebar/> 
                    <Col md={9} className="right-content">
                        
                    </Col>
                </Row>
            </Container>
        </div>
    );
}
