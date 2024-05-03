import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
// import homeCSS from './Home.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import avatar from '../../../assets/img/avatar.jpg'
export const Home = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await axios.get('/admin/logout');
            console.log('Logged out successfully');
            localStorage.removeItem('auth');
            navigate('/');
        } catch (error) {
            console.log(error);
        }
    }

    return (
    <div className="homepage-background px-1">
        
        <div className="content row "> 
            
                <div className="left-content ">
                <img src={avatar} alt="Anh" className="anh_the"/>
                        <h3 className="text-name">Nguyen Van A</h3>
                        <ul className="sitemap">
                            <li>
                                <a href="">Thông tin sinh viên</a>
                            </li>
                            <li>
                                <a href="">Đăng kí học tập</a>
                            </li>
                            <li>
                                <a href="">Thời khóa biểu</a>
                            </li>
                            <li>
                                <a href="">Thành tích học tập</a>
                            </li>
                            <li>
                                <a href="">Thông tin giảng viên</a>
                            </li>
                            <li>
                                <Button variant="primary" onClick={handleLogout}>Đăng xuất</Button>
                            </li>
                        </ul>
                </div>
            
                <div className=" right-content">
                    <h2>THÔNG TIN SINH VIEN</h2>
                    <div className='main_content'>
                        <div className='image_student'>
                            <img src={avatar} alt="anh" className="anh-the"/>
                        </div>
                        <div className='info_student'>
                            <p><strong>MSSV:</strong> 123456</p>
                            <p><strong>Chuyên ngành:</strong> Thợ code</p>
                            <p><strong>Họ và tên:</strong> Nguyễn Văn A</p>
                            <p><strong>Số điện thoại:</strong> 0123456789</p>
                            <p><strong>Ngày sinh:</strong> 01/01/2000</p>
                            <p><strong>Giới tính:</strong> Nam</p>
                            <p><strong>Địa chỉ:</strong> Hà Nội, Việt Nam</p>
                        </div>
                    </div>
                </div>
        </div>

    </div>
    );
};