import React, { useState, useEffect } from 'react';
import { Table, Container } from 'react-bootstrap';
import Sidebar_admin from '../../components/Layouts/Sidebar/sidebarAdmin';
import globalstyles from '../../CSSglobal.module.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Pagination from '../../components/pagination/pagination';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';

export const Faculty = () => {
    const [faculty, setFaculty] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        fetchSearchFaculty();
    }, [currentPage]);

    const fetchSearchFaculty = async () => {
        try {
            let response = await axios.get(`/faculty/`);
            const facultyData = response.data.faculty;
            setFaculty(facultyData);
            setTotalPages(Math.ceil(facultyData.length / 10));
        } catch (error) {
            console.error('Lỗi khi lấy dữ liệu khoa:', error);
        }
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleViewProgram =async(facultyId) => {
        try{
            await axios.get(`/program/?faculty_id=${facultyId}`);
            navigate(`/program/${facultyId}`);
        }catch (error) {
            console.error('Error fetching list program:', error.message);
        }
    }

    return (
        <div>
            <Sidebar_admin />
            <Container fluid className={globalstyles['main-background']}>
                <div className={globalstyles['left-title']}>Danh sách khoa</div>
                <Table className={globalstyles['table-1300']}>
                    <thead>
                        <tr style={{ textAlign: 'center', whiteSpace: 'nowrap' }}>
                            <th>Mã khoa</th>
                            <th>Tên Khoa</th>
                            <th>Địa điểm</th>
                            <th>Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {faculty.slice((currentPage - 1) * 10, currentPage * 10).map(fac => (
                            <tr key={fac.id}>
                                <td style={{ textAlign: 'center' }}>{fac.id}</td>
                                <td>{fac.name}</td>
                                <td style={{ textAlign: 'center' }}>{fac.location}</td>
                                <td style={{ display: 'flex', justifyContent: 'center' }}>
                                    <div className={globalstyles['icon-container']}  onClick={() => {handleViewProgram(fac.id)}}>
                                        <FontAwesomeIcon color="white" icon={faEye} />
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

