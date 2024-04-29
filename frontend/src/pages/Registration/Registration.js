import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

export const Registration = () => {
    const handleLogout = () => {
        // Xử lý đăng xuất
    };

    return (
        <div className="homepage-background px-1">
            <Container fluid>
                <Row className="content">
                    <Col md={3} className="left-content">
                        {/* Nội dung bên trái */}
                        
                        <h3 className="text-name">Quang</h3>
                        <ul className="sitemap">
                            <li>
                                <NavLink to="/">Thông tin sinh viên</NavLink>
                            </li>
                            <li>
                                <NavLink to="/registration">Đăng kí học tập</NavLink>
                            </li>
                            <li>
                                <NavLink to="/">Thời khóa biểu</NavLink>
                            </li>
                            <li>
                                <NavLink to="/">Thành tích học tập</NavLink>
                            </li>
                            <li>
                                <NavLink to="/">Thông tin giảng viên</NavLink>
                            </li>
                            <li>
                                <Button variant="primary" onClick={handleLogout}>Đăng xuất</Button>
                            </li>
                        </ul>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}
