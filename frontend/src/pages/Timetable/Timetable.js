import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Table } from 'react-bootstrap';
import axios from 'axios';
import { Sidebar } from '../../components/Layouts/Sidebar/Sidebar';
import { NavLink, useNavigate } from 'react-router-dom';
import '../CSSglobal.css';
import './Timetable.css';

export const Timetable = () => {
    const [timetable, setTimetable] = useState([]);

    useEffect(() => {
        const fetchTimetable = async () => {
            try {
                const email = localStorage.getItem('email');
                if (email) {
                    const response = await axios.post('/student/timetable', { email });
                    setTimetable(response.data.TimetableInfo);
                }        
            } catch (error) {
                console.error('Error fetching timetable:', error.message);
            }
        };

        fetchTimetable();
    }, []);


    return (
        <div className="outer-container">
            <Container fluid className="gray-background"> 
                <Row>
                    <Sidebar></Sidebar>
                    <Container fluid className="main-background">
                    <Col md={9} className='right-content'>
                        <h2>THỜI KHÓA BIỂU HỌC KỲ 20212</h2>
                        <div className="table-container">
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th style={{ textAlign: 'center' }}>Thứ</th>
                                        <th style={{ textAlign: 'center' }}>Mã lớp</th>
                                        <th style={{ textAlign: 'center' }}>Môn học</th>
                                        <th style={{ textAlign: 'center' }}>Thời gian</th>
                                        <th style={{ textAlign: 'center' }}>Phòng học</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {timetable.map(item => (
                                        <tr key={`${item.class_id}-${item.weekday}-${item.subject_name}-${item.time}-${item.location} `}>
                                            <td style={{ textAlign: 'center' }}>{item.weekday}</td>
                                            <td style={{ textAlign: 'center' }}>{item.class_id}</td>
                                            <td>{item.subject_name}</td>
                                            <td style={{ textAlign: 'center' }}>{item.time}</td>
                                            <td style={{ textAlign: 'center' }}>{item.location}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </div>
                    </Col>
                    </Container>
                </Row>
            </Container>
        </div>
    );
}

export default Timetable;