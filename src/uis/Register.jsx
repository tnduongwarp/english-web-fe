import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Api from "../services/auth-api";

export default function Register() {
    const [registerData, setRegisterData] = useState(null);

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
        }).catch(err => console.log(err));
    }

    const handleChange = (e) => {
        setRegisterData({ ...registerData, [e.target.name]: e.target.value });
    }

    return <div className="d-flex flex-column" style={{ height: "100vh" }}>
        <div className="container-fluid bg-dark text-white p-2 d-flex justify-content-between">
            <h2>Logo</h2>
            <Link to="/login" className="btn btn-info mx-5 px-4" style={{fontWeight: "bolder", fontSize: "1.2rem"}}>Log in</Link>
        </div>
        <div className="row">
            <div className="col"></div>
            <div className="col-3">
                <h1 className="text-center fs-1 fw-bolder m-5">Sign up and start learning!</h1>
                <form action="">
                    <div className="my-4">
                        <label htmlFor="email" className="form-label">Email:</label>
                        <input type="email" className="form-control" placeholder="Your email go here!" name="email" onChange={handleChange}/>
                    </div>
                    <div className="my-4">
                        <label htmlFor="username" className="form-label">Username:</label>
                        <input type="text" className="form-control" placeholder="Your username go here!" name="username" onChange={handleChange}/>
                    </div>
                    <div className="my-4">
                        <label htmlFor="password" className="form-label">Password:</label>
                        <input type="password" className="form-control" placeholder="Your password go here!" name="password" onChange={handleChange}/>
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
        <div className="flex-fill"></div>
        <footer className="container-fluid bg-dark text-white mt-auto p-2">
            <p>"It's never too late to start a new adventure!" - Unknown</p>
        </footer>
    </div>
}