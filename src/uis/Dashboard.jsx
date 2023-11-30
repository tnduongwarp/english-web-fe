import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Api from '../services/Api'
import Header from "./Header";
import Footer from "./Footer";
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
    });

    return <div className="d-flex flex-column" style={{ height: "100vh" }}>
        <Header />
        <div className="row"></div>
        <div className="flex-fill"></div>
        <Footer />
    </div>
}