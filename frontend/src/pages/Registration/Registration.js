import React, { useState, useEffect } from 'react';
import { Table, Container, Row, Col, Button } from 'react-bootstrap';
import Sidebar_student from '../../components/Layouts/Sidebar/sidebarStudent';
import globalstyles from '../../CSSglobal.module.css';
import Pagination from '../../components/pagination/pagination'
import axios from 'axios';

export const Registration = () => {
    const [subjectInfo, setSubjectInfo] = useState([]); 
    const [searchInput, setSearchInput] = useState({ subject_name: '', subject_id: '' });
    const [selectedCourses, setSelectedCourses] = useState([]); 
    const [currentPage, setCurrentPage] = useState(1); 
    const [searched, setSearched] = useState(false);
    const [totalPages, setTotalPages] = useState(0);

    const fetchSubjectInfo = async () => {
        try {
            const response = await axios.get('class?semester=20212');
            const subjects = response.data.class; 

            const formattedSubjects = subjects.map(subject => {
                return {
                    ...subject,
                    start_time: subject.start_time.replace(/(\d{2})(\d{2})/, "$1:$2"),
                    end_time: subject.end_time.replace(/(\d{2})(\d{2})/, "$1:$2")
                };
            });
            const filteredSubjects = formattedSubjects.filter(subject => {
                return (
                    subject.subject_id.toLowerCase().includes(searchInput.subject_id.toLowerCase()) &&
                    subject.subject_name.toLowerCase().includes(searchInput.subject_name.toLowerCase())
                );
            });
            setSubjectInfo(filteredSubjects);
            setTotalPages(Math.ceil(filteredSubjects.length / 10)); 
            setSearched(true); 
        } catch (error) {
            console.error('Error fetching subject information:', error);
        }
    };
    
    useEffect(() => {
        fetchSubjectInfo();
    }, []);

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
        const updatedCourses = selectedCourses.filter(selectedCourse => selectedCourse.id !== course.id);
        setSelectedCourses(updatedCourses); 
    };

    const handleRegister = () => {
        console.log("Registered courses:", selectedCourses);
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
                <div className={globalstyles['title']}>Đăng ký học tập kỳ </div>
                <Row style={{ marginTop: '60px', padding: '0 15px'}}>
                    <Col style={{ display: 'flex', justifyContent: 'flex-end'}}>
                        <input type="text" className="form-control" name="subject_id" value={searchInput.subject_id} onChange={handleSearchInputChange} placeholder="Mã học phần" style={{width: '220px'}}/>
                    </Col>        
                    <Col style={{maxWidth: '230px'}}>
                        <input type="text" className="form-control" name="subject_name" value={searchInput.subject_name} onChange={handleSearchInputChange} placeholder="Tên học phần" style={{width: '220px'}}/>
                    </Col>
                    <Col><Button onClick={handleSearchButtonClick} className={globalstyles['button-search']} variant="primary">Tìm kiếm</Button></Col>
                </Row>
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
                <div className={globalstyles['left-title']} style={{marginTop: '50px'}}>Danh sách các môn học đã thêm:</div>
                <Table striped bordered hover className={globalstyles['table-1000']}>
                    <thead>
                        <tr style={{textAlign: 'center'}}>
                            <th style={{minWidth: '90px'}}>Mã lớp</th>
                            <th style={{minWidth: '85px'}}>Mã HP</th>
                            <th >Tên học phần</th>
                            <th style={{minWidth: '130px'}}>Thời gian</th>
                        </tr>
                    </thead>
                    <tbody>
                        {selectedCourses.map((course, index) => (
                            <tr key={index}>
                                <td style={{textAlign: 'center'}}>{course.class_id}</td>
                                <td style={{textAlign: 'center'}}>{course.subject_id}</td>
                                <td>{course.subject_name}</td>
                                <td style={{textAlign: 'center'}}>Thứ {course.weekday}: {course.start_time} - {course.end_time}</td>
                                <td style={{textAlign: 'center'}}>
                                <Button variant="danger" onClick={() => handleDeleteCourse(course)}>
                                    <div style={{fontSize: '12px'}}>Xoá</div>
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