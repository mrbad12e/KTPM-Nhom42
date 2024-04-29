import { Col, Row } from 'react-bootstrap';

export const Header = () => {
    return (
        <header>
            <Col sm={6}>
                <h1>ĐẠI HỌC BÁCH KHOA HÀ NỘI</h1>
            </Col>
            <Col sm={3}>
                <div className="search-container">
                    <form>
                        <input type="text" placeholder="Search.." name="search" />
                        <button type="submit">
                            <i className="bx bx-search"></i>
                        </button>
                    </form>
                </div>
            </Col>
            <Col sm={3}>
                <div className="dropdown">
                    <button className="dropbtn">Xin chào sinh viên,</button>
                    <i className="bx bx-chevron-down"></i>
                    <div className="dropdown-content">
                        <a href="#">Đổi mật khẩu</a>
                        <a href="#">Đăng xuất</a>
                    </div>
                </div>
            </Col>
        </header>
    );
};