import React, { useState } from 'react';
import { Container, Button, Form, InputGroup, Alert, Dropdown } from 'react-bootstrap';
import Sidebar_admin from '../../components/Layouts/Sidebar/sidebarAdmin';
import globalstyles from '../../CSSglobal.module.css';
import styles from './student.module.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

export const AddStudent = () => {
    const [student, setStudent] = useState({ id: '', email: '', program_id: '', first_name: '', last_name: '', gender: 'M', birthday: '', address: '', join_date:'',status: 'true', phone: '' });

    const [showNotification, setShowNotification] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState('');
    const [notificationTitle, setNotificationTitle] = useState('');
    const handleCloseNotification = () => setShowNotification(false);

    const checkForEmptyFields = (obj) => {
        for (let key in obj) if (!obj[key]) return true;
        return false;
    };

    const handleSave = () => {
        console.log(student);
       if (checkForEmptyFields(student)) {
            setNotificationTitle('Error');
            setNotificationMessage('Vui lòng điền đầy đủ thông tin.');
            setShowNotification(true);
            return;
        }

        axios.post('/admin/student', student)
        .then(response => {
            setNotificationTitle('Success');
            setNotificationMessage('Thêm mới sinh viên thành công');
            setShowNotification(true);
        })
        .catch(error => {
            setNotificationTitle('Error');
            setShowNotification(true);
            console.error(error.response.data);
            if(error.response.data.error === 'insert or update on table "student" violates foreign key constraint "fk_student_program"') {
                setNotificationMessage('Mã chương trình đào tạo không tồn tại');
            } else {
                setNotificationMessage('Trùng mã số sinh viên');
            }
        });
    
    };

    return (
        <div>
            <Sidebar_admin/>
            <Container fluid className={globalstyles['main-background']}>
                <div className={globalstyles['title']}>Thêm sinh viên</div>

                {showNotification && (
                     <Alert variant={notificationTitle === 'Success' ? 'success' : 'danger'} onClose={handleCloseNotification} dismissible>
                     <Alert.Heading>{notificationTitle}</Alert.Heading>
                     <p>{notificationMessage}</p>
                 </Alert>
                )}

                <div className={styles.gridContainer}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <div style={{ marginRight: '10px', width: '100px' }}>MSSV</div>
                        <Form.Control  
                            placeholder="Student ID"
                            value={student.id}
                            onChange={(event) => {
                                const onlyNums = event.target.value.replace(/[^0-9]/g, '');
                                const limitedNums = onlyNums.slice(0, 8);
                                setStudent({ ...student, id: limitedNums });
                            }}
                            type="text"
                            maxLength={8}
                            pattern="[0-9]*"
                        />
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <div style={{ marginRight: '10px', whiteSpace: 'nowrap' }}>Chương trình đào tạo</div>
                        <Form.Control
                            style={{ minWidth: '110px' }}
                            placeholder="Program ID"
                            value={student.program_id}
                            onChange={(event) => setStudent({ ...student, program_id: event.target.value })}
                            type="text"
                        />
                    </div>
                    <div></div>
                    <div style={{ display: 'flex', alignItems: 'center'}}>
                        <div style={{ marginRight: '10px', width: '100px' }}>Họ</div>
                        <Form.Control
                            placeholder="Last name"
                            value={student.last_name}
                            onChange={(event) => setStudent({ ...student, last_name: event.target.value })}
                            type="text"
                        />
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center'}}>
                        <div style={{ marginRight: '10px', width: '100px' }}>Tên</div>
                        <Form.Control
                            placeholder="First name"
                            value={student.first_name}
                            onChange={(event) => setStudent({ ...student, first_name: event.target.value })}
                            type="text"
                        />
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center'}}>
                        <div style={{ marginRight: '10px', whiteSpace: 'nowrap', width: '100px' }}>Giới tính</div>
                        <Dropdown onSelect={(eventKey) => setStudent({ ...student, gender: eventKey })} style={{ width: '100%' }}>
                            <Dropdown.Toggle variant="light" id="dropdown-basic" className={styles.selectGender}>
                                {student.gender === 'M' ? 'Nam' : 'Nữ'}
                            </Dropdown.Toggle>
                            <Dropdown.Menu style={{ width: '100%' }}>
                                <Dropdown.Item eventKey="M">Nam</Dropdown.Item>
                                <Dropdown.Item eventKey="F">Nữ</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>  
                    <div style={{ display: 'flex', alignItems: 'center'}}>
                        <div style={{ marginRight: '10px', whiteSpace: 'nowrap', width: '100px' }}>Ngày sinh</div>
                        <Form.Control
                            placeholder="DD/MM/YY"
                            type="date"
                            value={student.birthday}
                            onChange={(event) => setStudent({ ...student, birthday: event.target.value })}
                        />
                    </div>  
                    <div style={{ display: 'flex', alignItems: 'center'}}>
                        <div style={{ marginRight: '10px', width: '100px' }}>Email</div>
                        <Form.Control
                            placeholder="Email"
                            value={student.email}
                            onChange={(event) => setStudent({ ...student, email: event.target.value })}
                            type="text"
                        />
                    </div>   
                    <div style={{ display: 'flex', alignItems: 'center'}}>
                        <div style={{ marginRight: '10px', width: '100px' }}>SĐT</div> 
                        <Form.Control
                            placeholder="Phone number"
                            value={student.phone}
                            onChange={(event) => setStudent({ ...student, phone: event.target.value })}
                            type="text"
                        />
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center'}}>
                        <div style={{ marginRight: '10px', whiteSpace: 'nowrap', width: '100px' }}>Địa chỉ</div> 
                        <Form.Control
                            placeholder="Address"
                            value={student.address}
                            onChange={(event) => setStudent({ ...student, address: event.target.value })}
                            type="text"
                        />
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center'}}>
                        <div style={{ marginRight: '10px', whiteSpace: 'nowrap' }}>Ngày nhập học</div> 
                        <Form.Control
                            placeholder="Admission Date"
                            type="date"
                            value={student.join_date}
                            onChange={(event) => setStudent({ ...student, join_date: event.target.value })}
                        />
                    </div>
                </div>         
                <div className={styles['confirmButton']}>
                    <Button variant="primary" onClick={handleSave}>Thêm mới</Button>
                    <Link to="/student"><Button variant="danger" style={{marginLeft: '10px'}}>Hủy bỏ</Button></Link>
                </div>
            </Container>
        </div>
    );
};

