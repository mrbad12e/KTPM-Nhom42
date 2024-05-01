import { BrowserRouter, Routes, Route, HashRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Header } from './components/Layouts/Header/Header';
import { Home } from './pages/Home/Home';
import { Login } from './pages/Login/Login';
import { Registration } from './pages/Registration/Registration';
import { Timetable } from './pages/Timetable/Timetable';
export const App = () => {
    return (
        <HashRouter>
            <Header/>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/home" element={<Home />} />
                <Route path="/registration" element={<Registration />} />
                <Route path="/timetable" element={<Timetable />} />
            </Routes>
        </HashRouter>
    );
};