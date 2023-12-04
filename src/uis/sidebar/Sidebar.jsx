/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import "./Sidebar.css"
import { useLocation,useNavigate} from "react-router-dom";
export default function Sidebar({setCourseId}) {
    const nav = useNavigate();
    const location = useLocation();
    const handleClick = (courseId, url) => {
        setCourseId(courseId);
        sessionStorage['courseId'] = courseId
        nav(url);
    }
    return <div className="col-2" id="sidebar-wrapper">
        <nav id="sidebar" className="nav flex-column">
            <a id="sidebar-element" onClick={() =>handleClick(0,'#')}>Home</a>
            <a id="sidebar-element" onClick={() =>handleClick(1,'/dashboard/vocabulary')} className={location.pathname.includes("/dashboard/vocabulary") ? "active" : "" }>Vocabulary</a>
            <a id="sidebar-element"  onClick={() =>handleClick(2,'#')}>Reading</a>
            <a id="sidebar-element"  onClick={() =>handleClick(3,'/dashboard/video')}  className={location.pathname === "/dashboard/video" ? "active" : ""}>Listening</a>
        </nav>
    </div>;
}