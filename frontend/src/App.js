import { BrowserRouter, Routes, Route, HashRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Header } from './components/Layouts/Header/Header';
import { Login } from './components/Login/Login';
import { Registration} from './pages/Registration/Registration';
import { Home } from './pages/Home/Home'
import { Timetable } from './pages/Timetable/Timetable';
import { CourseGrade } from './pages/CourseGrade/CourseGrade';
import { Student } from './PagesAdmin/student/student';
import { AddStudent } from './PagesAdmin/student/addStudent';
import { UpdateStudent } from './PagesAdmin/student/updateStudent';
import { Lecturer } from './PagesAdmin/lecturer/lecturer';
import { UpdateLecturer } from './PagesAdmin/lecturer/updateLecturer';
import { Class } from './PagesAdmin/class/class';
import { AddClass } from './PagesAdmin/class/addClass';
import { Faculty } from './PagesAdmin/faculty/faculty';
import { ListProgram } from './PagesAdmin/faculty/program';
import { Subject } from './PagesAdmin/subject/subject';
import { ListClass } from './PagesLecturer/management_class/list_class';
import { ListStudent } from './PagesLecturer/management_class/list_student';
import { ProfileLecturer } from './PagesLecturer/profile/profile';
import React from 'react';

export const App = () => {
    return (
        <HashRouter>
            <Header/>        
            <Routes>
                <Route path="/" element={<Login />}/>
                {/* Student */}
                <Route path="/home" element={<Home />}/>
                <Route path="/registration" element={<Registration/>}/>
                <Route path="/timetable" element={<Timetable/>}/>
                <Route path="/courseGrade" element={<CourseGrade/>} />
                {/* Admin */}
                <Route path="/student" element={<Student/>}/>
                <Route path="/addStudent" element={<AddStudent/>}/>
                <Route path="/updateStudent/:id" element={<UpdateStudent/>}/>

                <Route path="/lecturer" element={<Lecturer/>}/>
                <Route path="/updateLecturer/:id" element={<UpdateLecturer/>}/>

                <Route path="/class" element={<Class/>}/>
                <Route path="/addClass" element={<AddClass/>}/>
                <Route path="/faculty" element={<Faculty/>}/>
                <Route path="/program/:id" element={<ListProgram/>}/>
                <Route path="/subject" element={<Subject/>}/>
                {/* Lecturer */}
                <Route path="/listClass" element={<ListClass/>}/>
                <Route path="/listStudent/:id" element={<ListStudent/>}/>
                <Route path="/profile" element={<ProfileLecturer/>}/>
            </Routes>
        </HashRouter>
    );
};
