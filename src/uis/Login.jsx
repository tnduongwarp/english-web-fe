import { useEffect, useState } from "react";
import "./Login.css"
import { useNavigate } from "react-router-dom";
import GoogleLogin from "react-google-login";
import { gapi } from 'gapi-script';
import ApiRoot from "../services/ApiRoot";
export default function Login() {
    const [loginData, setLoginData] = useState(
        localStorage.getItem('loginData')
        ? JSON.parse(localStorage.getItem('loginData'))
        : null
    );
    const handleFailure = (result) => {
       console.log(result)
    }
    const handleLogin = async (googleData) => {
        console.log(googleData.tokenId);
        const data = {
            token: googleData.tokenId
        }
        const res = await ApiRoot.postRequestBase('/auth/login-with-gg',data);
        console.log(res)
        
    };
    //initState
    useEffect(() => { 
        document.title = "Login"; 
        function start() {
            gapi.client.init({
              clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID,
              scope: 'email',
            });
          }
      
          gapi.load('client:auth2', start);
    }, []);

    const navigate = useNavigate();
    const onRegisterClick = () => {
        navigate("/register");
    }
    const onForgottenPasswordClick = () => {
        navigate("/password");
    }

    return <div className="d-flex flex-column" style={{ height: "100vh", overflowX: "hidden" }}>
        
        <div className="container-fluid bg-dark text-white p-1">
            <h2>Logo</h2>
        </div>
        <div className="row">
            <div className="col"></div>
            <div className="col-3">
                <h1 className="text-center fs-1 fw-bolder m-5">Login to have fun and learn better!</h1>
                <div className="row my-4">
                    
                    <GoogleLogin
                         clientId = {process.env.REACT_APP_GOOGLE_CLIENT_ID}
                         render={renderprops => (
                            <button type="button" onClick={renderprops.onClick} className="col-11 mx-auto btn btn-info d-flex justify-content-between" style={{ borderRadius: 30 }}>
                                <img src="https://lh3.googleusercontent.com/COxitqgJr1sJnIDe8-jiKhxDx1FrYbtRHKJ9z_hELisAlapwE9LUPh6fcXIfb5vwpbMl4xl9H9TRFPc5NOO8Sb3VSgIBrfRYvW6cUA" alt="G" width="25" height="25" className="bg-light rounded-circle p-1" />
                                <div className="flex-fill">Sign in with Google</div>
                                <span></span>
                            </button>
                          )}
                         buttonText = "Sign in with Google"
                         onSuccess = {handleLogin}
                         onFailure = {handleFailure}
                         cookiePolicy = {"single_host_origin"}
                    ></GoogleLogin>
                </div>
                <p className="hr-line my-4">or</p>
                <form action="">
                    <div className="my-4">
                        <label htmlFor="email" className="form-label">Email:</label>
                        <input type="email" className="form-control" id="email" placeholder="Placeholder@domain.com" name="email" />
                    </div>
                    <div className="my-4">
                        <label htmlFor="pwd" className="form-label">Password:</label>
                        <input type="password" autoComplete="off" className="form-control" id="pwd" placeholder="Your password go here!" name="pswd" />
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