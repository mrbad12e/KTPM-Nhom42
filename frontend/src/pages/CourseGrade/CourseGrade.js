import React, { useState } from 'react';
import { Table, Container, Row, Col, Button } from 'react-bootstrap';
import Sidebar from '../../components/Layouts/Sidebar/Sidebar'; 
import './CourseGrade.module.css';

export const CourseGrade = () => {
    const [inputValue, setInputValue] = useState('');

    const handleChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleSearchButtonClick = () => {
        // Xử lý tìm kiếm dữ liệu dựa trên giá trị của inputValue
        // Bạn có thể gọi các hàm xử lý dữ liệu ở đây
        console.log('Đã nhấn nút Tìm kiếm với giá trị:', inputValue);
    };

    return (
        <div className="gray-background">
            <Row className="content">
                <Sidebar />
                <Container fluid className="main-background">
                    <Row>
                        <Col md={3}>
                            <input 
                                type="text" 
                                value={inputValue} 
                                onChange={handleChange} 
                                placeholder="Nhập vào đây" 
                            />
                        </Col>
                        <Col md={6}>
                            <Button onClick={handleSearchButtonClick} variant="dark">Tìm kiếm</Button> 
                        </Col>
                    </Row>
                    <div style={{ marginLeft: '15%' }}>
                        <Table style={{ width: '80%' }}>
                            <thead>
                                <tr>
                                    <th style={{ width: '10%', textAlign: 'center' }}>Học Kỳ</th>
                                    <th style={{ width: '15%', textAlign: 'center' }}>Mã học phần</th>
                                    <th style={{ width: '45%', textAlign: 'center' }}>Tên học phần</th>
                                    <th style={{ width: '10%', textAlign: 'center' }}>Tín chỉ</th>
                                    <th style={{ width: '20%', textAlign: 'center' }}>Điểm học phần</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>20212</td>
                                    <td style={{ verticalAlign: 'middle', textAlign: 'center' }}>HP001</td>
                                    <td style={{ verticalAlign: 'middle' }}>
                                        <div style={{ marginLeft: '5%' }}>Lập trình</div>
                                    </td>
                                    <td style={{ verticalAlign: 'middle', textAlign: 'center' }}>3</td>
                                    <td style={{ verticalAlign: 'middle', textAlign: 'center' }}>8.5</td>
                                </tr>
                            </tbody>
                        </Table>
                    </div>
                </Container>
            </Row>
        </div>
    );
};

export default CourseGrade;
