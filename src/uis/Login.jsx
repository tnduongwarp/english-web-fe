import { useEffect } from "react";
import "./Login.css"
import { useNavigate } from "react-router-dom";

export default function Login() {
    //initState
    useEffect(() => { 
        document.title = "Login"; 
    }, []);

    const navigate = useNavigate();
    const onRegisterClick = () => {
        navigate("/register");
    }
    const onForgottenPasswordClick = () => {
        navigate("/password/reset");
    }

    return <div className="d-flex flex-column" style={{ height: "100vh" }}>
        <div className="container-fluid bg-dark text-white p-1">
            <h2>Logo</h2>
        </div>
        <div className="row">
            <div className="col"></div>
            <div className="col-3">
                <h1 className="text-center fs-1 fw-bolder m-5">Login to have fun and learn better!</h1>
                <div className="row my-4">
                    <button type="button" className="col-11 mx-auto btn btn-info d-flex justify-content-between" style={{ borderRadius: 30 }}>
                        <img src="https://lh3.googleusercontent.com/COxitqgJr1sJnIDe8-jiKhxDx1FrYbtRHKJ9z_hELisAlapwE9LUPh6fcXIfb5vwpbMl4xl9H9TRFPc5NOO8Sb3VSgIBrfRYvW6cUA" alt="G" width="25" height="25" className="bg-light rounded-circle p-1" />
                        <div className="flex-fill">Sign in with Google</div>
                        <span></span>
                    </button>
                </div>
                <p className="hr-line my-4">or</p>
                <form action="">
                    <div className="my-4">
                        <label htmlFor="email" className="form-label">Email:</label>
                        <input type="email" className="form-control" id="email" placeholder="Placeholder@domain.com" name="email" />
                    </div>
                    <div className="my-4">
                        <label htmlFor="pwd" className="form-label">Password:</label>
                        <input type="password" className="form-control" id="pwd" placeholder="Your password go here!" name="pswd" />
                    </div>
                    <div className="form-check my-4 d-flex justify-content-between align-items-center">
                        <label className="form-check-label">
                            <input className="form-check-input" type="checkbox" name="remember" /> Remember me
                        </label>
                        <button type="button" className="btn btn-link text-dark" onClick={onForgottenPasswordClick}>I forgot my password!</button>
                    </div>
                    <div className="row my-4">
                        <button type="submit" className="col-11 mx-auto btn btn-info">Login now</button>
                    </div>
                </form>
                <div className="row my-4">
                    <button type="submit" className="col-12 mx-auto btn btn-link text-dark" onClick={onRegisterClick}>Don't have an account? Sign up now!</button>
                </div>
            </div>
            <div className="col"></div>
        </div>
        <div className="flex-fill"></div>
        <footer className="container-fluid bg-dark text-white mt-auto p-2">
            <p>"It's never too late to start a new adventure!" - Unknown</p>
        </footer>
    </div>;
}