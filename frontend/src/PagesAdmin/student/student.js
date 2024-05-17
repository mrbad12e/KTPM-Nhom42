import React, { useState, useEffect } from 'react';
import { Table, Container, Button } from 'react-bootstrap';
import Sidebar_admin from '../../components/Layouts/Sidebar/sidebarAdmin';
import ViewIcon from '../../../assets/img/View.png';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Pagination from '../../components/pagination/pagination';
import styles from './student.module.css';
import globalstyles from '../../CSSglobal.module.css';

export const Student = () => {
    const [students, setStudents] = useState([]);
    const [inputMSSV, setInputMSSV] = useState('');
    const [inputCTDT, setInputCTDT] = useState('');
    const [currentPage, setCurrentPage] = useState(1); 
    const [totalPages, setTotalPages] = useState(0);

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
    

    const inputValueMSSV = (event) => {
        setInputMSSV(event.target.value);
    };

    const inputValueCTDT = (event) => {
        setInputCTDT(event.target.value);
    };

    const handleSearchButtonClick = () => {
        fetchSearchStudents();
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div>
            <Sidebar_admin/>
            <Container fluid className={globalstyles['main-background']}>
                <div className={globalstyles['left-title']}>Danh sách sinh viên</div>
                <Link to="/addStudent"><Button className={globalstyles['add-button']}variant="dark">Thêm mới</Button></Link>
                <div className={globalstyles['search-input']}>
                    <input type="text" value={inputMSSV} onChange={inputValueMSSV} placeholder="Nhập mã số sinh viên" style={{marginRight: '10px'}}/>
                    <input type="text" value={inputCTDT} onChange={inputValueCTDT} placeholder="Nhập mã CTDT"/>
                    <Button className={globalstyles['button-search']} variant="dark" onClick={handleSearchButtonClick}>Tìm kiếm</Button> 
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
                                    <div className={globalstyles['img-button-container']} >
                                        <img src={ViewIcon} alt="View" className={globalstyles['img-button']} />
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
