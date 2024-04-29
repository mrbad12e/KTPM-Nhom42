import React, { useState, useEffect } from 'react'; 
import { Container, Row, Col ,Table } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Sidebar from '../Sidebar/Sidebar';
import './Timetable.css'
import '../CSSglobal.css';

export const Timetable = () => {
    

    return (
        <div className='gray-background'>
            <Row>
                <Sidebar />
                <Container fluid className="main-background">
                <Row className='content'>
                <Col md={3} className='left-content'>
                    <Sidebar></Sidebar>
                </Col>
                <Col md={9} className='right-content'>
                    <h2>
                        THỜI KHÓA BIỂU HỌC KỲ 20212
                    </h2>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                            <th>Thứ</th>
                            <th>Mã lớp</th>
                            <th>Mã học phần</th>
                            <th>Tên lớp</th>
                            <th>Thời gian</th>
                            <th>Phòng học</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>2</td>
                                <td>12345</td>
                                <td>IT123</td>
                                <td>Co so du lieu</td>
                                <td>7:30-11:30</td>
                                <td>D5-304</td>

                            </tr>
                            <tr>
                                <td>3</td>
                                <td>54321</td>
                                <td>IT321</td>
                                <td>Kien truc may tinh</td>
                                <td>14:00-17:30</td>
                                <td>D9-401</td>
                            </tr>
                            
                        </tbody>
                    </Table>
                </Col>
            </Row>
                </Container>
            </Row>
        </div>
    );
};
