import React, { useState, useEffect } from 'react';
import { Table, Container, Button } from 'react-bootstrap';
import Sidebar_lecturer from '../../components/Layouts/Sidebar_lecturer/Sidebar_lecturer';
import { Link,useNavigate } from 'react-router-dom';
import ViewIcon from '../../../assets/img/View.png';
import globalstyles from '../../CSSglobal.module.css';
import axios from 'axios';
import Pagination from '../../components/Layouts/Pagination/Pagination';

export const ListClass = () => {
    const [listClass, setListClass] = useState([]);
    const [inputMaLop, setInputMaLop] = useState('');
    const [inputTenLop, setInputTenLop] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        fetchSearchListClass();
    }, [currentPage]);

    const fetchSearchListClass = async () => {
        try {
            let response;
            const semester = '20212';
            response = await axios.get(`/lecturer/class?semester=${semester}`);
            console.log('API Response:', response.data);
            const listClassData = response.data.classes || [];
            setListClass(listClassData);
            const pageCount = Math.ceil(listClassData.length / 10);
            setTotalPages(pageCount);
        } catch (error) {
            console.error('Lỗi khi lấy dữ liệu lớp:', error);
            setListClass([]); // Reset dữ liệu lớp khi có lỗi
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
        setCurrentPage(1);
        fetchSearchListClass();
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    
    const handleListStudent = async(classId) =>{
        try{
            const response = await axios.get(`/lecturer/student?class_id=${classId}`);
            const listStudent = response.data.students[0];
            console.log('Student detail:', listStudent);
            navigate(`/list_student/${classId}`);
        }catch (error) {
            console.error('Error fetching student detail:', error.message);
        }
    }

    return (
        <div>
            <Sidebar_lecturer />
            <Container fluid className={globalstyles['main-background']}>
                <div className={globalstyles['left-title']}>Danh sách lớp</div>
                <div className={globalstyles['search-input']}>
                    <input
                        type="text"
                        value={inputMaLop}
                        onChange={inputValueMaLop}
                        placeholder="Nhập mã lớp"
                        style={{ marginRight: '10px' }}
                    />
                    <input
                        type="text"
                        value={inputTenLop}
                        onChange={inputValueTenLop}
                        placeholder="Nhập tên lớp"
                    />
                    <Button className={globalstyles['button-search']} variant="dark" onClick={handleSearchButtonClick}>
                        Tìm kiếm
                    </Button>
                </div>
                <Table className={globalstyles['table-1300']}>
                    <thead>
                        <tr style={{ textAlign: 'center', whiteSpace: 'nowrap' }}>
                            <th>Mã lớp</th>
                            <th>Mã môn học</th>
                            <th>Tên môn học</th>
                            <th>Học kỳ</th>
                            <th>Số lượng</th>
                            <th>Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(listClass) && listClass.slice((currentPage - 1) * 10, currentPage * 10).map((cls) => (
                            <tr key={cls.class_id}>
                                <td style={{ textAlign: 'center' }}>{cls.class_id}</td>
                                <td style={{ textAlign: 'center' }}>{cls.subject_id}</td>
                                <td>{cls.subject_name}</td>
                                <td style={{ textAlign: 'center' }}>{cls.semester}</td>
                                <td style={{ textAlign: 'center' }}>{cls.max_cap}</td>
                                <td style={{ display: 'flex', justifyContent: 'center' }}>
                                    <div className={globalstyles['img-button-container']} style={{ marginLeft: '5px' }}>
                                        <img src={ViewIcon} alt="View" className={globalstyles['img-button']}  onClick={() => handleListStudent(cls.class_id)}/>
                                    </div>
                                </td>
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
