import React, { useState, useEffect } from 'react';
import { Table, Container, Button } from 'react-bootstrap';
import Sidebar_admin from '../../components/Layouts/Sidebar_admin/Sidebar_admin'
import globalstyles from '../../CSSglobal.module.css';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Pagination from '../../components/Layouts/Pagination/Pagination';

export const ListProgram = () => {
    const location = useLocation();
    const [listProgram, setListProgram] = useState([]);
    const [inputMaLop, setInputMaLop] = useState('');
    const [inputTenLop, setInputTenLop] = useState('');
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
            console.error('Lỗi khi lấy dữ liệu chuong trihn dao tao:', error);
            setListProgram([]); // Reset dữ liệu lớp khi có lỗi
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
      
        fetchSearchListProgram();
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div>
            <Sidebar_admin />
            <Container fluid className={globalstyles['main-background']}>
                <div className={globalstyles['left-title']}>Danh sách chương trình đào tạo </div>
                <div className={globalstyles['search-input']}>
                    <input
                        type="text"
                        value={inputMaLop}
                        onChange={inputValueMaLop}
                        placeholder="Nhập mã chuong trinh"
                        style={{ marginRight: '10px' }}
                    />
                    <input
                        type="text"
                        value={inputTenLop}
                        onChange={inputValueTenLop}
                        placeholder="Nhập tên chuong trinh"
                    />
                    <Button className={globalstyles['button-search']} variant="dark" onClick={handleSearchButtonClick}>
                        Tìm kiếm
                    </Button>
                </div>
                <Table className={globalstyles['table-1300']}>
                    <thead>
                        <tr style={{ textAlign: 'center', whiteSpace: 'nowrap' }}>
                            <th>Mã chương trình</th>
                            <th>Mã code</th>
                            <th>Tên</th>
                            <th>Hoc phí</th>
                            <th>Mã Khoa</th>

                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(listProgram) && listProgram.slice((currentPage - 1) * 10, currentPage * 10).map((program) => (
                            <tr key={program.id}>
                                <td style={{ textAlign: 'center' }}>{program.id}</td>
                                <td style={{ textAlign: 'center' }}>{program.code}</td>
                                {/* <td>{program.subject_name}</td> */}
                                <td style={{ textAlign: 'center' }}>{program.name}</td>
                                <td style={{ textAlign: 'center' }}>{program.credit_price}</td>
                                <td style={{ textAlign: 'center' }}>{program.faculty_id}</td>
                                {/* <td style={{ display: 'flex', justifyContent: 'center' }}>
                                    <div className={globalstyles['img-button-container']} style={{ marginLeft: '5px' }}>
                                        <img src={ViewIcon} alt="View" className={globalstyles['img-button']}  onClick={() => handleListProgram(program.class_id)}/>
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
