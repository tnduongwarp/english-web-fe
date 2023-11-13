import { useNavigate } from "react-router-dom";
import { useEffect, useState , useContext } from "react";
import { PasswordContext } from "./index";
import ApiRoot from "../../services/ApiRoot";
export default function ForgottenPassword() {
    const { setEmail, setPage,  setOTP } = useContext(PasswordContext);
    const [emailInput, setEmailInput]= useState('')
    const [isLoading, setIsLoading] = useState(false);
    async function nagigateToOtp(e) {
        e.preventDefault();
        if (emailInput) {
          const OTP = Math.floor(Math.random() * 9000 + 1000);
          const data = {
            recipient_email: emailInput,
            OTP: OTP
          };
          setIsLoading(true);
          ApiRoot.postRequestBase('/forgot-pw/send_recovery_email',data)
          .then((res) => {
            console.log(res)
            if(res.error === false){
                console.log(res.error)
                setIsLoading(false);
                setOTP(OTP);
                setEmail(emailInput);
                setPage("otp")
            }else {
                alert(res.message)
                setIsLoading(false);
            }
            
          })
          .catch(console.log);
          return;
        }
        return alert("Please enter your email");
      }
    //initState
    useEffect(() => { 
        document.title = "Forgotten Password"; 
    }, []);
    const navigate = useNavigate();
    const onRegisterClick = () => {
        navigate("/register");
    }
    const onLoginClick = () => {
        navigate("/login");
    }

    return <div className="d-flex flex-column" style={{ height: "100vh", overflowX: "hidden" }}>
            <div className="container-fluid bg-dark text-white p-2 d-flex justify-content-around">
                <h2>Logo</h2>
                <div className="d-inline-flex">
                    <button type="button" className="btn btn-link text-light" style={{fontWeight: "bolder", fontSize: "1.2rem"}}>Course</button>
                    <button type="button" className="btn btn-link text-light" style={{fontWeight: "bolder", fontSize: "1.2rem"}} onClick={onLoginClick}>Login</button>
                    <button type="button" className="btn btn-info" style={{fontWeight: "bolder", fontSize: "1.2rem"}} onClick={onRegisterClick}>Sign up</button>
                </div>
            </div>
            <div className="row">
                <div className="col"></div>
                <div className="col-3">
                    <h1 className="text-center fs-1 fw-bolder m-5">Forgot Password</h1>
                    <p>Oh dear. You forgot your password.</p>
                    <p>Don't worry though, we'll get you back to learning a language in no time.</p>
                    <p>But first, let's reset your password.</p>
                        <div className="my-4">
                            <label htmlFor="email" className="form-label">Email:</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                id="email" 
                                placeholder="Enter your email to get OTP..." 
                                onChange={(e) => setEmailInput(e.target.value)}
                                value={emailInput}
                            />
                        </div>
                        <div className="row my-4">
                            <button  
                                onClick={(e) => nagigateToOtp(e)} 
                                className="col-11 mx-auto btn btn-info"
                                disabled = {isLoading}
                            >{isLoading ? "Loading" :"Reset password"}</button>
                        </div>
                </div>
                <div className="col"></div>
            </div>
            <div className="flex-fill"></div>
            <footer className="container-fluid bg-dark text-white mt-auto p-2">
                <p>"It's never too late to start a new adventure!" - Unknown</p>
            </footer>
        </div>
    ;
}