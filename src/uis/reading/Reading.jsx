import React,{ useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {Container, Row, Col, Card, Button} from "react-bootstrap";

import Api from '../../services/Api'
import './style.css'
export default function Reading({}) {
    const navigate = useNavigate();
    
    useEffect(() => {
        document.title = "Reading Exercise";
        if (window.localStorage["token"] === undefined) navigate("/login");
        let token = JSON.parse(window.localStorage["token"]);
        if (token["access-token"] === undefined
            || token["refresh-token"] === undefined
            || token["expired-at"] === undefined) navigate("/login");
    }, [navigate]);
    return (
                <div class="col-10 paragraph">
                    <Card>
                        <h5>PASSAGE 1</h5>
                        <h5>You should answer Questions 1–5, which are based on Reading Passage 1 below.</h5>
                        <h2 id = 'paragraph-title'> Lorem ipsum dolor sit amet</h2>
                        <div class='paragraph' id = 'content'>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vitae lorem eget risus imperdiet fermentum non vitae urna. Nulla sagittis eros nibh, id pulvinar velit eleifend in. Duis eu ultricies ante. In ultricies turpis ac justo rhoncus aliquam. In ac ex vitae nisl placerat pellentesque. Sed nec euismod est, lobortis venenatis magna. Donec a metus quis nulla imperdiet porttitor et eu sapien. Donec non elit sodales, tincidunt ex nec, porttitor leo. Cras vehicula est lectus, non venenatis dui lacinia in. Aenean vestibulum dui porttitor, ullamcorper ligula sed, vestibulum dui. Curabitur fermentum magna vitae sem semper luctus. Nam non risus tincidunt, tempus odio sit amet, suscipit libero. Ut pharetra leo sit amet nisi mattis suscipit eu eu erat. Nulla lorem lacus, placerat eget dignissim quis, semper at urna. Morbi mollis convallis dolor at tincidunt.
                        </div>
                        <h5>QUESTION</h5>
                        <h6 class="question">1.Lorem ipsum dolor sit amet?</h6>
                        <form action="#" class="answer">
                            <label><input type = "radio"/> A. Lorem ipsum dolor sit amet</label>
                            <label><input type = "radio"/> B. Consectetur adipiscing elit</label>
                            <label><input type = "radio"/> C. Curabitur vitae lorem eget</label>
                            <label><input type = "radio"/> D. Risus imperdiet fermentum</label>
                            <input type = 'submit' className="btn btn-info mx-5 px-4" style={{width:"10rem"}}/>
                        </form>
                    </Card>
                </div>       
    )
}