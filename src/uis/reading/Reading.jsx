import React,{ useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {Container, Row, Col, Card, Button} from "react-bootstrap";
import ReadingQuiz from "../Quiz/Reading-quiz";
import Api from "../../services/Api";
import './style.css'
export default function Reading({}) {
    const navigate = useNavigate();
    const [questions, setQuestions] = useState([]);
    const [lesson, setLesson] = useState(null);
    useEffect(() => {
        document.title = "Reading Exercise";
        if (window.localStorage["token"] === undefined) navigate("/login");
        let token = JSON.parse(window.localStorage["token"]);
        if (token["access-token"] === undefined
            || token["refresh-token"] === undefined
            || token["expired-at"] === undefined) navigate("/login");
    }, [navigate]);

    useEffect(() => {
        const lessonId = sessionStorage['lessonId'];
        Api.getLessonById(lessonId)
        .then( res => {
            console.log(res)
            setLesson(res?.data?.data);
        })
        .catch(err => console.log(err))
    },[]);
    useEffect(() => {
        const lessonId = sessionStorage['lessonId'];
        Api.getQuizByLessonId(lessonId)
        .then( res => {
            console.log(res)
            setQuestions(res?.data?.quiz)
        })
        .catch(err => console.log(err))
    },[]);
    useEffect(() => {
        let lessonId = sessionStorage['lessonId'];
        let userId = localStorage['userId']
        Api.updateUserLessonStatus('Inprogress', new Date(), lessonId, userId)
        .then(res => {
          console.log(res);
          
        })
        .catch(err => console.log(err))
      },[])
    return (
                <div className="col-10 paragraph">
                    
                        <h5>PRACTICE READING</h5>
                        <h5>You should answer Questions, which are based on Reading Passage below.</h5>
                        <h2 id = 'paragraph-title'>{lesson ? lesson.title : ''}</h2>
                        <div className='paragraph' id = 'content'>
                           { lesson ? lesson.content : 'Loading'}
                        </div>
                        <ReadingQuiz questionBank={questions}/>
                </div>       
    )
}