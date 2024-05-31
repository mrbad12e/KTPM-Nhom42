import React, { useState, useEffect } from 'react';
import { Table, Container, Row, Col, Button } from 'react-bootstrap';
import Sidebar_admin from '../../components/Layouts/Sidebar/sidebarAdmin';
import styles from './lecturer.module.css';
import globalstyles from '../../CSSglobal.module.css';
import axios from 'axios';
import Pagination from '../../components/pagination/pagination';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';

export const Lecturer = () => {
    const [lecturers, setLecturers] = useState([]);
    const [inputID, setInputID] = useState('');
    const [inputFaculty, setInputFaculty] = useState('');
    const [currentPage, setCurrentPage] = useState(1); 
    const [totalPages, setTotalPages] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        fetchSearchLecturers();
    }, []);

    const fetchSearchLecturers = async () => {
        try {
            let response;
            if (inputID && inputFaculty) {
                response = await axios.get(`/admin/lecturer?id=${inputID}&faculty_id=${inputFaculty}`);
            } else if (inputID) {
                response = await axios.get(`/admin/lecturer?id=${inputID}`);
            } else if (inputFaculty) {
                response = await axios.get(`/admin/lecturer?faculty_id=${inputFaculty}`);
            } else {
                response = await axios.get(`/admin/lecturer`);
            }
            const lecturerData = response.data.lecturers;
            setLecturers(lecturerData);
            const pageCount = Math.ceil(lecturerData.length / 10);
            setTotalPages(pageCount);
        } catch (error) {
            console.error('Error fetching lecturers:', error);
        }
    };
    

    const inputValueID = (event) => {
        setInputID(event.target.value);
    };

    const inputValueFaculty = (event) => {
        setInputFaculty(event.target.value);
    };

    const handleSearchButtonClick = () => {
        fetchSearchLecturers();
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div>
            <Sidebar_admin/>
            <Container fluid className={globalstyles['main-background']}>
                <div className={globalstyles['left-title']}>Danh sách giảng viên</div>
                <Link to="/addLecturer"><Button className={globalstyles.addButton} variant="primary">Thêm mới</Button></Link>
                <div style={{ display: 'flex', gap: '10px', marginLeft: '50px' }}>
                    <input className={globalstyles.input} type="text" value={inputID} onChange={inputValueID} placeholder="Nhập mã giảng viên" />
                    <input className={globalstyles.input} type="text" value={inputFaculty} onChange={inputValueFaculty} placeholder="Nhập mã khoa" />
                    <Button className={globalstyles.smallButton} variant="primary" onClick={handleSearchButtonClick}>Tìm kiếm</Button>
                </div>
                <Table className={globalstyles['table-1300']}>
                    <thead>
                        <tr style={{ textAlign: 'center', whiteSpace: '2px' }}>
                            <th>ID</th>
                            <th>Họ tên</th>
                            <th>Mã khoa</th>
                            <th>Email</th>
                            <th>SĐT</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {lecturers.slice((currentPage - 1) * 10, currentPage * 10).map(lecturer => (
                            <tr key={lecturer.id}>
                                <td style={{ textAlign: 'center'}}>{lecturer.id}</td>
                                <td>{lecturer.first_name} {lecturer.last_name}</td>
                                <td style={{ textAlign: 'center'}}>{lecturer.faculty_id}</td>
                                <td>{lecturer.email}</td>
                                <td>{lecturer.phone}</td>
                                <td>
                                    <div className={globalstyles['icon-container']} >
                                        <FontAwesomeIcon color="white" icon={faEye}  onClick={() => navigate(`/updateLecturer/${lecturer.id}`)} />
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


