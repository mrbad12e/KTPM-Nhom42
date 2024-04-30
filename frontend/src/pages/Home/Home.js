import React, { useState, useEffect } from 'react'; 
import { Container, Row, Col } from 'react-bootstrap';
import { Sidebar } from '../../components/Layouts/Sidebar/Sidebar';


export const Home = () => {
    

    return (
        <div className="homepage-background px-1">
            <Sidebar></Sidebar>
            <Container fluid>
                <Row className="content">
                    
                    <Col md={9} className="right-content">
                        
                    </Col>
                </Row>
            </Container>
        </div>
    );
};
