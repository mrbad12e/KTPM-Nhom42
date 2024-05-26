import React, { useState, useEffect } from 'react';
import { Table, Container, Button } from 'react-bootstrap';
import Sidebar_admin from '../../components/Layouts/Sidebar_admin/Sidebar_admin';
import ViewIcon from '../../../assets/img/View.png';
import UpdateIcon from '../../../assets/img/Update.png';
import globalstyles from '../../CSSglobal.module.css';
import axios from 'axios';
import { Link,useNavigate } from 'react-router-dom';
import Pagination from '../../components/Layouts/Pagination/Pagination';

export const Faculty = () => {
    const [faculty, setFaculty] = useState([]);
    const [inputMaKhoa, setInputMaKhoa] = useState('');
    const [inputTenKhoa, setInputTenKhoa] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        fetchSearchFaculty();
    }, [currentPage]);

    const fetchSearchFaculty = async () => {
        try {
            let response;
            if (inputMaKhoa && inputTenKhoa) {
                response = await axios.get(`/faculty/?id=${inputMaKhoa}&name=${inputTenKhoa}`);
            } else if (inputMaKhoa) {
                response = await axios.get(`/faculty/?id=${inputMaKhoa}`);
            } else if (inputTenKhoa) {
                response = await axios.get(`/faculty/?name=${inputTenKhoa}`);
            } else {
                response = await axios.get(`/faculty/`);
            }
            const facultyData = response.data.faculty;
            setFaculty(facultyData);
            const pageCount = Math.ceil(facultyData.length / 10);
            setTotalPages(pageCount);
        } catch (error) {
            console.error('Lỗi khi lấy dữ liệu khoa:', error);
        }
    };

    const inputValueMaKhoa = (event) => {
        setInputMaKhoa(event.target.value);
    };

    const inputValueTenKhoa = (event) => {
        setInputTenKhoa(event.target.value);
    };

    const handleSearchButtonClick = () => {
        setCurrentPage(1);
        fetchSearchFaculty();
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleViewProgram =async(facultyId) => {
        try{
            const response = await axios.get(`/program/?faculty_id=${facultyId}`);
            const listProgram = response.data.program[0];
            console.log('List program:', listProgram);
            navigate(`/list_program/${facultyId}`);
        }catch (error) {
            console.error('Error fetching list program:', error.message);
        }

    }


    return (
        <div>
            <Sidebar_admin />
            <Container fluid className={globalstyles['main-background']}>
                <div className={globalstyles['left-title']}>Danh sách khoa</div>
                <Button className={globalstyles['add-button']} variant="dark">Thêm mới</Button>
                <div className={globalstyles['search-input']}>
                    <input
                        type="text"
                        value={inputMaKhoa}
                        onChange={inputValueMaKhoa}
                        placeholder="Nhập mã khoa"
                        style={{ marginRight: '10px' }}
                    />
                    <input
                        type="text"
                        value={inputTenKhoa}
                        onChange={inputValueTenKhoa}
                        placeholder="Nhập tên khoa"
                    />
                    <Button className={globalstyles['button-search']} variant="dark" onClick={handleSearchButtonClick}>
                        Tìm kiếm
                    </Button>
                </div>
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
                                    <div className={globalstyles['img-button-container']}>
                                        <img src={UpdateIcon} alt="Update" className={globalstyles['img-button']} />
                                    </div>
                                    <div className={globalstyles['img-button-container']} style={{ marginLeft: '5px' }}>
                                        <img src={ViewIcon} alt="View" className={globalstyles['img-button']} onClick={() => {handleViewProgram(fac.id)} }/>
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
