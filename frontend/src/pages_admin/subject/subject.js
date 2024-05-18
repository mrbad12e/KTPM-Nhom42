import React, { useState, useEffect } from 'react';
import { Table, Container, Row, Col, Button, Modal, Form } from 'react-bootstrap';
import Sidebar_admin from '../../components/Layouts/Sidebar_admin/Sidebar_admin';
import UpdateIcon from '../../../assets/img/Update.png';
import globalstyles from '../../CSSglobal.module.css';
import axios from 'axios';
import Pagination from '../../components/Layouts/Pagination/Pagination';

export const Subject = () => {
    const [subject, setSubject] = useState([]);
    const [inputMahp, setInputMahp] = useState('');
    const [inputTenhp, setInputTenhp] = useState('');
    const [currentPage, setCurrentPage] = useState(1); 
    const [totalPages, setTotalPages] = useState(0);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showNewModal, setShowNewModal] = useState(false);
    const [selectedSubject, setSelectedSubject] = useState(null);
    const [newSubject, setNewSubject] = useState({
        id: '',
        name: '',
        faculty_id: '',
        study_credits: '',
        tuition_credits: '',
        final_weight: '',
        
    });
    useEffect(() => {
        fetchSearchSubject();
    }, []);

    const fetchSearchSubject = async () => {
        try {
            let response;
            if (inputMahp && inputTenhp) {
                response = await axios.get(`/subject/?id=${inputMahp}&&name=${inputTenhp}`);
            } else if (inputMahp) {
                response = await axios.get(`/subject/?id=${inputMahp}`);
            } else if (inputTenhp) {
                response = await axios.get(`/subject/?name=${inputTenhp}`);
            } else {
                response = await axios.get(`/subject/`);
            }
            const subjectData = response.data.subject;
            setSubject(subjectData);
            const pageCount = Math.ceil(subjectData.length / 10);
            setTotalPages(pageCount);
            // Đặt trang hiện tại về trang đầu tiên
            setCurrentPage(1);
        } catch (error) {
            console.error('Error fetching subject:', error);
        }
    };
    
    const inputValueMahp = (event) => {
        setInputMahp(event.target.value);
    };

    const inputValueTenhp = (event) => {
        setInputTenhp(event.target.value);
    };

    const handleSearchButtonClick = () => {
        setCurrentPage(1);
        fetchSearchSubject();
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        fetchSearchSubject();
    };

    const handleShowEditModal = (subject) => {
        setSelectedSubject(subject);
        setShowEditModal(true);
    };

    const handleCloseEditModal = () => setShowEditModal(false);

    const handleShowNewModal = () => {
        setShowNewModal(true);
    };

    const handleCloseNewModal = () => setShowNewModal(false);

    const handleSaveChanges = async () => {
        try {
            await axios.patch(`/subject/?id=${selectedSubject.id}`, selectedSubject);
            // Cập nhật danh sách môn học ngay lập tức
            setSubject(prevSubjects => 
                prevSubjects.map(sub => sub.id === selectedSubject.id ? selectedSubject : sub)
            );
            handleCloseEditModal();
        } catch (error) {
            console.error('Error updating subject:', error);
        }
    };
    

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        
        setSelectedSubject({ ...selectedSubject, [name]: value });
    };

    const handleAddNewSubject = async () => {
        try {
            await axios.post(`/subject/`, newSubject);
            // Fetch lại danh sách môn học sau khi thêm thành công
            fetchSearchSubject();
            // Đặt trang hiện tại về trang đầu tiên
            setCurrentPage(1);
            handleCloseNewModal();
            // Reset giá trị của newSubject để chuẩn bị cho lần thêm mới tiếp theo
            setNewSubject({
                id: '',
                name: '',
                faculty_id: '',
                study_credits: '',
                tuition_credits: '',
                final_weight: '',
            });
            setTimeout(() => {
                // Hiển thị thông báo khi thêm thành công
                window.alert('Môn học đã được thêm thành công.');
            }, 100);
        } catch (error) {
            console.error('Error adding new subject:', error);
        }
    };
    
    return (
        <div>
            <Sidebar_admin />
            <Container fluid className={globalstyles['main-background']}>
                <div className={globalstyles['left-title']}>Danh sách lớp</div>
                <Button className={globalstyles['add-button']} onClick={handleShowNewModal} variant="dark">Thêm mới</Button>
                <div className={globalstyles['search-input']}>
                    <input type="text" value={inputMahp} onChange={inputValueMahp} placeholder="Nhập mã học phần" style={{ marginRight: '10px' }} />
                    <input type="text" value={inputTenhp} onChange={inputValueTenhp} placeholder="Nhập tên học phần" />
                    <Button className={globalstyles['button-search']} variant="dark" onClick={handleSearchButtonClick}>Tìm kiếm</Button>
                </div>
                <Table className={globalstyles['table-1300']}>
                    <thead>
                        <tr style={{ textAlign: 'center', whiteSpace: '2px' }}>
                            <th>Mã học phần</th>
                            <th>Tên học phần</th>
                            <th>Khoa</th>
                            <th>Tín chỉ học phần</th>
                            <th>Tín chỉ học phí</th>
                            <th>Hệ số cuối kì</th>
                            <th>Điều kiện</th>
                            <th>Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {subject.slice((currentPage - 1) * 10, currentPage * 10).map(subject => (
                            <tr key={subject.id}>
                                <td style={{ textAlign: 'center' }}>{subject.id}</td>
                                <td>{subject.name}</td>
                                <td style={{ textAlign: 'center' }}>{subject.faculty_id}</td>
                                <td style={{ textAlign: 'center' }}>{subject.study_credits}</td>
                                <td style={{ textAlign: 'center' }}>{subject.tuition_credits}</td>
                                <td style={{ textAlign: 'center' }}>{subject.final_weight}</td>
                                <td style={{ textAlign: 'center' }}>{subject.prerequisite_id}</td>
                                <td style={{ display: 'flex', justifyContent: 'center' }}>
                                    <div className={globalstyles['img-button-container']} >
                                        <img src={UpdateIcon} alt="Update" className={globalstyles['img-button']} onClick={() => handleShowEditModal(subject)} />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <div>
                    <Pagination currentPage={currentPage} totalPages={totalPages} handlePageChange={handlePageChange} />
                </div>
            </Container>

            //Modal chỉnh sửa học phần
            {selectedSubject && (
                <Modal show={showEditModal} onHide={handleCloseEditModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Chỉnh sửa thông tin học phần</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group as={Row} className="align-items-center mb-3">
                                <Form.Label column sm="4">Mã học phần:</Form.Label>
                                <Col sm="8">
                                    <Form.Control type="text" name="id" value={selectedSubject.id} readOnly />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="align-items-center mb-3">
                                <Form.Label column sm="4">Tên học phần:</Form.Label>
                                <Col sm="8">
                                    <Form.Control type="text" name="name" value={selectedSubject.name} onChange={handleInputChange} />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="align-items-center mb-3">
                                <Form.Label column sm="4">Khoa:</Form.Label>
                                <Col sm="8">
                                    <Form.Control type="text" name="faculty_id" value={selectedSubject.faculty_id} onChange={handleInputChange} />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="align-items-center mb-3">
                                <Form.Label column sm="4">Tín chỉ học phần:</Form.Label>
                                <Col sm="8">
                                    <Form.Control type="text" name="study_credits" value={selectedSubject.study_credits} onChange={handleInputChange} />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="align-items-center mb-3">
                                <Form.Label column sm="4">Tín chỉ học phí:</Form.Label>
                                <Col sm="8">
                                    <Form.Control type="text" name="tuition_credits" value={selectedSubject.tuition_credits} onChange={handleInputChange} />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="align-items-center mb-3">
                                <Form.Label column sm="4">Hệ số cuối kì:</Form.Label>
                                <Col sm="8">
                                    <Form.Control type="text" name="final_weight" value={selectedSubject.final_weight} onChange={handleInputChange} />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="align-items-center mb-3">
                                <Form.Label column sm="4">Điều kiện:</Form.Label>
                                <Col sm="8">
                                    <Form.Control type="text" name="prerequisite_id" value={selectedSubject.prerequisite_id || ''} onChange={handleInputChange} />
                                </Col>
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={handleSaveChanges}>Lưu thay đổi</Button>
                        <Button variant="secondary" onClick={handleCloseEditModal}>Đóng</Button>
                    </Modal.Footer>
                </Modal>
            )}

            //Modal thêm mới học phần
            <Modal show={showNewModal} onHide={handleCloseNewModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Thêm mới học phần</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group as={Row} className="align-items-center mb-3">
                            <Form.Label column sm="4">Mã học phần:</Form.Label>
                            <Col sm="8">
                                <Form.Control type="text" name="id" value={newSubject.id} onChange={(e) => setNewSubject({ ...newSubject, id: e.target.value })} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="align-items-center mb-3">
                            <Form.Label column sm="4">Tên học phần:</Form.Label>
                            <Col sm="8">
                                <Form.Control type="text" name="name" value={newSubject.name} onChange={(e) => setNewSubject({ ...newSubject, name: e.target.value })} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="align-items-center mb-3">
                            <Form.Label column sm="4">Khoa:</Form.Label>
                            <Col sm="8">
                                <Form.Control type="text" name="faculty_id" value={newSubject.faculty_id} onChange={(e) => setNewSubject({ ...newSubject, faculty_id: e.target.value })} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="align-items-center mb-3">
                            <Form.Label column sm="4">Tín chỉ học phần:</Form.Label>
                            <Col sm="8">
                                <Form.Control type="text" name="study_credits" value={newSubject.study_credits} onChange={(e) => setNewSubject({ ...newSubject, study_credits: e.target.value })} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="align-items-center mb-3">
                            <Form.Label column sm="4">Tín chỉ học phí:</Form.Label>
                            <Col sm="8">
                                <Form.Control type="text" name="tuition_credits" value={newSubject.tuition_credits} onChange={(e) => setNewSubject({ ...newSubject, tuition_credits: e.target.value })} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="align-items-center mb-3">
                            <Form.Label column sm="4">Hệ số cuối kì:</Form.Label>
                            <Col sm="8">
                                <Form.Control type="text" name="final_weight" value={newSubject.final_weight} onChange={(e) => setNewSubject({ ...newSubject, final_weight: e.target.value })} />
                            </Col>
                        </Form.Group>
                        {/* <Form.Group as={Row} className="align-items-center mb-3">
                            <Form.Label column sm="4">Điều kiện:</Form.Label>
                            <Col sm="8">
                                <Form.Control type="text" name="prerequisite_id" value={newSubject.prerequisite_id} onChange={(e) => setNewSubject({ ...newSubject, prerequisite_id: e.target.value })} />
                            </Col>
                        </Form.Group> */}
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleAddNewSubject}>Thêm mới</Button>
                    <Button variant="secondary" onClick={handleCloseNewModal} >Đóng</Button>
                </Modal.Footer>
            </Modal>

            
        </div>
    );
};
