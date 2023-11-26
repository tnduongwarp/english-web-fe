import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthApi from "../services/auth-api";
import Api from '../services/Api'
export default function Dashboard() {
    const navigate = useNavigate();

    useEffect(() => {
        document.title = "Dashboard";
        if (window.localStorage["token"] === undefined) navigate("/login");
        let token = JSON.parse(window.localStorage["token"]);
        if (token["access-token"] === undefined
            || token["refresh-token"] === undefined
            || token["expired-at"] === undefined) navigate("/login");
    }, [navigate]);

    useEffect(() => {
        Api.getAllCategory().then( res => console.log(res.data))
    })
    const handleLogout = async () => {
        await new AuthApi().logout();
        localStorage.removeItem("token");
        navigate("/login");
    }

    return <div className="d-flex flex-column" style={{ height: "100vh" }}>
        <div className="container-fluid bg-dark text-white p-2 d-flex justify-content-between">
            <h2>Logo</h2>
            <button className="btn btn-info mx-5 px-4" style={{ fontWeight: "bolder", fontSize: "1.2rem" }} onClick={handleLogout}>Log out</button>
        </div>
        <div className="row"></div>
        <div className="flex-fill"></div>
        <footer className="container-fluid bg-dark text-white mt-auto p-2">
            <p>"It's never too late to start a new adventure!" - Unknown</p>
        </footer>
    </div>
}