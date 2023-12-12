/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useRef} from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Api from '../../services/Api';
import { Modal } from 'antd';
import "./Video.css";

export default function Listening() {
    const badgeName = ["All", "Ready to watch", "Watched", "Inprogress"];
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [inprogressLesson, setInprogressLesson] = useState([]);
    const [newLesson, setNewLesson] = useState([]);
    const [completedLesson, setCompletedLesson] = useState([]);
    const [displayLesson, setDisplayLesson] = useState([]);
    const [filterLesson, setFilterLesson] = useState([]);
    const [input, setInput] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectLesson, setSelectLesson] = useState({
        thumbnail: '', 
        title: '', 
    });
    const navigate = useNavigate();
    const videoRef = useRef(null);
    const onInputChange = (e) => {
        setInput(e.target.value);
        const data = displayLesson.filter(item => (item.content.toLowerCase().includes(e.target.value)));
        setFilterLesson(data);
    }
    const handleOk = () => {
        setIsModalOpen(false);
        videoRef.current.src = '';
        const lessonId = sessionStorage['lessonId']
        updateStatus('Completed',lessonId)
    };
    const handleCancel = () => {
        setIsModalOpen(false);
         videoRef.current.src = ''
    };
    const showModal = (src, lessonId) => {
        sessionStorage['lessonId'] = lessonId
        setIsModalOpen(true);
        setTimeout(() => {
            videoRef.current.src = src + '&autoplay=1&mute=1';
            updateStatus('Inprogress',lessonId)
        }, 1000)
           
        
        
    };
    const updateStatus = (status, lessonId) => {
        let userId = localStorage['userId']
        Api.updateUserLessonStatus(status, new Date(), lessonId, userId)
        .then(res => {
          console.log(res);
          
        })
        .catch(err => console.log(err))
    }
    useEffect(() => {
        document.title = "Listening";
        if (window.localStorage["token"] === undefined) navigate("/login");
        let token = JSON.parse(window.localStorage["token"]);
        if (token["access-token"] === undefined
            || token["refresh-token"] === undefined
            || token["expired-at"] === undefined) navigate("/login");
    }, [navigate]);
    useEffect(() => {
        let userId = localStorage['userId'];
        let categoryId = sessionStorage['categoryId'];
        let courseId = sessionStorage['courseId'];
        Api.getAllLesson(userId,categoryId,courseId)
        .then( res => {
            console.log(res)
            setInprogressLesson(res?.data.lessons.inprogress);
            setNewLesson(res?.data.lessons.upcoming);
            setCompletedLesson(res?.data?.lessons.completed);
            const data = [
                ...(res?.data?.lessons.completed || []),
                ...(res?.data.lessons.inprogress || []),
                ...(res?.data.lessons.upcoming || [])
              ];
              console.log(data);
              setDisplayLesson(data);
              setFilterLesson(data)
        })
        .catch(err => console.log(err))
    },[]);


    const handleChangeBadge = (index) => {
        setSelectedIndex(index);
        console.log(index)
        switch(index){
            case 0: setDisplayLesson([...completedLesson,...inprogressLesson,...newLesson]);
                    setFilterLesson([...completedLesson,...inprogressLesson,...newLesson]) ;
                    setInput('');
                    break;
            case 1: setDisplayLesson(newLesson); setFilterLesson(newLesson) ;setInput(''); break;
            case 2: setDisplayLesson(completedLesson); setFilterLesson(completedLesson) ; setInput(''); break;
            case 3: setDisplayLesson(inprogressLesson); setFilterLesson(inprogressLesson) ; setInput(''); break;
            default: return;
        }
    }

    return <div className="col-10">
        <div className="row gx-1">
            <div className="col-7">
                {badgeName.map((value, index) => <button className={`btn btn${selectedIndex !== index ? "-outline" : ""}-info m-2 py-1 px-3`} onClick={() => handleChangeBadge(index)} style={{ fontSize: "1.25rem", borderRadius: 30 }}>{value}</button>)}
            </div>
            {/* <div className="col-2"></div> */}
            <div className="col-2 p-2"></div>
            <div className="col-3 p-2">
                <input type="text" className="form-inline" placeholder="🔍 Search" value={input} onChange={(e) => {onInputChange(e)}}></input>
            </div>
            {filterLesson.length >0 && filterLesson.map(value => <VideoItem video={{id: value.id, thumbnail: value?.videoUrl, title: value?.title, description: value?.content ,  showModal: showModal, setSelectLesson: setSelectLesson}} />)}
        </div>
        <Modal
            title={selectLesson.title}
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            maskClosable = {false}
            width={'940px'}
        >
           <div  style={{height:"500px", width: "900px"}}>
                <iframe
                    id="video-iframe"
                    title={selectLesson.title}
                    width="100%"
                    height="100%"
                    src={selectLesson.thumbnail + '&autoplay=1&mute=1'}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    ref={videoRef}
                ></iframe>
            </div>
        </Modal>
    </div>;
}

export function VideoItem(props) {
    const onClick = () => {
        props.video.setSelectLesson({
            thumbnail: props.video.thumbnail, 
            title: props.video.title, 
        });
        props.video.showModal(props.video.thumbnail,props.video.id);
    }
    return <div className="col-3 p-2" style={{ width: "18rem" }}>
        <div className="card">
            <div className="card-img-top position-relative " style={{height:"250px"}}>
                <iframe
                    title={props.video.title}
                    width="100%"
                    height="100%"
                    src={props.video.thumbnail}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    
                ></iframe>
                <div class="mask-youtube"></div>
            </div>
            <div className="card-body" style={{paddingTop:'0'}}>
                <h5 className="card-title">{props.video.title}</h5>
                <p className="card-text">{props.video.description}</p>
                <a href="#" className="btn btn-outline-secondary" onClick={onClick}>Watch</a>
            </div>
        </div>
    </div>
}
