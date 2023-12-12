import AuthApi from "../services/auth-api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Header() {
    const navigate = useNavigate();
    const [userName, setUserName] = useState(() => {
        const storedUserName = localStorage.getItem('userName');
        const username = storedUserName ? JSON.parse(storedUserName) : '';
        if(username) return username;
        return '';
    });
    const handleLogout = async () => {
        const refreshToken =JSON.parse(localStorage['token']);
        await new AuthApi().logout(refreshToken['refresh-token']);
        localStorage.removeItem("token");
        navigate("/login");
    }
    const handleChangeLanguage = () => {
        navigate("/category");
    }
    return (
        
            <header className="container-fluid bg-dark text-white p-2 d-flex justify-content-between">
                <h3>{`Hi ${userName}!`}</h3>
                <div className="d-flex ">
                    <button className="btn btn-info px-4" style={{ fontWeight: "bolder", fontSize: "1.2rem" }} onClick={handleChangeLanguage}>Change language</button>
                    <button className="btn btn-info mx-2 px-4" style={{ fontWeight: "bolder", fontSize: "1.2rem" }} onClick={handleLogout}>Log out</button>
                </div>
                
            </header>
      
    )
   
}