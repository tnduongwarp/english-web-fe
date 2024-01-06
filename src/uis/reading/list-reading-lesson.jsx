import './style.css';
import { Button } from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import Api from '../../services/Api';
export default function ListReadingLesson(){
    const navigate = useNavigate();
    const [inprogressLesson, setInprogressLesson] = useState([]);
    const [newLesson, setNewLesson] = useState([]);
    useEffect(() => {
        let userId = localStorage['userId'];
        let categoryId = sessionStorage['categoryId'];
        let courseId = sessionStorage['courseId'];
        Api.getAllLesson(userId,categoryId,courseId)
        .then( res => {
            console.log(res)
            setInprogressLesson(res?.data.lessons.inprogress);
            setNewLesson(res?.data.lessons.upcoming)
        })
        .catch(err => console.log(err))
    },[])
    const onClickButton = (lessonId, wordIds) => {
        sessionStorage['wordIds'] = wordIds;
        sessionStorage['lessonId'] = lessonId
        navigate('/dashboard/reading/reading-lesson/');
    }
    return (
        <div className='col-10'>
            <div className="user-process">
                <div className='user-process-header'>Continue learning</div>
                {
                    inprogressLesson.length && 
                    <div className='card-container'>
                        {
                            inprogressLesson.map(item => 
                            (
                                <div className="user-process-card" key={item.id}>
                                    <div className="user-process-card-info">
                                        <div ><span style={{fontSize:'1.5rem', fontWeight: 'bold'}}> {item.title}</span></div>
                                        {/* <div ><span style={{fontSize:'1rem'}}>{item.content}</span></div> */}
                                    </div>
                                    <a className="user-process-button" onClick={() => {onClickButton(item.id, item.wordIds)}}>
                                        <div>Continue</div>
                                    </a>
                                </div>
                            ))
                        }
                    </div>
                }
                
            </div>
            <div style={{height:"20px"}}></div>
            <div className='new-lessson'>
                <div className='new-lesson-header'>Up next</div>
                {
                    newLesson.length && 
                    <div className='new-lesson-card-container'>
                        {
                            newLesson.map(item => 
                            (
                                <div className='new-lesson-card' key={item.id}>
                                    <div className='new-lesson-card-info'>{item.title}</div>
                                    <div className='new-lesson-button'>
                                    <Button type="primary" onClick={() => { onClickButton(item.id, item.wordIds)}}>Go</Button>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                }
                
            </div>
        </div>
    )
}