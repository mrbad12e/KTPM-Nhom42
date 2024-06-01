import React, { useState, useEffect } from 'react';
import { Table, Container, Button, Dropdown, Modal,  Alert } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Sidebar_admin from '../../components/Layouts/Sidebar/sidebarAdmin'; 
import styles from './class.module.css';
import globalstyles from '../../CSSglobal.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faEye, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import dayjs from 'dayjs';

export const UpdateClass = () => {
    const location = useLocation();
    const classId = location.pathname.split('/').pop(); 

    const [classInfo, setClassInfo] = useState([]);
    const [classTime, setClassTime] = useState([]);
    const fetchClassInfo = async () => {
        try { 
            const response = await axios.get(`/class?class_id=${classId}`);
            const classData = response.data.class;
    
            if (classData && classData.length > 0) {
                const classInfo = classData[0];
                setClassInfo(classInfo);
    
                const filteredClassTime = classData
                .filter(item => item.class_id === classId)
                .map(item => ({
                    start_time: convertTimeFormat(item.start_time),
                    end_time: convertTimeFormat(item.end_time),
                    location: item.location,
                    weekday: item.weekday
                }));

                setClassTime(filteredClassTime);
            } else {
                console.warn('No class information found for the given class_id');
            }
        } catch (error) {
            console.error('Error fetching class:', error);
        }
    };
    
    useEffect(() => {
        fetchClassInfo();
    }, []);  
    

    //--------------------------Class-------------------
    // type
    const [typeError, setTypeError] = useState(false);
    const handleSelectType = (eventKey) => {
        setTypeError(false);
        setClassInfo(prevClassInfo => ({...prevClassInfo, type: eventKey }));
    };
    
    // lab
    const [labError, setLabError] = useState(false);
    const handleSelectLab = (eventKey) => {
        setLabError(false); 
        setClassInfo(prevClassInfo => ({...prevClassInfo, require_lab: eventKey }));
    };

     // Số sinh viên tối đa
     const [inputStudentCountError, setInputStudentCountError] = useState(false);
     const handleInputStudentCount = (event) => {
        setInputStudentCountError(false);
        const onlyNums = event.target.value.replace(/[^0-9]/g, '');
        const limitedNums = onlyNums.slice(0, 3);
        setClassInfo(prevClassInfo => ({...prevClassInfo, max_cap: limitedNums }));
     };

    //--------------------TimeTable--------------------------------
    const convertTimeFormat = (time) => {
        const hour = parseInt(time.substring(0, 2), 10);
        const minute = time.substring(2);
        const period = hour >= 12 ? 'PM' : 'AM';
        const formattedHour = hour % 12 || 12;
        return `${String(formattedHour).padStart(2, '0')}:${minute} ${period}`;
    };

    //--------------------Lecturer------------------------
    const [lecturer, setLecturer] = useState(null);   
    const [inputLecturerIDError, setInputLecturerIDError] = useState(false);

    const handleInputLecturerID = (event) => {
        setClassInfo(prevClassInfo => ({...prevClassInfo, lecturer_id: event }));
    };

    const fetchSearchLecturer = async () => {
        try {
            setInputLecturerIDError(false);
            let response = await axios.get(`/admin/lecturer?id=${classInfo.lecturer_id}`);
            if (response.data.lecturers.length > 0) setLecturer(response.data.lecturers[0])
            else setLecturer(null); 
        } catch (error) {
            console.error('Error fetching lecturer:', error);
        }
    };

    // Search Lecturer
    const handleSearchLecturerClick = () => fetchSearchLecturer();

    // View Lecturer
    const handleViewLecturer = () => {
        console.log(lecturer)
    };
    //--------------------Student-------------------------
    const [students, setStudents] = useState([]);   

    const fetchStudent = async () => {
        try { 
            const response = await axios.get(`class/students?class_id=${classId}`);
            setStudents(response.data.students);
        } catch (error) {
            console.error('Error fetching class:', error);
        }
    };

    useEffect(() => {
        fetchStudent();
    }, []);

    const handleInputMSSV = (event) => {
        const onlyNums = event.target.value.replace(/[^0-9]/g, '');
        setInputMSSV(onlyNums); 
    };
    
    const fetchSearchStudent = async () => {
        try {
            let response = await axios.get(`/admin/student?id=${inputMSSV}`);
            if (response.data.students.length > 0) {
                const studentsWithStatus = response.data.students.map(student => ({
                    ...student,
                    status: true
                }));
                setStudent(studentsWithStatus[0]); 
            } else {
                setStudent(null); 
            }
        } catch (error) {
            console.error('Error fetching student:', error);
        }
    };
    

    // Search Student
    const [inputMSSV, setInputMSSV] = useState(''); 
    const [student, setStudent] = useState(null);  

    const handleSearchStudentClick = () => fetchSearchStudent();
    
    // View Student
    const handleViewStudent = (student) => {
        console.log(student)
    };

    // Add Student
    const handleAddStudent = () => {
        if (student) {
            const fullName = `${student.first_name} ${student.last_name}`.trim();
            const newStudent = {
                stt: students.length + 1,
                student_name: fullName,
                student_id: student.id,
                status: false
            };
            const isExist = students.some(existingStudent => existingStudent.student_id === newStudent.student_id);
            if (!isExist) {
                setStudents([...students, newStudent]);
            } else {
                console.log('Sinh viên đã tồn tại trong danh sách.');
            }
        } else {
            console.log('Không tìm thấy sinh viên');
        }
    };
    
    // Delete Student
    const handleDeleteStudent = (studentToDelete) => {
        const updatedStudents = students.filter(student => student.student_id !== studentToDelete.student_id);
        setStudents(updatedStudents);
    };

    //--------------Save Cancel----------------------------
    const [updateClassError, setUpdateClassError] = useState(null);
    const [updateClassSuccess, setUpdateClassSuccess] = useState(false);

    const handleCancel = () => {
    };

    // Update class
    const updateClass = async () => {
        try {
            const response = await axios.patch(`/class?id=${classInfo.class_id}`, {
                type: classInfo.type,
                require_lab: classInfo.require_lab,
                current_cap: students.length,
                max_cap: classInfo.max_cap,
                lecturer_id: classInfo.lecturer_id
            });
    
            console.log('Class updated successfully:', response.data);
            setUpdateClassError(null);
            setUpdateClassSuccess(true);
        } catch (error) {
            console.log('Error message:', error.message);
            setUpdateClassSuccess(false);
            setUpdateClassError("Cập nhật thông tin không thành công.");
        }
    };

     // Update student
     const updateStudent = async () => {
        try {
            const studentsToUpdate = students.filter(student => student.status === false);
            const updatePromises = studentsToUpdate.map(student =>
                axios.patch(`/class/enroll?student_id=${student.student_id}&class_id=${classId}`)
            );
            await Promise.all(updatePromises);
            console.log('All students updated successfully');
        } catch (error) {
            console.log('Error updating students:', error.response.data);
        }
    };
    
    

    // Add student
    const handleSave = async () => {
        await updateClass();
        await updateStudent();
        // await updateTimetable();
        // console.log("classInfo:",classInfo);
    }

    return (
        <div>
            <Sidebar_admin/>
            <Container fluid className={globalstyles['main-background']}>
                <div className={globalstyles['left-title']} >Thông tin lớp học</div>

                {updateClassError && !updateClassSuccess && (
                    <Alert variant="danger" className="mt-3">
                        {updateClassError}
                    </Alert>
                )}

                {updateClassSuccess && !updateClassError && (
                    <Alert variant="success" className="mt-3">
                        Cập nhật thông tin thành công.
                    </Alert>
                )}

                <div className={styles.flexRow}>
                    <Container className={styles['classInfo']}>
                    <div className={styles.titleContainer}>Thông tin cơ bản</div>
                        <div className={styles.flexRow}>
                            <div style={{ width: '85px'}}>Mã lớp</div>
                            <div className={styles.input}>{classInfo.class_id}</div>
                        </div>
                        <div className={styles.flexRow}>
                            <div style={{ width: '85px'}}>Học Phần</div>
                            <div className={styles.input}>{classInfo.subject_id}</div>
                        </div>
                        <div className={styles.flexRow}>
                            <div style={{ width: '85px'}}>Loại</div>
                            <Dropdown onSelect={handleSelectType} >
                                <Dropdown.Toggle variant="light" id="dropdown-basic" 
                                    className={`${styles.input} ${typeError ? styles['error-input'] : ''}`} style={{ textAlign: 'left'}}>
                                    {classInfo.type} 
                                </Dropdown.Toggle>
                                <Dropdown.Menu >
                                    <Dropdown.Item eventKey="TT">TT</Dropdown.Item>
                                    <Dropdown.Item eventKey="BT">BT</Dropdown.Item>
                                    <Dropdown.Item eventKey="LT+BT">LT+BT</Dropdown.Item>
                                    <Dropdown.Item eventKey="LT+BT">TN</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                        <div className={styles.flexRow}>
                            <div style={{ width: '85px'}}>Yêu cầu lab</div>
                            <Dropdown onSelect={handleSelectLab}>
                                <Dropdown.Toggle variant="light" id="dropdown-basic" 
                                    className={`${styles.input} ${labError ? styles['error-input'] : ''}`} style={{ textAlign: 'left'}}>
                                    {classInfo.require_lab === 'Y' ? 'Có' : 'Không'}
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item eventKey="Y" title="Có">Có</Dropdown.Item>
                                    <Dropdown.Item eventKey="N" title="Không">Không</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                        <div className={styles.flexRow}>
                            <div style={{ width: '85px'}}>Học kỳ</div>
                            <div className={styles.input}>{classInfo.semester}</div>
                        </div>
                    </Container>
                    <div style={{width:'100%'}}>

                        {/* Thời khóa biểu */}
                        <Container className={styles.timetable}>
                            <div className={styles.titleContainer}>Thời gian</div>
                            {/* <div className={globalstyles['icon-container']} style={{position: 'absolute', top: '20px', right: '20px'}} onClick={handleAddTimeButtonClick}>
                                <FontAwesomeIcon color="white" icon={faPlus} />
                            </div> */}
                            <div className={styles.tableOver}>
                                <Table>
                                    <thead>
                                        <tr>
                                            <th style={{textAlign: 'center'}}>Thứ</th>
                                            <th style={{textAlign: 'center', minWidth: '130px'}}>Bắt đầu</th>
                                            <th style={{textAlign: 'center', minWidth: '130px'}}>Kết thúc</th>
                                            <th style={{textAlign: 'center', minWidth: '90px'}}>Địa điểm</th>
                                           
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {classTime.map((row, rowIndex) => (
                                            <tr key={rowIndex} style={{ textAlign: 'center' }}>
                                                <td> <div className={styles['custom-select']}>{row.weekday}</div></td>
                                                <td> <div className={styles['custom-select']}>{row.start_time}</div></td>
                                                <td><div className={styles['custom-select']}>{row.end_time}</div></td>
                                                <td> <div className={styles['custom-select']}>{row.location}</div></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </div> 
                        </Container>
                        {/* Giảng viên */}
                        <Container className={styles.searchLecturer}>
                            <div className={styles.titleContainer}>Giảng viên</div>
                            <div className={styles.flexRow} style={{gap: '0'}}>
                                <input
                                    type="text"
                                    value={classInfo.lecturer_id || ''}
                                    onChange={handleInputLecturerID}
                                    placeholder="Nhập mã GV"
                                    className={`${styles.input} ${inputLecturerIDError ? styles['error-input'] : ''}`}
                                    style={{width: '160px'}}
                                />
                                <div className={globalstyles['icon-container']} onClick={handleSearchLecturerClick}>
                                    <FontAwesomeIcon color="white" icon={faSearch} />
                                </div>
                                <div style={{margin: '0 30px 0 30px'}}>|</div>
                                <div className={styles.input}>{lecturer && `${lecturer.first_name} ${lecturer.last_name}`}</div>
                                <div className={globalstyles['icon-container']} onClick={() => handleViewLecturer(lecturer)}>
                                    <FontAwesomeIcon color="white" icon={faEye} />
                                </div>
                            </div>
                        </Container>
                    </div>
                </div>
                {/* Sinh viên */}
                <div className={styles.flexRow}>
                    <Container className={styles.listStudent}>
                    <div className={styles.titleContainer}>Danh sách sinh viên</div>
                        <div className={styles.flexRow}>
                        <div>Sĩ số tối đa</div>
                            <div>
                                <input
                                    type="text"
                                    value={classInfo.max_cap || ''}
                                    onChange={handleInputStudentCount}
                                    maxLength={3} 
                                    placeholder="Nhập sĩ số"
                                    className={`${styles.input} ${inputStudentCountError ? styles['error-input'] : ''}`}
                                />
                            </div>
                            <div style={{marginLeft: 'auto'}}>Sĩ số hiện tại {students.length}</div>
                        </div> 
                        <div className={styles.tableOver} style={{ maxHeight: '350px'}}>
                            <Table>
                                <thead>
                                    <tr>
                                        <th style={{ textAlign: 'center',  width: '50px' }}>STT</th>
                                        <th style={{ textAlign: 'center' }}>Tên</th>
                                        <th style={{ textAlign: 'center' }}>Mssv</th>
                                        <th style={{ textAlign: 'center', width: '50px' }}></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {students.map((student, index) => (
                                        <tr key={index}>
                                            <td style={{ textAlign: 'center' }}>{index + 1}</td>
                                            <td style={{ textAlign: 'center' }}>{student.student_name}</td>
                                            <td style={{ textAlign: 'center' }}>{student.student_id}</td>
                                            <td style={{ textAlign: 'center' }}>
                                                <div className={globalstyles['icon-container']} onClick={() => handleViewStudent(student)}>
                                                    <FontAwesomeIcon color="white" icon={faEye} />
                                                </div>
                                                {/* <div className={globalstyles['icon-container']} onClick={() => handleDeleteStudent(student)}>
                                                    <FontAwesomeIcon color="white" icon={faTrash} />
                                                </div> */}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table> 
                        </div>
                    </Container>
                    {/* Tìm kiếm sinh viên */}
                    {/* <Container className={styles.searchStudent}>
                        <div className={styles.titleContainer}>Tìm kiếm sinh viên</div>
                        <div className={styles.flexRow}>
                            <input
                                type="text"
                                value={inputMSSV}
                                onChange={handleInputMSSV}
                                maxLength={8}
                                placeholder="Nhập MSSV"
                                className={styles.input}
                                style={{width: '160px'}}
                            />
                            <div className={globalstyles['icon-container']} onClick={handleSearchStudentClick}>
                                <FontAwesomeIcon color="white" icon={faSearch} />
                            </div>
                        </div>
                        <div className={styles.flexRow} style={{gap: '0'}}>
                            <div className={styles.input}>{student && `${student.first_name} ${student.last_name}`}</div>
                            <div className={globalstyles['icon-container']} onClick={() => handleViewStudent(student)}>
                                <FontAwesomeIcon color="white" icon={faEye} />
                            </div>
                            <div className={globalstyles['icon-container']} onClick={handleAddStudent}>
                                <FontAwesomeIcon color="white" icon={faPlus} />
                            </div>
                        </div>
                    </Container> */}
                </div>
                <div className={styles['confirmButton']}>
                    <Button variant="primary" onClick={handleSave} >Lưu thông tin</Button>
                    <Button variant="danger" onClick={handleCancel} style={{marginLeft: '10px'}}>Hủy bỏ</Button>
                </div>
            </Container>
        </div>
    );
};

