import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Form, Alert, Modal } from 'react-bootstrap';
import Sidebar_admin from '../../components/Layouts/Sidebar/sidebarAdmin';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import globalstyles from '../../CSSglobal.module.css';
import styles from './lecturer.module.css';
import avatar from '../../../assets/img/avatar.jpg';

export const UpdateLecturer = () => {
    const location = useLocation();
    const [lecturer, setLecturer] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [id, setId] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState(true);
    const [phone, setPhone] = useState('');
    const [birthday, setBirthday] = useState('');
    const [gender, setGender] = useState('M');
    const [address, setAddress] = useState('');
    const [joinDate, setJoinDate] = useState('');
    const [facultyId, setFacultyId] = useState('');

    useEffect(() => {
        if (location.state && location.state.lecturer) {
            const lecturerData = location.state.lecturer;
            setLecturer(lecturerData);
            setId(lecturerData.id);
            setFirstName(lecturerData.first_name);
            setLastName(lecturerData.last_name);
            setFacultyId(lecturerData.faculty_id);
            setEmail(lecturerData.email);
            setStatus(lecturerData.status);
            setPhone(lecturerData.phone);
            setBirthday(lecturerData.birthday.substring(0, 10));
            setGender(lecturerData.gender);
            setAddress(lecturerData.address);
            setJoinDate(lecturerData.join_date.substring(0, 10));
        } else {
            fetchLecturerData();
        }
    }, [location]);

    const fetchLecturerData = async () => {
        try {
            const response = await axios.get(`/admin/lecturer?id=${location.pathname.split('/').pop()}`);
            const lecturerData = response.data.lecturers[0];
            setLecturer(lecturerData);
            setId(lecturerData.id);
            setFirstName(lecturerData.first_name);
            setLastName(lecturerData.last_name);
            setFacultyId(lecturerData.faculty_id);
            setEmail(lecturerData.email);
            setStatus(lecturerData.status);
            setPhone(lecturerData.phone);
            setBirthday(lecturerData.birthday.substring(0, 10));
            setGender(lecturerData.gender);
            setAddress(lecturerData.address);
            setJoinDate(lecturerData.join_date.substring(0, 10));
        } catch (error) {
            console.error('Error fetching lecturer detail:', error);
        }
    };

    const handleCloseModal = () => setShowModal(false);
    const handleShowModal = () => setShowModal(true);

    const handleSaveChanges = async () => {
        try {
            const updatedLecturer = {
                id,
                first_name: firstName,
                last_name: lastName,
                faculty_id: facultyId,
                email: email,
                status: status,
                phone: phone,
                birthday: birthday,
                gender: gender,
                address: address,
                join_date: joinDate
            };

            const response = await axios.patch(`/admin/lecturer`, updatedLecturer, { params: { id } });
            setLecturer(updatedLecturer);
            handleCloseModal();
        } catch (error) {
            console.error('Error updating lecturer detail:', error.response ? error.response.data : error.message);
            alert(`Error: ${error.response ? error.response.data.error : error.message}`);
        }
    };

    const renderUpdateForm = () => {
        return (
            <div className={styles.flexRow}>
            <img src={avatar} alt="anh" className={styles.imageStudent}/>
            <div style={{lineHeight: '1.0'}}>
                <p><strong>Mã giảng viên:</strong> {lecturer.id}</p>
                <p><strong>Họ và tên:</strong> {`${lecturer.first_name} ${lecturer.last_name}`}</p>
                <p><strong>Khoa:</strong> {lecturer.faculty_id}</p>
                <p><strong>Email:</strong> {lecturer.email}</p>
                <p><strong>Trạng thái:</strong> {lecturer.status ? 'Đang cong tac' : 'Het cong tac'}</p>
                <p><strong>Số điện thoại:</strong> {lecturer.phone}</p>
                <p><strong>Ngày sinh:</strong> {lecturer.birthday.substring(0, 10)}</p>
                <p><strong>Giới tính:</strong> {lecturer.gender === 'M' ? 'Nam' : 'Nữ'}</p>
                <p><strong>Địa chỉ:</strong> {lecturer.address}</p>
                <div><strong>Ngày bắt đầu công tác:</strong> {lecturer.join_date.substring(0, 10)}</div>
            </div>
        </div>
        );
    };

    return (
        <div>
            <Sidebar_admin />
            <Container fluid className={globalstyles['main-background']}>
                <div className={globalstyles.title}>Chi tiết thông tin giảng viên</div>
                {lecturer ? renderUpdateForm() : <Alert variant="danger">Không tìm thấy thông tin giảng viên !</Alert>}
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px'}}>
                    <Button onClick={handleShowModal}>Cập nhật</Button>
                </div>     
            </Container>

            <Modal show={showModal} onHide={handleCloseModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Chỉnh sửa thông tin</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group as={Row} className="align-items-center mb-3">
                            <Form.Label column sm="4">Mã giảng viên:</Form.Label>
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