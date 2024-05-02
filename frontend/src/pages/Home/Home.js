import React, { useState, useEffect } from 'react'; 
import { Container , Row, Col } from 'react-bootstrap'; 
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Sidebar from '../../components/Layouts/Sidebar/Sidebar'; 
import avatar from '../../../assets/img/avatar.jpg';
import '../CSSglobal.css';
import './Home.css';

export const Home = () => {
    const [studentInfo, setStudentInfo] = 
                            useState({ id: '', programName: '', name: '', phone: '', birthday: '', gender: '', address: '' });
    
    useEffect(() => {
        const fetchStudentInfo = async () => {
            try {
                const email = localStorage.getItem('email');    // lấy email từ local 
                if (email) {
                    const response = await axios.post('/student/profile', {email});
                    const userInfo = response.data.userInfo;
                    setStudentInfo(userInfo);
                    console.log('Student info:', userInfo);
                }
            } catch (error) {
                console.error('Failed to fetch student info:', error);
            }
        };
        fetchStudentInfo();
    }, []);

    const renderInfoStudent = () => {
        return (
            <div>
                <Row>
                    <Col>{/*Ảnh */}
                            <img src={avatar} alt="anh" 
                                style={{ position: 'fixed', right: '45vw', top: '31vh',width: '15.5vw', border: '2px solid black'  }} 
                            className="image_student" />
                    </Col>       
                    <Col>{/*Thông tin */}
                        <div className='info_student'>
                            <p style={{ fontSize: '1vw', marginBottom: '2vh'  }}><strong>MSSV:</strong>  {studentInfo.id}</p>
                            <p style={{ fontSize: '1vw', marginBottom: '2vh'  }}><strong>Chuyên ngành:</strong> {studentInfo.programName}</p>
                            <p style={{ fontSize: '1vw', marginBottom: '2vh'  }}><strong>Họ và tên:</strong> {studentInfo.name}</p>
                            <p style={{ fontSize: '1vw', marginBottom: '2vh'  }}><strong>Số điện thoại:</strong> {studentInfo.phone}</p>
                            <p style={{ fontSize: '1vw', marginBottom: '2vh'  }}><strong>Ngày sinh:</strong> {studentInfo.birthday}</p>
                            <p style={{ fontSize: '1vw', marginBottom: '2vh'  }}><strong>Giới tính:</strong> {studentInfo.gender}</p>
                            <p style={{ fontSize: '1vw', marginBottom: '2vh'  }}><strong>Địa chỉ:</strong> {studentInfo.address}</p>
                        </div>
                    </Col>
                </Row>
            </div>       
        );
    };

    return (
        <div className="gray-background">
            <Sidebar />
            <Container fluid className="main-background">
                <Col className="right-content">
                    <div style={{ textAlign: 'center', fontSize: '2vw', marginBottom: '10vh', fontWeight: 'bold' }}>
                        THÔNG TIN SINH VIÊN
                    </div>
                    {renderInfoStudent()}
                </Col>
            </Container>
        </div>
    );
};
