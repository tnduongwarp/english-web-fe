/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import "./Sidebar.css"

export default function Sidebar() {
    return <div className="col-2" id="sidebar-wrapper">
        <nav id="sidebar" class="nav flex-column">
            <a id="sidebar-element" href="#">Home</a>
            <a id="sidebar-element" href="#">Vocabulary</a>
            <a id="sidebar-element" href="#">Reading</a>
            <a id="sidebar-element" href="#">Listening</a>
        </nav>
    </div>;
}