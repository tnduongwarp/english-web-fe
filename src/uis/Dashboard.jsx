import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Sidebar from './sidebar/Sidebar';
import Video from "./video/Video";
import Quiz from './Quiz/Quiz';

import {  Route, Routes } from "react-router-dom";

export default function Dashboard({categoryId}) {
    const navigate = useNavigate();

    useEffect(() => {
        document.title = "Dashboard";
        if (window.localStorage["token"] === undefined) navigate("/login");
        let token = JSON.parse(window.localStorage["token"]);
        if (token["access-token"] === undefined
            || token["refresh-token"] === undefined
            || token["expired-at"] === undefined) navigate("/login");
    }, [navigate]);

    

    return <div className="d-flex flex-column" style={{ height: "100vh", }}>
        <Header />
        <div className="row">
            <Sidebar/>
            
                <Routes>
                        <Route path="/video" element={<Video/>} />
                        <Route path="/quiz" element={<Quiz/>} />
                </Routes>
           
            
        </div>
        <Footer />
    </div>
}