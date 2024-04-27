import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Login } from './pages/Login';
import { Home } from './pages/Home';
import { Header } from './components/Layouts/Header';
import { Footer } from './components/Layouts/Footer';
export const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} /> 
                <Route path="/homepage" element={<Home />} />
            </Routes>
        </BrowserRouter>
    );
};
