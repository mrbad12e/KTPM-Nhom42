import React, { useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Sidebar from '../../components/Layouts/Sidebar/Sidebar_student'; 
import globalstyles from '../../CSSglobal.module.css';
import styles from './Registration.module.css';

export const Registration = () => {
    const [subjectInfo, setSubjectInfo] = useState([]); // State to store subject information
    const [searchInput, setSearchInput] = useState({ subject_name: '', subject_id: '' }); // State to store search input
    const [selectedCourses, setSelectedCourses] = useState([]); // State to store selected courses
    const [currentPage, setCurrentPage] = useState(1); // State to track current page
    const [searched, setSearched] = useState(false); // State to track if search button is clicked

    const handleAddCourse = (course) => {
        // Kiểm tra xem current_cap có nhỏ hơn max_cap không
        if (course.current_cap < course.max_cap) {
            // Kiểm tra xem môn học đã tồn tại trong selectedCourses chưa
            const isExist = selectedCourses.some(selectedCourse => selectedCourse.id === course.id);
            if (!isExist) {
                setSelectedCourses(prevCourses => [...prevCourses, course]); // Thêm môn học vào selectedCourses array
            } else {
                console.log('Môn học đã tồn tại trong danh sách.');
            }
        } else {
            console.log('Lớp học đã đầy, không thể thêm.');
        }
    };
    
    const handleDeleteCourse = (course) => {
        // Lọc ra các môn học khác môn học được chọn để xóa
        const updatedCourses = selectedCourses.filter(selectedCourse => selectedCourse.id !== course.id);
        setSelectedCourses(updatedCourses); // Cập nhật danh sách môn học đã chọn
    };

    const handleRegister = () => {
        // Logic to register selected courses
        console.log("Registered courses:", selectedCourses);
    };

    const fetchSubjectInfo = async () => {
        try {
            const response = await fetch('student/registration', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(searchInput)
            });

            const data = await response.json();
            setSubjectInfo(data.SubjectInfo);
            setSearched(true); // Set searched flag to true after fetching data
        } catch (error) {
            console.error('Error fetching subject information:', error);
        }
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
    
    const renderPagination = () => {
        const totalPages = Math.ceil(subjectInfo.length / 10);
        const pages = [];
        const visiblePages = 3; // Số lượng trang hiển thị trực tiếp
        const ellipsisThreshold = 5; // Ngưỡng để hiển thị dấu "..."
        const startPage = Math.max(1, currentPage - Math.floor(visiblePages / 2));
        const endPage = Math.min(totalPages, startPage + visiblePages - 1);
    
        // Hiển thị nút trang đầu tiên
        if (startPage > 1) {
            pages.push(
                <Button 
                    key={1} 
                    variant="outline-primary"
                    onClick={() => handlePageChange(1)}
                >
                    {1}
                </Button>
            );
            // Hiển thị dấu "..." nếu cần
            if (startPage > ellipsisThreshold) {
                pages.push(<span key="ellipsis1" style={{ margin: '0 5px' }}>...</span>);
            }
        }
    
        // Hiển thị các nút trang từ startPage đến endPage
        for (let i = startPage; i <= endPage; i++) {
            pages.push(
                <Button 
                    key={i} 
                    variant={currentPage === i ? "primary" : "outline-primary"}
                    onClick={() => handlePageChange(i)}
                    style={{ margin: '0 5px' }}
                >
                    {i}
                </Button>
            );
        }
    
        // Hiển thị nút trang cuối cùng
        if (endPage < totalPages) {
            // Hiển thị dấu "..." nếu cần
            if (totalPages - endPage > ellipsisThreshold - 1) {
                pages.push(<span key="ellipsis2" style={{ margin: '0 5px' }}>...</span>);
            }
            pages.push(
                <Button 
                    key={totalPages} 
                    variant="outline-primary"
                    onClick={() => handlePageChange(totalPages)}
                    style={{ margin: '0 5px' }}
                >
                    {totalPages}
                </Button>
            );
        }
    
        return (
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                {pages}
            </div>
        );
    };
    
    return (
        <div >
            <Sidebar />
            <Container fluid className={globalstyles['main-background']}>
                <div className={globalstyles['title']}>Đăng ký học tập kỳ </div>
                <Row style={{ marginTop: '20px'}}>
                    <Col>
                    <input 
                        type="text" 
                        className="form-control" 
                        placeholder="Mã môn học" 
                        name="subject_id" 
                        value={searchInput.subject_id}
                        onChange={handleSearchInputChange}
                    />
                    </Col>
                    <Col>
                    <input 
                        type="text" 
                        className="form-control" 
                        placeholder="Tên môn học" 
                        name="subject_name" 
                        value={searchInput.subject_name}
                        onChange={handleSearchInputChange}
                    />
                    </Col>
                    <Col>
                        <div>
                            <Button onClick={handleSearchButtonClick}>Tìm kiếm</Button> 
                        </div>
                    </Col>
                </Row>
                {(searched || subjectInfo.length > 0) && (
                    <div style={{ overflowX: 'auto' }}>
                        <table className="Subject-Table">
                            <thead>
                                <tr>
                                    <th scope="col" style={{ width: '10%' }}>Mã lớp</th>
                                    <th scope="col" style={{ width: '10%' }}>Mã môn học</th>
                                    <th scope="col" style={{ width: '30%' }}>Tên môn học</th>
                                    <th scope="col" style={{ width: '12%' }}>Thời gian</th>
                                    <th scope="col" style={{ width: '8%' }}>Số lượng</th>
                                    <th scope="col" style={{ width: '10%' }}>Hành động</th>
                                </tr>
                            </thead>
                            <tbody>
                                {subjectInfo.slice((currentPage - 1) * 10, currentPage * 10).map((row, index) => (
                                    <tr key={index}>
                                        <td>{row.id}</td>
                                        <td>{row.subject_id}</td>
                                        <td>{row.name}</td>
                                        <td>{row.start_time} - {row.end_time}</td>
                                        <td>{row.current_cap}/{row.max_cap}</td>
                                        <td>
                                            <Button style={{ fontWeight: 'bold', border: 'none' }} onClick={() => handleAddCourse(row)}>Chọn</Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="col-md-12 text-center mb-3">
                            {renderPagination()}
                        </div>
                    </div>
                )}
                <h3>Danh sách các môn học đã thêm:</h3>
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th scope="col">Mã lớp</th>
                            <th scope="col">Mã môn học</th>
                            <th scope="col">Tên môn học</th>
                            <th scope="col">Thời gian</th>
                            <th scope="col">Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {selectedCourses.map((course, index) => (
                            <tr key={index}>
                                <td>{course.id}</td>
                                <td>{course.subject_id}</td>
                                <td>{course.name}</td>
                                <td>{course.start_time} - {course.end_time}</td>
                                <td>
                                    <Button style={{ fontWeight: 'bold', border: 'none' }} onClick={() => handleDeleteCourse(course)}>Xóa</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="col-md-12 text-center mb-3">
                    <Button onClick={handleRegister} variant="primary">Đăng ký</Button>
                </div>

            </Container>
        </div>
    );
};
