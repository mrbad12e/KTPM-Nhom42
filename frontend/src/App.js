import { BrowserRouter, Routes, Route, HashRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Header } from './components/Layouts/Header/Header';


import { Login } from './components/Layouts/Login/Login';
import { Registration } from './pages/Registration/Registration';
import { Profile } from './pages/Profile/Profile';
import {Timetable} from './pages/Timetable/Timetable';
import { FeePayment } from './pages/FeePayment/FeePayment';
import { Student } from './pages_admin/student/student';
import {AddStudent} from './pages_admin/student/addStudent';
import { UpdateStudent } from './pages_admin/student/updateStudent';
import { Lecturer } from './pages_admin/lecturer/lecturer';
import { UpdateLecturer } from './pages_admin/lecturer/updateLecturer';
import { Faculty } from './pages_admin/faculty/faculty';
import { Subject } from './pages_admin/subject/subject';
import { ProfileLectuer } from './pages_lecturer/profile/profile';


export const App = () => {
    return (
        <HashRouter>
            <Header />
            <Routes>
                //Student
                <Route path="/" element={<Login />} />
                <Route path="/registration" element={<Registration />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/timetable" element={<Timetable />} />
                <Route path="/feePayment" element={<FeePayment />} />
                //Admin
                <Route path="/student" element={<Student />} />
                <Route path="/addStudent" element={<AddStudent/>}/>
                <Route path="/updateStudent/:id" element={<UpdateStudent/>}/>
                <Route path="/lecturer" element={<Lecturer/>}/>
                <Route path="/updateLecturer/:id" element={<UpdateLecturer/>}/>
                <Route path="/faculty" element={<Faculty/>}/>
                <Route path="/subject" element={<Subject/>}/>
                //Lecturer
                <Route path="/profile_leturer" element={<ProfileLectuer/>}/>
                


            </Routes>
        </HashRouter>
    );
};