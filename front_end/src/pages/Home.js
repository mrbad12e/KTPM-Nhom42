import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import 'boxicons/css/boxicons.min.css';
import './Home.css'
export const Home = () => {
    return (
    <div className="homepage-background px-1">
        
        <div class="content row "> 
            
                <div className="left-content ">
                <img src="https://media.thuvienthaythonglac.net/wp-content/uploads/2021/07/14142451/70g-user-avatar.svg" alt="Anh" class="anh_the"/>
                        <h3 class="text-name">Nguyen Van A</h3>
                        <ul class="sitemap">
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
                                <a href="http://localhost:3000">Đăng xuất</a>
                            </li>
                        </ul>
                </div>
            
                <div className=" right-content">
                    <h2>THÔNG TIN SINH VIEN</h2>
                    <div className='main_content'>
                        <div className='image_student'>
                            <img src="https://inkythuatso.com/uploads/thumbnails/800/2023/03/8-anh-dai-dien-trang-inkythuatso-03-15-26-54.jpg" alt="anh" class="anh-the"/>
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
