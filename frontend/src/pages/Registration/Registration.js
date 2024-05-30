import React, { useState, useEffect } from 'react';
import { Table, Container, Button, Dropdown, Alert } from 'react-bootstrap';
import Sidebar_student from '../../components/Layouts/Sidebar/sidebarStudent';
import globalstyles from '../../CSSglobal.module.css';
import Pagination from '../../components/pagination/pagination';
import axios from 'axios';
import styles from '../../PagesAdmin/class/class.module.css';

export const Registration = () => {
    const [subjectInfo, setSubjectInfo] = useState([]);
    const [searchInput, setSearchInput] = useState({ subject_name: '', subject_id: '' });
    const [registeredCourses, setRegisteredCourses] = useState([]);
    const [selectedCourses, setSelectedCourses] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searched, setSearched] = useState(false);
    const [totalPages, setTotalPages] = useState(0);
    const [selectedSemester, setSelectedSemester] = useState('20221');
    const [registrationError, setRegistrationError] = useState(null);
    const [registrationSuccess, setRegistrationSuccess] = useState(false);
    const id = localStorage.getItem('id');

    const handleSelect = (eventKey) => {
        setSelectedSemester(eventKey);
    };

    const fetchSubjectInfo = async () => {
        try {
            const response = await axios.get(`/class?semester=${selectedSemester}`);
            const subjects = response.data.class;

            const formattedSubjects = subjects.map(subject => ({
                ...subject,
                start_time: subject.start_time.replace(/(\d{2})(\d{2})/, "$1:$2"),
                end_time: subject.end_time.replace(/(\d{2})(\d{2})/, "$1:$2")
            }));
            const filteredSubjects = formattedSubjects.filter(subject => (
                subject.subject_id.toLowerCase().includes(searchInput.subject_id.toLowerCase()) &&
                subject.subject_name.toLowerCase().includes(searchInput.subject_name.toLowerCase())
            ));
            setSubjectInfo(filteredSubjects);
            setTotalPages(Math.ceil(filteredSubjects.length / 10));
            setSearched(true);
        } catch (error) {
            console.error('Error fetching subject information:', error);
        }
    };

    const fetchRegisteredCourses = async () => {
        try {
            const response = await axios.get(`/student/enrolled?semester=${selectedSemester}`);
            const enrolledCourses = response.data.classes.map(course => course.id);
            const registeredCoursesInfo = subjectInfo.filter(course => enrolledCourses.includes(course.class_id));
            registeredCoursesInfo.sort((a, b) => { 
                if (a.weekday !== b.weekday) {
                    return a.weekday - b.weekday;
                }
                return a.start_time.localeCompare(b.start_time);
            });
            setRegisteredCourses(registeredCoursesInfo);
        } catch (error) {
            console.error('Error fetching registered courses:', error);
        }
    };
    
    useEffect(() => {
        const fetchData = async () => {
            await fetchSubjectInfo();
        };
    
        fetchData();
    }, [selectedSemester]);
    
    useEffect(() => {
        if (subjectInfo.length > 0) {
            fetchRegisteredCourses();
        }
    }, [subjectInfo]);
    
    const handleAddCourse = (course) => {
        if (course.current_cap < course.max_cap) {
            const isExist = selectedCourses.some(selectedCourse => selectedCourse.class_id === course.class_id);
            if (!isExist) {
                setSelectedCourses(prevCourses => [...prevCourses, course]);
            } else {
                console.log('Môn học đã tồn tại trong danh sách.');
            }
        } else {
            console.log('Lớp học đã đầy, không thể thêm.');
        }
    };

    const handleDeleteCourse = (course) => {
        const updatedCourses = selectedCourses.filter(selectedCourse => selectedCourse.class_id !== course.class_id);
        setSelectedCourses(updatedCourses);
    };

    const handleRegister = async () => {
        try {
            const registrationPromises = selectedCourses.map(course =>
                axios.patch(`/class/enroll?student_id=${id}&&class_id=${course.class_id}`)
            );
    
            const responses = await Promise.all(registrationPromises);
            const successResponses = responses.filter(response => response.status === 200);
    
            if (successResponses.length === selectedCourses.length) {
                setRegistrationSuccess(true);
                setRegistrationError(null);
    
                // Xóa các môn học đã đăng ký thành công khỏi selectedCourses
                const updatedSelectedCourses = selectedCourses.filter(course => !successResponses.find(response => response.config.url.includes(course.class_id)));
                setSelectedCourses(updatedSelectedCourses);
            } else {
                setRegistrationError("Một số môn học không thể đăng ký.");
                setRegistrationSuccess(false);
                console.error("Một số môn học không thể đăng ký.");
            }
        } catch (error) {
            setRegistrationError("Lỗi khi đăng ký môn học.");
            setRegistrationSuccess(false);
            console.error('Đăng ký không thành công', error);
        }
        fetchRegisteredCourses();
    };
    
    

    const handleSearchInputChange = (e) => {
        const { name, value } = e.target;
        setSearchInput(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSearchButtonClick = () => {
        fetchSubjectInfo();
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    
    return (
        <div >
            <Sidebar_student/>
            <Container fluid className={globalstyles['main-background']}>
                <div className={styles['title']}>
                    <div className={globalstyles.title}>Đăng ký học tập kỳ</div>
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
                <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                    <input type="text" className={globalstyles.input} name="subject_id" value={searchInput.subject_id} onChange={handleSearchInputChange} placeholder="Mã học phần"/>
                    <input type="text" className={globalstyles.input} name="subject_name" value={searchInput.subject_name} onChange={handleSearchInputChange} placeholder="Tên học phần"/>
                    <Button className={globalstyles.smallButton} variant="primary" onClick={handleSearchButtonClick}>Tìm kiếm</Button>
                </div>
                {(searched || subjectInfo.length > 0) && (
                    <div style={{ overflowX: 'auto' }}>
                       <Table striped bordered hover className={globalstyles['table-1300']}>
                            <thead>
                                <tr style={{textAlign: 'center'}}>
                                    <th style={{minWidth: '90px'}}>Mã lớp</th>
                                    <th style={{minWidth: '85px'}}>Mã HP</th>
                                    <th>Tên học phần</th>
                                    <th style={{minWidth: '130px'}}>Thời gian</th>
                                    <th style={{minWidth: '115px'}}>Số lượng</th>
                               
                                </tr>
                            </thead>
                            <tbody>
                                {subjectInfo.slice((currentPage - 1) * 10, currentPage * 10).map((row, index) => (
                                    <tr key={index}>
                                        <td style={{textAlign: 'center'}}>{row.class_id}</td>
                                        <td style={{textAlign: 'center'}}>{row.subject_id}</td>
                                        <td>{row.subject_name}</td>
                                        <td style={{textAlign: 'center'}}>Thứ {row.weekday}: {row.start_time} - {row.end_time}</td>
                                        <td style={{textAlign: 'center'}}>{row.current_cap}/{row.max_cap}</td>
                                        <td style={{textAlign: 'center', border: 'none', backgroundColor: 'transparent' }}>
                                        <Button variant="primary" onClick={() => handleAddCourse(row)}>
                                            <div style={{fontSize: '12px'}}>Chọn</div>
                                        </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                        <div>
                            <Pagination currentPage={currentPage} totalPages={totalPages} handlePageChange={handlePageChange} />
                        </div>
                    </div>
                )}
                <div className={globalstyles['left-title']} style={{marginTop: '50px'}}>Danh môn học đăng ký:</div>

                {registrationError && !registrationSuccess && (
                    <Alert variant="danger" className="mt-3">
                        {registrationError}
                    </Alert>
                )}

                {registrationSuccess && !registrationError && (
                    <Alert variant="success" className="mt-3">
                        Tất cả các môn học đã được đăng ký thành công.
                    </Alert>
                )}

                <Table striped bordered hover className={globalstyles['table-1000']}>
                    <thead>
                        <tr style={{textAlign: 'center'}}>
                            <th style={{minWidth: '90px'}}>Mã lớp</th>
                            <th style={{minWidth: '85px'}}>Mã HP</th>
                            <th >Tên học phần</th>
                            <th style={{minWidth: '130px'}}>Thời gian</th>
                            <th>Trạng thái</th>
                        </tr>
                    </thead>
                    <tbody>
                        {registeredCourses.map((course, index) => (
                        <tr key={`registered-${index}`}>
                            <td style={{ textAlign: 'center' }}>{course.class_id}</td>
                            <td style={{ textAlign: 'center' }}>{course.subject_id}</td>
                            <td>{course.subject_name}</td>
                            <td>Thứ {course.weekday}: {course.start_time} - {course.end_time}</td>
                            <td style={{ textAlign: 'center' }}>Thành công</td>
                            <td style={{ textAlign: 'center' }}>
                                {/* Nút xóa chỉ hiện nếu có hàm handleDeleteCourse */}
                                {handleDeleteCourse && (
                                    <Button variant="danger" onClick={() => handleDeleteCourse(course)}>
                                        <div style={{ fontSize: '12px' }}>Xoá</div>
                                    </Button>
                                )}
                            </td>
                        </tr>
                    ))}
                    {selectedCourses.map((course, index) => (
                        <tr key={`selected-${index}`}>
                            <td style={{ textAlign: 'center' }}>{course.class_id}</td>
                            <td style={{ textAlign: 'center' }}>{course.subject_id}</td>
                            <td>{course.subject_name}</td>
                            <td>Thứ {course.weekday}: {course.start_time} - {course.end_time}</td>
                            <td style={{ textAlign: 'center' }}>Xét duyệt</td>
                            <td style={{ textAlign: 'center' }}>
                                <Button variant="danger" onClick={() => handleDeleteCourse(course)}>
                                    <div style={{ fontSize: '12px' }}>Xoá</div>
                                </Button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '30px'}}>
                    <Button onClick={handleRegister} variant="primary">Đăng ký</Button>
                </div>
            </Container>
        </div>
    );
};