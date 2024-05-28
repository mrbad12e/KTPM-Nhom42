import React, { useState, useEffect } from 'react';
import { Table, Container, Row, Col, Button, Dropdown } from 'react-bootstrap';
import Sidebar_admin from '../../components/Layouts/Sidebar/sidebarAdmin';
import ViewIcon from '../../../assets/img/View.png';
import DeleteIcon from '../../../assets/img/Delete.png';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './class.module.css';
import globalstyles from '../../CSSglobal.module.css';

export const Class = () => {
    const [inputClassID, setInputClassID] = useState('');
    const handleInputClassID = (event) => setInputClassID(event.target.value);

    const [inputSubjectID, setInputSubjectID] = useState('');
    const handleInputSubjectID = (event) => setInputSubjectID(event.target.value);
    
    const [selectedSemester, setSelectedSemester] = useState('20212');
    const handleSelect = (eventKey) => {
        setSelectedSemester(eventKey);
    };

    const [currentPage, setCurrentPage] = useState(1); 
    const [totalPages, setTotalPages] = useState(0);
    const navigate = useNavigate();

    const handleSearchButtonClick = () => {
        console.log('Đã nhấn nút Tìm kiếm với giá trị:', inputValue);
    };

    const fetchSearchClass = async () => {
        try {
            let response;
            if (inputClassID && inputSubjectID) {
                response = await axios.get(`/admin/student?id=${inputClassID}&&program_id=${inputSubjectID}`);
            } else if (inputClassID) {
                response = await axios.get(`/admin/student?id=${inputClassID}`);
            } else if (inputSubjectID) {
                response = await axios.get(`/admin/student?program_id=${inputSubjectID}`);
            } else { response = await axios.get(`/admin/student`);}
            const studentData = response.data.students;
            setStudents(studentData);
            const pageCount = Math.ceil(studentData.length / 10);
            setTotalPages(pageCount);
        } catch (error) {
            console.error('Error fetching students:', error);
        }
    };

    return (
        <div>
            <Sidebar_admin/>
            <Container fluid className={globalstyles['main-background']}>
                <div className={styles['title']}>
                    <div className={globalstyles.title}>Danh sách lớp kỳ</div>
                    <Dropdown onSelect={handleSelect}>
                        <Dropdown.Toggle variant="light" id="dropdown-basic" className={styles['select-semester']}>
                            {selectedSemester}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item eventKey="20212">20212</Dropdown.Item>
                            <Dropdown.Item eventKey="20211">20211</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
                <Link to="/addClass"><Button className={globalstyles.addButton} onClick={handleSearchButtonClick} variant="primary">Thêm mới</Button></Link>
                
                <div style={{ display: 'flex', gap: '10px', marginLeft: '50px' }}>
                    <input className={globalstyles.input} type="text" value={inputClassID} onChange={handleInputClassID} placeholder="Nhập mã giảng viên" />
                    <input className={globalstyles.input} type="text" value={inputSubjectID} onChange={handleInputSubjectID} placeholder="Nhập mã khoa" />
                    <Button className={globalstyles.smallButton} variant="primary" onClick={handleSearchButtonClick}>Tìm kiếm</Button>
                </div>

                <Table className={globalstyles['table-1300']}>
                    <thead>
                        <tr style={{ textAlign: 'center', whiteSpace: '2px' }}>
                            <th>STT</th>
                            <th>Mã lớp</th>
                            <th>Tên học phần</th>
                            <th>Mã học phần</th>
                            <th>Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr style={{whiteSpace: '2px'}}>
                            <td style={{ textAlign: 'center'}}>20212</td>
                            <td>Lương Phúc Quang </td>
                            <td>Truyền thông số và Kỹ thuật đa phương tiện</td>
                            <td style={{ textAlign: 'center'}}>4.0</td>
                            <td style={{ display: 'flex', justifyContent: 'center' }}>
                                <div className={globalstyles['img-button-container']} >
                                    <img src={ViewIcon} alt="View" className={globalstyles['img-button']} />
                                </div>
                                <div className={globalstyles['img-button-container']} style ={{marginLeft: '10px'}}>
                                    <img src={DeleteIcon} alt="Delete" className={globalstyles['img-button']} />
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </Table>
            </Container>
        </div>
    );
};


