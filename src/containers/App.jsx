import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginUser from "../pages/LoginUser";
import RegisterUser from "../pages/RegisterUser";
import Search from "../pages/SearchPhone";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LoginUser />} />
                <Route path="/register" element={<RegisterUser />} />
                <Route path="/search" element={<Search />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;