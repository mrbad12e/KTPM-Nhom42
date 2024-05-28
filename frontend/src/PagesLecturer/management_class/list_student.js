import React, { useState, useEffect } from 'react';
import { Table, Container, Button } from 'react-bootstrap';
import SidebarLecturer from '../../components/Layouts/Sidebar/SidebarLecturer';
import ViewIcon from '../../../assets/img/View.png';
import globalstyles from '../../CSSglobal.module.css';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Pagination from '../../components/pagination/pagination';


export const ListStudent = () => {
    const location = useLocation();
    const [listStudent, setListStudent] = useState([]);
    const [inputMaLop, setInputMaLop] = useState('');
    const [inputTenLop, setInputTenLop] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        fetchSearchListStudent();
    }, [location]);

    const fetchSearchListStudent = async () => {
        try {
            let response;
            response = await axios.get(`/lecturer/student?class_id=${location.pathname.split('/').pop()}`);
            const listStudentData = response.data.students || [];
            setListStudent(listStudentData);
            const pageCount = Math.ceil(listStudentData.length / 10);
            setTotalPages(pageCount);
        } catch (error) {
            console.error('Lỗi khi lấy dữ liệu sinh viên:', error);
            setListStudent([]); // Reset dữ liệu lớp khi có lỗi
            setTotalPages(0); // Reset số trang khi có lỗi
        }
    };

    const inputValueMaLop = (event) => {
        setInputMaLop(event.target.value);
    };

    const inputValueTenLop = (event) => {
        setInputTenLop(event.target.value);
    };

    const handleSearchButtonClick = () => {
      
        fetchSearchListStudent();
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div>
            <SidebarLecturer/>
            <Container fluid className={globalstyles['main-background']}>
                <div className={globalstyles['left-title']}>Danh sách lớp</div>
                <div className={globalstyles['search-input']}>
                    <input
                        type="text"
                        value={inputMaLop}
                        onChange={inputValueMaLop}
                        placeholder="Nhập mã sinh viên"
                        style={{ marginRight: '10px' }}
                    />
                    <input
                        type="text"
                        value={inputTenLop}
                        onChange={inputValueTenLop}
                        placeholder="Nhập tên sinh viên"
                    />
                    <Button className={globalstyles['button-search']} variant="dark" onClick={handleSearchButtonClick}>
                        Tìm kiếm
                    </Button>
                </div>
                <Table className={globalstyles['table-1300']}>
                    <thead>
                        <tr style={{ textAlign: 'center', whiteSpace: 'nowrap' }}>
                            <th>Mã sinh viên</th>
                            <th>Tên sinh viên</th>
                            <th>Mã lớp</th>
                            <th>Điểm giữa kì</th>
                            <th>Điểm cuối kì</th>
                            <th>Số lần vắng</th>

                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(listStudent) && listStudent.slice((currentPage - 1) * 10, currentPage * 10).map((student) => (
                            <tr key={student.student_id}>
                                <td style={{ textAlign: 'center' }}>{student.student_id}</td>
                                <td>{student.student_name}</td>
                                <td style={{ textAlign: 'center' }}>{student.class_id}</td>
                                <td style={{ textAlign: 'center' }}>{student.midterm_score}</td>
                                <td style={{ textAlign: 'center' }}>{student.final_score}</td>
                                <td style={{ textAlign: 'center' }}>{student.absent_count}</td>
                                {/* <td style={{ display: 'flex', justifyContent: 'center' }}>
                                    <div className={globalstyles['img-button-container']} style={{ marginLeft: '5px' }}>
                                        <img src={ViewIcon} alt="View" className={globalstyles['img-button']}  onClick={() => handleListStudent(student.class_id)}/>
                                    </div>
                                </td> */}
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <div>
                    <Pagination currentPage={currentPage} totalPages={totalPages} handlePageChange={handlePageChange}  />
                </div>
            </Container>
        </div>
    );
};