import React, { useState, useEffect } from 'react';
import { Table, Container, Row, Col, Button } from 'react-bootstrap';
import axios from 'axios';
import Sidebar_student from '../../components/Layouts/Sidebar/sidebarStudent'; 
import styles from './CourseGrade.module.css';
import globalstyles from '../../CSSglobal.module.css';

export const CourseGrade = () => {

    // get CourseGrade
    const [courseGrade, setCourseGrade] = useState([]);
    let creditsPassed = 0;
    let creditsFailed = 0;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const resultResponse = await axios.get(`student/results`);
                const courseGrades = resultResponse.data.results;
                const subjectIds = [...new Set(courseGrades.map(course => course.subject_id))];
                const subjectPromises = subjectIds.map(async subjectId => {
                    const response = await axios.get(`subject?id=${subjectId}`);
                    return response.data.subject[0];
                });
                const subjects = await Promise.all(subjectPromises);
                const updatedCourseGrades = courseGrades.map(course => {
                    const subject = subjects.find(sub => sub.id === course.subject_id);
                    if (subject) {
                        course.study_credits = subject.study_credits;
                        course.final_weight = subject.final_weight;
                    }
                    return course;
                });
                setCourseGrade(updatedCourseGrades);
                
            } catch (error) {
                console.error('Error fetching data:', error.message);
            }
        };
        fetchData();
    }, []);
    
    // Tính GPA
    function calculateGPA(score) {
        if (score >= 9.5 && score <= 10.0) return 'A+';
        else if (score >= 8.5 && score <= 9.4) return 'A';
        else if (score >= 8.0 && score <= 8.4) return 'B+';
        else if (score >= 7.0 && score <= 7.9) return 'B';
        else if (score >= 6.5 && score <= 6.9) return 'C+';
        else if (score >= 5.5 && score <= 6.4) return 'C';
        else if (score >= 5.0 && score <= 5.4) return 'D+';
        else if (score >= 4.0 && score <= 4.9) return 'D';
        else return 'F';
    }

    function calculateSubjectGPA(midtermScore, finalScore, mappingScore, finalWeight, studyCredits) {
        if (parseFloat(midtermScore) < 3) {
            creditsFailed += parseFloat(studyCredits);
            return 'F';
        }
        const finalPoint = Math.round(((parseFloat(midtermScore) + parseFloat(mappingScore)) * (1 - parseFloat(finalWeight)) + parseFloat(finalScore) * parseFloat(finalWeight)) * 10) / 10;
        const gpa = calculateGPA(finalPoint);
        if (gpa === 'F') {
            creditsFailed += parseFloat(studyCredits);
        } else {
            creditsPassed += parseFloat(studyCredits);
        }
        return gpa;
    }

    return (
        <div >
            <Sidebar_student/>
            <Container fluid className={globalstyles['main-background']}>
                <div className={globalstyles['title']}>Kết quả học tập</div>
                <div style={{ maxWidth: '1000px',  margin: '0 auto'}}>
                    <Table striped hover className={globalstyles['table-1000']}>
                        <thead>
                            <tr>
                                <th style={{ textAlign: 'center' }}>Học kỳ</th>
                                <th style={{ textAlign: 'center' }}>Mã học phần</th>
                                <th style={{ textAlign: 'center' }}>Tên học phần</th>
                                <th style={{ textAlign: 'center' }}>Tín chỉ</th>
                                <th style={{ textAlign: 'center' }}>Điểm học phần</th>
                            </tr>
                        </thead>
                        <tbody>
                            {courseGrade.map((course,index) => (
                                <tr key={index++}>
                                    <td style={{ textAlign: 'center' }}>{course.semester}</td>
                                    <td style={{ textAlign: 'center' }}>{course.subject_id}</td>
                                    <td>{course.subject_name}</td>
                                    <td style={{ textAlign: 'center' }}>{course.study_credits}</td>
                                    <td style={{ textAlign: 'center' }}>
                                        {calculateSubjectGPA(course.midterm_score, course.final_score,course. mapping_score, course.final_weight, course.study_credits)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    <div className={styles.totalCredit} style={{ textAlign: 'right' }}>
                        <div>
                            <div style={{ width: '150px', display: 'inline-block' }}>Số tín chỉ đã qua: {creditsPassed}</div>
                            <div style={{ width: '150px', display: 'inline-block' }}>Số tín chỉ nợ: {creditsFailed}</div>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default CourseGrade;
