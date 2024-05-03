import { BrowserRouter, Routes, Route, HashRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Home } from './pages/Home/Home';
import { Login } from './pages/Login/Login';
import { Layouts } from './components/Layouts';
export const App = () => {
    return (
        <HashRouter>
            <Layouts>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/home" element={<Home />} />
                </Routes>
            </Layouts>
        </HashRouter>
    );
};