import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Form, InputGroup, Alert,Modal } from 'react-bootstrap';
import Sidebar_admin from '../../components/Layouts/Sidebar_admin/Sidebar_admin';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
import globalstyles from '../../CSSglobal.module.css';
import avatar from '../../../assets/img/avatar.jpg';

export const UpdateStudent = () => {
    const location = useLocation();
    const [student, setStudent] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        // Lấy thông tin sinh viên từ location state
        if (location.state && location.state.student) {
            setStudent(location.state.student);
        } else {
            // Nếu không có dữ liệu sinh viên, có thể thực hiện gọi API để lấy dữ liệu từ server
            fetchStudentData();
        }
    }, [location]);

    // Hàm gọi API để lấy thông tin sinh viên
    const fetchStudentData = async () => {
        try {
            const response = await axios.get(`/admin/student?id=${location.pathname.split('/').pop()}`);
            setStudent(response.data.students[0]);
        } catch (error) {
            console.error('Error fetching student detail:', error);
        }
    };

    const handleCloseModal = () => setShowModal(false);
    const handleShowModal = () => setShowModal(true);

    // Render form cập nhật thông tin sinh viên
    const renderUpdateForm = () => {
        return (
            <div style={{ marginTop: '20px' }}>
                <div className='main_content'  >
                    <Row>
                        <Col className="d-flex justify-content-center align-items-center" >
                            <img src={avatar} alt="anh" className="anh-the" style={{ width: '100%', maxWidth: '270px', height: 'auto' }} />
                        </Col>
                        <Col >
                            <p><strong>MSSV:</strong> {student.id}</p>
                            <p><strong>Họ và tên:</strong> {`${student.first_name} ${student.last_name}`}</p>
                            <p><strong>CTDT:</strong> {student.program_id}</p>
                            <p><strong>Email:</strong> {student.email}</p>
                            <p><strong>Trạng thái:</strong> {student.status ? 'Đang học' : 'Ra trường'}</p>
                            <p><strong>Số điện thoại:</strong> {student.phone}</p>
                            <p><strong>Ngày sinh:</strong> {student.birthday.substring(0, 10)}</p>
                            <p><strong>Giới tính:</strong> {student.gender === 'M' ? 'Nam' : 'Nữ'}</p>
                            <p><strong>Địa chỉ:</strong> {student.address}</p>
                            <p><strong>Ngày nhập học:</strong> {student.join_date.substring(0, 10)}</p>
                        </Col>

                        
                    </Row>
                    <Row className='mt-3'>
                        <Col style={{ textAlign: 'center' }}>
                            <Button variant="primary" type="submit" onClick={handleShowModal}>Cập nhật</Button>
                        </Col>
                    </Row>
                </div>



                {/* <Row className='mb-4'>
                    <Col>
                        <Form.Group as={Row} className="align-items-center">
                            <Form.Label column sm="auto">MSSV:</Form.Label>
                            <Col sm="auto">
                                <Form.Control  style={{ width: '100px' }} type="text" placeholder="Mã số sinh viên" value={student.id} readOnly />
                            </Col>
                        </Form.Group>
                    </Col>

                    <Col>
                        <Form.Group as={Row} className="align-items-center">
                            <Form.Label column sm="auto">Họ và tên:</Form.Label>
                            <Col sm="auto">
                                <Form.Control style={{ width: '150px' }} type="text" placeholder="Họ và tên" value={`${student.first_name} ${student.last_name}`} readOnly />
                            </Col>
                        </Form.Group>
                    </Col>

                    <Col>
                        <Form.Group as={Row} className="align-items-center">
                            <Form.Label column sm="auto">CTDT:</Form.Label>
                            <Col sm="auto">
                                <Form.Control style={{ width: '80px' }} type="text" placeholder="Họ và tên" value={student.program_id} readOnly />
                            </Col>
                        </Form.Group>
                    </Col>

                    <Col>
                        <Form.Group as={Row} className="align-items-center">
                            <Form.Label column sm="auto">Giới tính:</Form.Label>
                            <Col sm="auto">
                                <Form.Control style={{ width: '40px' }} type="text" placeholder="Giới tính" value={student.gender} readOnly />
                            </Col>
                        </Form.Group>
                    </Col>
                </Row>   

                <Row className='mb-4'>
                    <Col>
                        <Form.Group as={Row} className="align-items-center">
                            <Form.Label column sm="auto">Email:</Form.Label>
                            <Col sm="auto">
                                <Form.Control  style={{ width: '400px' }} type="text" placeholder="Email" value={student.email} readOnly />
                            </Col>
                        </Form.Group>
                    </Col>

                    <Col>
                        <Form.Group as={Row} className="align-items-center">
                            <Form.Label column sm="auto">Địa chỉ:</Form.Label>
                            <Col sm="auto">
                                <Form.Control style={{ width: '400px' }} type="text" placeholder="Địa chỉ" value={student.address} readOnly />
                            </Col>
                        </Form.Group>
                    </Col>

                    
                </Row>    

                <Row className='mb-4'>
                    <Col>
                        <Form.Group as={Row} className="align-items-center">
                            <Form.Label column sm="auto">Ngày sinh:</Form.Label>
                            <Col sm="auto">
                                <Form.Control style={{ width: '250px' }} type="text" placeholder="Ngày sinh" value={student.birthday} readOnly />
                            </Col>
                        </Form.Group>
                    </Col>

                    <Col>
                        <Form.Group as={Row} className="align-items-center">
                            <Form.Label column sm="auto">Số điện thoại:</Form.Label>
                            <Col sm="auto">
                                <Form.Control style={{ width: '230px' }} type="text" placeholder="Số điện thoại" value={student.phone} readOnly />
                            </Col>
                        </Form.Group>
                    </Col>

                    <Col>
                        <Form.Group as={Row} className="align-items-center">
                            <Form.Label column sm="auto">Trạng thái:</Form.Label>
                            <Col sm="auto">
                                <Form.Control style={{ width: '200px' }} type="text" placeholder="Trạng thái" value={student.status ? 'Đang học' : 'Ra trường'} readOnly />
                            </Col>
                        </Form.Group>
                    </Col>
                </Row> 

                <Row>
                    <Col style={{ textAlign: 'right', marginRight: '10px' }}>
                        <Button variant="primary" type="submit">Cập nhật</Button>
                    </Col>
                </Row> */}
                
  



            </div>
        );
    };

    return (
        <div>
            <Sidebar_admin />
            <Container fluid className={globalstyles['main-background']}>
                <Row className='mb-4'>
                    <Col className="text-center mb-3">
                        <div className={globalstyles['title']} style={{ fontSize: '35px' }}>Chi tiết thông tin sinh viên</div>
                    </Col>
                </Row>
            
                {student ? renderUpdateForm() : <Alert variant="danger">Không tìm thấy thông tin sinh viên!</Alert>}

                
            </Container>

            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Chỉnh sửa thông tin</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='modal-user-body'>
                        <div className='input-container'>
                            <label>So dien thoai</label>
                            <input type='text' ></input>
                        </div>
                        <div className='input-container'>
                            <label>Dia chi</label>
                            <input type='text' ></input>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    
                    <Button variant="primary" onClick={handleCloseModal}>
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
