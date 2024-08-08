
import { useState } from 'react';
import '../pages/RegistrationPage.css';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function RegistrationPage(prob) {
   const [phone, setPhone] = useState('');
   const [formState, setFormState] = useState({
      first_name: "",
      last_name: "",
      username: "",
      email: "",
      password: "",
      phone_number: ""
   });
   const [confirmPassword, setConfirmPassword] = useState('');   
   const [message, setMessage] = useState({ messageType: '', message: '' });
   const navigate = useNavigate();

   const handleSubmit = (e) => {
      e.preventDefault();
      
      
      if (formState.password !== confirmPassword) {
         setMessage({ messageType: 'error-message', message: 'Passwords do not match!' });
         return;  
      }

      
      const submissionData = { ...formState };

      axios.post('/users', submissionData).then((response) => {
      
         if (response.status === 201) {
        
            prob.registrationMessage({ messageType: 'success-message', message: 'Successfully registered! Please use your credentials to login.' });
            navigate('/');
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
   };

   const handleOnchange = (e) => {
      const { name, value } = e.target;
      setFormState({ ...formState, [name]: value });
   };

   const handleConfirmPasswordChange = (e) => {
      setConfirmPassword(e.target.value);
   };

   const handlePhoneChange = (value) => {
      setPhone(value);
      setFormState({ ...formState, phone_number: value });
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
      setConfirmPassword('');  
      setMessage({ messageType: '', message: '' });  
   };

   return (
      <div className="registration-page">
         <div className="form-container">
            <form onSubmit={handleSubmit}>
               <div className="form-title">
                  <h1>Register</h1>
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
               <div className="form-field">
                  <input type="password" name="password" placeholder="Password" className="input-field-password" onChange={handleOnchange} value={formState.password} />
               </div>
               <div className="form-field">
                  <input type="password" name="confirmPassword" placeholder="Confirm Password" className="input-field-confirm-password" onChange={handleConfirmPasswordChange} value={confirmPassword} />
               </div>
               <div className="form-button">
                  <button className="register-button" type="submit">Submit</button>
                  <button className="cancel-button" type="button" onClick={handleCancel}>Cancel</button>
               </div>
            </form>
         </div>
      </div>
   );
}

export default RegistrationPage;
