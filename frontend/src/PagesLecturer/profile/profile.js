import React, { useState, useEffect } from 'react'; 
import { Container , Row, Col ,Modal ,Button,Form } from 'react-bootstrap'; 
import axios from 'axios';
import SidebarLecturer from '../../components/Layouts/Sidebar/SidebarLecturer';
import avatar from '../../../assets/img/avatar.jpg';
import globalstyles from '../../CSSglobal.module.css';
import styles from './profile.module.css';

export const ProfileLecturer = () => {
    const [lecturerInfo, setLecturerInfo] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [updatedInfo, setUpdatedInfo] = useState({ birthday: '', phone: '', address: '' });
    const id = localStorage.getItem('id');  
    
    const fetchLecturerInfo = async () => {
        try {
            const response = await axios.get(`lecturer/?id=${id}`);
            const lecturers = response.data.lecturers;
            setLecturerInfo(lecturers[0]);   
        } catch (error) {
            console.error('Failed to fetch lecturer info:', error);
        }
    };

    useEffect(() => {
        fetchLecturerInfo();
    }, []);

    const handleCloseModal = () => setShowModal(false);
    
    const handleShowModal = () => {
        setUpdatedInfo({
            birthday: lecturerInfo.birthday.substring(0, 10),
            phone: lecturerInfo.phone,
            address: lecturerInfo.address,
        });
        setShowModal(true);
    }
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedInfo({ ...updatedInfo, [name]: value });
    };

    const handleSaveChanges = async () => {
        try {
            await axios.patch(`lecturer/?id=${id}`, updatedInfo);
            fetchLecturerInfo();
            setShowModal(false);
        } catch (error) {
            console.error('Failed to update lecturer info:', error);
        }
    };

    return (
        <div>
            <SidebarLecturer/>
            <Container fluid className={globalstyles['main-background']}>
                <div className={globalstyles.title}>THÔNG TIN GIẢNG VIÊN</div>
                {lecturerInfo && (
                    <div className={styles.flexRow}>
                        <img src={avatar} alt="anh" className={styles.imageStudent}/>
                        <div>
                            <p><strong>ID:</strong>  {lecturerInfo.id}</p>
                            <p><strong>Khoa:</strong> {lecturerInfo.faculty_id}</p>
                            <p><strong>Họ và tên:</strong> {`${lecturerInfo.first_name} ${lecturerInfo.last_name}`}</p>
                            <p><strong>Ngày sinh:</strong> {lecturerInfo.birthday.substring(0, 10)}</p>
                            <p><strong>Giới tính:</strong> {lecturerInfo.gender === 'M' ? 'Nam' : 'Nữ'}</p>
                            <p><strong>Ngày tham gia:</strong> {lecturerInfo.join_date.substring(0,10)}</p>
                            <p><strong>Số điện thoại:</strong> {lecturerInfo.phone}</p>
                            <p><strong>Địa chỉ:</strong> {lecturerInfo.address}</p>
                            <strong>Email:</strong> {lecturerInfo.email}
                        </div>
                    </div>
                )}
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px'}}>
                    <Button onClick={handleShowModal}>Cập nhật</Button>
                </div>
            </Container>

            <Modal show={showModal} onHide={handleCloseModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Cập nhật thông tin</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form>
                    <Form.Group as={Row} className="align-items-center mb-3">
                        <Form.Label column sm="4">Ngày sinh:</Form.Label>
                        <Col sm="8">
                            <Form.Control type="date" name="birthday" value={updatedInfo.birthday} onChange={handleInputChange} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="align-items-center mb-3">
                        <Form.Label column sm="4">Số điện thoại:</Form.Label>
                        <Col sm="8">
                            <Form.Control type='text' name="phone" value={updatedInfo.phone} onChange={handleInputChange}/>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="align-items-center mb-3">
                        <Form.Label column sm="4">Địa chỉ:</Form.Label>
                        <Col sm="8">
                            <Form.Control type='text' name="address" value={updatedInfo.address} onChange={handleInputChange}/>
                        </Col>
                    </Form.Group>
                    
                </Form>
                </Modal.Body>
                <Modal.Footer> 
                    <Button variant="primary" onClick={handleSaveChanges}>
                        Lưu thay đổi
                    </Button>
                    <Button variant="danger" onClick={handleCloseModal}>
                        Đóng
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};