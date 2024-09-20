import { Header } from "./Header/Header";
import Sidebar from "./Sidebar/Sidebar";

export const Layouts = ({ children }) => {
    return (
        <div>
            <Header />
            <Sidebar />
            {children}
        </div>
    );
}