import {} from 'react-bootstrap';

export const Home = () => {
    return (
        <div className="content">
            <div className="vertical-menu">
                <a href="#" className="active">
                    <i className="bx bx-home-alt"></i>Trang chủ
                </a>
                <a href="#">
                    <i className="bx bx-user"></i>Hồ sơ sinh viên
                </a>
                <a href="#">
                    <i className="bx bx-calendar"></i>Thời khóa biểu
                </a>
                <a href="#">
                    <i className="bx bx-customize"></i>Đăng kí học tập
                </a>
                <a href="#">
                    <i className="bx bx-credit-card"></i>Học phí
                </a>
            </div>

            <div className="main">
                <h2>Tin tức</h2>
                <hr className="solid" />

                <div className="slideshow-container">
                    
                </div>
                <br />

                <div style={{ textAlign: 'center'}}>
                    <span className="dot"></span>
                    <span className="dot"></span>
                    <span className="dot"></span>
                </div>
                <p>Some text..</p>
                <p>
                    Sunt in culpa qui officia deserunt mollit anim id est laborum consectetur adipiscing elit, sed do
                    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                    exercitation ullamco.
                </p>
                <br />
                <h2>Kế hoạch</h2>
                <hr className="solid" />
                <div className="fakeimg" style={{height:'200px'}}>
                    Image
                </div>
                <p>Some text..</p>
                <p>
                    Sunt in culpa qui officia deserunt mollit anim id est laborum consectetur adipiscing elit, sed do
                    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                    exercitation ullamco.
                </p>
            </div>
        </div>
    );
};
