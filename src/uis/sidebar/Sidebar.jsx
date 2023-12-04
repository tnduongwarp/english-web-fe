/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import "./Sidebar.css"
import { useLocation } from "react-router-dom";
export default function Sidebar() {
    const location = useLocation();
    return <div className="col-2" id="sidebar-wrapper">
        <nav id="sidebar" className="nav flex-column">
            <a id="sidebar-element" href="#">Home</a>
            <a id="sidebar-element" href="/dashboard/quiz" className={location.pathname === "/dashboard/quiz" ? "active" : "" }>Vocabulary</a>
            <a id="sidebar-element" href="#">Reading</a>
            <a id="sidebar-element" href="/dashboard/video" className={location.pathname === "/dashboard/video" ? "active" : ""}>Listening</a>
        </nav>
    </div>;
}