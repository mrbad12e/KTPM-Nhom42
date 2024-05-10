import React, { useState, useEffect } from 'react'; 
import { Container , Row } from 'react-bootstrap'; 
import axios from 'axios';
import Sidebar_student from '../../components/Layouts/Sidebar/sidebarStudent'
import avatar from '../../../assets/img/avatar.jpg';
import globalstyles from '../../CSSglobal.module.css';
import styles from './Home.module.css';

export const Home = () => {
    const [student, setStudent] = useState(null);

    useEffect(() => {
        const fetchStudent = async () => {
            try {
                const email = localStorage.getItem('email');  
                const response = await axios.get(`/student?email=${email}`); // Thêm 'email=' vào trước tham số email
                const students = response.data.students;
                if (students.length > 0) {
                    setStudent(students[0]);
                }
            } catch (error) {
                console.error('Failed to fetch student info:', error);
            }
        };
        fetchStudent();
    }, []);

    return (
        <div>
           <Sidebar_student/>
           <Container fluid className={globalstyles['main-background']}>
                <div className={globalstyles.title}>THÔNG TIN SINH VIÊN</div>
                {student && (
                    <div className={styles.wrapper}>
                        <Row style={{marginTop: '50px'}}>
                            <img src={avatar} alt="anh" className={styles.image_student}/>
                            <div className={styles.container}>
                                <p><strong>MSSV: </strong>{student.id}</p>
                                <p><strong>Chuyên ngành: </strong>{student.program_id}</p>
                                <p><strong>Họ và tên: </strong>{`${student.first_name} ${student.last_name}`}</p>
                                <p><strong>Số điện thoại: </strong>{student.phone}</p>
                                <p><strong>Ngày sinh: </strong>{new Date(student.birthday).toLocaleDateString()}</p>
                                <p><strong>Giới tính: </strong>{student.gender === 'F' ? 'Nữ' : 'Nam'}</p>
                                <p><strong>Địa chỉ: </strong>{student.address}</p>
                            </div>
                        </Row>
                    </div>
                )}
            </Container>
        </div>
    );
};
