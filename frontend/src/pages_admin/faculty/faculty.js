import React, { useState, useEffect } from 'react';
import { Table, Container, Row, Col, Button } from 'react-bootstrap';
import Sidebar_admin from '../../components/Layouts/Sidebar_admin/Sidebar_admin';
import ViewIcon from '../../../assets/img/View.png';
import DeleteIcon from '../../../assets/img/Delete.png';
import globalstyles from '../../CSSglobal.module.css';
import axios from 'axios';

export const Faculty = () => {
    const [faculty, setFaculty] = useState([]);

    const handleChange = (event) => {
        setFaculty(event.target.value);
    };

    const handleSearchButtonClick = () => {
        console.log('Đã nhấn nút Tìm kiếm với giá trị:', inputValue);
    };


    return (
        <div>
            <Sidebar_admin/>
            <Container fluid className={globalstyles['main-background']}>
                <div className={globalstyles['left-title']}>Danh sách khoa</div>
                <Button className={globalstyles['add-button']} onClick={handleSearchButtonClick} variant="dark">Thêm mới</Button> 
                <div className={globalstyles['search-input']}>
                    <input type="text" value={inputValue} onChange={handleChange} placeholder="Tìm tên lớp hoặc mã lớp"/>
                    <Button className={globalstyles['button-search']} variant="dark">Tìm kiếm</Button> 
                </div>
                <Table className={globalstyles['table-1300']}>
                    <thead>
                        <tr style={{ textAlign: 'center', whiteSpace: '2px' }}>
                            <th>STT</th>
                            <th>Mã khoa</th>
                            <th>Tên Khoa</th>
                            <th>Địa điểm</th>
                            <th>Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        
                    </tbody>
                </Table>
            </Container>
        </div>
    );
};