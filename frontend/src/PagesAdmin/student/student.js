import React, { useState, useEffect } from 'react';
import { Table, Container, Button } from 'react-bootstrap';
import Sidebar_admin from '../../components/Layouts/Sidebar/sidebarAdmin';
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios';
import Pagination from '../../components/pagination/pagination';
import styles from './student.module.css';
import globalstyles from '../../CSSglobal.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';

export const Student = () => {
    const [students, setStudents] = useState([]);
    const [inputMSSV, setInputMSSV] = useState('');
    const inputValueMSSV = (event) => setInputMSSV(event.target.value);
    const [inputCTDT, setInputCTDT] = useState('');
    const inputValueCTDT = (event) => setInputCTDT(event.target.value);
    const [currentPage, setCurrentPage] = useState(1); 
    const [totalPages, setTotalPages] = useState(0);
    const navigate = useNavigate();
    
    useEffect(() => {
        fetchSearchStudents();
    }, []);

    const fetchSearchStudents = async () => {
        try {
            let response;
            if (inputMSSV && inputCTDT) {
                response = await axios.get(`/admin/student?id=${inputMSSV}&&program_id=${inputCTDT}`);
            } else if (inputMSSV) {
                response = await axios.get(`/admin/student?id=${inputMSSV}`);
            } else if (inputCTDT) {
                response = await axios.get(`/admin/student?program_id=${inputCTDT}`);
            } else { response = await axios.get(`/admin/student`);}
            const studentData = response.data.students;
            setStudents(studentData);
            const pageCount = Math.ceil(studentData.length / 10);
            setTotalPages(pageCount);
        } catch (error) {
            console.error('Error fetching students:', error);
        }
    };
    
    const handleSearchButtonClick = () => {
        fetchSearchStudents();
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleDetailStudent = async (studentId) => {
        try {
            const response = await axios.get(`/admin/student?id=${studentId}`);
            const studentDetail = response.data.students[0];
            console.log('Student detail:', studentDetail);
            navigate(`/updateStudent/${studentId}`);
            // Đoạn code để xử lý thông tin chi tiết sinh viên, ví dụ: hiển thị modal, ...
        } catch (error) {
            console.error('Error fetching student detail:', error.message);
        }
    }

    return (
        <div>
            <Sidebar_admin/>
            <Container fluid className={globalstyles['main-background']}>
                <div className={globalstyles['left-title']}>Danh sách sinh viên</div>
                <Link to="/addStudent"><Button className={globalstyles.addButton} variant="primary">Thêm mới</Button></Link>
                <div style={{ display: 'flex', gap: '10px', marginLeft: '50px' }}>
                    <input className={globalstyles.input} type="text" value={inputMSSV} onChange={inputValueMSSV} placeholder="Nhập MSSV" />
                    <input className={globalstyles.input} type="text" value={inputCTDT} onChange={inputValueCTDT} placeholder="Nhập mã CTDT" />
                    <Button className={globalstyles.smallButton} variant="primary" onClick={handleSearchButtonClick}>Tìm kiếm</Button>
                </div>
                <Table className={globalstyles['table-1300']}>
                    <thead>
                        <tr style={{ textAlign: 'center', whiteSpace: '2px' }}>
                            <th>MSSV</th>
                            <th>Họ và tên</th>
                            <th>Mã CTDT</th>
                            <th>CPA</th>
                            <th>Email</th>
                            <th>Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.slice((currentPage - 1) * 10, currentPage * 10).map(student => (
                            <tr key={student.id}>
                                <td style={{ textAlign: 'center'}}>{student.id}</td>
                                <td>{student.first_name} {student.last_name}</td>
                                <td style={{ textAlign: 'center'}}>{student.program_id}</td>
                                <td style={{ textAlign: 'center'}}>{student.cpa_total_score_product}</td>
                                <td>{student.email}</td>
                                <td style={{ display: 'flex', justifyContent: 'center' }}>
                                    <div className={globalstyles['icon-container']}>
                                        <FontAwesomeIcon color="white" icon={faEye} onClick={() => handleDetailStudent(student.id)}/>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <div>
                    <Pagination currentPage={currentPage} totalPages={totalPages} handlePageChange={handlePageChange} />
                </div>
            </Container>
        </div>
    );
};
