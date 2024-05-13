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


export const App = () => {
    return (
        <HashRouter>
            <Header />
            
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/registration" element={<Registration />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/timetable" element={<Timetable />} />
                <Route path="/feePayment" element={<FeePayment />} />

                <Route path="/student" element={<Student />} />
                <Route path="/addStudent" element={<AddStudent/>}/>
                <Route path="/updateStudent/:id" element={<UpdateStudent/>}/>




            </Routes>
        </HashRouter>
    );
};