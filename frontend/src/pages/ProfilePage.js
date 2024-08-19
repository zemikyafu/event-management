
import React,{useState,useEffect} from "react";
import axios from "axios";
import PhoneInput from 'react-phone-input-2';
import Navbar from "../components/Navbar";
import   '../pages/ProfilePage.css'
const ProfilePage=()=>{

    axios.defaults.baseURL = "http://localhost:8080/api";
    const [message, setMessage] = useState({ messageType: '', message: '' });
    const [phone, setPhone] = useState('');
    const [userInfo,setUserInfo]=useState({});
    const [formState, setFormState] = useState({
       first_name: "",
       last_name: "",
       username: "",
       email: "",
       phone_number: ""
    });

    const handleOnchange = (e) => {
        const { name, value } = e.target;
        setFormState({ ...formState, [name]: value });
     };
  

     const handleCancel = (e) => {
        e.preventDefault();  
        setFormState({
           first_name: "",
           last_name: "",
           username: "",
           email: "",
           password: "",
           phone_number: ""
        });
        setPhone('');  
        setMessage({ messageType: '', message: '' });  
     };


     const handleUpdate = (e) => {
        e.preventDefault();

        axios.patch('/users/'+userInfo.id, formState).then((response) => {
        
           if (response.status === 200) {
          
             setMessage({ messageType: 'success-message', message: 'Profile successfully updated!'});
           }
        
        }).catch((error) => {
           if (error.response) {
              const statusCode = error.response.status;
              if (statusCode === 400) {
                 setMessage({ messageType: 'error-message', message: 'Bad credentials. Please check your email and password.' });
              } else if (statusCode === 500) {
                 setMessage({ messageType: 'error-message', message: 'Server error. Please try again later.' });
              } else {
                 setMessage({ messageType: 'error-message', message: `Unexpected error: ${statusCode}. Please try again.` });
              }
           } else if (error.request) {
              console.log(error);
              setMessage({ messageType: 'error-message', message: 'Network error. Please check your internet connection.' });
           } else {
              setMessage({ messageType: 'error-message', message: 'An unknown error occurred. Please try again.' });
           }
        });
     }
  
     const handlePhoneChange = (value) => {
        setPhone(value);
        setFormState({ ...formState, phone_number: value });
     };

    useEffect(()=>{
        
            const user=JSON.parse(localStorage.getItem('user'));
            setUserInfo(user);
            axios.get('/users/'+user.id).then((response)=>{
               setMessage({ messageType: '', message: '' });
               setFormState(response.data[0]);
               setPhone(response.data[0].phone_number)
            }).catch((error)=>{
               if (error.response) {
                  const statusCode = error.response.status;
                  if (statusCode === 500) {
                    setMessage({
                      messageType: "error-message",
                      message: "Server error. Please try again later.",
                    });
                  } else {
                    setMessage({
                      messageType: "error-message",
                      message: `Unexpected error: ${statusCode}. Please try again.`,
                    });
                  }
                } else if (error.request) {
                  console.log("No response received:", error.request);
                  setMessage({
                    messageType: "error-message",
                    message: "Network error. Please check your internet connection.",
                  });
                } else {
                  console.log("Error", error.message);
                  setMessage({
                    messageType: "error-message",
                    message: "An unknown error occurred. Please try again.",
                  });
                }
            })
    },[])
    return ( 
      <div>
              <Navbar></Navbar>
        <div className="profile-page">
           
           <div className="form-container">
          
          
              <form onSubmit={handleUpdate}>
                 <div className="form-title">
                    <h1>Edit Profile</h1>
                 </div>
                 {message.message && <span className={message.messageType}> {message.message} </span>}
          
                 <div className="form-field-name">
                    <input type="text" name="first_name" placeholder="First Name" onChange={handleOnchange} className="input-field-firstname" value={formState.first_name} />
                    <input type="text" name="last_name" placeholder="Last Name" onChange={handleOnchange} className="input-field-lastname" value={formState.last_name} />
                 </div>
                 <div className="form-field-phonenumber">
                    <PhoneInput placeholder='Phone Number' country={'fi'} onChange={handlePhoneChange} value={phone} />
                 </div>
                 <div className="form-field">
                    <input type="text" name="username" placeholder="Username" className="input-field-username" onChange={handleOnchange} value={formState.username} />
                 </div>
                 <div className="form-field">
                    <input type="text" name="email" placeholder="Email" className="input-field-email" onChange={handleOnchange} value={formState.email} />
                 </div>
                
                 <div className="form-button">
                    <button className="register-button" type="submit">Update profile</button>
                    <button className="cancel-button" type="button" onClick={handleCancel}>Cancel</button>
                 </div>
              </form>
           </div>
        </div>
      </div>
   
     );
}
export default ProfilePage