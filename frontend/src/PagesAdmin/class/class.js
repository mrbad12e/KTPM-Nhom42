import React, { useState, useEffect } from 'react';
import { Table, Container,Button,Dropdown } from 'react-bootstrap';
import Sidebar_admin from '../../components/Layouts/Sidebar/sidebarAdmin';
import globalstyles from '../../CSSglobal.module.css'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Pagination from '../../components/pagination/pagination';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './class.module.css';
import { faEye } from '@fortawesome/free-solid-svg-icons';

export const Class = () => {
    const [allClasses, setAllClasses] = useState([]);
    const [classes, setClasses] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [inputClassId, setInputClassId] = useState('');
    const handleInputClassID = (event) => setInputClassId(event.target.value);
    const [selectedSemester, setSelectedSemester] = useState('20212');
    const handleSelect = (eventKey) => setSelectedSemester(eventKey);
    const navigate = useNavigate();

    useEffect(() => {
        fetchSearchClass();
        setClasses(allClasses);
    }, [selectedSemester]);

    const fetchSearchClass = async () => { 
        try {
            let response = await axios.get(`/class/?semester=${selectedSemester}`);
            const classData = response.data.class;
    
            // Create a map to group classes by class_id, subject_id, and subject_name
            const groupedClasses = classData.reduce((acc, curr) => {
                const key = `${curr.class_id}-${curr.subject_id}-${curr.subject_name}`;
                if (!acc[key]) {
                    acc[key] = {
                        class_id: curr.class_id,
                        subject_id: curr.subject_id,
                        subject_name: curr.subject_name,
                        details: []
                    };
                }
                acc[key].details.push(curr);
                return acc;
            }, {});
    
            // Convert the map to an array
            const groupedClassesArray = Object.values(groupedClasses);
    
            setAllClasses(groupedClassesArray);
            setClasses(groupedClassesArray);
            setTotalPages(Math.ceil(groupedClassesArray.length / 10));
        } catch (error) {
            console.error('Error fetching classes:', error);
        }
    };
    
    const handleSearchButtonClick = () => {
        const filtered = allClasses.filter((classItem) => classItem.class_id.startsWith(inputClassId));
        setClasses(filtered);
        setTotalPages(Math.ceil(filtered.length / 10));  
    };
    
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div>
            <Sidebar_admin />
            <Container fluid className={globalstyles['main-background']}>
                <div className={styles['title']}>
                    <div className={globalstyles.title}>Danh sách lớp kỳ</div>
                    <Link to="/addClass"><Button className={globalstyles.addButton} variant="primary">Thêm mới</Button></Link>
                    <Dropdown onSelect={handleSelect}>
                        <Dropdown.Toggle variant="light" id="dropdown-basic" className={styles['select-semester']}>
                            {selectedSemester}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item eventKey="20212">20212</Dropdown.Item>
                            <Dropdown.Item eventKey="20221">20221</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
                <div style={{ display: 'flex', gap: '10px', marginLeft: '50px' }}>
                    <input className={globalstyles.input} type="text" value={inputClassId} onChange={handleInputClassID} placeholder="Nhập mã lớp học" />
                    <Button className={globalstyles.smallButton} variant="primary" onClick={handleSearchButtonClick}>Tìm kiếm</Button>
                </div>
                <Table className={globalstyles['table-1300']}>
                    <thead>
                        <tr style={{ textAlign: 'center', whiteSpace: 'nowrap' }}>
                            <th>Số thứ tự</th>
                            <th>Mã lớp</th>
                            <th>Mã học phần</th>
                            <th>Tên học phần</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {classes.slice((currentPage - 1) * 10, currentPage * 10).map((classes, index) => (
                            <tr key={classes.class_id}>
                                <td style={{ textAlign: 'center' }}>{index + 1 + (currentPage-1)*10}</td>
                                <td style={{ textAlign: 'center' }}>{classes.class_id}</td>
                                <td style={{ textAlign: 'center' }}>{classes.subject_id}</td>
                                <td>{classes.subject_name}</td>
                                <td>
                                    <div className={globalstyles['icon-container']}  >
                                        <FontAwesomeIcon color="white" icon={faEye} onClick={() => navigate(`/updateClass/${classes.class_id}`)}/>
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
