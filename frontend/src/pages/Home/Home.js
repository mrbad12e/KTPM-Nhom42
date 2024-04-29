import {React,  useState, useEffect } from 'react'; 
import { Container, Row, Col } from 'react-bootstrap';
import Sidebar from '../Sidebar/Sidebar'; 
import './Home.css';

export const Home = () => {
    

    return (
        <div>
            <Container fluid className="gray-background"> 
                <Row>
                    <Sidebar />
                    <Container fluid className="main-background">
  
                    </Container>
                </Row>
            </Container>
        </div>
    );
}


