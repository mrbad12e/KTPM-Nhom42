import React, { useState, useEffect } from 'react'; 
import { Container , Row, Col ,Modal ,Button,Form } from 'react-bootstrap'; 
import axios from 'axios';
import Sidebar_student from '../../components/Layouts/Sidebar/sidebarStudent';
import avatar from '../../../assets/img/avatar.jpg';
import globalstyles from '../../CSSglobal.module.css';
import styles from './Home.module.css';

export const Home = () => {
    const [student, setStudent] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [updatedInfo, setUpdatedInfo] = useState({ birthday: '', phone: '', address: '' });
    const id = localStorage.getItem('id');  

    const fetchStudent = async () => {
        try {
            const response = await axios.get(`/student?id=${id}`);
            const students = response.data.students;
            if (students.length > 0) {
                setStudent(students[0]);
            }
        } catch (error) {
            console.error('Failed to fetch student info:', error);
        }
    };

    useEffect(() => {
        fetchStudent();
    }, []);

    const handleCloseModal = () => setShowModal(false);

    const handleShowModal = () => {
        setUpdatedInfo({
            birthday: student.birthday,
            phone: student.phone,
            address: student.address,
        });
        setShowModal(true);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedInfo({ ...updatedInfo, [name]: value });
    };

    const handleSaveChanges = async () => {
        try {
            await axios.patch(`/student/?id=${student.id}`, updatedInfo);
            fetchLecturerInfo();
            setShowModal(false);
        } catch (error) {
            console.error('Failed to update lecturer info:', error);
        }
    };
    // const handleSaveChanges = async () => {
    //     try {
    //         const response = await axios.patch(/student/?id=${student.id}, updatedInfo, {
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //         });
    //         if (response.status === 200) {
    //             setStudent((prevState) => ({ ...prevState, ...updatedInfo }));
    //             handleCloseModal();
    //             console.log('Student info updated:', response.data);
    //         } else {
    //             console.error('Failed to update student info:', response);
    //         }
    //     } catch (error) {
    //         console.error('Failed to update student info:', error);
    //     }
    // };

    return (
        <div>
            <Sidebar_student />
            <Container fluid className={globalstyles['main-background']}>
                <div className={globalstyles.title}>THÔNG TIN SINH VIÊN</div>
                {student && (
                    <div className={styles.flexRow}>
                        <img src={avatar} alt="anh" className={styles.imageStudent}/>
                        <div>
                            <p><strong>MSSV: </strong>{student.id}</p>
                            <p><strong>Mã chuyên ngành: </strong>{student.program_id}</p>
                            <p><strong>Họ và tên: </strong>{`${student.first_name} ${student.last_name}`}</p>
                            <p><strong>Số điện thoại: </strong>{student.phone}</p>
                            <p><strong>Ngày sinh: </strong>{student.birthday.substring(0,10)}</p>
                            <p><strong>Giới tính: </strong>{student.gender === 'F' ? 'Nữ' : 'Nam'}</p>
                            <p><strong>Địa chỉ: </strong>{student.address}</p>
                        </div>
                    </div>
                )}
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px'}}>
                    <Button onClick={handleShowModal}>Cập nhật</Button>
                </div>
            </Container>

            <Modal show={showModal} onHide={handleCloseModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Cập Nhật Thông Tin</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group as={Row} className="align-items-center mb-3">
                            <Form.Label column sm="4">Ngày sinh:</Form.Label>
                            <Col sm="8">
                                <Form.Control
                                    type="date"
                                    name="birthday"
                                    value={updatedInfo.birthday.substring(0,10)}
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
                        Cập nhật
                    </Button>
                    <Button variant="danger" onClick={handleCloseModal}>
                        Đóng
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};