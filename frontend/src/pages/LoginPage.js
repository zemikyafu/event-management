import '../pages/LoginPage.css';
function LoginPage(){

    const handleSubmit=()=>{
        console.log("Form submitted")
    };

    return(
        <div className="login-page">
            <div className="login-container">
                <div className="login-header">
                  <h1>Login</h1>  
                </div>
                
                <form onSubmit="handleSubmit">
                    <input type="text" className="user-name-input" placeholder="User Name"/>
                    <input type="password" className="password-input" placeholder="Password"/>
                  
                    <div className="rememberme-container">  
                        <div><lable>Remember me</lable>
                        <input type="checkbox" className="rememberme-checkbox" name=""/>
                        </div>                 
                         <a href="#" className="forgot-password-link">Forgot your password?</a>
                    </div>
                   
                    <input type="submit" className="submit-button"/>
                    <div className="signup-container"> 
                    <span>Doesn't have an account? </span><a href="#" className="signup-link">Signup</a>

                    </div>
                    
                </form>
             
              
            </div>

        </div>
    );

}
export default LoginPage;