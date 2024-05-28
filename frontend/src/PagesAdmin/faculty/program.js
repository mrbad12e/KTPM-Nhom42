import React, { useState, useEffect } from 'react';
import { Table, Container, Button } from 'react-bootstrap';
import Sidebar_admin from '../../components/Layouts/Sidebar/sidebarAdmin';
import globalstyles from '../../CSSglobal.module.css';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Pagination from '../../components/pagination/pagination';

export const ListProgram = () => {
    const location = useLocation();
    const [listProgram, setListProgram] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        fetchSearchListProgram();
    }, [location]);

    const fetchSearchListProgram = async () => {
        try {
            let response;
            response = await axios.get(`/program/?faculty_id=${location.pathname.split('/').pop()}`);
            const ListProgramData = response.data.program || [];
            setListProgram(ListProgramData);
            const pageCount = Math.ceil(ListProgramData.length / 10);
            setTotalPages(pageCount);
        } catch (error) {
            console.error('Error fetching program:', error);
            setListProgram([]); 
            setTotalPages(0); 
        }
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div>
            <Sidebar_admin />
            <Container fluid className={globalstyles['main-background']}>
                <div className={globalstyles['left-title']}>Danh sách chương trình đào tạo </div>
                <Table className={globalstyles['table-1300']}>
                    <thead>
                        <tr style={{ textAlign: 'center', whiteSpace: 'nowrap' }}>
                            <th>Mã chương trình</th>
                            <th>Mã code</th>
                            <th>Tên chương trình đào tạo</th>
                            <th>Hoc phí</th>
                            <th>Mã Khoa</th>

                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(listProgram) && listProgram.slice((currentPage - 1) * 10, currentPage * 10).map((program) => (
                            <tr key={program.id}>
                                <td style={{ textAlign: 'center' }}>{program.id}</td>
                                <td style={{ textAlign: 'center' }}>{program.code}</td>
                                <td >{program.name}</td>
                                <td style={{ textAlign: 'center' }}>{program.credit_price}</td>
                                <td style={{ textAlign: 'center' }}>{program.faculty_id}</td>
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