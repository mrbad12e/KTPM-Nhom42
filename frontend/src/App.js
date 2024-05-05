import { BrowserRouter, Routes, Route, HashRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Header } from './components/Layouts/Header/Header';
import { Login } from './components/Login/Login';
import { Registration } from './pages/Registration/Registration';
import { Home } from './pages/Home/Home';
import {Timetable} from './pages/Timetable/Timetable';
import { FeePayment } from './pages/FeePayment/FeePayment';
import { Student } from './PagesAdmin/student/student';
import { Lecturer } from './PagesAdmin/lecturer/lecturer';
import { Class } from './PagesAdmin/class/class';
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
                <Route path="/timetable" element={<Timetable />}/>
                {/* <Route path="/feePayment" element={<FeePayment />} /> */}
                <Route path="/student" element={<Student/>}/>
                <Route path="/lecturer" element={<Lecturer/>}/>
                <Route path="/class" element={<Class/>}/>
                <Route path="/faculty" element={<Faculty/>}/>
                <Route path="/subject" element={<Subject/>}/>

            </Routes>
        </HashRouter>
    );
};
