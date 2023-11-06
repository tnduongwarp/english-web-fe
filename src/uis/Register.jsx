import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
    //initState
    useEffect(() => { 
        document.title = "Register"; 
    }, []);

    const navigate = useNavigate();
    const onLoginClick = () => {
        navigate("/login");
    }

    return <div className="d-flex flex-column" style={{ height: "100vh" }}>
        <div className="container-fluid bg-dark text-white p-2 d-flex justify-content-between">
            <h2>Logo</h2>
            <button type="button" className="btn btn-info mx-5 px-4" style={{fontWeight: "bolder", fontSize: "1.2rem"}} onClick={onLoginClick}>Log in</button>
        </div>
        <div className="row">
            <div className="col"></div>
            <div className="col-3">
                <h1 className="text-center fs-1 fw-bolder m-5">Sign up and start learning!</h1>
                <div className="row my-4">
                    <button type="button" className="col-11 mx-auto btn btn-info d-flex justify-content-between" style={{ borderRadius: 30 }}>
                        <img src="https://lh3.googleusercontent.com/COxitqgJr1sJnIDe8-jiKhxDx1FrYbtRHKJ9z_hELisAlapwE9LUPh6fcXIfb5vwpbMl4xl9H9TRFPc5NOO8Sb3VSgIBrfRYvW6cUA" alt="G" width="25" height="25" className="bg-light rounded-circle p-1" />
                        <div className="flex-fill">Sign up with Google</div>
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
                    <div className="my-4">
                        Make sure your password
                        <ul>
                            <li>is 6 characters or longer</li>
                            <li>has no spaces</li>
                        </ul>
                    </div>
                    <div className="row my-4">
                        <button type="submit" className="col-11 mx-auto btn btn-info">Sign up, it's free</button>
                    </div>
                </form>
            </div>
            <div className="col-1"></div>
        </div>
        <div className="flex-fill"></div>
        <footer className="container-fluid bg-dark text-white mt-auto p-2">
            <p>"It's never too late to start a new adventure!" - Unknown</p>
        </footer>
    </div>
}