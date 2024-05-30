import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Form, Alert, Modal, Dropdown } from 'react-bootstrap';
import Sidebar_admin from '../../components/Layouts/Sidebar/sidebarAdmin';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import globalstyles from '../../CSSglobal.module.css';
import styles from './student.module.css';
import avatar from '../../../assets/img/avatar.jpg';

export const UpdateStudent = () => {
    const location = useLocation();
    const [student, setStudent] = useState(null);
    const [studentUpdate, setStudentUpdate] = useState({}); 
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
            fetchStudentData();
    }, [location]);

    const fetchStudentData = async () => {
        try {
            const response = await axios.get(`/admin/student?id=${location.pathname.split('/').pop()}`);
            const studentData = response.data.students[0];
        
            if (studentData) {
                const student = {
                    id: studentData.id,
                    first_name: studentData.first_name,
                    last_name: studentData.last_name,
                    program_id: studentData.program_id,
                    email: studentData.email,
                    status: studentData.status,
                    phone: studentData.phone,
                    birthday: studentData.birthday,
                    gender: studentData.gender,
                    address: studentData.address,
                    join_date: studentData.join_date
                };
                
                setStudent(student);
                setStudentUpdate(student);
            }
        } catch (error) {
            console.error('Error fetching student detail:', error);
        }
    };

    const handleCloseModal = () => setShowModal(false);
    const handleShowModal = () => setShowModal(true);

    const handleSaveChanges = async () => {
        try {
            await axios.patch(`/admin/student`, studentUpdate);
            setStudent(studentUpdate);
            handleCloseModal();
        } catch (error) {
            console.error('Error updating student detail:', error.response ? error.response.data : error.message);
            alert(`Error: ${error.response ? error.response.data.error : error.message}`);
        }
    };

    const renderUpdateForm = () => {
        return (
            <div className={styles.flexRow}>
                <img src={avatar} alt="anh" className={styles.imageStudent}/>
                <div style={{lineHeight: '1.0'}}>
                    <p><strong>MSSV:</strong> {student.id}</p>
                    <p><strong>Họ và tên:</strong> {`${student.first_name} ${student.last_name}`}</p>
                    <p><strong>CTDT:</strong> {student.program_id}</p>
                    <p><strong>Email:</strong> {student.email}</p>
                    <p><strong>Trạng thái:</strong> {student.status ? 'Đang học' : 'Ra trường'}</p>
                    <p><strong>Số điện thoại:</strong> {student.phone}</p>
                    <p><strong>Ngày sinh:</strong> {student.birthday.substring(0, 10)}</p>
                    <p><strong>Giới tính:</strong> {student.gender === 'M' ? 'Nam' : 'Nữ'}</p>
                    <p><strong>Địa chỉ:</strong> {student.address}</p>
                    <div><strong>Ngày nhập học:</strong> {student.join_date.substring(0, 10)}</div>
                </div>
            </div>
        );
    };

    const convertDateToInputFormat = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    return (
        <div>
            <Sidebar_admin />
            <Container fluid className={globalstyles['main-background']}>
            <div className={globalstyles.title}>Chi tiết thông tin sinh viên</div>
                {student ? renderUpdateForm() : <Alert variant="danger">Không tìm thấy thông tin sinh viên!</Alert>}
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px'}}>
                    <Button onClick={handleShowModal}>Cập nhật</Button>
                </div>     
            </Container>
            
            <Modal show={showModal} onHide={handleCloseModal} centered className="modal-lg">
                <Modal.Header closeButton className="w-100">
                    <Modal.Title>Chỉnh sửa thông tin</Modal.Title>
                </Modal.Header>
                <Modal.Body className="d-flex flex-wrap w-100 p-3 justify-content-around">
                    <Form className="w-50">
                        <Form.Group as={Row} className="align-items-center mb-3">
                            <Form.Label column sm="4">MSSV:</Form.Label>
                            <Col sm="8">
                                <Form.Control type="text" value={studentUpdate.id} readOnly />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="align-items-center mb-3">
                            <Form.Label column sm="4">Họ:</Form.Label>
                            <Col sm="8">
                                <Form.Control 
                                    placeholder="First name"
                                    value={studentUpdate.first_name} 
                                    onChange={(event) => setStudentUpdate({ ...studentUpdate, first_name: event.target.value })} 
                                    type='text'
                                />
                            </Col>
                        </Form.Group>   
                        <Form.Group as={Row} className="align-items-center mb-3">
                            <Form.Label column sm="4">Giới tính:</Form.Label>
                            <Col sm="8">
                                <Dropdown onSelect={(eventKey) => setStudentUpdate({ ...studentUpdate, gender: eventKey })} style={{ width: '100%' }}>
                                    <Dropdown.Toggle variant="light" id="dropdown-basic" className={styles.selectGender}>
                                    {studentUpdate.gender === 'M' ? 'Nam' : 'Nữ'}
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu style={{ width: '100%' }}>
                                        <Dropdown.Item eventKey="M">Nam</Dropdown.Item>
                                        <Dropdown.Item eventKey="F">Nữ</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="align-items-center mb-3">
                            <Form.Label column sm="4">Địa chỉ:</Form.Label>
                            <Col sm="8">
                                <Form.Control
                                    placeholder="Address"
                                    value={studentUpdate.address}
                                    onChange={(event) => setStudentUpdate({ ...studentUpdate, address: event.target.value })}
                                    type="text"
                                />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="align-items-center mb-3">
                            <Form.Label column sm="4">Ngày nhập học:</Form.Label>
                            <Col sm="8">
                            <Form.Control
                                placeholder="DD/MM/YY"
                                type="date"
                                value={convertDateToInputFormat(studentUpdate.join_date)}
                                onChange={(event) => setStudentUpdate({ ...studentUpdate, join_date: event.target.value })}
                            />
                            </Col>
                        </Form.Group>
                    </Form>
                    <Form className="w-49">
                        <Form.Group as={Row} className="align-items-center mb-3">
                            <Form.Label column sm="4">CTDT:</Form.Label>
                            <Col sm="8">
                                <Form.Control type="text" value={studentUpdate.program_id} readOnly />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="align-items-center mb-3">
                            <Form.Label column sm="4">Tên:</Form.Label>
                            <Col sm="8">
                                <Form.Control
                                    placeholder="Last name"
                                    value={studentUpdate.last_name}
                                    onChange={(event) => setStudentUpdate({ ...studentUpdate, last_name: event.target.value })}
                                    type="text"
                                />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="align-items-center mb-3">
                            <Form.Label column sm="4">Ngày sinh:</Form.Label>
                            <Col sm="8">
                                <Form.Control
                                    placeholder="DD/MM/YY"
                                    type="date"
                                    value={convertDateToInputFormat(studentUpdate.birthday)}
                                    onChange={(event) => setStudentUpdate({ ...studentUpdate, birthday: event.target.value })}
                                />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="align-items-center mb-3">
                            <Form.Label column sm="4">Số điện thoại:</Form.Label>
                            <Col sm="8">
                                <Form.Control
                                    placeholder="Phone number"
                                    value={studentUpdate.phone}
                                    onChange={(event) => setStudentUpdate({ ...studentUpdate, phone: event.target.value })}
                                    type="text"
                                />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="align-items-center mb-3">
                            <Form.Label column sm="4">Trạng thái:</Form.Label>
                            <Col sm="8">
                                <Dropdown onSelect={(eventKey) => setStudentUpdate({ ...studentUpdate, status: eventKey })} style={{ width: '100%' }}>
                                    <Dropdown.Toggle variant="light" id="dropdown-basic" className={styles.selectGender}>
                                    {studentUpdate.status === 'true' ? 'Đang học' : 'Ra trường'}
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu style={{ width: '100%' }}>
                                        <Dropdown.Item eventKey="true">Ra trường</Dropdown.Item>
                                        <Dropdown.Item eventKey="false">Đang học</Dropdown.Item>   
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Col>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleSaveChanges}>Lưu thay đổi</Button>
                    <Button variant="danger" onClick={handleCloseModal}>Đóng</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};