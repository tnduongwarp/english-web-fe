import { useState } from "react";
import { createContext } from "react";
import ForgottenPassword from "./ForgottenPassword";
import OTPInput from "./otp/otp";
import ChangePassword from "./change-password";
export const PasswordContext = createContext();
function ResetPassWord() {
  const [page, setPage] = useState("");
  const [email, setEmail] = useState();
  const [otp, setOTP] = useState();
  const [token,setToken] = useState();

  function NavigateComponents() {
    if (page === "otp") return <OTPInput />;
    if (page === "reset") return <ForgottenPassword />;
    if(page === "change") return <ChangePassword/>;

    return <ForgottenPassword />;
  }

  return (
    <PasswordContext.Provider
      value={{ page, setPage, otp, setOTP, setEmail, email, token, setToken }}
    >
      <div className="flex justify-center items-center">
        <NavigateComponents />
      </div>
    </PasswordContext.Provider>
  );
}

export default ResetPassWord;