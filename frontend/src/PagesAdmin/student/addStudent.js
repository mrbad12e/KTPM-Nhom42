import React, { useState } from 'react';
import { Table, Container, Row, Col, Button, Form, InputGroup, Alert } from 'react-bootstrap';
import Sidebar_admin from '../../components/Layouts/Sidebar/sidebarAdmin';
import globalstyles from '../../CSSglobal.module.css';
import axios from 'axios';

export const AddStudent = () => {
    const [mssv, setMssv] = useState('12345678');                   // Đặt các giá trị mặc định để dễ kiểm thử
    const [email, setEmail] = useState('quang@gmail.com');          // Kiểm thử xong sẽ xóa đi
    const [program_id, setProgram_id] = useState('533402');
    const [first_name, setFirst_name] = useState('Luong');
    const [last_name, setLast_name] = useState('Quang');
    const [gender, setGender] = useState('M');
    const [DoB, setDoB] = useState('2003-01-01');
    const [address, setAddress] = useState('Cao Bang');
    const [joinDate, setJoinDate] = useState('2003-01-01');
    const [status, setStatus] = useState('true');
    const [phone, setPhone] = useState('0816420686');

    const handleCancel = () => {
        console.log('Thông tin đã hủy bỏ:');
        console.log('MSSV:', mssv);
        console.log('Email:', email);
        console.log('Chương trình đào tạo:', program_id);
        console.log('Họ:', first_name);
        console.log('Tên:', last_name);
        console.log('Giới tính:', gender);
        console.log('Ngày sinh:', DoB);
        console.log('Địa chỉ:', address);
        console.log('Ngày nhập học:', joinDate);
        console.log('Trạng thái:', status);
        console.log('Số điện thoại:', phone);
    }

    const handleSave = () => {
        // Tạo đối tượng chứa thông tin sinh viên
        const studentData = {
            id: mssv,
            first_name: first_name,
            last_name: last_name,
            gender: gender,
            birthday: DoB,
            status: status,
            join_date: joinDate,
            address: address,
            email: email,
            phone: phone,
            program_id: program_id
        };
    
        // Gửi dữ liệu đến backend
        axios.post('/admin/student', studentData)
            .then(response => {
                console.log('Dữ liệu đã được gửi thành công:', response.data);
            })
            .catch(error => {
                console.error('Lỗi khi gửi dữ liệu:', error);
            });
    };

    return (
        <div>
            <Sidebar_admin/>
            <Container fluid className={globalstyles['main-background']}>
                <Row>
                    <Col className="text-center mb-3">
                        <div className={globalstyles['title']}>Thêm sinh viên</div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Label>MSSV</Form.Label>
                        <InputGroup style={{ width: '100px' }}>
                            <Form.Control
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
                    </Col>
                    <Col>
                        <Form.Label>Chương trình đào tạo</Form.Label>
                        <InputGroup style={{ width: '100px' }}>
                            <Form.Control
                                placeholder="Program_id"
                                aria-label="Program_id"
                                aria-describedby="Program_id"
                                value={program_id}
                                onChange={(event) => setProgram_id(event.target.value)}
                                type="text"
                            />
                        </InputGroup>
                    </Col>
                </Row>             
                <Row>
                    <Col xs="auto">
                        <Form.Label>Họ</Form.Label>
                        <InputGroup style={{ width: '150px' }}>
                            <Form.Control
                                placeholder="Ho"
                                aria-label="Ho"
                                aria-describedby="basic-addon1"
                                value={first_name}
                                onChange={(event) => setFirst_name(event.target.value)}
                                type="text"
                            />
                        </InputGroup>
                    </Col>
                    <Col >
                        <Form.Label>Tên</Form.Label>
                        <InputGroup style={{ width: '150px' }}>
                            <Form.Control
                                placeholder="Ten"
                                aria-label="Ten"
                                aria-describedby="basic-addon1"
                                value={last_name}
                                onChange={(event) => setLast_name(event.target.value)}
                                type="text"
                            />
                        </InputGroup>
                    </Col>
                    <Col xs="auto">
                        {/* Nội dung cho cột giới tính */}
                        <Form.Label>Giới tính</Form.Label>
                        <InputGroup style={{ width: '70px' }}>
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
                    </Col>
                    <Col>
                        <Form.Label>Ngày sinh</Form.Label>
                        <InputGroup style={{ width: '150px' }}>
                            <Form.Control 
                                placeholder="DD/MM/YY"
                                aria-describedby="basic-addon1"
                                type="date" 
                                value={DoB}
                                onChange={(event) => setDoB(event.target.value)}
                            />
                        </InputGroup>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Label>Email</Form.Label>
                        <InputGroup className="mb-3">
                            <Form.Control
                                placeholder="Email"
                                aria-label="Email"
                                aria-describedby="basic-addon1"
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                                type="text"
                            />
                        </InputGroup>
                    </Col>
                    <Col>
                        <Form.Label>Số điện thoại</Form.Label>
                        <InputGroup style={{ width: '200px' }}>
                            <Form.Control
                                placeholder="So dien thoai"
                                aria-label="So dien thoai"
                                aria-describedby="basic-addon1"
                                value={phone}
                                onChange={(event) => setPhone(event.target.value)}
                                type="text"
                            />
                        </InputGroup>
                    </Col>
                    <Col>
                        <Form.Label>Địa chỉ</Form.Label>
                        <InputGroup className="mb-3">
                            <Form.Control
                                placeholder="Dia chi"
                                aria-label="Dia chi"
                                aria-describedby="basic-addon1"
                                value={address}
                                onChange={(event) => setAddress(event.target.value)}
                                type="text"
                            />
                        </InputGroup>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Label>Ngày nhập học</Form.Label>
                        <InputGroup style={{ width: '150px' }}>
                            <Form.Control
                                placeholder="Ngày nhập học"
                                aria-label="Ngày nhập học"
                                aria-describedby="basic-addon1"
                                type="date" 
                                value={joinDate}
                                onChange={(event) => setJoinDate(event.target.value)}
                            />
                        </InputGroup>
                    </Col>
                    <Col>
                        <Form.Label>Trạng thái</Form.Label>
                        <InputGroup style={{ width: '100px' }}>
                            <Form.Control
                                as="select"
                                aria-label="Trạng thái"
                                value={status === 'true' ? 'Học' : 'Bỏ học'} 
                                onChange={(event) => setStatus(event.target.value === 'Học' ? 'true' : 'false')}
                                type="text"
                            >
                                <option>Học</option>
                                <option>Bỏ học</option>
                            </Form.Control>
                        </InputGroup>
                    </Col>
                </Row>
                <Row className="justify-content-end mb-3">
                    <Col xs="auto">
                        <div className="d-inline-block me-3">
                            <Button variant="primary" onClick={handleSave}>Lưu thông tin</Button>
                        </div>
                        <div className="d-inline-block">
                            <Button variant="danger" onClick={handleCancel}>Hủy bỏ</Button>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};
