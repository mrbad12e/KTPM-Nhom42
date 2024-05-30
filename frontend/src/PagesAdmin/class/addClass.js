import React, { useState, useEffect } from 'react';
import { Table, Container, Button, Dropdown, Modal, Alert } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Sidebar_admin from '../../components/Layouts/Sidebar/sidebarAdmin'; 
import styles from './class.module.css';
import globalstyles from '../../CSSglobal.module.css';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { renderTimeViewClock } from '@mui/x-date-pickers/timeViewRenderers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faEye, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';

export const AddClass = () => {
    const navigate = useNavigate();
    const [classInfo, setClassInfo] = useState({ id: '', subject_id: '', type: '', require_lab: '', semester:'', current_cap:'', max_cap: '', lecturer_id: '' });
    const [classTime, setClassTime] = useState([]);
    //--------------------------Class-------------------
    //class id
    const [inputClassIDError, setClassIdError] = useState(false);
    const handleInputClassID = (event) => {
        setClassIdError(false);
        const value = event.target.value;
        setClassInfo(prevClassInfo => ({ ...prevClassInfo, id: value }));
    };

    // subject id 
    const [inputSubjectIDError, setSubjectIdError] = useState(false);
    const handleInputSubjectID = (event) => {
        setSubjectIdError(false);
        const value = event.target.value;
        setClassInfo(prevClassInfo => ({ ...prevClassInfo, subject_id: value }));
    };

    // type
    const [typeError, setTypeError] = useState(false);
    const handleSelectType = (event) => {
        setTypeError(false); 
        setClassInfo(prevClassInfo => ({ ...prevClassInfo, type: event }));
    };

    // lab
    const [labError, setRequireLabError] = useState(false);
    const handleSelectLab = (event) => {
        setRequireLabError(false); 
        setClassInfo(prevClassInfo => ({ ...prevClassInfo, require_lab: event }));
    };

    // semester
    const [inputSemesterError, setSemesterError] = useState(false);
    const handleInputSemester = (event) => {
        setSemesterError(false);
        const onlyNums = event.target.value.replace(/[^0-9]/g, '');
        setClassInfo(prevClassInfo => ({ ...prevClassInfo, semester: onlyNums }));
    };

     // Số sinh viên tối đa
     const [maxCapError, setMaxCapError] = useState(false);
     const handleInputMaxCap = (event) => {
        setMaxCapError(false);
        const onlyNums = event.target.value.replace(/[^0-9]/g, '');
        const limitedNums = onlyNums.slice(0, 3);
        setClassInfo(prevClassInfo => ({ ...prevClassInfo, max_cap: limitedNums }));
     };

    //--------------------TimeTable--------------------------------
    const parseTimeString = (timeString) => {
        const hours = parseInt(timeString.substring(0, 2), 10);
        const minutes = parseInt(timeString.substring(2, 4), 10);
        return dayjs().hour(hours).minute(minutes).second(0);
    };

    const handleDayChange = (index, event) => {
        const newClassTime = [...classTime];
        newClassTime[index].weekday = event.target.value;
        setClassTime(newClassTime);
    };

    const handleInputStart = (index, time) => {
        const newClassTime = [...classTime];
        newClassTime[index].start_time = time;
        setClassTime(newClassTime);
    };

    const handleInputEnd = (index, time) => {
        const newClassTime = [...classTime];
        newClassTime[index].end_time = time;
        setClassTime(newClassTime);
    };

    const handleInputLocation = (index, event) => {
        const newClassTime = [...classTime];
        newClassTime[index].location = event.target.value;
        setClassTime(newClassTime);
    };

    const createDefaultClassTime = () => ({
        weekday: '2',
        start_time: null,
        end_time: null,
        location: ''
    });

    const handleAddTimeButtonClick = () => {
        setClassTime([...classTime, createDefaultClassTime()]); 
    };

    const handleDeleteTimeButtonClick = () => {
        const updatedClassTime = [...classTime];
        updatedClassTime.pop();
        setClassTime(updatedClassTime);
    };
    
    useEffect(() => handleAddTimeButtonClick(), []);

    //--------------------Lecturer------------------------
    const [lecturer, setLecturer] = useState(null);   
    const [lecturerIdError, setLecturerIdError] = useState(false);

    const handleInputLecturerID = (event) => {
        const value = event.target.value;
        setClassInfo(prevClassInfo => ({ ...prevClassInfo, lecturer_id: value }));
    };

    const fetchSearchLecturer = async () => {
        try {
            setLecturerIdError(false);
            if (classInfo.lecturer_id) {
                let response = await axios.get(`/admin/lecturer?id=${classInfo.lecturer_id}`);
                if (response.data.lecturers.length > 0) {
                    setLecturer(response.data.lecturers[0]);
                } else {
                    setLecturer(null);
                }
            } else {
                setLecturerIdError(true); 
            }
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
    const [inputMSSV, setInputMSSV] = useState(''); 
    const [student, setStudent] = useState(null);  

    const handleInputMSSV = (event) => {
        const onlyNums = event.target.value.replace(/[^0-9]/g, '');
        setInputMSSV(onlyNums); 
    };
    
    const fetchSearchStudent = async () => {
        try {
            let response = await axios.get(`/admin/student?id=${inputMSSV}`);
            if (response.data.students.length > 0) {
                setStudent(response.data.students[0]); 
            } else {
                setStudent(null); 
            }
        } catch (error) {
            console.error('Error fetching student:', error);
        }
    };

    // Search Student
    const handleSearchStudentClick = () => {
        fetchSearchStudent();
    };
    
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
                name: fullName,
                mssv: student.id,
            };
            const isExist = students.some(existingStudent => existingStudent.mssv === newStudent.mssv);
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
        const updatedStudents = students.filter(student => student.mssv !== studentToDelete.mssv);
        setStudents(updatedStudents);
    };

    //--------------Save Cancel----------------------------
    const handleCancel = () => {
        classTime.forEach((time) => {
            console.log(`Start Time: ${time.start_time.format('HHmm')}, End Time: ${time.end_time.format('HHmm')}, Location: ${time.location}, Day: ${time.weekday}`);
        });
    };

    // Add class
    const addClass = async () => {
        const fieldsToCheck = {
            id: { setError: setClassIdError, errorLog: 'Missing inputClassID', validation: value => !value || value.length !== 6 || isNaN(value) },
            subject_id: { setError: setSubjectIdError, errorLog: 'Missing inputSubjectID' },
            type: { setError: setTypeError, errorLog: 'Missing type' },
            semester: { setError: setSemesterError, errorLog: 'Missing inputSemester' },
            require_lab: { setError: setRequireLabError, errorLog: 'Missing lab' },  
            max_cap: { setError: setMaxCapError, errorLog: 'Missing inputStudentCount' },
            lecturer_id: { setError: setLecturerIdError, errorLog: 'Missing lecturer.id' }
        };
    
        const hasError = Object.entries(fieldsToCheck).some(([key, { setError, errorLog, validation }]) => {
            const field = key === 'lecturer_id' ? lecturer?.id : classInfo[key];
            const isInvalid = validation ? validation(field) : !field;
            if (isInvalid) {
                console.log(errorLog);
                setError(true);
            }
            return isInvalid;
        });
    
        if (hasError) {
            setAddClassError("Hãy điền đầy đủ thông tin!");
            return;
        }
    
        try {
            const response = await axios.post('/class', {
                id: classInfo.id,
                type: classInfo.type,
                semester: classInfo.semester,
                require_lab: classInfo.require_lab,
                current_cap: students.length,
                max_cap: classInfo.max_cap,
                lecturer_id: classInfo.lecturer_id,
                subject_id: classInfo.subject_id
            });
            
            console.log('Class created successfully:', response.data);
            setShowModal(true);
          
        } catch (error) {
            if (error.response?.data?.error) {
                console.log(error.response.data.error);
            } else {
                console.log('Error message:', error.message);
            }
        }
    };
    
    // Add timetable
    const updateTimetable = async () => {
        for (const time of classTime) {
            if (!time.weekday || !time.start_time || !time.end_time || !time.location) {
                // setAddClassError("hãy điền đầy đủ thông tin thời khóa biểu");
                return;
            }
        }

        try {
            const promises = classTime.map(time => axios.post('class/add', {
                class_id: classInfo.id,
                weekday: time.weekday,
                start_time: time.start_time.format('HHmm'),
                end_time: time.end_time.format('HHmm'),
                location: time.location
            }));
    
            await Promise.all(promises);
            console.log('Timetable updated successfully');
            setShowModal(true);
        } catch (error) {
            console.error('Error updating timetable:', error);
        }
    };
    
    // Add student
    const handleSave = async () => {
        // console.log("classInfo", classInfo);
        await addClass();
        await updateTimetable();
       
       
    };

    const [showModal, setShowModal] = useState(false);

    // Đóng modal
    const handleCloseModal = () => setShowModal(false);

    const handleCreateNewClass = () => {
        setShowModal(false);
        setClassInfo({ id: '', type: '', semester: '', require_lab: '', max_cap: '', lecturer_id: '', subject_id: '' });
        setStudents([]);
        setLecturer(null);
        setClassTime([]);
    };
    
    const handleGoToClassInfo = () => {
        setShowModal(false);
        navigate(`/updateClass/${classInfo.id}`);
    };

    const [addClassError, setAddClassError] = useState(null);

    return (
        <div>
            <Sidebar_admin/>
            <Container fluid className={globalstyles['main-background']}>
                <div className={globalstyles['left-title']} >Thêm mới thông tin lớp</div>

                {addClassError && (
                    <Alert variant="danger" className="mt-3">
                        {addClassError}
                    </Alert>
                )}

                <div className={styles.flexRow}>
                    <Container className={styles['classInfo']}>
                    <div className={styles.titleContainer}>Thông tin cơ bản</div>
                        <div className={styles.flexRow}>
                            <div style={{ width: '85px'}}>Mã lớp</div>
                            <div>
                                <input
                                    type="text"
                                    value={classInfo.id}
                                    onChange={handleInputClassID}
                                    maxLength={6} 
                                    placeholder="Nhập mã lớp"
                                    className={`${styles.input} ${inputClassIDError ? styles['error-input'] : ''}`}
                                />
                            </div>
                        </div>
                        <div className={styles.flexRow}>
                            <div style={{ width: '85px'}}>Học Phần</div>
                            <div>
                                <input
                                    type="text"
                                    value={classInfo.subject_id}
                                    onChange={handleInputSubjectID}
                                    placeholder="Nhập mã HP"
                                    className={`${styles.input} ${inputSubjectIDError ? styles['error-input'] : ''}`}
                                />
                            </div>
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
                            <div>
                                <input
                                type="text"
                                value={classInfo.semester}
                                onChange={handleInputSemester}
                                placeholder="Nhập học kỳ"
                                className={`${styles.input} ${inputSemesterError ? styles['error-input'] : ''}`}
                                />
                            </div>
                        </div>
                    </Container>
                    <div style={{width:'100%'}}>

                         {/* Thời khóa biểu */}
                        <Container className={styles.timetable}>
                            <div className={styles.titleContainer}>Thời gian</div>
                            <div className={globalstyles['icon-container']} style={{position: 'absolute', top: '20px', right: '20px'}} onClick={handleAddTimeButtonClick}>
                                <FontAwesomeIcon color="white" icon={faPlus} />
                            </div>
                            <div className={styles.tableOver}>
                                <Table>
                                    <thead>
                                        <tr>
                                            <th style={{textAlign: 'center'}}>Thứ</th>
                                            <th style={{textAlign: 'center', minWidth: '130px'}}>Bắt đầu</th>
                                            <th style={{textAlign: 'center', minWidth: '130px'}}>Kết thúc</th>
                                            <th style={{textAlign: 'center', minWidth: '90px'}}>Địa điểm</th>
                                            <th style={{textAlign: 'center', minWidth: '60px'}}></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {classTime.map((row, rowIndex) => (
                                            <tr key={rowIndex} style={{ textAlign: 'center' }}>
                                                <td>
                                                    <select value={row.weekday} className={styles['custom-select']} onChange={(event) => handleDayChange(rowIndex, event)}>
                                                        <option value="2">2</option>
                                                        <option value="3">3</option>
                                                        <option value="4">4</option>
                                                        <option value="5">5</option>
                                                        <option value="6">6</option>
                                                        <option value="7">7</option>
                                                        <option value="CN">CN</option>
                                                    </select>
                                                </td>
                                                <td>     
                                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                        <TimePicker  
                                                            value={row.start_time} 
                                                            onChange={(time) => handleInputStart(rowIndex, time)}
                                                            viewRenderers={{
                                                                hours: renderTimeViewClock,
                                                                minutes: renderTimeViewClock,
                                                                seconds: renderTimeViewClock,
                                                            }}
                                                            className={styles.customTimePickerInput}
                                                        />
                                                    </LocalizationProvider>
                                                </td>
                                                <td>
                                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                        <TimePicker   
                                                            value={row.end_time} 
                                                            onChange={(time) => handleInputEnd(rowIndex, time)}
                                                            viewRenderers={{
                                                                hours: renderTimeViewClock,
                                                                minutes: renderTimeViewClock,
                                                                seconds: renderTimeViewClock,
                                                            }}
                                                            className={styles.customTimePickerInput}
                                                        />
                                                    </LocalizationProvider>
                                                </td>
                                                <td>
                                                    <input 
                                                        type="text" 
                                                        value={row.location} 
                                                        onChange={(event) => handleInputLocation(rowIndex, event)} 
                                                        placeholder=""
                                                        className={styles['custom-select']} 
                                                    />
                                                </td>
                                                <td>
                                                    <div className={globalstyles['icon-container']} onClick={() => handleDeleteTimeButtonClick(rowIndex)}>
                                                        <FontAwesomeIcon color="white" icon={faTrash} />
                                                    </div>
                                                </td>
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
                                    value={classInfo.lecturer_id}
                                    onChange={handleInputLecturerID}
                                    placeholder="Nhập mã GV"
                                    className={`${styles.input} ${lecturerIdError ? styles['error-input'] : ''}`}
                                    style={{ width: '160px' }}
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
                                    onChange={handleInputMaxCap}
                                    maxLength={3} 
                                    placeholder="Nhập sĩ số"
                                    className={`${styles.input} ${maxCapError ? styles['error-input'] : ''}`}
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
                                        <th style={{ textAlign: 'center', width: '100px' }}>Thao tác</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {students.map((student, index) => (
                                        <tr key={index}>
                                            <td style={{ textAlign: 'center' }}>{index + 1}</td>
                                            <td style={{ textAlign: 'center' }}>{student.name}</td>
                                            <td style={{ textAlign: 'center' }}>{student.mssv}</td>
                                            <td style={{ textAlign: 'center' }}>
                                                <div className={globalstyles['icon-container']} onClick={() => handleViewStudent(student)}>
                                                    <FontAwesomeIcon color="white" icon={faEye} />
                                                </div>
                                                <div className={globalstyles['icon-container']} onClick={() => handleDeleteStudent(student)}>
                                                    <FontAwesomeIcon color="white" icon={faTrash} />
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table> 
                        </div>
                    </Container>
                    {/* Tìm kiếm sinh viên */}
                    <Container className={styles.searchStudent}>
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
                    </Container>
                </div>
                <div className={styles['confirmButton']}>
                    <Button variant="primary" onClick={handleSave} >Tạo lớp</Button>
                    <Button variant="danger" onClick={handleCancel} style={{marginLeft: '10px'}}>Hủy bỏ</Button>
                </div>

                <Modal show={showModal} onHide={handleCloseModal} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Thành công</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Thêm mới lớp thành công!</Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={handleCreateNewClass}>
                            Tiếp tục tạo lớp mới
                        </Button>
                        <Button variant="danger" onClick={handleGoToClassInfo}>
                            Đi đến trang thông tin lớp
                        </Button>
                    </Modal.Footer>
                </Modal>

            </Container>
        </div>
    );
};

