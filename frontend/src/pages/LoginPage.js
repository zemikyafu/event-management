import "../pages/LoginPage.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function LoginPage(prob) {
  axios.defaults.baseURL = "http://localhost:8080/api";
  const [credential, setCredential] = useState({ email: "", password: "" });
  const[message,setMessage]=useState({messageType:'',message:''})
  const navigate =  useNavigate();

  
   useEffect((()=>{
    if(prob.message)
      {
       setMessage(prob.message)
      }
   }

   ),[prob.message])
 
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    await axios
      .post("/login", credential)
      .then((response) => {
        if (response.status === 201) {
         const {token,user}=response.data;
         
          localStorage.setItem("token",token);
          localStorage.setItem("user",JSON.stringify(user));
          prob.handleAuth(true);
          console.log('user',localStorage.getItem('user'));
          console.log('token',localStorage.getItem('token'));
          navigate("/home");
        }
      })
      .catch((error) => {
        if(error.response)
        {
            const statusCode= error.response.status;
            if (statusCode === 400) {
                setMessage({messageType:'error-message',message:'Bad credentials. Please check your email and password.'})
              } else if (statusCode === 500) {
                setMessage({messageType:'error-message',message:'Server error. Please try again later.'})
              } else {
                setMessage({messageType:'error-message',message:`Unexpected error: ${statusCode}. Please try again.`})
              }
           
        }
        else if (error.request) {
            console.log("No response received:", error.request);
            setMessage({messageType:'error-message',message:'Network error. Please check your internet connection.'})
            
          } else {
            console.log("Error", error.message);
            setMessage({messageType:'error-message',message:'An unknown error occurred. Please try again.'})
            
          }
       
      });
  };

  const handleOnchange = (e) => {
    const { name, value } = e.target;
    setCredential({ ...credential, [name]: value });
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-header">
          <h1>Login</h1>
        </div>
        {message.message && <span className={message.messageType}> {message.message} </span>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="email"
            onChange={handleOnchange}
            className="user-name-input"
            placeholder="email"
          />
          <input
            type="password"
            name="password"
            onChange={handleOnchange}
            className="password-input"
            placeholder="Password"
          />

          <div className="rememberme-container">
            <div>
              <label>Remember me</label>
              <input type="checkbox" className="rememberme-checkbox" name="" />
            </div>
            <a href="#" className="forgot-password-link">
              Forgot your password?
            </a>
          </div>

          <input type="submit" className="submit-button" />
          <div className="signup-container">
            <span>Doesn't have an account? </span>
            <a href="/registration" className="signup-link">
              Signup
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
export default LoginPage;
