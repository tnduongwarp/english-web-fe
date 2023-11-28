import React from "react";
import {Col,Nav,Button} from 'react-bootstrap';
import "./Sidebar.css"

export default function Sidebar(){
    return (
        <Col xs={2} id="sidebar-wrapper">
            <Nav id="sidebar" class="nav flex-column">
                <Button id="sidebar-element"  href="#">Home</Button>
                <Button id="sidebar-element"  href="#">Vocabulary</Button>
                <Button id="sidebar-element"  href="#">Reading</Button>
                <Button id="sidebar-element"  href="#">Listening</Button>
            </Nav>
        </Col>
    );
}