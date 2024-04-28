import { BrowserRouter, Routes, Route, HashRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Home } from './pages/Home/Home';
import { Header } from './components/Layouts/Header';
import { Login } from './pages/Login/Login';
export const App = () => {
    return (
        <HashRouter>
            <Header />
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/home" element={<Home />} />
            </Routes>
        </HashRouter>
    );
};