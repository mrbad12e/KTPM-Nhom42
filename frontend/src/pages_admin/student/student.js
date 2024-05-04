
import React, { useState } from 'react';
import { Table, Container, Row, Col, Button } from 'react-bootstrap';
import {Sidebar_admin} from '../../components/Layouts/Sidebar_admin/Sidebar_admin'; 

import ViewIcon from '../../../assets/img/View.png';
import DeleteIcon from '../../../assets/img/Delete.png';
import './student.css';
// import '../../CSSglobal.css';

export const Student = () => {
    const [inputValue, setInputValue] = useState('');

    const handleChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleSearchButtonClick = () => {
        console.log('Đã nhấn nút Tìm kiếm với giá trị:', inputValue);
    };

    return (
        <div className="gray-background">
            <Row className="content">
                <Sidebar_admin></Sidebar_admin>
                <Container fluid className="main-background">
                    <Row>
                        <Col>
                            <h4>Danh sách lớp</h4>
                        </Col>
                        <Col>
                            <Button onClick={handleSearchButtonClick}  style={{ marginLeft: '80%' }}>Thêm mới</Button> 
                        </Col>
                    </Row>
                    <Row className="mt-3">
                        <Col md={3} style={{ marginLeft: '5%' }}>
                            <input 
                                type="text" 
                                value={inputValue} 
                                onChange={handleChange} 
                                placeholder="Tìm tên lớp hoặc mã lớp" 
                            />
                        </Col>
                        <Col md={6}>
                            <Button onClick={handleSearchButtonClick} variant="dark">Tìm kiếm</Button> 
                        </Col>
                    </Row>
                    <Table className="student-table">
                        <thead>
                            <tr>
                                <th style={{  textAlign: 'center' }}>MSSV</th>
                                <th style={{  textAlign: 'center' }}>Họ và tên</th>
                                <th style={{  textAlign: 'center' }}>Chương trình đào tạo</th>
                                <th style={{ textAlign: 'center' }}>CPA</th>
                                <th style={{  textAlign: 'center' }}>Email</th>
                                <th style={{  textAlign: 'center' }}>Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>20212</td>
                                <td style={{ verticalAlign: 'middle', textAlign: 'center' }}>HP001</td>
                                <td style={{ verticalAlign: 'middle' }}>
                                    <div style={{ marginLeft: '5%' }}>Lập trình</div>
                                </td>
                                <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                                        <div style={{ overflow: 'hidden', position: 'relative', width: '30px', height: '30px', borderRadius: '5px' }}>
                                            <div onClick={handleSearchButtonClick} style={{ cursor: 'pointer', position: 'absolute', width: '100%', height: '100%', zIndex: '1' }}>
                                                <img src={ViewIcon} alt="Search" style={{ width: '100%', height: '100%', borderRadius: '5px' }} />
                                            </div>
                                        </div>
                                        <div style={{ marginLeft: '15px', overflow: 'hidden', position: 'relative', width: '30px', height: '30px', borderRadius: '5px' }}>
                                            <div onClick={handleSearchButtonClick} style={{ cursor: 'pointer', position: 'absolute', width: '100%', height: '100%', zIndex: '1' }}>
                                                <img src={DeleteIcon} alt="Search" style={{ width: '100%', height: '100%', borderRadius: '5px' }} />
                                            </div>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                </Container>
            </Row>
        </div>
    );
};