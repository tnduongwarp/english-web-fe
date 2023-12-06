import { useEffect, useState } from "react";
import "./Login.css"
import { Link, useNavigate } from "react-router-dom";
import GoogleLogin from "react-google-login";
import { gapi } from 'gapi-script';
import Api from "../../services/auth-api";
import Footer from "../Footer";
export default function Login() {
    const [hasErr,setHasErr] = useState(false);
    const [loginData, setLoginData] = useState(
        localStorage.getItem('loginData')
            ? JSON.parse(localStorage.getItem('loginData'))
            : null
    );
    const handleFailure = (result) => {
        console.log(result);
    }
    const handleGGLogin = async (googleData) => {
        console.log(googleData.tokenId)
        const data = {
            token: googleData.tokenId
        }
        const res = await new Api().loginWithGG(data);
        if(res["error"] === false) {
            localStorage["token"] = JSON.stringify( {
                "access-token": res["accessToken"],
                "refresh-token": res["refreshToken"],
                "expired-at": 0
            });
            localStorage['userId'] = JSON.stringify(res.user.id);
            localStorage['userName'] = JSON.stringify(res.user.username);
            navigate("/category");
        }else{
            setHasErr(true)
        }
    };

    const navigate = useNavigate();

    useEffect(() => {
        document.title = "Login";
        function start() {
            gapi.client.init({
                clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID,
                scope: 'email',
            });
        }
        gapi.load('client:auth2', start);
        if (window.localStorage["token"] !== undefined) {
            let token = JSON.parse(window.localStorage["token"]);
            console.log(token);
            if (token["access-token"] !== undefined
                && token["refresh-token"] !== undefined
                && token["expired-at"] !== undefined)
                navigate("/category");
        }
    }, [navigate]);

    const handleLogin = async (e) => {
        e.preventDefault();
        if (loginData == null) {
            return;
        }
        if (!/^[A-Za-z0-9]+$/i.test(loginData["username"] | "")) {
            return;
        }
        if (!/^[A-Za-z0-9]+$/i.test(loginData["password"] | "")) {
            return;
        }
        await new Api().login(loginData["username"], loginData["password"]).then(res => {
            console.log(res)
            if(res["error"] === false) {
                localStorage["token"] = JSON.stringify( {
                    "access-token": res["accessToken"],
                    "refresh-token": res["refreshToken"],
                    "expired-at": 0
                })
                localStorage['userId'] = JSON.stringify(res.user.id);
                localStorage['userName'] = JSON.stringify(res.user.username);
                navigate("/category");
            }else{
                setHasErr(true)
            }
        });
    }

    const handleChange = (e) => {
        setLoginData({ ...loginData, [e.target.name]: e.target.value });
    }

    return <div className="d-flex flex-column" style={{ height: "100vh" }}>
        <div className="row">
            <div className="col"></div>
            <div className="col-3">
                <h1 className="text-center fs-1 fw-bolder m-5">Login to have fun and learn better!</h1>
                { hasErr && 
                <div className="alert alert-danger" role="alert" >
                    The username or password are incorrect!
                </div>
                }
                <div className="row my-4">
                    <GoogleLogin
                        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                        render={renderprops => (
                            <button type="button" onClick={renderprops.onClick} className="col-11 mx-auto btn btn-info d-flex justify-content-between" style={{ borderRadius: 30 }}>
                                <img src="https://lh3.googleusercontent.com/COxitqgJr1sJnIDe8-jiKhxDx1FrYbtRHKJ9z_hELisAlapwE9LUPh6fcXIfb5vwpbMl4xl9H9TRFPc5NOO8Sb3VSgIBrfRYvW6cUA" alt="G" width="25" height="25" className="bg-light rounded-circle p-1" />
                                <div className="flex-fill">Sign in with Google</div>
                                <span></span>
                            </button>
                        )}
                        buttonText="Sign in with Google"
                        onSuccess={handleGGLogin}
                        onFailure={handleFailure}
                        cookiePolicy={"single_host_origin"}
                    ></GoogleLogin>
                </div>
                <p className="hr-line my-4">or</p>
                <form action="">
                    <div className="my-4">
                        <label htmlFor="username" className="form-label">Username:</label>
                        <input type="text" className="form-control" placeholder="Your username go here!" name="username" onChange={handleChange} />
                    </div>
                    <div className="text-danger" style={{ display: "none" }}>Username is invalid.</div>
                    <div className="my-4">
                        <label htmlFor="password" className="form-label">Password:</label>
                        <input type="password" autoComplete="off" className="form-control" placeholder="Your password go here!" name="password" onChange={handleChange} />
                    </div>
                    <div className="text-danger" style={{ display: "none" }}>Password is invalid.</div>
                    <div className="form-check my-4 d-flex justify-content-between align-items-center">
                        <label className="form-check-label">
                            <input className="form-check-input" type="checkbox" name="remember" /> Remember me
                        </label>
                        <Link to="/password/reset" className="btn btn-link text-dark">I forgot my password!</Link>
                    </div>
                    <div className="row my-4">
                        <button type="submit" className="col-11 mx-auto btn btn-info" onClick={handleLogin}>Login now</button>
                    </div>
                </form>
                <div className="row my-4">
                    <Link className="col-12 mx-auto btn btn-link text-dark" to="/register">Don't have an account? Sign up now!</Link>
                </div>
            </div>
            <div className="col"></div>
        </div>
        <div className="flex-fill"></div>
       
    </div>;
}