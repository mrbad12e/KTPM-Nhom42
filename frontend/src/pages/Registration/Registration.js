import React, { useState, useEffect } from 'react'; 
import { Container, Row, Col } from 'react-bootstrap';


export const Registration = () => {


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
