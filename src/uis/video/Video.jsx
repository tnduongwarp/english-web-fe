/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Video.css";

export default function Video() {
    const badgeName = ["All", "Ready to watch(0)", "Watched", "Needs practice"];
    const [selectedIndex, setSelectedIndex] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        document.title = "Video";
        if (window.localStorage["token"] === undefined) navigate("/login");
        let token = JSON.parse(window.localStorage["token"]);
        if (token["access-token"] === undefined
            || token["refresh-token"] === undefined
            || token["expired-at"] === undefined) navigate("/login");
    }, [navigate]);

    const handleChangeBadge = (index) => {
        setSelectedIndex(index);
    }

    return <div className="col-10">
        <div className="row gx-1">
            <div className="col-5">
                {badgeName.map((value, index) => <button className={`btn btn${selectedIndex !== index ? "-outline" : ""}-info m-2 py-1 px-3`} onClick={() => handleChangeBadge(index)} style={{ fontSize: "1.25rem", borderRadius: 30 }}>{value}</button>)}
            </div>
            <div className="col-2"></div>
            <div className="col-2 p-2">
                <span>Free videos today </span>
                <span className="badge badge-info">2</span>
            </div>
            <div className="col-3 p-2">
                <input type="text" class="form-inline" placeholder="🔍 Search"></input>
            </div>
            {[0, 0, 0, 0, 0, 0, 0].map(value => <VideoItem video={{ learnRate: 50, thumbnail: "https://avatars.githubusercontent.com/u/121040867?v=4", title: "English", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit..." }} />)}
        </div>
    </div>;
}

export function VideoItem(props) {
    return <div className="col-3 p-2" style={{ width: "18rem" }}>
        <div className="card">
            <div className="card-img-top position-relative">
                <img className="img-thumbnail" src={props.video.thumbnail} alt="English" />
                <span className="position-absolute p-1" style={{ bottom: 0, left: 0, backgroundColor: "pink", borderTopRightRadius: 10 }}>Known {props.video.learnRate}% of words</span>
            </div>
            <div className="card-body">
                <h5 className="card-title">{props.video.title}</h5>
                <p className="card-text">{props.video.description}</p>
                <a href="#" className="btn btn-outline-secondary">Learn words</a>
            </div>
        </div>
    </div>
}
// const supportedLanguage = ["English (United Kingdom)", "English (United States)"];
//     const [selectedLanguage, setSelectedLanguage] = useState("English (United Kingdom)");
//     const handleChangeLanguage = (e) => {
//         setSelectedLanguage(e.target.innerText);
//     }
// <div class="dropdown p-1 m-3">
//                         <button id="selected-language" class="btn btn-secondary dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
//                             {`${selectedLanguage}  `}
//                         </button>
//                         <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
//                             {supportedLanguage.map((value) => <button className={`dropdown-item${selectedLanguage === value?" selected":""}`} onClick={handleChangeLanguage}>{value}</button>)}
//                         </div>
//                     </div>