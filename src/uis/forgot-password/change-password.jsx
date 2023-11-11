import { useNavigate } from "react-router-dom";
import { useEffect, useState , useContext } from "react";
import { PasswordContext } from "./index";
import ApiRoot from "../../services/ApiRoot";
export default function ChangePassword() {
    const { token } = useContext(PasswordContext);
    const [newPassword, setNewPassword]= useState('')
    const [repeatNewPassword, setRepeatNewPassword]= useState('')
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState({
        newPassword: '',
        repeatNewPassword: ''
      });
      
      const validateInput = function(e) {
        let { name, value } = e.target;
        setError(prev => {
          const stateObj = { ...prev, [name]: "" };
       
          switch (name) {
            
       
            case "newPassword":
              if (!value) {
                stateObj[name] = "Please enter Password.";
              } else if (repeatNewPassword && value !== repeatNewPassword) {
                stateObj["repeatNewPassword"] = "Password and Confirm Password does not match.";
              } else {
                stateObj["repeatNewPassword"] = repeatNewPassword ? "" : error.repeatNewPassword;
              }
              break;
       
            case "repeatNewPassword":
              if (!value) {
                stateObj[name] = "Please enter Confirm Password.";
              } else if (newPassword && value !== newPassword) {
                stateObj[name] = "Password and Confirm Password does not match.";
              }
              break;
       
            default:
              break;
          }
       
          return stateObj;
        });
      }
    async function nagigateToLogin(e) {
        e.preventDefault();
        const data = {
            newPassword: newPassword,
            token: token
        }
        ApiRoot.postRequestBase('/forgot-pw/change-pw', data)
        .then( res => {
            if(res.message === 'success') {
                console.log('change ok');
                navigate('/login')
            }else{
              console.log('xử lí thông báo lỗi vì token đã hết hạn')
            }
        })
        .catch(console.log)

      }
    //initState
    useEffect(() => { 
        document.title = "Change Password"; 
    }, []);
    const navigate = useNavigate();
    const onRegisterClick = () => {
        navigate("/register");
    }
    const onLoginClick = () => {
        navigate("/login");
    }

    return <div className="d-flex flex-column" style={{ height: "100vh" }}>
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
                    <h1 className="text-center fs-1 fw-bolder m-5">Change Password</h1>
                    <form>
                           <div className="my-4">
                              <label htmlFor="newPassword" className="form-label">New Password:</label>
                              <input 
                                  type="password" 
                                  className="form-control" 
                                  name="newPassword" 
                                  placeholder="Enter New Password..." 
                                  onChange={(e) => {
                                    setNewPassword(e.target.value);
                                    validateInput(e)
                                  }}
                                  value={newPassword}
                                  onBlur={validateInput}
                              />
                              {error.newPassword && <span style={{color: "red"}}>{error.newPassword}</span>}
                          </div>
                          <div className="my-4">
                              <label htmlFor="repeatNewPassword" className="form-label">Confirm Password:</label>
                              <input 
                                  type="password" 
                                  className="form-control" 
                                  name="repeatNewPassword" 
                                  placeholder="Enter New Password..." 
                                  onChange={(e) => {
                                    setRepeatNewPassword(e.target.value);
                                    validateInput(e)
                                  }}
                                  value={repeatNewPassword}
                                  onBlur={validateInput}
                              />
                              {error.repeatNewPassword && <span style={{color: "red"}}>{error.repeatNewPassword}</span>}
                          </div>
                    </form>
                        
                        <div className="row my-4">
                            <button  
                                onClick={(e) => nagigateToLogin(e)} 
                                className="col-11 mx-auto btn btn-info"
                                disabled = {isLoading && error.repeatNewPassword && error.newPassword}
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