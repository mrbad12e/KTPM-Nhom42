import React, { useState, useEffect } from 'react'; 
import { Container , Row, Col ,Modal ,Button,color,Form } from 'react-bootstrap'; 
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Sidebar_lecturer from '../../components/Layouts/Sidebar_lecturer/Sidebar_lecturer';
import avatar from '../../../assets/img/avatar.jpg';
import './profile.css';
import Cookies from 'js-cookie';
export const ProfileLectuer = () => {
    const [lecturerInfo, setLecturerInfo] = useState({ id: '', faculty_id: '', firt_name: '',last_name:'', phone: '', birthday: '', gender: '', address: '' ,email:'',status:'',join_date:''});
    const [showModal, setShowModal] = useState(false);
    const [updatedInfo, setUpdatedInfo] = useState({ birthday: '', phone: '', address: '' });
    useEffect(() => {
        const fetchlecturerInfo = async () => {
            try {
                const email = localStorage.getItem('email');
                const response = await axios.get(`/lecturer/?email=${email}`);
                    const lecturers = response.data.lecturers;
                    if (lecturers.length > 0) {
                        const userInfo = lecturers[0];
                        setLecturerInfo(userInfo);
                        console.log('Student info:', userInfo);
                    } 
            } catch (error) {
                console.error('Failed to fetch student info:', error);
            }
        };
        fetchlecturerInfo();
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
            const response = await axios.patch(`/lecturer/?id=${lecturerInfo.id}`, updatedInfo, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.status === 200) {
                setLecturerInfo((prevState) => ({ ...prevState, ...updatedInfo }));
                handleCloseModal();
                console.log('Lecturer info updated:', response.data);
            } else {
                console.error('Failed to update lecturer info:', response);
            }
        } catch (error) {
            console.error('Failed to update lecturer info:', error);
        }
    };

    const renderInfoLecturer = () => {
        if (!lecturerInfo) {
            return <p>Loading...</p>;
        }
        return (
            <div className='main_content'>
                <div className='image_student ml-auto'>
                    <img src={avatar} alt="anh" className="anh-the"/>
                </div>
                <div className='info_student'>
                    <p><strong>ID:</strong>  {lecturerInfo.id}</p>
                    <p><strong>Khoa:</strong> {lecturerInfo.faculty_id}</p>
                    <p><strong>Họ và tên:</strong> {`${lecturerInfo.first_name} ${lecturerInfo.last_name}`}</p>
                    <p><strong>Ngày sinh:</strong> {lecturerInfo.birthday.substring(0, 10)}</p>
                    <p><strong>Giới tính:</strong> {lecturerInfo.gender === 'M' ? 'Nam' : 'Nữ'}</p>
                    <p><strong>Trạng thái:</strong> {lecturerInfo.status ? 'Đang công tác' : 'Hết công tác'}</p>
                    <p><strong>Ngày tham gia:</strong> {lecturerInfo.join_date.substring(0,10)}</p>
                    <p><strong>Số điện thoại:</strong> {lecturerInfo.phone}</p>
                    <p><strong>Địa chỉ:</strong> {lecturerInfo.address}</p>
                    <p><strong>Email:</strong> {lecturerInfo.email}</p>
                </div>
            </div>
        );
    };

    return (
    
        <div className="gray-background">
            <Row className="content">
                <Sidebar_lecturer/>
                <Container fluid className="main-background">
                    <Col md={9} className="right-content">
                        <h2>THÔNG TIN GIẢNG VIÊN</h2>
                        {renderInfoLecturer()}
                        <Row>
                            <Button style={{ border: 'none', margin: '30px 0'  }} onClick={handleShowModal}>Cập nhật</Button>
                        </Row>
                    </Col>
                    
                </Container>
            </Row>

            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Cập nhật thông tin</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form>
                        <Form.Group as={Row} className="align-items-center mb-3">
                            <Form.Label column sm="4">Ngày sinh:</Form.Label>
                            <Col sm="8">
                                <Form.Control type="text" name="birthday" value={updatedInfo.birthday} onChange={handleInputChange} />
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
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Đóng
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};