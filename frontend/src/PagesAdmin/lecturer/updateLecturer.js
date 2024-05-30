import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Form, Alert, Modal, Dropdown } from 'react-bootstrap';
import Sidebar_admin from '../../components/Layouts/Sidebar/sidebarAdmin';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import globalstyles from '../../CSSglobal.module.css';
import styles from './lecturer.module.css';
import avatar from '../../../assets/img/avatar.jpg';

export const UpdateLecturer = () => {
    const location = useLocation();
    const [lecturer, setLecturer] = useState(null);
    const [lecturerUpdate, setLecturerUpdate] = useState({}); 
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        fetchLecturerData();
    }, [location]);

    const fetchLecturerData = async () => {
        try {
            const response = await axios.get(`/admin/lecturer?id=${location.pathname.split('/').pop()}`);
            const lecturerData = response.data.lecturers[0];
        
            if (lecturerData) {
                const lecturer = {
                    id: lecturerData.id,
                    first_name: lecturerData.first_name,
                    last_name: lecturerData.last_name,
                    faculty_id: lecturerData.faculty_id,
                    email: lecturerData.email,
                    status: lecturerData.status,
                    phone: lecturerData.phone,
                    birthday: lecturerData.birthday,
                    gender: lecturerData.gender,
                    address: lecturerData.address,
                    join_date: lecturerData.join_date
                };
                
                setLecturer(lecturer);
                setLecturerUpdate(lecturer);
            }
        } catch (error) {
            console.error('Error fetching lecturer detail:', error);
        }
    };

    const handleCloseModal = () => setShowModal(false);
    const handleShowModal = () => setShowModal(true);

    const handleSaveChanges = async () => {
        try {
            await axios.patch(`/admin/lecturer`, lecturerUpdate);
            setLecturer(lecturerUpdate);
            handleCloseModal();
        } catch (error) {
            console.error('Error updating lecturer detail:', error.response ? error.response.data : error.message);
            alert(`Error: ${error.response ? error.response.data.error : error.message}`);
        }
    };

    const renderUpdateForm = () => {
        return (
            <div className={styles.flexRow}>
                <img src={avatar} alt="anh" className={styles.imagelecturer}/>
                <div style={{lineHeight: '1.0'}}>
                    <p><strong>Mã GV:</strong> {lecturer.id}</p>
                    <p><strong>Họ và tên:</strong> {`${lecturer.first_name} ${lecturer.last_name}`}</p>
                    <p><strong>Khoa:</strong> {lecturer.faculty_id}</p>
                    <p><strong>Email:</strong> {lecturer.email}</p>
                    <p><strong>Trạng thái:</strong> {lecturer.status ? 'Đang công tác' : 'Hết công tác'}</p>
                    <p><strong>Số điện thoại:</strong> {lecturer.phone}</p>
                    <p><strong>Ngày sinh:</strong> {lecturer.birthday.substring(0, 10)}</p>
                    <p><strong>Giới tính:</strong> {lecturer.gender === 'M' ? 'Nam' : 'Nữ'}</p>
                    <p><strong>Địa chỉ:</strong> {lecturer.address}</p>
                    <div><strong>Ngày làm chính thức:</strong> {lecturer.join_date.substring(0, 10)}</div>
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
            <div className={globalstyles.title}>Chi tiết thông tin giảng viên</div>
                {lecturer ? renderUpdateForm() : <Alert variant="danger">Không tìm thấy thông tin giảng viên!</Alert>}
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
                            <Form.Label column sm="4">Mã GV:</Form.Label>
                            <Col sm="8">
                                <Form.Control type="text" value={lecturerUpdate.id} readOnly />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="align-items-center mb-3">
                            <Form.Label column sm="4">Họ:</Form.Label>
                            <Col sm="8">
                                <Form.Control 
                                    placeholder="First name"
                                    value={lecturerUpdate.first_name} 
                                    onChange={(event) => setLecturerUpdate({ ...lecturerUpdate, first_name: event.target.value })} 
                                    type='text'
                                />
                            </Col>
                        </Form.Group>   
                        <Form.Group as={Row} className="align-items-center mb-3">
                            <Form.Label column sm="4">Giới tính:</Form.Label>
                            <Col sm="8">
                                <Dropdown onSelect={(eventKey) => setLecturerUpdate({ ...lecturerUpdate, gender: eventKey })} style={{ width: '100%' }}>
                                    <Dropdown.Toggle variant="light" id="dropdown-basic" className={styles.selectGender}>
                                    {lecturerUpdate.gender === 'M' ? 'Nam' : 'Nữ'}
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
                                    value={lecturerUpdate.address}
                                    onChange={(event) => setLecturerUpdate({ ...lecturerUpdate, address: event.target.value })}
                                    type="text"
                                />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="align-items-center mb-3">
                            <Form.Label column sm="4">Ngày làm chính thức:</Form.Label>
                            <Col sm="8">
                            <Form.Control
                                placeholder="DD/MM/YY"
                                type="date"
                                value={convertDateToInputFormat(lecturerUpdate.join_date)}
                                onChange={(event) => setLecturerUpdate({ ...lecturerUpdate, join_date: event.target.value })}
                            />
                            </Col>
                        </Form.Group>
                    </Form>
                    <Form className="w-49">
                        <Form.Group as={Row} className="align-items-center mb-3">
                            <Form.Label column sm="4">Khoa:</Form.Label>
                            <Col sm="8">
                                <Form.Control type="text" value={lecturerUpdate.faculty_id} readOnly />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="align-items-center mb-3">
                            <Form.Label column sm="4">Tên:</Form.Label>
                            <Col sm="8">
                                <Form.Control
                                    placeholder="Last name"
                                    value={lecturerUpdate.last_name}
                                    onChange={(event) => setLecturerUpdate({ ...lecturerUpdate, last_name: event.target.value })}
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
                                    value={convertDateToInputFormat(lecturerUpdate.birthday)}
                                    onChange={(event) => setLecturerUpdate({ ...lecturerUpdate, birthday: event.target.value })}
                                />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="align-items-center mb-3">
                            <Form.Label column sm="4">Số điện thoại:</Form.Label>
                            <Col sm="8">
                                <Form.Control
                                    placeholder="Phone number"
                                    value={lecturerUpdate.phone}
                                    onChange={(event) => setLecturerUpdate({ ...lecturerUpdate, phone: event.target.value })}
                                    type="text"
                                />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="align-items-center mb-3">
                            <Form.Label column sm="4">Trạng thái:</Form.Label>
                            <Col sm="8">
                                <Dropdown onSelect={(eventKey) => setLecturerUpdate({ ...lecturerUpdate, status: eventKey })} style={{ width: '100%' }}>
                                    <Dropdown.Toggle variant="light" id="dropdown-basic" className={styles.selectGender}>
                                    {lecturerUpdate.status === 'true' ? 'Đang công tác' : 'Hết công tác'}
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu style={{ width: '100%' }}>
                                        <Dropdown.Item eventKey="true">Đang công tác</Dropdown.Item>
                                        <Dropdown.Item eventKey="false">Hết công tác</Dropdown.Item>   
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