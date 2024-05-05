import React, { useState, useEffect } from 'react';
import { Table, Container, Row, Col, Button, TabContainer } from 'react-bootstrap';
import Sidebar from '../../components/Layouts/Sidebar/Sidebar_student'; 
import './FeePayment.module.css';
import UpdateIcon from '../../../assets/img/Update.png';
import DeleteIcon from '../../../assets/img/Delete.png';

export const FeePayment = () => {

    const [inputClassID, setInputClassID] = useState('');
    const handleInputClassID = (event) => {
        setInputClassID(event.target.value);
    };

    const [inputSubject, setInputSubject] = useState('');
    const handleInputSubject = (event) => {
        setInputSubject(event.target.value);
    };

    const [selectedDay, setSelectedDay] = useState('1'); 
    const handleDayChange = (event) => {
        setSelectedDay(event.target.value);
    };

    const [inputStart, setInputStart] = useState('');
    const [errorStart, setErrorStart] = useState('');
    const handleInputStart = (event) => {
        setInputStart(event.target.value);
    };

    const handleBlurStart = () => {
        if (!isValidTimeFormat(inputStart)) {
            setErrorStart(
                <div className="error-message fade-out " style={{ width: '450px' }}>
                    Định dạng không hợp lệ. Vui lòng nhập theo định dạng giờ:phút (ví dụ: 6:45).
                </div>);
            setTimeout(() => setErrorStart(''), 5000);
        } else {
            setErrorStart('');
        }
    };

    const isValidTimeFormat = (value) => {
        const regex = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
        return regex.test(value);
    };
    

    const [inputEnd, setInputEnd] = useState('');
    const [errorEnd, setErrorEnd] = useState('');
    const handleInputEnd = (event) => {
        setInputEnd(event.target.value);
    };

    const handleBlurEnd = () => {
        if (!isValidTimeFormat(inputEnd)) {
            setErrorEnd(
                <div className="error-message fade-out " style={{ width: '450px' }}>
                    Định dạng không hợp lệ. Vui lòng nhập theo định dạng giờ:phút (ví dụ: 06:45).
                </div>);
            setTimeout(() => setErrorEnd(''), 5000);
        } else {
            setErrorEnd('');
        }
    };

    const [inputLocation, setInputLocation] = useState('');
    const handleInputLocation = (event) => {
        setInputLocation(event.target.value);
    };

    const [TimeRows, setRows] = useState([]);

    const handleAddTimeButtonClick = () => {
        setRows([...TimeRows, {}]); 
    };
    
    const handleDeleteTimeButtonClick = () => {
        const updatedTimeRows = [...TimeRows];
        updatedTimeRows.pop();
        setRows(updatedTimeRows);
    };

    useEffect(() => {
        // Thêm một hàng `<TimeInputRow />` ban đầu khi component được khởi tạo
        handleAddTimeButtonClick();
    }, []);

    return (
        <div className="gray-background">
            <Row className="content">
                <Sidebar />
                <Container fluid className="main-background">
                    <Row>
                        <Col>
                        <h2 style={{fontSize: '1.5vw', fontWeight: 'bold'}}>Thêm mới thông tin lớp</h2>
                        </Col>
                    </Row>
                    <Container fluid style={{ marginTop: '5vh' }}>
                        <Row>
                            <Col style={{ width: '40%' }}>{/* Nửa trái */}
                                <Container>
                                    <Col>
                                        <Row>
                                            <Col>
                                                <div style={{ position: 'fixed', left: '22vw', top: '23vh',fontSize: '1vw'}}>Mã lớp</div>
                                            </Col>
                                            <Col style={{ position: 'fixed', left: '25vw', top: '23vh',width: '15.5vw'}} 
                                            >
                                                <input 
                                                    type="text" 
                                                    value={inputClassID} 
                                                    onChange={handleInputClassID} 
                                                    placeholder="Nhập mã lớp" 
                                                    style={{ fontSize: '1vw', width: '255px', height: '30px' }}
                                                />
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <h5 style={{ position: 'fixed', left: '22vw', top: '23vh',fontSize: '1vw'}}>Học phần</h5>
                                            </Col>
                                            <Col style={{ minWidth: 0, marginLeft: '-140px' }} >
                                                <input 
                                                    type="text" 
                                                    value={inputSubject} 
                                                    onChange={handleInputSubject} 
                                                    placeholder="Nhập mã học phần hoặc tên học phần" 
                                                    style={{ fontSize: '14px', width: '255px', height: '30px' }}
                                                />
                                            </Col>
                                        </Row>
                                    </Col>
                                </Container> 
                            </Col>                               
                            <Col style={{ width: '60%' }}> {/* Nửa phải */}
                                <Container >
                                    <Row style={{ marginBottom: '20px' }}>
                                        <Col>
                                            <div style={{ fontSize: '25px', marginLeft: '220px' }}>Thời gian</div>
                                        </Col>
                                        <Col style={{ marginRight: '-450px' }}>
                                            <Button onClick={handleAddTimeButtonClick} variant="dark" style={{ height: '30px', width: '80px' }}>
                                                <div style={{ fontSize: '15px' }}>Thêm</div>
                                            </Button>
                                        </Col>
                                    </Row>
                                    <Container fluid className="scrollbar-container" style={{ marginLeft: '-100px',width: '700px', border: '2px solid #333', borderRadius: '8px', padding: '20px', maxHeight: '155px', overflowY: 'auto' }}>
                                        {TimeRows.map((row, index) => (  
                                            <Row key={index} >
                                                {
                                                    <Row>
                                                    <Col >
                                                        <div style={{ fontSize: '15px'}}>Thứ</div>
                                                    </Col> 
                                                    <Col>
                                                        <select value={selectedDay} onChange={handleDayChange} className="custom-select"  style={{ fontSize: '14px', width: '30px', height: '30px', marginLeft: '-35px'}}>
                                                            <option value="1">2</option>
                                                            <option value="2">3</option>
                                                            <option value="3">4</option>
                                                            <option value="4">5</option>
                                                            <option value="5">6</option>
                                                            <option value="7">7</option>
                                                            <option value="CN">CN</option>
                                                        </select>
                                                    </Col>
                                                    <Col style={{ marginLeft: '-60px' }}>
                                                        <div style={{ fontSize: '15px'}}>Bắt đầu</div>
                                                    </Col>
                                                    <Col style={{ marginLeft: '-18px' }}>
                                                        <input 
                                                            type="text" 
                                                            value={inputStart} 
                                                            onChange={handleInputStart} 
                                                            onBlur={handleBlurStart} // Thêm sự kiện onBlur để kiểm tra sau khi rời khỏi ô nhập liệu
                                                            placeholder="06:45" 
                                                            style={{ fontSize: '14px', width: '55px', height: '30px', borderColor: errorStart ? 'red' : null, textAlign: 'center' }}
                                                        />
                                                        {errorStart && <div style={{ color: 'red', fontSize: '12px' }}>{errorStart}</div>} 
                                                    </Col>
                                                    <Col>
                                                        <div style={{ fontSize: '15px', marginLeft: '-10px'}}>Kết thúc</div>
                                                    </Col>
                                                    <Col style={{ marginLeft: '-25px'}}>
                                                        <input 
                                                            type="text" 
                                                            value={inputEnd} 
                                                            onChange={handleInputEnd} 
                                                            onBlur={handleBlurEnd} 
                                                            placeholder="08:15" 
                                                            style={{ fontSize: '14px', width: '55px', height: '30px', borderColor: errorEnd ? 'red' : null, textAlign: 'center'}} 
                                                        />
                                                        {errorEnd && <div style={{ color: 'red', fontSize: '12px' }}>{errorEnd}</div>}
                                                    </Col>
                                                    <Col>
                                                        <div style={{ fontSize: '15px', marginLeft: '-12px'}}>Địa điểm</div>
                                                    </Col>
                                                    <Col style={{ marginLeft: '-20px'}}>
                                                        <input 
                                                        type="text" 
                                                        value={inputLocation} 
                                                        onChange={handleInputLocation} 
                                                        placeholder="402-D9" 
                                                        style={{ fontSize: '14px', width: '100px', height: '30px' }}
                                                        />
                                                    </Col>
                                                    <Col style={{ marginRight: '-30px' }}>
                                                        <Button onClick={handleDeleteTimeButtonClick} variant="dark" style={{ height: '25px', width: '50px' }}>
                                                            <div style={{ fontSize: '12px'}}>Xóa</div>
                                                        </Button> 
                                                    </Col>
                                                </Row>                               
                                                }
                                            </Row>                                              
                                        ))}
                                    </Container>
                                </Container>
                            </Col>
                        </Row>
                        <Row  style={{ marginTop: '50px' }}>
                            <Col >{/* Nửa trái */}
                                <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th style={{ textAlign: 'center' }}>STT</th>
                                            <th style={{ textAlign: 'center' }}>Tên</th>
                                            <th style={{ textAlign: 'center' }}>Mssv</th>
                                            <th style={{ textAlign: 'center' }}>Thao tác</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        
                                    </tbody>
                                </Table>                 
                            </Col>
                            <Col >{/* Nửa phải */}
                                <Row style={{ marginBottom: '20px' }}>
                                    <div style={{ fontSize: '25px', marginLeft: '220px' }}>Tìm kiếm sinh viên</div>
                                </Row>
                                <Row>
                                    <Col>
                                        <div>MSSV</div>
                                    </Col>
                                    <Col>
                                    <input 
                                        type="text" 
                                        value={inputStart} 
                                        onChange={handleInputStart} 
                                        onBlur={handleBlurStart} // Thêm sự kiện onBlur để kiểm tra sau khi rời khỏi ô nhập liệu
                                        placeholder="06:45" 
                                        style={{ fontSize: '14px', width: '55px', height: '30px', borderColor: errorStart ? 'red' : null, textAlign: 'center' }}
                                    /> 
                                    </Col>
                                    <Col>
                                        <Button onClick={handleDeleteTimeButtonClick} variant="dark" style={{ height: '25px', width: '50px' }}>
                                            <div style={{ fontSize: '12px'}}>Xóa</div>
                                        </Button> 
                                    </Col>
                                </Row> 
                                <Row>
                                    <div>Tên</div>
                                </Row>
                                <Row>
                                    <Col>
                                        <Button onClick={handleDeleteTimeButtonClick} variant="dark" style={{ height: '25px', width: '50px' }}>
                                            <div style={{ fontSize: '12px'}}>Lưu thông tin</div>
                                        </Button> 
                                    </Col>
                                    <Col>
                                        <Button onClick={handleDeleteTimeButtonClick} variant="dark" style={{ height: '25px', width: '50px' }}>
                                            <div style={{ fontSize: '12px'}}>Hủy bỏ</div>
                                        </Button> 
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Container>
                </Container> 
            </Row>   
        </div>
    );
};

export default FeePayment;
