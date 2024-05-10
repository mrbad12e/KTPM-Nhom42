import React, { useState } from 'react';
import { Table, Container, Row, Col, Button, Form, InputGroup, Alert } from 'react-bootstrap';
import Sidebar_admin from '../../components/Layouts/Sidebar/sidebarAdmin';
import globalstyles from '../../CSSglobal.module.css';

export const AddStudent = () => {
    const [mssv, setMssv] = useState('');
    const [mssvError, setMssvError] = useState('');

    const handleMssvChange = (event) => {
        const value = event.target.value;
        if (/^\d{0,9}$/.test(value)) { // Kiểm tra xem giá trị nhập vào có phải là chuỗi chứa từ 0 đến 9 chữ số hay không
            setMssv(value);
            setMssvError('');
        } else {
            setMssvError('MSSV chỉ được phép nhập tối đa 9 chữ số');
        }
    };

    return (
        <div>
            <Sidebar_admin/>
            <Container fluid className={globalstyles['main-background']}>
                <Row>
                    <Col className="text-center mb-3">
                        <h4>Thêm sinh viên</h4>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Label>MSSV</Form.Label>
                        <InputGroup className="mb-3">
                            <Form.Control
                                placeholder="ID"
                                aria-label="ID"
                                aria-describedby="basic-addon1"
                                value={mssv}
                                onChange={handleMssvChange}
                                type="text" // Đổi type từ "number" sang "text"
                            />
                        </InputGroup>
                        {mssvError && <Alert variant="danger">{mssvError}</Alert>}
                    </Col>
                    <Col>
                        <Form.Label>Email</Form.Label>
                        <InputGroup className="mb-3">
                            <Form.Control
                                placeholder="Email"
                                aria-label="Email"
                                aria-describedby="basic-addon1"
                            />
                        </InputGroup>
                    </Col>
                    <Col>
                        <Form.Label>Password</Form.Label>
                        <InputGroup className="mb-3">
                            <Form.Control
                                placeholder="Password"
                                aria-label="Password"
                                aria-describedby="basic-addon1"
                            />
                        </InputGroup>
                    </Col>
                </Row>             
                <Row>
                    <Col>
                        <Form.Label>Họ</Form.Label>
                        <InputGroup className="mb-3">
                            <Form.Control
                                placeholder="Ho"
                                aria-label="Ho"
                                aria-describedby="basic-addon1"
                            />
                        </InputGroup>
                    </Col>
                    <Col>
                        <Form.Label>Tên</Form.Label>
                        <InputGroup className="mb-3">
                            <Form.Control
                                placeholder="Ten"
                                aria-label="Ten"
                                aria-describedby="basic-addon1"
                            />
                        </InputGroup>
                    </Col>
                    <Col>
                        <Form.Label>Giới tính</Form.Label>
                        <InputGroup className="mb-3">
                            <Form.Control
                                as="select"
                                aria-label="Giới tính"
                            >
                                <option>Nam</option>
                                <option>Nữ</option>
                            </Form.Control>
                        </InputGroup>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Label>Ngày sinh</Form.Label>
                        <InputGroup className="mb-3">
                            <Form.Control
                                placeholder="DD/MM/YY"
                                aria-label="DD/MM/yy"
                                aria-describedby="basic-addon1"
                            />
                        </InputGroup>
                    </Col>
                    <Col>
                        <Form.Label>Số điện thoại</Form.Label>
                        <InputGroup className="mb-3">
                            <Form.Control
                                placeholder="So dien thoai"
                                aria-label="So dien thoai"
                                aria-describedby="basic-addon1"
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
                            />
                        </InputGroup>
                    </Col>
                </Row>
                <Row className="justify-content-end mb-3">
                    <Col xs="auto">
                        <div className="d-inline-block me-3">
                            <Button variant="primary">Lưu thông tin</Button>
                        </div>
                        <div className="d-inline-block">
                            <Button variant="danger">Hủy bỏ</Button>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};
