import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Form, Alert, Modal } from 'react-bootstrap';
import Sidebar_admin from '../../components/Layouts/Sidebar_admin/Sidebar_admin';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import globalstyles from '../../CSSglobal.module.css';
import avatar from '../../../assets/img/avatar.jpg';

export const UpdateStudent = () => {
    const location = useLocation();
    const [student, setStudent] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [id, setId] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [programId, setProgramId] = useState('');
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState(true);
    const [phone, setPhone] = useState('');
    const [birthday, setBirthday] = useState('');
    const [gender, setGender] = useState('M');
    const [address, setAddress] = useState('');
    const [joinDate, setJoinDate] = useState('');

    useEffect(() => {
        if (location.state && location.state.student) {
            const studentData = location.state.student;
            setStudent(studentData);
            setId(studentData.id);
            setFirstName(studentData.first_name);
            setLastName(studentData.last_name);
            setProgramId(studentData.program_id);
            setEmail(studentData.email);
            setStatus(studentData.status);
            setPhone(studentData.phone);
            setBirthday(studentData.birthday.substring(0, 10));
            setGender(studentData.gender);
            setAddress(studentData.address);
            setJoinDate(studentData.join_date.substring(0, 10));
        } else {
            fetchStudentData();
        }
    }, [location]);

    const fetchStudentData = async () => {
        try {
            const response = await axios.get(`/admin/student?id=${location.pathname.split('/').pop()}`);
            const studentData = response.data.students[0];
            setStudent(studentData);
            setId(studentData.id);
            setFirstName(studentData.first_name);
            setLastName(studentData.last_name);
            setProgramId(studentData.program_id);
            setEmail(studentData.email);
            setStatus(studentData.status);
            setPhone(studentData.phone);
            setBirthday(studentData.birthday.substring(0, 10));
            setGender(studentData.gender);
            setAddress(studentData.address);
            setJoinDate(studentData.join_date.substring(0, 10));
        } catch (error) {
            console.error('Error fetching student detail:', error);
        }
    };

    const handleCloseModal = () => setShowModal(false);
    const handleShowModal = () => setShowModal(true);

    const handleSaveChanges = async () => {
        try {
            const updatedStudent = {
                id,
                first_name: firstName,
                last_name: lastName,
                program_id: programId,
                email: email,
                status: status,
                phone: phone,
                birthday: birthday,
                gender: gender,
                address: address,
                join_date: joinDate
            };

            const response = await axios.patch(`/admin/student`, updatedStudent, { params: { id } });
            setStudent(updatedStudent);
            handleCloseModal();
        } catch (error) {
            console.error('Error updating student detail:', error.response ? error.response.data : error.message);
            alert(`Error: ${error.response ? error.response.data.error : error.message}`);
        }
    };

    const renderUpdateForm = () => {
        return (
            <div style={{ marginTop: '20px' }}>
                <div className='main_content'>
                    <Row>
                        <Col className="d-flex justify-content-center align-items-center">
                            <img src={avatar} alt="anh" className="anh-the" style={{ width: '100%', maxWidth: '270px', height: 'auto' }} />
                        </Col>
                        <Col>
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
                    <Form>
                        <Form.Group as={Row} className="align-items-center mb-3">
                            <Form.Label column sm="4">MSSV:</Form.Label>
                            <Col sm="8">
                                <Form.Control type="text" value={id} readOnly />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="align-items-center mb-3">
                            <Form.Label column sm="4">Họ:</Form.Label>
                            <Col sm="8">
                                <Form.Control type='text' value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="align-items-center mb-3">
                            <Form.Label column sm="4">Tên:</Form.Label>
                            <Col sm="8">
                                <Form.Control type='text' value={lastName} onChange={(e) => setLastName(e.target.value)} />
                            </Col>
                        </Form.Group>
                        {/* <Form.Group as={Row} className="align-items-center mb-3">
                            <Form.Label column sm="4">CTDT:</Form.Label>
                            <Col sm="8">
                                <Form.Control type='text' value={programId} onChange={(e) => setProgramId(e.target.value)} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="align-items-center mb-3">
                            <Form.Label column sm="4">Email:</Form.Label>
                            <Col sm="8">
                                <Form.Control type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="align-items-center mb-3">
                            <Form.Label column sm="4">Trạng thái:</Form.Label>
                            <Col sm="8">
                                <Form.Control as='select' value={status} onChange={(e) => setStatus(e.target.value === 'true')}>
                                    <option value='true'>Đang học</option>
                                    <option value='false'>Ra trường</option>
                                </Form.Control>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="align-items-center mb-3">
                            <Form.Label column sm="4">Số điện thoại:</Form.Label>
                            <Col sm="8">
                                <Form.Control type='text' value={phone} onChange={(e) => setPhone(e.target.value)} />
                            </Col>
                        </Form.Group> */}
                        {/* <Form.Group as={Row} className="align-items-center mb-3">
                            <Form.Label column sm="4">Ngày sinh:</Form.Label>
                            <Col sm="8">
                                <Form.Control type='date' value={birthday} onChange={(e) => setBirthday(e.target.value)} />
                            </Col>
                        </Form.Group> */}
                        {/* <Form.Group as={Row} className="align-items-center mb-3">
                            <Form.Label column sm="4">Giới tính:</Form.Label>
                            <Col sm="8">
                                <Form.Control as='select' value={gender} onChange={(e) => setGender(e.target.value)}>
                                    <option value='M'>Nam</option>
                                    <option value='F'>Nữ</option>
                                </Form.Control>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="align-items-center mb-3">
                            <Form.Label column sm="4">Địa chỉ:</Form.Label>
                            <Col sm="8">
                                <Form.Control type='text' value={address} onChange={(e) => setAddress(e.target.value)} />
                            </Col>
                        </Form.Group> */}
                        {/* <Form.Group as={Row} className="align-items-center mb-3">
                            <Form.Label column sm="4">Ngày nhập học:</Form.Label>
                            <Col sm="8">
                                <Form.Control type='date' value={joinDate} onChange={(e) => setJoinDate(e.target.value)} />
                            </Col>
                        </Form.Group> */}
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    
                    <Button variant="primary" onClick={handleSaveChanges}>Lưu thay đổi</Button>
                    <Button variant="secondary" onClick={handleCloseModal}>Đóng</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};
