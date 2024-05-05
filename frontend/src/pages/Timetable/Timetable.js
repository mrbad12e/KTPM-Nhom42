import React, { useState, useEffect } from 'react';
import { Form, Container, Table } from 'react-bootstrap';
import axios from 'axios';
import Sidebar from '../../components/Layouts/Sidebar/Sidebar'; 
import globalstyles from '../../CSSglobal.module.css';
import styles from './Timetable.module.css';

export const Timetable = () => {
    const [timetable, setTimetable] = useState([]);
    const [selectedClassInfo, setSelectedClassInfo] = useState(null);
    const [selectedSubjectName, setSelectedSubjectName] = useState('');
    const [selectedSemester, setSelectedSemester] = useState('20212');
    const [tableWidth, setTableWidth] = useState(null);

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

    useEffect(() => {
        const handleResize = () => {
            setTableWidth(document.getElementById('table-container').offsetWidth);
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

    return (
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
                                <div onClick={() => handleClick(item)} style={{ cursor: 'pointer' }}>Thứ: {item.weekday}</div>
                                <div onClick={() => handleClick(item)} style={{ cursor: 'pointer' }}>Mã lớp: {item.class_id}</div>
                                <div onClick={() => handleClick(item)} style={{ cursor: 'pointer' }}>Tên môn học: {item.subject_name}</div>
                                <div onClick={() => handleClick(item)} style={{ cursor: 'pointer' }}>Thời gian: {item.time}</div>
                                <div onClick={() => handleClick(item)} style={{ cursor: 'pointer' }}>Địa điểm: {item.location}</div>
                            </div>
                        ))
                    ) : (
                        <Table striped bordered hover className={styles['class-table']}>
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
                                        <td onClick={() => handleClick(item)} style={{ textAlign: 'center', cursor: 'pointer' }}>{item.time}</td>
                                        <td onClick={() => handleClick(item)} style={{ textAlign: 'center', cursor: 'pointer' }}>{item.location}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    )}
                </div>
                <hr/>
                {selectedClassInfo && (
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
                )}
            </Container>
        </div>
    );
};
