import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Api from "../services/auth-api";
import Footer from "./Footer";
import {  notification } from 'antd';
import { useNavigate } from "react-router-dom";

export default function Register() {
    const navigate = useNavigate();
    const [registerData, setRegisterData] = useState(null);
    const [api, contextHolder] = notification.useNotification();
    //initState
    useEffect(() => {
        document.title = "Register";
    }, []);

    const handleRegister = async (e) => {
        e.preventDefault();
        if (registerData == null) {
            return;
        }
        await new Api().signUp(registerData["username"], registerData["password"], registerData["email"]).then(res => {
            console.log(res)
            if(res.error === false){
                api['success']({
                    message: 'Success',
                    description:
                      'You have sign up successfully!',
                      duration:3
                  });
                setTimeout(() => {
                    navigate('/login')
                },3500)
            }
        }).catch(err => console.log(err));
    }

    const handleChange = (e) => {
        setRegisterData({ ...registerData, [e.target.name]: e.target.value });
    }

    return (
        <>
        {contextHolder}
        <div className="d-flex flex-column" style={{ height: "100vh" }}>
        <div className="container-fluid bg-dark text-white p-2 d-flex justify-content-between">
            <h5>Hello</h5>
            <Link to="/login" className="btn btn-info mx-5 px-4" style={{ fontWeight: "bolder", fontSize: "1.2rem" }}>Log in</Link>
        </div>
        <div className="row">
            <div className="col"></div>
            <div className="col-3">
                <h1 className="text-center fs-1 fw-bolder m-5">Sign up and start learning!</h1>
                <form action="">
                    <div className="my-4">
                        <label htmlFor="email" className="form-label">Email:</label>
                        <input type="email" className="form-control" placeholder="Your email go here!" name="email" onChange={handleChange} />
                    </div>
                    <div className="my-4">
                        <label htmlFor="username" className="form-label">Username:</label>
                        <input type="text" className="form-control" placeholder="Your username go here!" name="username" onChange={handleChange} />
                    </div>
                    <div className="my-4">
                        <label htmlFor="password" className="form-label">Password:</label>
                        <input type="password" className="form-control" placeholder="Your password go here!" name="password" onChange={handleChange} />
                    </div>
                    <div className="my-4">
                        Make sure your password
                        <ul>
                            <li>is 6 characters or longer</li>
                            <li>has no spaces</li>
                        </ul>
                    </div>
                    <div className="row my-4">
                        <button type="submit" className="col-11 mx-auto btn btn-info" onClick={handleRegister}>Sign up, it's free</button>
                    </div>
                </form>
            </div>
            <div className="col-1"></div>
        </div>
        <div id="modal" class="modal" tabindex="-1" role="dialog">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 id="modal-title" class="modal-title"> </h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div id="modal-body" class="modal-body">
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
        <div className="flex-fill"></div>
        <Footer />
    </div>
        </>
    )
    
}