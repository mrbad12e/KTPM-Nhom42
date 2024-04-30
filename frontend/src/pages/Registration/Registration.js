import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Sidebar from '../Sidebar/Sidebar';
import '../CSSglobal.css';

export const Registration = () => {

    const [tooltipContent, setTooltipContent] = useState(null);

    const handleMouseEnter = (time) => {
        setTooltipContent(time);
    };

    const handleMouseLeave = () => {
        setTooltipContent(null);
    };

    return (
        <div className="gray-background">
            <Row className="content">
                <Sidebar />
                <Container fluid className="main-background">
                    <Col md={9} className="right-content">
                        <h2>Đăng ký học tập kỳ </h2>
                        <div className="row mb-3">
                            <div className="col-md-4">
                                <input type="text" className="form-control" placeholder="Mã môn học" aria-label="Mã môn học" aria-describedby="basic-addon2" />
                            </div>
                            <div className="col-md-4">
                                <input type="text" className="form-control" placeholder="Tên môn học" aria-label="Tên môn học" aria-describedby="basic-addon2" />
                            </div>
                            <div className="col-md-4">
                                <button className="btn btn-primary" type="button">Tìm kiếm</button>
                            </div>
                        </div>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">Mã lớp</th>
                                    <th scope="col">Mã môn học</th>
                                    <th scope="col">Tên môn học</th>
                                    <th scope="col">Thời gian</th>
                                    <th scope="col">Số lượng</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>101</td>
                                    <td>001</td>
                                    <td>Lập trình Java</td>
                                    <td onMouseEnter={() => handleMouseEnter("Thứ 2, 7:30 - 9:30")} onMouseLeave={handleMouseLeave}>
                                        Thứ 2, 7:30 - 9:30
                                        {tooltipContent && (
                                            <span className="tooltip">{tooltipContent}</span>
                                        )}
                                    </td>
                                    <td>30</td>
                                </tr>
                                <tr>
                                    <td>102</td>
                                    <td>002</td>
                                    <td>Web Development</td>
                                    <td onMouseEnter={() => handleMouseEnter("Thứ 3, 9:00 - 11:00")} onMouseLeave={handleMouseLeave}>
                                        Thứ 3, 9:00 - 11:00
                                        {tooltipContent && (
                                            <span className="tooltip">{tooltipContent}</span>
                                        )}
                                    </td>
                                    <td>25</td>
                                </tr>
                            </tbody>
                        </table>
                    </Col>
                </Container>
            </Row>
        </div>
    );
};
