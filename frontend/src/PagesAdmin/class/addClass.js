import React, { useState, useEffect } from 'react';
import { Table, Container, Button, Dropdown, Modal } from 'react-bootstrap';
import axios from 'axios';
import Sidebar_admin from '../../components/Layouts/Sidebar/sidebarAdmin'; 
import styles from './addClass.module.css';
import globalstyles from '../../CSSglobal.module.css';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { renderTimeViewClock } from '@mui/x-date-pickers/timeViewRenderers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faEye, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';

export const AddClass = () => {

    //--------------------------Class-------------------
    //class id
    const [inputClassID, setInputClassID] = useState('');
    const [inputClassIDError, setInputClassIDError] = useState(false);
    const handleInputClassID = (event) => {
        setInputClassIDError(false);
        setInputClassID(event.target.value);
    };

    // subject id 
    const [inputSubjectID, setInputSubjectID] = useState('');
    const [inputSubjectIDError, setInputSubjectIDError] = useState(false);
    const handleInputSubjectID = (event) => {
        setInputSubjectIDError(false);
        setInputSubjectID(event.target.value);
    };

    // type
    const [type, setType] = useState(''); 
    const [typeError, setTypeError] = useState(false);
    const handleSelectType = (eventKey) => {
        setTypeError(false); 
        setType(eventKey); 
    };

    // lab
    const [lab, setLab] = useState(''); 
    const [labError, setLabError] = useState(false);
    const handleSelectLab = (eventKey) => {
        setLabError(false); 
        setLab(eventKey); 
    };

    // semester
    const [inputSemester, setInputSemester] = useState('');
    const [inputSemesterError, setInputSemesterError] = useState(false);
    const handleInputSemester = (event) => {
        setInputSemesterError(false);
        const onlyNums = event.target.value.replace(/[^0-9]/g, '');
        setInputSemester(onlyNums);
    };

     // Số sinh viên tối đa
     const [inputStudentCount, setInputStudentCount] = useState('');
     const [inputStudentCountError, setInputStudentCountError] = useState(false);

     const handleInputStudentCount = (event) => {
        setInputStudentCountError(false);
        const onlyNums = event.target.value.replace(/[^0-9]/g, '');
        const limitedNums = onlyNums.slice(0, 3);
        setInputStudentCount(limitedNums);
     };

    //--------------------TimeTable--------------------------------
    const [TimeRows, setRows] = useState([]);

    const handleDayChange = (index, event) => {
        const newRows = [...TimeRows];
        newRows[index].selectedDay = event.target.value;
        setRows(newRows);
    };

    const handleInputStart = (index, time) => {
        const newRows = [...TimeRows];
        newRows[index].inputStartTime = time;
        setRows(newRows);
    };

    const handleInputEnd = (index, time) => {
        const newRows = [...TimeRows];
        newRows[index].inputEndTime = time;
        setRows(newRows);
    };

    const handleInputLocation = (index, event) => {
        const newRows = [...TimeRows];
        newRows[index].inputLocation = event.target.value;
        setRows(newRows);
    };

    const createDefaultTimeRow = () => ({
        selectedDay: '',
        inputStartTime: null,
        inputEndTime: null,
        inputLocation: ''
    });

    const handleAddTimeButtonClick = () => {
        setRows([...TimeRows, createDefaultTimeRow()]); 
    };
    
    const handleDeleteTimeButtonClick = () => {
        const updatedTimeRows = [...TimeRows];
        updatedTimeRows.pop();
        setRows(updatedTimeRows);
    };

    useEffect(() => {
        handleAddTimeButtonClick();
    }, []);
    
    useEffect(() => handleAddTimeButtonClick(), []);

    //--------------------Lecturer------------------------
    const [lecturer, setLecturer] = useState(null);   
    const [inputLecturerID, setInputLecturerID] = useState(''); 
    const [inputLecturerIDError, setInputLecturerIDError] = useState(false);

    const handleInputLecturerID = (event) => {
        setInputLecturerID(event.target.value); 
    };

    const fetchSearchLecturer = async () => {
        try {
            setInputLecturerIDError(false);
            let response = await axios.get(`/admin/lecturer?id=${inputLecturerID}`);
            if (response.data.lecturers.length > 0) {
                setLecturer(response.data.lecturers[0])
            } else {
                setLecturer(null); 
            }
        } catch (error) {
            console.error('Error fetching lecturer:', error);
        }
    };

    // Search Lecturer
    const handleSearchLecturerClick = () => {
        fetchSearchLecturer();
    };

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
     
    }

    // Add class
    const postDataToClassAPI = async () => {
        const fieldsToCheck = [
            { field: inputClassID, setError: setInputClassIDError, errorLog: 'Missing inputClassID', validation: value => !value || value.length !== 6 || isNaN(value) },
            { field: type, setError: setTypeError, errorLog: 'Missing type' },
            { field: inputSemester, setError: setInputSemesterError, errorLog: 'Missing inputSemester' },
            { field: lab, setError: setLabError, errorLog: 'Missing lab' },
            { field: inputStudentCount, setError: setInputStudentCountError, errorLog: 'Missing inputStudentCount' },
            { field: lecturer && lecturer.id, setError: setInputLecturerIDError, errorLog: 'Missing lecturer.id' },
            { field: inputSubjectID, setError: setInputSubjectIDError, errorLog: 'Missing inputSubjectID' }
        ];
        
        let hasError = false;
        
        fieldsToCheck.forEach(({ field, setError, errorLog, validation }) => {
            if (validation ? validation(field) : !field) {
                console.log(errorLog);
                setError(true);
                hasError = true;
            }
        });
        
        if (hasError) {
            return;
        }
    
        try {
            const response = await axios.post('/class', {
                id: inputClassID,
                type: type,
                semester: inputSemester,
                require_lab: lab,
                current_cap: students.length,
                max_cap: inputStudentCount,
                lecturer_id: lecturer.id,
                subject_id: inputSubjectID
            });
    
            console.log('Class created successfully:', response.data);
        } catch (error) {
            if (error.response && error.response.data && error.response.data.error) {
                const errorData = error.response.data.error;
                console.log(errorData);
            } else {
                console.log('Error message:', error.message);
            }
        }
    };
    
    
    // Add timetable
          
    // Add student

    const handleSave = async () => {
        console.log(inputClassID);
        await postDataToClassAPI();
    }
    
    

    return (
        <div>
            <Sidebar_admin/>
            <Container fluid className={globalstyles['main-background']}>
                <div className={globalstyles['left-title']} >Thêm mới thông tin lớp</div>

                <div className={styles.flexRow}>
                    <Container className={styles['classInfo']}>
                    <div className={styles.titleContainer}>Thông tin cơ bản</div>
                        <div className={styles.flexRow}>
                            <div style={{ width: '85px'}}>Mã lớp</div>
                            <div>
                                <input
                                type="text"
                                value={inputClassID}
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
                                value={inputSubjectID}
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
                                    {type} 
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
                                    {lab === 'Y' ? 'Có' : 'Không'}
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
                                value={inputSemester}
                                onChange={handleInputSemester}
                                placeholder="Nhập học kỳ"
                                className={`${styles.input} ${inputSemesterError ? styles['error-input'] : ''}`}
                                />
                            </div>
                        </div>
                    </Container>
                    <div style={{width:'100%'}}>
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
                                        {TimeRows.map((row, rowIndex) => (
                                            <tr key={rowIndex} style={{ textAlign: 'center' }}>
                                                <td>
                                                    <select value={row.selectedDay} className={styles['custom-select']} onChange={(event) => handleDayChange(rowIndex, event)}>
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
                                                            value={row.inputStartTime} 
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
                                                            value={row.inputEndTime} 
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
                                                        value={row.inputLocation} 
                                                        onChange={(event) => handleInputLocation(rowIndex, event)} 
                                                        placeholder="402-D9"
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
                        <Container className={styles.searchLecturer}>
                            <div className={styles.titleContainer}>Giảng viên</div>
                            <div className={styles.flexRow} style={{gap: '0'}}>
                                <input
                                    type="text"
                                    value={inputLecturerID}
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

                <div className={styles.flexRow}>
                    <Container className={styles.listStudent}>
                    <div className={styles.titleContainer}>Danh sách sinh viên</div>
                        <div className={styles.flexRow}>
                        <div>Sĩ số tối đa</div>
                            <div>
                                <input
                                    type="text"
                                    value={inputStudentCount}
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
                                        <th style={{ textAlign: 'center', width: '100px' }}>Thao tác</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {students.map((student, index) => (
                                        <tr key={student.stt}>
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
                    <Button variant="primary" onClick={handleSave} >Lưu thông tin</Button>
                    <Button variant="danger" onClick={handleCancel} style={{marginLeft: '10px'}}>Hủy bỏ</Button>
                </div>
            </Container>
        </div>
    );
};

export default AddClass;
