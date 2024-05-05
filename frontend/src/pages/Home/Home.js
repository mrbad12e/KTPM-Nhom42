import React, { useState, useEffect } from 'react'; 
import { Container , Row, Col } from 'react-bootstrap'; 
import axios from 'axios';
import Sidebar from '../../components/Layouts/Sidebar/sidebarStudent'
import avatar from '../../../assets/img/avatar.jpg';
import globalstyles from '../../CSSglobal.module.css';
import styles from './Home.module.css';

export const Home = () => {
    const [studentInfo, setStudentInfo] = useState({id: '', programName: '', name: '', phone: '', birthday: '', gender: '', address: '' });
    
    useEffect(() => {
        const fetchStudentInfo = async () => {
            try {
                const email = localStorage.getItem('email');  
                if (email) {
                    const response = await axios.post('/student/profile', {email});
                    const userInfo = response.data.userInfo;
                    setStudentInfo(userInfo);
                    console.log('Student info:', userInfo);
                }
            } catch (error) {
                console.error('Failed to fetch student info:', error);
            }
        };
        fetchStudentInfo();
    }, []);

    const renderInfoStudent = () => {
        return (
            <div className={styles.wrapper}>
                <Row style={{marginTop: '50px'}}>
                    <img src={avatar} alt="anh" className={styles.image_student}/>
                    <div className={styles.container}>
                        <p><strong>MSSV: </strong>{studentInfo.id}</p>
                        <p><strong>Chuyên ngành: </strong>{studentInfo.programName}</p>
                        <p><strong>Họ và tên: </strong>{studentInfo.name}</p>
                        <p><strong>Số điện thoại: </strong>{studentInfo.phone}</p>
                        <p><strong>Ngày sinh: </strong>{studentInfo.birthday}</p>
                        <p><strong>Giới tính: </strong>{studentInfo.gender}</p>
                        <p><strong>Địa chỉ: </strong>{studentInfo.address}</p>
                    </div>
                </Row>
            </div>       
        );
    };

    return (
        <div>
           <Sidebar/>
           <Container fluid className={globalstyles['main-background']}>
                <div className={globalstyles.title}>THÔNG TIN SINH VIÊN</div>
                {renderInfoStudent()}  
            </Container>
        </div>
    );
};
