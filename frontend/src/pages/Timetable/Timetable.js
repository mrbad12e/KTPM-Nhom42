import React, { useState, useEffect } from 'react';
import { Dropdown, Row, Col, Container, Table, Button } from 'react-bootstrap';
import axios from 'axios';
import Sidebar_student from '../../components/Layouts/Sidebar/sidebarStudent'; 
import globalstyles from '../../CSSglobal.module.css';
import styles from './Timetable.module.css';

export const Timetable = () => {

    // select Semester
    const [selectedSemester, setSelectedSemester] = useState('20212');
    const handleSelect = (eventKey) => {
        setSelectedSemester(eventKey);
        setSelectedClassInfo(null);
    };
    
    // get TimeTable
    const [timetable, setTimetable] = useState([]);

    useEffect(() => {
        const fetchTimetable = async () => {
            try {
                const response = await axios.get(`student/timetable?semester=${selectedSemester}`);
                const sortedTimetable = response.data.timetable.sort((a, b) => {
                    if (a.weekday !== b.weekday) {
                        return a.weekday - b.weekday;
                    }
                    return a.start_time.localeCompare(b.start_time);
                });
                setTimetable(sortedTimetable);
            } catch (error) {
                console.error('Error fetching timetable:', error.message);
            }
        };
        fetchTimetable();
    }, [selectedSemester]);

    const formatTime = (time) => {
        if (time.length !== 4) return time;
        return `${time.substring(0, 2)}:${time.substring(2)}`;
    };   

    // select Class
    const [selectedClassInfo, setSelectedClassInfo] = useState(null);
    const handleClick = async (classInfo) => {
        try {    
            const response = await axios.get(`class/students?class_id=${classInfo.class_id}`);      
            const students = response.data.students;

            console.log(students);
            const response1 = await axios.get(`class?class_id=${classInfo.class_id}`);   
            const classDetail = response1.data.class;

            const response2 = await axios.get(`lecturer?id=${classDetail[0].lecturer_id}`);
            const lecturerInfo = response2.data.lecturers;

            setSelectedClassInfo({ students, classDetail, lecturerInfo });
        } catch (error) {
            console.error('Error fetching class detail:', error.message);
        }
    };

    // responesive
    const [tableWidth, setTableWidth] = useState(null);
    useEffect(() => {
        const handleResize = () => {
            setTableWidth(document.getElementById('table-container').offsetWidth);
        };

        window.addEventListener('resize', handleResize);
        handleResize(); 
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
   
    return (
        <div>
            <Sidebar_student />
            <Container fluid className={globalstyles['main-background']}>
                <div className={styles['title']}>
                    <div className={globalstyles['title']}>THỜI KHÓA BIỂU KỲ</div>
                    <Dropdown onSelect={handleSelect}>
                        <Dropdown.Toggle variant="light" id="dropdown-basic" className={styles['select-semester']}>
                            {selectedSemester}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item eventKey="20212">20212</Dropdown.Item>
                            <Dropdown.Item eventKey="20221">20221</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
                <div id="table-container">
                    {tableWidth && tableWidth < 660 ? (
                        timetable.map((item,index) => (
                            <button className={styles.subject} key={index++}>
                                <Row onClick={() => handleClick(item)}>
                                    <Col style={{ maxWidth: '30%', textAlign: 'center'}}>
                                        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }} >
                                            <Row><div style={{fontSize: '18px'}}>Thứ {item.weekday}</div></Row>
                                            <Row style={{ marginTop: 'auto' }}><div>{formatTime(item.start_time)}</div></Row>   
                                            <Row style={{ marginTop: 'auto' }}><div style={{fontSize: '8px'}}>|</div></Row> 
                                            <Row style={{ marginTop: 'auto' }}><div>{formatTime(item.end_time)}</div></Row>        
                                        </div>
                                    </Col>
                                    <Col style={{ maxWidth: '70%' }}>
                                        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }} onClick={() => handleClick(item)}>
                                            <Row style={{ fontWeight: 'bold', marginBottom: '10px' }}>
                                                <div className={styles.SubjectWrapper}> {item.subject_name}</div>
                                            </Row>
                                            <Row style={{ marginTop: 'auto', fontSize: '12px' }}>Mã lớp: {item.class_id} | Địa điểm: {item.location}</Row>
                                        </div>
                                    </Col>
                                </Row> 
                            </button>
                        ))
                    ) : (
                        <Table hover className={globalstyles['table-1000']}>
                            <thead>
                                <tr>
                                    <th style={{ textAlign: 'center' }}>Thứ</th>
                                    <th style={{ textAlign: 'center',minWidth: '90px' }}>Mã lớp</th>
                                    <th style={{ textAlign: 'center' }}>Môn học</th>
                                    <th style={{ textAlign: 'center', minWidth: '120px' }}>Thời gian</th>
                                    <th style={{ textAlign: 'center', minWidth: '100px'}}>Phòng học</th>
                                </tr>
                            </thead>
                            <tbody>
                                {timetable.map((item,index) => (
                                    <tr key={index++}>
                                        <td onClick={() => handleClick(item)} style={{ textAlign: 'center', cursor: 'pointer' }}>{item.weekday}</td>
                                        <td onClick={() => handleClick(item)} style={{ textAlign: 'center', cursor: 'pointer' }}>{item.class_id}</td>
                                        <td onClick={() => handleClick(item)} style={{ cursor: 'pointer' }}>{item.subject_name}</td>
                                        <td onClick={() => handleClick(item)} style={{ textAlign: 'center', cursor: 'pointer' }}>
                                            <div style={{ textAlign: 'center'}}>{formatTime(item.start_time)} - {formatTime(item.end_time)}</div>
                                        </td>
                                        <td onClick={() => handleClick(item)} style={{ textAlign: 'center', cursor: 'pointer' }}>{item.location}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    )}
                </div>
                <hr/>
                {selectedClassInfo && (
                    <div>
                        <div className={globalstyles['title']}>Thông tin chi tiết lớp học</div>
                        <Container style={{ marginLeft: '5vw', marginTop: '30px' }}>
                            <p><strong>Môn học:</strong> {selectedClassInfo.classDetail[0].subject_name}</p>
                            <p><strong>Loại lớp:</strong> {selectedClassInfo.classDetail[0].type}</p>
                            <p><strong>Giảng viên:</strong> {selectedClassInfo.lecturerInfo[0].first_name} {selectedClassInfo.lecturerInfo[0].last_name}</p>
                            <p><strong>Email:</strong> {selectedClassInfo.lecturerInfo[0].email}</p>
                            <p><strong>Số điện thoại:</strong> {selectedClassInfo.lecturerInfo[0].phone}</p>
                            <p><strong>Sĩ số:</strong> {selectedClassInfo.students.length}</p>
                        </Container>
                        <Table className={styles['student']}>
                            <thead>
                                <tr>
                                    <th style={{ textAlign: 'center' }}>STT</th>
                                    <th style={{ textAlign: 'center' }}>MSSV</th>
                                    <th style={{ textAlign: 'center' }}>Họ và tên</th>
                                    {tableWidth && tableWidth >= 660 && <th style={{ textAlign: 'center' }}>Email</th>}
                                </tr>
                            </thead>
                            <tbody>
                                {selectedClassInfo.students.map((student, index) => (
                                    <tr key={student.student_id}>
                                        <td style={{ textAlign: 'center' }}>{index + 1}</td>
                                        <td style={{ textAlign: 'center' }}>{student.student_id}</td>
                                        <td>{student.student_name}</td>
                                        {tableWidth && tableWidth >= 660 && <td>{student.email}</td>}
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                )}
            </Container>
        </div>
    );
};