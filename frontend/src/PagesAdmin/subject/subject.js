import React, { useState, useEffect } from 'react';
import { Table, Container, Row, Col, Button, Modal, Form } from 'react-bootstrap';
import Sidebar_admin from '../../components/Layouts/Sidebar/sidebarAdmin';
import globalstyles from '../../CSSglobal.module.css';
import Pagination from '../../components/pagination/pagination';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import Alert from '@mui/material/Alert';

export const Subject = () => {
    const [subjects, setSubjects] = useState([]);
    const [inputSubjectID, setInputSubjectID] = useState('');
    const [inputFacultyID, setInputFacultyID] = useState('');
    const [currentPage, setCurrentPage] = useState(1); 
    const [totalPages, setTotalPages] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [selectedSubject, setSelectedSubject] = useState(null);
    const [subjectData, setSubjectData] = useState({
        id: '',
        name: '',
        faculty_id: '',
        study_credits: '',
        tuition_credits: '',
        final_weight: '',
        prerequisite_id: ''
    });

    useEffect(() => {
        fetchSubjects();
    }, []);

    const fetchSubjects = async () => {
        try {
            let response;
            if (inputSubjectID && inputFacultyID) {
                response = await axios.get(`/subject/?id=${inputSubjectID}&&name=${inputFacultyID}`);
            } else if (inputSubjectID) {
                response = await axios.get(`/subject/?id=${inputSubjectID}`);
            } else if (inputFacultyID) {
                response = await axios.get(`/subject/?faculty_id=${inputFacultyID}`);
            } else {
                response = await axios.get(`/subject/`);
            }
            const subjectData = response.data.subject;
            setSubjects(subjectData);
            const pageCount = Math.ceil(subjectData.length / 10);
            setTotalPages(pageCount);
            setCurrentPage(1);
        } catch (error) {
            console.error('Error fetching subject:', error);
        }
    };

    const handleSearchButtonClick = () => {
        setCurrentPage(1);
        fetchSubjects();
    };

    const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

    const handleShowModal = (subject = null) => {
        if (subject) {
            setSelectedSubject(subject);
            setSubjectData(subject);
            setIsEditMode(true);
        } else {
            setSelectedSubject(null);
            setSubjectData({
                id: '',
                name: '',
                faculty_id: '',
                study_credits: '',
                tuition_credits: '',
                final_weight: '',
                prerequisite_id: ''
            });
            setIsEditMode(false);
        }
        setShowModal(true);
    };

    const handleCloseModal = () => setShowModal(false);

    const handleSaveChanges = async () => {
        try {
            await axios.patch(`/subject/?id=${selectedSubject.id}`, subjectData);
            setSubjects(prevSubjects => 
                prevSubjects.map(sub => sub.id === selectedSubject.id ? subjectData : sub)
            );
            handleCloseModal();
        } catch (error) {
            console.error('Error updating subject:', error.response.data.error.constraint);
        }
    };

    const handleAddNewSubject = async () => {
        try {
            await axios.post(`/subject/`, subjectData);
            fetchSubjects();
            setCurrentPage(1);
            handleCloseModal();
            setTimeout(() => {
                window.alert('Môn học đã được thêm thành công.');
            }, 100);
        } catch (error) {
            console.error('Error adding new subject:',  error.response.data.error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSubjectData({ ...subjectData, [name]: value });
    };

    return (
        <div>
            <Sidebar_admin />
            <Container fluid className={globalstyles['main-background']}>
                <div className={globalstyles['left-title']}>Danh sách học phần</div>
                <Button className={globalstyles.addButton} onClick={() => handleShowModal()} variant="primary">Thêm mới</Button>

                {/* <Alert  severity="success">
                    Here is a gentle confirmation that your action was successful.
                </Alert> */}

                <div style={{ display: 'flex', gap: '10px', marginLeft: '50px' }}>
                    <input className={globalstyles.input} type="text" value={inputSubjectID} onChange={(event) => setInputSubjectID(event.target.value)} placeholder="Nhập mã học phần" />
                    <input className={globalstyles.input} type="text" value={inputFacultyID} onChange={(event) => setInputFacultyID(event.target.value)} placeholder="Nhập tên học phần" />
                    <Button className={globalstyles.smallButton} variant="primary" onClick={handleSearchButtonClick}>Tìm kiếm</Button>
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
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {subjects.slice((currentPage - 1) * 10, currentPage * 10).map(subject => (
                            <tr key={subject.id}>
                                <td style={{ textAlign: 'center' }}>{subject.id}</td>
                                <td>{subject.name}</td>
                                <td style={{ textAlign: 'center' }}>{subject.faculty_id}</td>
                                <td style={{ textAlign: 'center' }}>{subject.study_credits}</td>
                                <td style={{ textAlign: 'center' }}>{subject.tuition_credits}</td>
                                <td style={{ textAlign: 'center' }}>{subject.final_weight}</td>
                                <td style={{ textAlign: 'center' }}>{subject.prerequisite_id}</td>
                                <td>
                                    <div className={globalstyles['icon-container']} onClick={() => handleShowModal(subject)}>
                                        <FontAwesomeIcon color="white" icon={faEdit} />
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

            <Modal show={showModal} onHide={handleCloseModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>{isEditMode ? 'Chỉnh sửa thông tin học phần' : 'Thêm mới học phần'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group as={Row} className="align-items-center mb-3">
                            <Form.Label column sm="4">Mã học phần:</Form.Label>
                            <Col sm="8">
                                <Form.Control 
                                    type="text" 
                                    name="id" 
                                    value={subjectData.id} 
                                    onChange={handleInputChange} 
                                    readOnly={isEditMode} 
                                    placeholder="Subject ID" 
                                />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="align-items-center mb-3">
                            <Form.Label column sm="4">Tên học phần:</Form.Label>
                            <Col sm="8">
                                <Form.Control 
                                    type="text" 
                                    name="name" 
                                    value={subjectData.name} 
                                    onChange={handleInputChange} 
                                    placeholder="Subject name" 
                                />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="align-items-center mb-3">
                            <Form.Label column sm="4">Khoa:</Form.Label>
                            <Col sm="8">
                                <Form.Control 
                                    type="text" 
                                    name="faculty_id" 
                                    value={subjectData.faculty_id} 
                                    onChange={handleInputChange} 
                                    placeholder="Faculty name" 
                                />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="align-items-center mb-3">
                            <Form.Label column sm="4">Tín chỉ học phần:</Form.Label>
                            <Col sm="8">
                                <Form.Control 
                                    type="text" 
                                    name="study_credits" 
                                    value={subjectData.study_credits} 
                                    onChange={handleInputChange} 
                                    placeholder="Study credits" 
                                />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="align-items-center mb-3">
                            <Form.Label column sm="4">Tín chỉ học phí:</Form.Label>
                            <Col sm="8">
                                <Form.Control 
                                    type="text" 
                                    name="tuition_credits" 
                                    value={subjectData.tuition_credits} 
                                    onChange={handleInputChange} 
                                    placeholder="Tuition credits" 
                                />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="align-items-center mb-3">
                            <Form.Label column sm="4">Hệ số cuối kì:</Form.Label>
                            <Col sm="8">
                                <Form.Control 
                                    type="text" 
                                    name="final_weight" 
                                    value={subjectData.final_weight} 
                                    onChange={handleInputChange} 
                                    placeholder="Final weight" 
                                />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="align-items-center mb-3">
                            <Form.Label column sm="4">Điều kiện:</Form.Label>
                            <Col sm="8">
                                <Form.Control 
                                    type="text" 
                                    name="prerequisite_id" 
                                    value={subjectData.prerequisite_id || ''} 
                                    onChange={handleInputChange} 
                                    placeholder="Prerequisite ID" 
                                />
                            </Col>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={isEditMode ? handleSaveChanges : handleAddNewSubject}>
                        {isEditMode ? 'Lưu thay đổi' : 'Thêm mới'}
                    </Button>
                    <Button variant="danger" onClick={handleCloseModal}>Đóng</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};
