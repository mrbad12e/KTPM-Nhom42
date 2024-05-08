import { BrowserRouter, Routes, Route, HashRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Header } from './components/Layouts/header/header';
import { Login } from './components/login/login';
import { Registration } from './pages/registration/registration';
import { Home } from './pages/home/home';
import { Timetable } from './pages/Timetable/timetable';
import { FeePayment } from './pages/feePayment/feePayment';
import { CourseGrade } from './pages/courseGrade/courseGrade';
import { Student } from './PagesAdmin/student/student';
import { AddStudent } from './PagesAdmin/student/addStudent';
import { Lecturer } from './PagesAdmin/lecturer/lecturer';
import { Class } from './PagesAdmin/class/class';
import { AddClass } from './PagesAdmin/class/addClass';
import { Faculty } from './PagesAdmin/faculty/faculty';
import { Subject } from './PagesAdmin/subject/subject';


import React, { useState } from 'react';

export const App = () => {
    return (
        <HashRouter>
            <Header/>        
            <Routes>
                <Route path="/" element={<Login />}/>
                <Route path="/registration" element={<Registration/>}/>
                <Route path="/home" element={<Home />}/>
                <Route path="/timetable" element={<Timetable/>}/>
                <Route path="/feePayment" element={<FeePayment/>} />
                <Route path="/courseGrade" element={<CourseGrade/>} />
                <Route path="/student" element={<Student/>}/>
                <Route path="/addStudent" element={<AddStudent/>}/>
                <Route path="/lecturer" element={<Lecturer/>}/>
                <Route path="/class" element={<Class/>}/>
                <Route path="/addClass" element={<AddClass/>}/>
                <Route path="/faculty" element={<Faculty/>}/>
                <Route path="/subject" element={<Subject/>}/>
            </Routes>
        </HashRouter>
    );
};
