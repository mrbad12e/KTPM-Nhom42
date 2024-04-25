import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import 'boxicons/css/boxicons.min.css';
import './Home.css'
export const Home = () => {
    return (
    <div className="homepage-background px-1">
        
        <div class="content "> 
                <div class="left-content ">
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
                                <a href="">Đăng xuất</a>
                            </li>
                        </ul>
                  
                    
                </div>
                <div class="right-content">

                </div>
        </div>

    </div>
    );
};
