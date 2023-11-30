/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Footer from "./Footer";

export default function Category() {
    const navigate = useNavigate();

    useEffect(() => {
        document.title = "Category";
        if (window.localStorage["token"] === undefined) navigate("/login");
        let token = JSON.parse(window.localStorage["token"]);
        if (token["access-token"] === undefined
            || token["refresh-token"] === undefined
            || token["expired-at"] === undefined) navigate("/login");
    }, [navigate]);

    

    return (
        <div className="container-fluid">
            <Header />
            <div className="row">
                <Sidebar />
                <div className="col-10" id="page-content-wrapper" style={{ margin: "0.5rem 0 0.5rem 0" }}>
                    <h2 style={{ margin: "2rem" }}>Explore new languges!</h2>
                    <div className="card" style={{ width: "18rem" }}>
                        <img className="card-img-top" src="#" alt="English" />
                        <div className="card-body">
                            <h5 className="card-title">English</h5>
                            <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>
                            <a href="#" className="btn btn-primary">Try it!</a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex-fill"></div>
            <Footer />
        </div>
    );
}