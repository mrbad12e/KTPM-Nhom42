import React, { useState } from 'react';
import { Container, Button, Form, Alert, Dropdown } from 'react-bootstrap';
import Sidebar_admin from '../../components/Layouts/Sidebar/sidebarAdmin';
import globalstyles from '../../CSSglobal.module.css';
import styles from './lecturer.module.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

export const AddLecturer = () => {
    const [lecturer, setLecturer] = useState({ id: '', email: '', faculty_id: '', first_name: '', last_name: '', gender: 'M', birthday: '', address: '', join_date:'',status: 'true', phone: '' });

    const [showNotification, setShowNotification] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState('');
    const [notificationTitle, setNotificationTitle] = useState('');
    const handleCloseNotification = () => setShowNotification(false);

    const checkForEmptyFields = (obj) => {
        for (let key in obj) if (!obj[key]) return true;
        return false;
    };

    const handleSave = () => {
        console.log(lecturer);
       if (checkForEmptyFields(lecturer)) {
            setNotificationTitle('Error !');
            setNotificationMessage('Vui lòng điền đầy đủ thông tin.');
            setShowNotification(true);
            return;
        }

    axios.post('admin/lecturer', lecturer)
        .then(response => {
            setNotificationTitle('Success');
            setNotificationMessage('Thêm mới giảng viên thành công');
            setShowNotification(true);
        })
        .catch(error => {
            setNotificationTitle('Error !');
            setShowNotification(true);
            console.error(error.response.data);
            if(error.response.data.error === 'insert or update on table \"lecturer\" violates foreign key constraint \"fk_lecturer_faculty\"') {
                setNotificationMessage('Mã khoa không tồn tại');
            } else {
                setNotificationMessage('Trùng mã giảng viên');
            }
        });
    };

    return (
        <div>
            <Sidebar_admin/>
            <Container fluid className={globalstyles['main-background']}>
                <div className={globalstyles['title']}>Thêm giảng viên</div>

                {showNotification && (
                     <Alert variant={notificationTitle === 'Success' ? 'success' : 'danger'} onClose={handleCloseNotification} dismissible>
                     <Alert.Heading>{notificationTitle}</Alert.Heading>
                     <p>{notificationMessage}</p>
                 </Alert>
                )}
                
                <div className={styles.gridContainer}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <div style={{ marginRight: '10px', width: '100px' }}>Mã GV</div>
                        <Form.Control  
                            placeholder="Lecturer ID"
                            value={lecturer.id}
                            onChange={(event) => setLecturer({ ...lecturer, id: event.target.value })}
                            type="text"
                        />
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <div style={{ marginRight: '10px', width: '100px' }}>Mã khoa</div>
                        <Form.Control
                            style={{ minWidth: '110px' }}
                            placeholder="Faculty ID"
                            value={lecturer.faculty_id}
                            onChange={(event) => setLecturer({ ...lecturer, faculty_id: event.target.value })}
                            type="text"
                        />
                    </div>
                    <div></div>
                    <div style={{ display: 'flex', alignItems: 'center'}}>
                        <div style={{ marginRight: '10px', width: '100px' }}>Họ</div>
                        <Form.Control
                            placeholder="Last name"
                            value={lecturer.last_name}
                            onChange={(event) => setLecturer({ ...lecturer, last_name: event.target.value })}
                            type="text"
                        />
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center'}}>
                        <div style={{ marginRight: '10px', width: '100px' }}>Tên</div>
                        <Form.Control
                            placeholder="First name"
                            value={lecturer.first_name}
                            onChange={(event) => setLecturer({ ...lecturer, first_name: event.target.value })}
                            type="text"
                        />
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center'}}>
                        <div style={{ marginRight: '10px', width: '100px' }}>Giới tính</div>
                        <Dropdown onSelect={(eventKey) => setLecturer({ ...lecturer, gender: eventKey })} style={{ width: '100%' }}>
                            <Dropdown.Toggle variant="light" id="dropdown-basic" className={styles.selectGender}>
                                {lecturer.gender === 'M' ? 'Nam' : 'Nữ'}
                            </Dropdown.Toggle>
                            <Dropdown.Menu style={{ width: '100%' }}>
                                <Dropdown.Item eventKey="M">Nam</Dropdown.Item>
                                <Dropdown.Item eventKey="F">Nữ</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>  
                    <div style={{ display: 'flex', alignItems: 'center'}}>
                        <div style={{ marginRight: '10px', whiteSpace: 'nowrap' }}>Ngày sinh</div>
                        <Form.Control
                            placeholder="DD/MM/YY"
                            type="date"
                            value={lecturer.birthday}
                            onChange={(event) => setLecturer({ ...lecturer, birthday: event.target.value })}
                        />
                    </div>  
                    <div style={{ display: 'flex', alignItems: 'center'}}>
                        <div style={{ marginRight: '10px', width: '100px' }}>Email</div>
                        <Form.Control
                            placeholder="Email"
                            value={lecturer.email}
                            onChange={(event) => setLecturer({ ...lecturer, email: event.target.value })}
                            type="text"
                        />
                    </div>   
                    <div style={{ display: 'flex', alignItems: 'center'}}>
                        <div style={{ marginRight: '10px', width: '100px' }}>SĐT</div> 
                        <Form.Control
                            placeholder="Phone number"
                            value={lecturer.phone}
                            onChange={(event) => setLecturer({ ...lecturer, phone: event.target.value })}
                            type="text"
                        />
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center'}}>
                        <div style={{ marginRight: '10px', whiteSpace: 'nowrap', width: '100px' }}>Địa chỉ</div> 
                        <Form.Control
                            placeholder="Address"
                            value={lecturer.address}
                            onChange={(event) => setLecturer({ ...lecturer, address: event.target.value })}
                            type="text"
                        />
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center'}}>
                        <div style={{ marginRight: '10px', whiteSpace: 'nowrap' }}>Ngày làm chính thức</div> 
                        <Form.Control
                            placeholder="Admission Date"
                            type="date"
                            value={lecturer.join_date}
                            onChange={(event) => setLecturer({ ...lecturer, join_date: event.target.value })}
                        />
                    </div>
                </div>         
                <div className={styles['confirmButton']}>
                    <Button variant="primary" onClick={handleSave}>Thêm mới</Button>
                    <Link to="/lecturer"><Button variant="danger" style={{marginLeft: '10px'}}>Hủy bỏ</Button></Link>
                </div>
            </Container>
        </div>
    );
};
