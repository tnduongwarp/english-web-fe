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
    return (
        
            <header className="container-fluid bg-dark text-white p-2 d-flex justify-content-between">
                <h3>{`Hi ${userName}!`}</h3>
                <button className="btn btn-info mx-5 px-4" style={{ fontWeight: "bolder", fontSize: "1.2rem" }} onClick={handleLogout}>Log out</button>
            </header>
      
    )
   
}