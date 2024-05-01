import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Table } from 'react-bootstrap';
import axios from 'axios';
import Sidebar from '../../components/Layouts/Sidebar/Sidebar'; 
import '../CSSglobal.css';
import './Timetable.css';

export const Timetable = () => {
    const [timetable, setTimetable] = useState([]);
    const [selectedClassInfo, setSelectedClassInfo] = useState(null);
    const [selectedSubjectName, setSelectedSubjectName] = useState('');

    useEffect(() => {
        const fetchTimetable = async () => {
            try {
                const email = localStorage.getItem('email');
                if (email) {
                    const response = await axios.post('http://localhost:5000/student/timetable', { email });
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
            // Nếu đã có thông tin chi tiết lớp học được hiển thị và môn học click vào giống với môn học đã chọn trước đó, ẩn thông tin đi
            if (selectedClassInfo && selectedSubjectName === classInfo.subject_name) {
                setSelectedClassInfo(null);
                setSelectedSubjectName('');
            } else {
                const response = await axios.post('http://localhost:5000/student/classDetail', {
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
            <table className="tableStudent-container">
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>MSSV</th>
                        <th>Họ và tên</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Kiểm tra selectedClassInfo trước khi truy cập vào studentDetails */}
                    {selectedClassInfo && selectedClassInfo.studentDetails && selectedClassInfo.studentDetails.map((student, index) => (
                        <tr key={student.id}>
                            <td>{index + 1}</td>
                            <td>{student.id}</td>
                            <td>{student.name}</td>
                            <td>{student.email}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    };

    return (
        <div className="outer-container">
            <Container fluid className="gray-background"> 
                <Row>
                    <Sidebar />
                    <Container fluid className="main-background">
                        <Col md={9} className='right-content'>
                            <h2>THỜI KHÓA BIỂU HỌC KỲ 20212</h2>
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
                            </div>
                        </Col>
                    </Container>
                </Row>
            </Container>
        </div>
    );
}

export default Timetable;
