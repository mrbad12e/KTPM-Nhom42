import React, { useState, useEffect } from 'react'; 
import { Container, Row, Col } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Sidebar from '../Sidebar/Sidebar'; 
import avatar from '../../../assets/img/avatar.jpg';
import './Profile.css';

export const Profile = () => {
    const navigate = useNavigate();
    const [studentInfo, setStudentInfo] = 
                            useState({ id: '', programName: '', name: '', phone: '', birthday: '', gender: '', address: '' });

    useEffect(() => {
        const fetchStudentInfo = async () => {
            try {
                const email = localStorage.getItem('email');
                if (email) {
                    const response = await axios.post('http://localhost:5000/student', { email });
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
            <div className='main_content'>
                <div className='info_student'>
                    <p><strong>MSSV:</strong>  {studentInfo.id}</p>
                    <p><strong>Chuyên ngành:</strong> {studentInfo.programName}</p>
                    <p><strong>Họ và tên:</strong> {studentInfo.name}</p>
                    <p><strong>Số điện thoại:</strong> {studentInfo.phone}</p>
                    <p><strong>Ngày sinh:</strong> {studentInfo.birthday}</p>
                    <p><strong>Giới tính:</strong> {studentInfo.gender}</p>
                    <p><strong>Địa chỉ:</strong> {studentInfo.address}</p>
                </div>
            </div>
        );
    };

    return (
        <div className="profile-background">
            <Container fluid className="gray-background">
                <Row className="content">
                    <Sidebar />
                    <Container fluid className="profile-bounder">
                        <Col md={9} className="right-content">
                            <h2>THÔNG TIN SINH VIÊN</h2>
                            {renderInfoStudent()}
                        </Col>
                    </Container>
                </Row>
            </Container>
        </div>
    );
};

<Container fluid className="container-background"></Container>