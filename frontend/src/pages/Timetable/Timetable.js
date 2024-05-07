import React, { useState, useEffect } from 'react';
<<<<<<< HEAD
import { Form, Container, Row, Col, Table } from 'react-bootstrap';
import axios from 'axios';
import { Sidebar } from '../../components/Layouts/Sidebar/Sidebar'; 
import '../CSSglobal.css';
import './Timetable.css';
=======
import { Form, Row, Col, Container, Table } from 'react-bootstrap';
import axios from 'axios';
import Sidebar from '../../components/Layouts/Sidebar/sidebarStudent'; 
import globalstyles from '../../CSSglobal.module.css';
import styles from './Timetable.module.css';
>>>>>>> 0b1e225134f8c74686cf802ca5632caa7d5d5f75

export const Timetable = () => {
    const [timetable, setTimetable] = useState([]);
    const [selectedClassInfo, setSelectedClassInfo] = useState(null);
    const [selectedSubjectName, setSelectedSubjectName] = useState('');
<<<<<<< HEAD
    const [selectedSemester, setSelectedSemester] = useState('20212'); // State để lưu kỳ học được chọn

    useEffect(() => {
        const fetchTimetable = async () => {
            try {
                const email = localStorage.getItem('email');
                if (email) {
                    const response = await axios.post('/student/timetable', { email });
                    setTimetable(response.data.TimetableInfo);
                }
            } catch (error) {
                console.error('Error fetching timetable:', error.message);
            }
=======
    const [selectedSemester, setSelectedSemester] = useState('20212');
    const [tableWidth, setTableWidth] = useState(null);

    useEffect(() => {
        const handleResize = () => {
            setTableWidth(document.getElementById('table-container').offsetWidth);
>>>>>>> 0b1e225134f8c74686cf802ca5632caa7d5d5f75
        };

        window.addEventListener('resize', handleResize);
        handleResize(); // Đảm bảo rằng biến state được cập nhật ban đầu
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    // Function to handle click on class
    const handleClick = async (classInfo) => {
        try {
            if (selectedClassInfo && selectedSubjectName === classInfo.subject_name) {
                setSelectedClassInfo(null);
                setSelectedSubjectName('');
            } else {
                const response = await axios.post('student/classDetail', {
                    email: localStorage.getItem('email'),
                    class_id: classInfo.class_id
                });
                setSelectedClassInfo(response.data.ClassDetailInfo);
                setSelectedSubjectName(classInfo.subject_name); // Lưu tên môn học
            }
        } catch (error) {
            console.error('Error fetching class detail:', error.message);
        }
    };

    // Function to render student details
    const renderStudentDetails = () => {
        return (
            <Table striped bordered hover className={styles['student']}>
                <thead>
                    <tr>
                        <th style={{ textAlign: 'center' }}>STT</th>
                        <th style={{ textAlign: 'center' }}>MSSV</th>
                        <th style={{ textAlign: 'center' }}>Họ và tên</th>
                        <th style={{ textAlign: 'center' }}>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {selectedClassInfo && selectedClassInfo.studentDetails && selectedClassInfo.studentDetails.map((student, index) => (
                        <tr key={student.id}>
                            <td style={{ textAlign: 'center' }}>{index + 1}</td>
                            <td style={{ textAlign: 'center' }}>{student.id}</td>
                            <td>{student.name}</td>
                            <td>{student.email}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        );
    };

    useEffect(() => {
        const fetchTimetable = async () => {
            try {
                const email = localStorage.getItem('email');
                if (email) {
                    const response = await axios.post('student/timetable', { email });
                    setTimetable(response.data.TimetableInfo);
                }
            } catch (error) {
                console.error('Error fetching timetable:', error.message);
            }
        };
        fetchTimetable();
    }, []);

    return (
<<<<<<< HEAD
        <div className="outer-container">
            <Container fluid className="gray-background"> 
                <Row>
                    <Sidebar />
                    <Container fluid className="main-background">
                    <Col md={9} className="right-content">
                    <Row className="align-items-center">
                        <Col md={9}>
                            <h2>THỜI KHÓA BIỂU KỲ</h2>
                        </Col>
                        <Col md={3} className="d-flex justify-content-end">
                            <Form.Select 
                                className="select-semester" 
                                onChange={(e) => setSelectedSemester(e.target.value)} 
                                value={selectedSemester}
                            >
                                <option value="20212">20212</option>
                                {/* Thêm các tùy chọn cho các kỳ học khác */}
                            </Form.Select>
                        </Col>
                    </Row>
                            <div className="table-container">
                                <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th style={{ textAlign: 'center' }}>Thứ</th>
                                            <th style={{ textAlign: 'center' }}>Mã lớp</th>
                                            <th style={{ textAlign: 'center' }}>Môn học</th>
                                            <th style={{ textAlign: 'center' }}>Thời gian</th>
                                            <th style={{ textAlign: 'center' }}>Phòng học</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {timetable.map(item => (
                                           <tr key={`${item.class_id}-${item.weekday}-${item.subject_name}-${item.time}-${item.location} `}>
                                                <td style={{ textAlign: 'center' }}>{item.weekday}</td>
                                                <td style={{ textAlign: 'center' }}>{item.class_id}</td>
                                                <td>
                                                    <span 
                                                        onClick={() => handleClick(item)} 
                                                        style={{ cursor: 'pointer' }}
                                                    >
                                                        {item.subject_name}
                                                    </span>
                                                </td>
                                                <td style={{ textAlign: 'center' }}>{item.time}</td>
                                                <td style={{ textAlign: 'center' }}>{item.location}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                                {selectedClassInfo && (
                                    <div className="selected-class-info">
                                        <h3>Thông tin chi tiết của lớp học</h3>
                                        <p><strong>Môn học:</strong> {selectedSubjectName}</p>
                                        <p><strong>Loại lớp:</strong> {selectedClassInfo.classInfo.type}</p>
                                        {/* Thêm các điều kiện để tránh lỗi khi truy cập vào thuộc tính của đối tượng null hoặc undefined */}
                                        {selectedClassInfo.lecturerInfo && selectedClassInfo.lecturerInfo.length > 0 && (
                                            <>
                                                <p><strong>Giảng viên:</strong> {selectedClassInfo.lecturerInfo[0].name}</p>
                                                <p><strong>Email:</strong> {selectedClassInfo.lecturerInfo[0].email}</p>
                                                <p><strong>Số điện thoại:</strong> {selectedClassInfo.lecturerInfo[0].phone}</p>
                                            </>
                                        )}
                                        <p><strong>Sĩ số:</strong> {selectedClassInfo.studentCount}</p>
                                        
                                        {/* Render student details */}
                                        {renderStudentDetails()}
                                    </div>
                                )}
=======
        <div>
            <Sidebar />
            <Container fluid className={globalstyles['main-background']}>
                <div className={globalstyles['title']}>THỜI KHÓA BIỂU KỲ</div>
                <Form.Select className={styles['select-semester']} onChange={(e) => setSelectedSemester(e.target.value)} value={selectedSemester}>
                    <optgroup label="20212" className={styles['select-option-group']}>
                        <option value="20212">20212</option>
                    </optgroup>
                </Form.Select>
                <div id="table-container">
                    {tableWidth && tableWidth < 660 ? (
                        timetable.map(item => (
                            <div style={{marginLeft: '50px'}} key={`${item.class_id}-${item.weekday}-${item.subject_name}-${item.time}-${item.location}`}>
                                <hr/>
                            
                                <Row>
                                    <Col style={{ flex: '0 0 30%', maxWidth: '30%', textAlign: 'center'}}>
                                        <div onClick={() => handleClick(item)}>
                                            <Row><div>Thứ: {item.weekday}</div></Row>
                                            <Row><div style={{ textAlign: 'center' }}>{item.startTime}</div></Row>   
                                            <Row><div>|</div></Row> 
                                            <Row><div>{item.endTime}</div></Row>        
                                        </div>
                                    </Col>
                                    <Col style={{ flex: '0 0 50%', maxWidth: '50%' }}>
                                        <div onClick={() => handleClick(item)}>
                                            <Row><div>{item.subject_name}</div></Row>
                                            <Row><div>Mã lớp: {item.class_id}</div></Row>
                                            <Row><div>Địa điểm: {item.location}</div></Row>
                                        </div>
                                    </Col>
                                </Row>
                             

                                {/* <div onClick={() => handleClick(item)} style={{ cursor: 'pointer' }}>
                                    <span style={{ marginRight: '5vw' }}>Thứ: {item.weekday}</span>
                                    <span style={{ marginRight: '5vw' }}>{item.time}</span>
                                    <span>Địa điểm: {item.location}</span>
                                </div>
                                <div onClick={() => handleClick(item)} style={{ cursor: 'pointer', marginTop:'10px' }}>Mã lớp: {item.class_id}</div>
                                <div onClick={() => handleClick(item)} style={{ cursor: 'pointer' }}>Tên môn học: {item.subject_name}</div> */}
>>>>>>> 0b1e225134f8c74686cf802ca5632caa7d5d5f75
                            </div>
                        ))
                    ) : (
                        <Table striped bordered hover className={globalstyles['table-1000']}>
                            <thead>
                                <tr>
                                    <th style={{ textAlign: 'center' }}>Thứ</th>
                                    <th style={{ textAlign: 'center' }}>Mã lớp</th>
                                    <th style={{ textAlign: 'center' }}>Môn học</th>
                                    <th style={{ textAlign: 'center' }}>Thời gian</th>
                                    <th style={{ textAlign: 'center' }}>Phòng học</th>
                                </tr>
                            </thead>
                            <tbody>
                                {timetable.map(item => (
                                    <tr key={`${item.class_id}-${item.weekday}-${item.subject_name}-${item.time}-${item.location}`}>
                                        <td onClick={() => handleClick(item)} style={{ textAlign: 'center', cursor: 'pointer' }}>{item.weekday}</td>
                                        <td onClick={() => handleClick(item)} style={{ textAlign: 'center', cursor: 'pointer' }}>{item.class_id}</td>
                                        <td onClick={() => handleClick(item)} style={{ cursor: 'pointer' }}>{item.subject_name}</td>
                                        <td onClick={() => handleClick(item)} style={{ textAlign: 'center', cursor: 'pointer' }}>{item.startTime} - {item.endTime}</td>
                                        <td onClick={() => handleClick(item)} style={{ textAlign: 'center', cursor: 'pointer' }}>{item.location}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    )}
                </div>
                <hr/>
                {/* {selectedClassInfo && (
                    <div className="selected-class-info">
                        <div className={globalstyles['title']}>Thông tin chi tiết của lớp học</div>
                        <Container style={{ marginLeft: '5vw' }}>
                            <p><strong>Môn học:</strong> {selectedSubjectName}</p>
                            <p><strong>Loại lớp:</strong> {selectedClassInfo.classInfo.type}</p>
                            {selectedClassInfo.lecturerInfo && selectedClassInfo.lecturerInfo.length > 0 && (
                                <>
                                    <p><strong>Giảng viên:</strong> {selectedClassInfo.lecturerInfo[0].name}</p>
                                    <p><strong>Email:</strong> {selectedClassInfo.lecturerInfo[0].email}</p>
                                    <p><strong>Số điện thoại:</strong> {selectedClassInfo.lecturerInfo[0].phone}</p>
                                </>
                            )}
                            <p><strong>Sĩ số:</strong> {selectedClassInfo.studentCount}</p>
                        </Container>
                        {renderStudentDetails()}
                    </div>
                )} */}
            </Container>
        </div>
    );
<<<<<<< HEAD
}
=======
};
>>>>>>> 0b1e225134f8c74686cf802ca5632caa7d5d5f75
