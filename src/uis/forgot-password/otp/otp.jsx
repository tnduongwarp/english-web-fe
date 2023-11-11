/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { useState, useRef } from "react";
import { useContext } from "react";
import { PasswordContext } from "../index";
import ApiRoot from "../../../services/ApiRoot";
import './otp.css'

export default function OTPInput (){
     const {  otp, setOTP ,email, setToken, setPage} = useContext(PasswordContext);
     const [timerCount, setTimer] = React.useState(60);
     const [otpInput, setOTPInput] = useState(['', '', '', '']);
     const [disable, setDisable] = useState(true);
     const inputRefs = [useRef(), useRef(), useRef(), useRef()]; // Refs for each input

     function resendOTP() {
       if (disable) return;
       const OTP = Math.floor(Math.random() * 9000 + 1000);
        const data = {
            recipient_email: email,
            OTP: OTP
        }
        ApiRoot.postRequestBase('/forgot-pw/send_recovery_email',data)
         .then(() => setOTP(OTP))
         .then(() => setDisable(true))
         .then(() => setTimer(60))
         .catch(console.log);
     }
   
     function verfiyOTP(e) {
      e.preventDefault()
       if (parseInt(otpInput.join("")) === otp) {
        console.log('oke');
        ApiRoot.postRequestBase('/auth/get-change-pw-token',{email: email})
        .then(res => {
          setToken(res.token);
          setPage('change');
        })
        .catch(console.log)
         return;
       }
       console.log(
         "The code you have entered is not correct, try again or re-send the link"
       );
       return;
     }
     const handleChange = (index, value) => {
      // Update the OTP array
      const newOtp = [...otpInput];
      newOtp[index] = value;
      setOTPInput(newOtp);
  
      // Move focus to the next input if available
      if (index < inputRefs.length - 1 && value !== '') {
        inputRefs[index + 1].current.focus();
      }
    };
     React.useEffect(() => {
       let interval = setInterval(() => {
         setTimer((lastTimerCount) => {
           lastTimerCount <= 1 && clearInterval(interval);
           if (lastTimerCount <= 1) setDisable(false);
           if (lastTimerCount <= 0) return lastTimerCount;
           return lastTimerCount - 1;
         });
       }, 1000); //each count lasts for a second
       //cleanup the interval on complete
       return () => clearInterval(interval);
     }, [disable]);
   
     return (
       <div className="">
             <div className="text-center otp-header">
               <div className="otp-title">
                 <p>Email Verification</p>
               </div>
               <div className="otp-info">
                 <p>We have sent a code to your email <span className="email">{email}</span></p>
               </div>
             </div>
   
             <div>
               <form>
                   <div className="otp-body">                             
                    <div className="otp-group">
                       
                          {/* <input
                            type="text"
                            pattern="\d{1}"
                            maxLength="1"
                            className="otp-input"
                            value={otpInput[0]}
                            onChange={(e) => setOTPInput([ e.target.value, otpInput[1], otpInput[2], otpInput[3] ])}
                          />

                          <input
                            type="text"
                            pattern="\d{1}"
                            maxLength="1"
                            className="otp-input"
                            value={otpInput[1]}
                            onChange={(e) => setOTPInput([ otpInput[0], e.target.value, otpInput[2], otpInput[3] ])}
                          />

                          <input
                            type="text"
                            pattern="\d{1}"
                            maxLength="1"
                            className="otp-input"
                            value={otpInput[2]}
                            onChange={(e) => setOTPInput([ otpInput[0], otpInput[1],e.target.value, otpInput[3] ])}
                          />

                          <input
                            type="text"
                            pattern="\d{1}"
                            maxLength="1"
                            className="otp-input"
                            value={otpInput[3]}
                            onChange={(e) => setOTPInput([ otpInput[0], otpInput[1], otpInput[2], e.target.value ])}
                          /> */}
                           {otpInput.map((digit, index) => (
                              <input
                                key={index}
                                ref={inputRefs[index]}
                                type="text"
                                maxLength="1"
                                value={digit}
                                className="otp-input"
                                onChange={(e) => handleChange(index, e.target.value)}
                              />
                            ))}
                      </div>
                   </div>
                   <div className="otp-footer">                                                   
                     <div className="">
                       <button
                         onClick={(e) => verfiyOTP(e)}
                         className="text-center button-verify"
                       >
                         Verify Account
                       </button>
                     </div>
                     <div className="text-center not-get-otp">
                       <p>Didn't recieve code?</p>{" "}
                       <a
                         className=""
                         style={{
                           color: disable ? "gray" : "blue",
                           cursor: disable ? "none" : "pointer",
                           textDecorationLine: disable ? "none" : "underline",
                         }}
                         onClick={() => resendOTP()}
                       >
                         {disable ? `Resend OTP in ${timerCount}s` : "Resend OTP"}
                       </a>
                     </div>
                   </div>
               </form>
               
             </div>
      </div>
     );
}
