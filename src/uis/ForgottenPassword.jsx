import { Link } from "react-router-dom";
import { useEffect } from "react";
import Footer from "./Footer";

export default function ForgottenPassword() {
    //initState
    useEffect(() => { 
        document.title = "Forgotten Password"; 
    }, []);

    return <div className="d-flex flex-column" style={{ height: "100vh" }}>
        <div className="container-fluid bg-dark text-white p-2 d-flex justify-content-around">
            <h2>Logo</h2>
            <div className="d-inline-flex">
                <button type="button" className="btn btn-link text-light" style={{fontWeight: "bolder", fontSize: "1.2rem"}}>Course</button>
                <Link to="/login" className="btn btn-link text-light" style={{fontWeight: "bolder", fontSize: "1.2rem"}}>Login</Link>
                <Link to="/register" className="btn btn-info" style={{fontWeight: "bolder", fontSize: "1.2rem"}}>Sign up</Link>
            </div>
        </div>
        <div className="row">
            <div className="col"></div>
            <div className="col-3">
                <h1 className="text-center fs-1 fw-bolder m-5">Forgot Password</h1>
                <p>Oh dear. You forgot your password.</p>
                <p>Don't worry though, we'll get you back to learning a language in no time.</p>
                <p>But first, let's reset your password.</p>
                <form action="">
                    <div className="my-4">
                        <label htmlFor="email" className="form-label">Email:</label>
                        <input type="email" className="form-control" id="email" placeholder="Placeholder@domain.com" name="email" />
                    </div>
                    <div className="row my-4">
                        <button type="submit" className="col-11 mx-auto btn btn-info">Reset password</button>
                    </div>
                </form>
            </div>
            <div className="col"></div>
        </div>
        <div className="flex-fill"></div>
        <Footer />
    </div>;
}