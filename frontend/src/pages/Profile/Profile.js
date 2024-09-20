import React, { useState, useEffect } from 'react'; 
import { Container , Row, Col ,Modal ,Button,Form } from 'react-bootstrap'; 
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Sidebar } from '../../components/Layouts/Sidebar/Sidebar';
 
import avatar from '../../../assets/img/avatar.jpg';
import '../CSSglobal.css';
import './Profile.css';
import Cookies from 'js-cookie';


export const Profile = () => {
    const [studentInfo, setStudentInfo] = useState({ id: '', programName: '', name: '', phone: '', birthday: '', gender: '', address: '' });
    const [showModal, setShowModal] = useState(false);
    const [updatedInfo, setUpdatedInfo] = useState({ birthday: '', phone: '', address: '' });

    
    useEffect(() => {
        const fetchStudentInfo = async () => {
            try {
                const email = localStorage.getItem('email');
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
    
    const handleCloseModal = () => setShowModal(false);
    const handleShowModal = () => {
        setUpdatedInfo({
            birthday: studentInfo.birthday,
            phone: studentInfo.phone,
            address: studentInfo.address,
        });
        setShowModal(true);
    }
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedInfo({ ...updatedInfo, [name]: value });
    };
    const handleSaveChanges = async () => {
        try {
            const response = await axios.patch(`/student/?id=${studentInfo.id}`, updatedInfo, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.status === 200) {
                setStudentInfo((prevState) => ({ ...prevState, ...updatedInfo }));
                handleCloseModal();
                console.log('Student info updated:', response.data);
            } else {
                console.error('Failed to update lecturer info:', response);
            }
        } catch (error) {
            console.error('Failed to update lecturer info:', error);
        }
    };

    const renderInfoStudent = () => {
        return (
            <div className='main_content'>
                <div className='image_student ml-auto'>
                    <img src={avatar} alt="anh" className="anh-the"/>
                </div>
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
    
        <div className="gray-background">
            <Row className="content">
                <Sidebar></Sidebar>
                <Container fluid className="main-background">
                    <Col md={9} className="right-content">
                        <h2>THÔNG TIN SINH VIÊN</h2>
                        {renderInfoStudent()}
                        <Row>
                            <Button style={{ border: 'none', margin: '30px 0'  }} onClick={handleShowModal}>Update</Button>
                        </Row>
                    </Col>
                    
                </Container>
            </Row>


            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Information</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form>
                        <Form.Group as={Row} className="align-items-center mb-3">
                            <Form.Label column sm="4">Ngày sinh:</Form.Label>
                            <Col sm="8">
                                <Form.Control
                                    type="text"
                                    name="birthday"
                                    value={updatedInfo.birthday}
                                    onChange={handleInputChange}
                                />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="align-items-center mb-3">
                            <Form.Label column sm="4">Số điện thoại:</Form.Label>
                            <Col sm="8">
                                <Form.Control
                                    type="text"
                                    name="phone"
                                    value={updatedInfo.phone}
                                    onChange={handleInputChange}
                                />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="align-items-center mb-3">
                            <Form.Label column sm="4">Địa chỉ:</Form.Label>
                            <Col sm="8">
                                <Form.Control
                                    type="text"
                                    name="address"
                                    value={updatedInfo.address}
                                    onChange={handleInputChange}
                                    
                                />
                            </Col>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    
                    <Button variant="primary" onClick={handleSaveChanges}>
                        Save Changes
                    </Button>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};
