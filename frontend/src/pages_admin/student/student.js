import React, { useState } from 'react';
import { Table, Container, Row, Col, Button } from 'react-bootstrap';
import Sidebar_admin from '../../components/Layouts/Sidebar_admin/Sidebar_admin'; 
import ViewIcon from '../../../assets/img/View.png';
import DeleteIcon from '../../../assets/img/Delete.png';
import './student.module.css';
import '../../CSSglobal.module.css';

export const Student = () => {
    const [inputValue, setInputValue] = useState('');

    const handleChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleSearchButtonClick = () => {
        console.log('Đã nhấn nút Tìm kiếm với giá trị:', inputValue);
    };

    return (
        <Row>
            <Sidebar_admin />
            <Container className={styles['main-background']}>
                <h4 style={{ margin: '10px' }}>Danh sách lớp</h4>
                <Button style={{ position: 'absolute', right: '10px', top: '10px' }}  onClick={handleSearchButtonClick} variant="dark">Thêm mới</Button> 
                <div style={{ marginTop: '30px' }}>
                    <input 
                        type="text" 
                        value={inputValue} 
                        onChange={handleChange} 
                        placeholder="Tìm tên lớp hoặc mã lớp" 
                    />
                    <Button style={{ position: 'absolute', left: 0, marginLeft: '230px', height: '28px', fontSize: '14px',textAlign: 'center', lineHeight: 'normal' }} onClick={handleSearchButtonClick} variant="dark">Tìm kiếm</Button> 
                </div>
                <Table className="custom-table">
                    <thead>
                        <tr>
                            <th>MSSV</th>
                            <th>Họ và tên</th>
                            <th>Chương trình đào tạo</th>
                            <th>CPA</th>
                            <th>Email</th>
                            <th style={{ textAlign: 'center', whiteSpace: 'nowrap' }}>Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="table-content">20212</td>
                            <td className="table-content">HP001</td>
                            <td className="table-content">Truyền thông số và Kỹ thuật đa phương tiện (Chương trình tiên tiến)</td>
                            <td className="table-content">4.0</td>
                            <td className="table-content">luongquangcbvn@gmail.com</td>
                            <td className="table-content">
                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                    <div style={{ overflow: 'hidden', position: 'relative', width: '30px', height: '30px', borderRadius: '5px' }}>
                                        <div onClick={handleSearchButtonClick} style={{ cursor: 'pointer', position: 'absolute', width: '100%', height: '100%', zIndex: '1' }}>
                                            <img src={ViewIcon} alt="Search" style={{ width: '100%', height: '100%', borderRadius: '5px' }} />
                                        </div>
                                    </div>
                                    <div style={{ marginLeft: '15px', overflow: 'hidden', position: 'relative', width: '30px', height: '30px', borderRadius: '5px' }}>
                                        <div onClick={handleSearchButtonClick} style={{ cursor: 'pointer', position: 'absolute', width: '100%', height: '100%', zIndex: '1' }}>
                                            <img src={DeleteIcon} alt="Search" style={{ width: '100%', height: '100%', borderRadius: '5px' }} />
                                        </div>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </Table>
            </Container>
        </Row>
    );
};


