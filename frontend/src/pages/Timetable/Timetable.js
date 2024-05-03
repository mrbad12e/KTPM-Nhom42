import React, { useState, useEffect } from 'react';
import { Form, Container, Row, Col, Table } from 'react-bootstrap';
import axios from 'axios';
import Sidebar from '../../components/Layouts/Sidebar/Sidebar'; 
import '../CSSglobal.css';
import './Timetable.css';

export const Timetable = () => {
    const [timetable, setTimetable] = useState([]);
    const [selectedClassInfo, setSelectedClassInfo] = useState(null);
    const [selectedSubjectName, setSelectedSubjectName] = useState('');
    const [selectedSemester, setSelectedSemester] = useState('20212'); // State để lưu kỳ học được chọn

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
            <Table striped bordered hover style={{width: '65%', marginLeft: '15%'}}>
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

    return (
        <div>
            <Container fluid className="gray-background"> 
                <Row>
                    <Sidebar />
                    <Container fluid className="main-background">
                        <Row style={{ marginTop: '5vh'}}>
                            <Col style={{marginLeft: '20vw'}}>
                                <h2 style={{fontSize: '2vw', fontWeight: 'bold'}}>THỜI KHÓA BIỂU KỲ</h2>
                            </Col>
                            <Col style={{marginRight: '10vw',position: 'relative', top: '-1vh'}}>
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
                        <div style={{marginTop: '7vh'}}>
                            <Table striped bordered hover style={{width: '80%', marginLeft: '10%'}}>
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
                            <hr style={{
                                    borderStyle: 'solid', // Kiểu viền
                                    borderWidth: '2px', // Độ dày
                                    borderColor: 'black', // Màu sắc
                                    margin: '6vh 2vh' // Khoảng cách top và bottom
                                }} />
                            {selectedClassInfo && (
                                <div className="selected-class-info">
                                    <h2 style={{fontSize: '1.5vw', fontWeight: 'bold', marginLeft: '25vw', marginBottom: '3vh'}}>Thông tin chi tiết của lớp học</h2>
                                    <Container style={{ marginLeft: '5vw'}}> 
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
                            )}
                        </div>

                    </Container>
                </Row>
            </Container>
        </div>
    );
}
