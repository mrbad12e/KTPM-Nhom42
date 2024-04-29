import React, { useState, useEffect } from 'react'; 
import { Container, Row, Col } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Sidebar from '../Sidebar/Sidebar'; 
import avatar from '../../../assets/img/avatar.jpg';

export const Home = () => {
    

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
};
