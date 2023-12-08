import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Sidebar from './sidebar/Sidebar';
import Listening from './Listening/Listening'
import Quiz from './Quiz/Quiz';
import ListLesson from "./vocabulary/list-lesson";
import VocabularyLesson from "./learning-word/vocabulary-lesson";
import Home from './Homepage/index';
import Reading from './reading/Reading';
import ListReadingLesson from "./reading/list-reading-lesson";
import {  Route, Routes } from "react-router-dom";

export default function Dashboard({categoryId, courseId, setCourseId}) {
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
            <Sidebar setCourseId={setCourseId}/>
            
                <Routes>
                        <Route path="/listening" element={<Listening/>} />
                        <Route path="/vocabulary" element={<ListLesson />} />
                        <Route path="/vocabulary/vocabulary-lesson" element = {<VocabularyLesson/>}/>
                        <Route path="/vocabulary/quiz/:id" element={ <Quiz/>}/>
                        <Route path= "/home" element= {<Home/>}/>
                        <Route path= "/reading" element = {<ListReadingLesson/>}/>
                        <Route path= "/reading/reading-lesson" element = {<Reading/>}/>
                </Routes>
           
            
        </div>
        <Footer />
    </div>
}