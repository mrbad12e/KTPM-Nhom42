import React, { useState } from 'react';
import { Container, Row, Col, Button, Form, InputGroup, Alert } from 'react-bootstrap';
import Sidebar_admin from '../../components/Layouts/Sidebar/sidebarAdmin';
import globalstyles from '../../CSSglobal.module.css';
import styles from './student.module.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

export const AddStudent = () => {
    const [mssv, setMssv] = useState('12345678');
    const [email, setEmail] = useState('quang@gmail.com');
    const [program_id, setProgram_id] = useState('533402');
    const [first_name, setFirst_name] = useState('Luong');
    const [last_name, setLast_name] = useState('Quang');
    const [gender, setGender] = useState('M');
    const [DoB, setDoB] = useState('2003-01-01');
    const [address, setAddress] = useState('Cao Bang');
    const [joinDate, setJoinDate] = useState('2003-01-01');
    const [status, setStatus] = useState('true');
    const [phone, setPhone] = useState('0816420686');

    const [showNotification, setShowNotification] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState('');
    const [notificationTitle, setNotificationTitle] = useState('');

    const handleSave = () => {
        if (!mssv || !email || !program_id || !first_name || !last_name || !gender || !DoB || !address || !joinDate || !status || !phone) {
            setNotificationTitle('Lỗi');
            setNotificationMessage('Vui lòng điền đầy đủ thông tin.');
            setShowNotification(true);
            setTimeout(() => setShowNotification(false), 3000);
            return;
        }

        const studentData = {
            id: mssv,
            email,
            program_id,
            first_name,
            last_name,
            gender,
            birthday: DoB,
            address,
            join_date: joinDate,
            status,
            phone
        };

        axios.post('/admin/student', studentData)
            .then(response => {
                setNotificationTitle('Thành công');
                setNotificationMessage('Thêm mới sinh viên thành công');
                setShowNotification(true);
                setTimeout(() => setShowNotification(false), 3000); 
            })
            .catch(error => {
                setNotificationTitle('Lỗi');
                setNotificationMessage('Trùng mã số sinh viên');
                setShowNotification(true);
                setTimeout(() => setShowNotification(false), 3000); 
            });
    };

    const handleCloseNotification = () => {
        setShowNotification(false);
    };

    return (
        <div>
            <Sidebar_admin/>
            <Container fluid className={globalstyles['main-background']}>
                <div className={globalstyles['title']}>Thêm giảng viên</div>

                <div className={styles.gridContainer}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <div style={{ marginRight: '10px' }}>Mã giảng viên</div>
                        <InputGroup>
                            <Form.Control  
                                className={globalstyles.input}
                                placeholder="8 số"
                                aria-label="ID"
                                aria-describedby="basic-addon1"
                                value={mssv}
                                onChange={(event) => {
                                    const onlyNums = event.target.value.replace(/[^0-9]/g, '');
                                    const limitedNums = onlyNums.slice(0, 8);
                                    setMssv(limitedNums);
                                }}
                                type="text"
                                maxLength={8}
                                pattern="[0-9]*"
                            />
                        </InputGroup>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <div style={{ marginRight: '10px', whiteSpace: 'nowrap' }}>Chương trình đào tạo</div>
                        <InputGroup style={{ width: '150px' }}>
                            <Form.Control
                                placeholder="Program_id"
                                aria-label="Program_id"
                                aria-describedby="Program_id"
                                value={program_id}
                                onChange={(event) => setProgram_id(event.target.value)}
                                type="text"
                            />
                        </InputGroup>
                    </div>
                    <div></div>
                    <div style={{ display: 'flex', alignItems: 'center'}}>
                        <div style={{ marginRight: '10px' }}>Họ</div>
                        <InputGroup >
                            <Form.Control
                                placeholder="Ho"
                                aria-label="Ho"
                                aria-describedby="basic-addon1"
                                value={first_name}
                                onChange={(event) => setFirst_name(event.target.value)}
                                type="text"
                            />
                        </InputGroup>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center'}}>
                        <div style={{ marginRight: '10px' }}>Tên</div>
                        <InputGroup >
                            <Form.Control
                                placeholder="Ten"
                                aria-label="Ten"
                                aria-describedby="basic-addon1"
                                value={last_name}
                                onChange={(event) => setLast_name(event.target.value)}
                                type="text"
                            />
                        </InputGroup>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center'}}>
                        <div style={{ marginRight: '10px', whiteSpace: 'nowrap' }}>Giới tính</div>
                        <InputGroup >
                            <Form.Control
                                as="select"
                                aria-label="Giới tính"
                                value={gender === 'M' ? 'Nam' : 'Nữ'}
                                onChange={(event) => setGender(event.target.value === 'Nam' ? 'M' : 'F')}
                            >
                                <option>Nam</option>
                                <option>Nữ</option>
                            </Form.Control>
                        </InputGroup>
                    </div>  
                    <div style={{ display: 'flex', alignItems: 'center'}}>
                        <div style={{ marginRight: '10px', whiteSpace: 'nowrap' }}>Ngày sinh</div>
                        <InputGroup>
                            <Form.Control
                                placeholder="DD/MM/YY"
                                aria-describedby="basic-addon1"
                                type="date"
                                value={DoB}
                                onChange={(event) => setDoB(event.target.value)}
                            />
                        </InputGroup>
                    </div>  
                    <div style={{ display: 'flex', alignItems: 'center'}}>
                        <div style={{ marginRight: '10px' }}>Email</div>
                        <InputGroup >
                            <Form.Control
                                placeholder="Email"
                                aria-label="Email"
                                aria-describedby="basic-addon1"
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                                type="text"
                            />
                        </InputGroup>
                    </div>   
                    <div style={{ display: 'flex', alignItems: 'center'}}>
                        <div style={{ marginRight: '10px', whiteSpace: 'nowrap' }}>SĐT</div> 
                        <InputGroup >
                            <Form.Control
                                placeholder="So dien thoai"
                                aria-label="So dien thoai"
                                aria-describedby="basic-addon1"
                                value={phone}
                                onChange={(event) => setPhone(event.target.value)}
                                type="text"
                            />
                        </InputGroup>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center'}}>
                        <div style={{ marginRight: '10px', whiteSpace: 'nowrap' }}>Địa chỉ</div> 
                        <InputGroup>
                            <Form.Control
                                placeholder="Dia chi"
                                aria-label="Dia chi"
                                aria-describedby="basic-addon1"
                                value={address}
                                onChange={(event) => setAddress(event.target.value)}
                                type="text"
                            />
                        </InputGroup>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center'}}>
                        <div style={{ marginRight: '10px', whiteSpace: 'nowrap' }}>Ngày nhập học</div> 
                        <InputGroup>
                            <Form.Control
                                placeholder="Ngày nhập học"
                                aria-label="Ngày nhập học"
                                aria-describedby="basic-addon1"
                                type="date"
                                value={joinDate}
                                onChange={(event) => setJoinDate(event.target.value)}
                            />
                        </InputGroup>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center'}}>
                        <div style={{ marginRight: '10px', whiteSpace: 'nowrap' }}>Trạng thái</div> 
                        <InputGroup>
                            <Form.Control
                                as="select"
                                aria-label="Trạng thái"
                                value={status === 'true' ? 'Học' : 'Thôi học'}
                                onChange={(event) => setStatus(event.target.value === 'Học' ? 'true' : 'false')}
                                type="text"
                            >
                                <option>Học</option>
                                <option>Bỏ học</option>
                            </Form.Control>
                        </InputGroup>
                    </div>
                </div>         
                <div className={styles['confirmButton']}>
                    <Button variant="primary" onClick={handleSave}>Thêm mới</Button>
                    <Link to="/student"><Button variant="danger" style={{marginLeft: '10px'}}>Hủy bỏ</Button></Link>
                </div>
        
                {showNotification && (
                   <Row style={{ position: 'fixed', zIndex: '4', top: '10px', left: '50%'}}>

                        <Col xs="auto">
                            <Alert variant={notificationTitle === 'Thành công' ? 'success' : 'danger'} onClose={handleCloseNotification} dismissible>
                                <Alert.Heading>{notificationTitle}</Alert.Heading>
                                <p>{notificationMessage}</p>
                            </Alert>
                        </Col>
                    </Row>
                )}
            </Container>
        </div>
    );
};

