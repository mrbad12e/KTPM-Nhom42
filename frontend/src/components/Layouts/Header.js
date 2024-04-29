import { Col, Row } from 'react-bootstrap';
import './Header.css'; // Import file CSS mới

export const Header = () => {
    return (
        <header className="container-fluid header-background"> {/* Thêm class header-background */}
            <Row>
                <Col sm={6}>
                    <h1 className="header-title">ĐẠI HỌC BÁCH KHOA HÀ NỘI</h1>
                </Col>
                <Col sm={{ span: 3, offset: 3 }}> {/* Cân đối cột */}
                    <div className="dropdown">
                        <button className="dropbtn">Xin chào sinh viên,</button>
                        <i className="bx bx-chevron-down"></i>
                        <div className="dropdown-content">
                            <a href="#">Đổi mật khẩu</a>
                            <a href="#">Đăng xuất</a>
                        </div>
                    </div>
                </Col>
            </Row>
        </header>
    );
};
