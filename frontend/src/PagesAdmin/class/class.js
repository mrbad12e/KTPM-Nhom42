import React, { useState, useEffect } from 'react';
import { Table, Container, Row, Col, Button } from 'react-bootstrap';
import Sidebar_admin from '../../components/Layouts/Sidebar/sidebarAdmin';
import ViewIcon from '../../../assets/img/View.png';
import DeleteIcon from '../../../assets/img/Delete.png';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styles from './class.module.css';
import globalstyles from '../../CSSglobal.module.css';

export const Class = () => {
    const [inputValue, setInputValue] = useState('');

    const handleChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleSearchButtonClick = () => {
        console.log('Đã nhấn nút Tìm kiếm với giá trị:', inputValue);
    };





    return (
        <div>
            <Sidebar_admin/>
            <Container fluid className={globalstyles['main-background']}>
                <div className={globalstyles['left-title']}>Danh sách lớp</div>
                <Link to="/addClass"><Button className={globalstyles['add-button']} variant="dark"> Thêm mới</Button></Link>
                <div className={globalstyles['search-input']}>
                    <input type="text" value={inputValue} onChange={handleChange} placeholder="Tìm tên lớp hoặc mã lớp"/>
                    <Button className={globalstyles['button-search']} onClick={handleSearchButtonClick} variant="dark">Tìm kiếm</Button> 
                </div>
                <Table className={globalstyles['table-1300']}>
                    <thead>
                        <tr style={{ textAlign: 'center', whiteSpace: '2px' }}>
                            <th>STT</th>
                            <th>Tên môn học</th>
                            <th>Mã lớp</th>
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


