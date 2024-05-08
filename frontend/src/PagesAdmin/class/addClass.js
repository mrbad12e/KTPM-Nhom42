import React, { useState, useEffect } from 'react';
import { Table, Container, Row, Col, Button, TabContainer } from 'react-bootstrap';
import Sidebar_admin from '../../components/Layouts/Sidebar/sidebarAdmin'; 
import styles from './addClass.module.css';
import globalstyles from '../../CSSglobal.module.css';

export const AddClass = () => {

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
        <div>
            <Sidebar_admin/>
            <Container fluid className={globalstyles['main-background']}>
                <div className={globalstyles['left-title']}>Thêm mới thông tin lớp</div>
                <div style={{marginLeft: '30px', marginTop: '25px',fontSize: '16px'}}>Mã lớp</div>
                <div style={{position: 'absolute', left: '120px', top: '60px' }}>
                    <input type="text" value={inputClassID} onChange={handleInputClassID}  placeholder="Nhập mã lớp"/>
                </div>
                <div style={{marginLeft: '30px', marginTop: '30px',fontSize: '16px'}}>Học Phần</div>
                <div style={{position: 'absolute', left: '120px', top: '110px' }}>
                    <input type="text" value={inputClassID} onChange={handleInputClassID}  placeholder="Nhập mã học phần"/>
                </div>
                <Container className={styles['timetable']}>
                    <div style={{textAlign: 'center', fontSize: '20px', fontWeight: 'bold'}}>Thời gian</div>
                    <Button style={{position: 'absolute', top: '10px', right: '10px', height: '30px', fontSize: '14px'}} onClick={handleAddTimeButtonClick} variant="dark">Thêm mới</Button> 
                    <div style={{ marginTop: '10px', maxHeight: '150px', overflowY: 'auto' }}>
                        <Table>
                            <thead>
                                <tr>
                                    <th style={{textAlign: 'center'}}>Thứ</th>
                                    <th style={{textAlign: 'center'}}>Bắt đầu</th>
                                    <th style={{textAlign: 'center'}}>Kết thúc</th>
                                    <th style={{textAlign: 'center'}}>Địa điểm</th>
                                    <th style={{textAlign: 'center'}}></th>
                                </tr>
                            </thead>
                            <tbody>{
                                TimeRows.map((row, rowIndex) => (
                                    <tr key={rowIndex} style={{ textAlign: 'center' }}>
                                        <td>
                                            <select value={selectedDay} className={styles['custom-select']} onChange={handleDayChange}>
                                                <option value="1">2</option>
                                                <option value="2">3</option>
                                                <option value="3">4</option>
                                                <option value="4">5</option>
                                                <option value="5">6</option>
                                                <option value="7">7</option>
                                                <option value="CN">CN</option>
                                            </select>
                                        </td>
                                        <td>
                                            <input type="text" value={inputStart} onChange={handleInputStart} onBlur={handleBlurStart} placeholder="06:45"
                                                className={styles['custom-select']} style={{ borderColor: errorStart ? 'red' : null }} />
                                        </td>
                                        <td>
                                            <input type="text" value={inputEnd} onChange={handleInputEnd} onBlur={handleBlurEnd} placeholder="06:45"
                                                className={styles['custom-select']} style={{ borderColor: errorEnd ? 'red' : null }} />
                                        </td>
                                        <td>
                                            <input type="text" value={inputLocation} onChange={handleInputLocation} placeholder="402-D9"
                                                className={styles['custom-select']} style={{ width: '60px' }} />
                                        </td>
                                        <td>
                                            <Button onClick={handleDeleteTimeButtonClick} variant="dark"
                                                className={styles['custom-select']} style={{ padding: '0' }}>Xóa</Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                    {errorStart && <div style={{ color: 'red', fontSize: '12px' }}>{errorStart}</div>}
                    {errorEnd && <div style={{ color: 'red', fontSize: '12px' }}>{errorEnd}</div>}
                    
                </Container>
                <Table style={{marginTop: '140px'}}>
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
              
                
            </Container>
        </div>
    );
};

export default AddClass;
