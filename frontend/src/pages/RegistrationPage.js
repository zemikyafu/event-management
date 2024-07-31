import { useState } from 'react';
import '../pages/RegistrationPage.css'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
function RegistrationPage(){
   const[phone,setPhone]=useState('');
return(
    <div className="registration-page">
       
       <div className="form-container">
         <form>
            <div className="form-title">
                 <h1>Register</h1>
            </div>
             <div className="form-field-name">
                <input type="text" name="firstName" placeholder="First Name" className="input-field-firstname"></input>
             
                <input type="text" name="lastName" placeholder="Last Name" className="input-field-lastname"></input>
             </div>
             <div className="form-field-phonenumber">
                {/* <select type="text" name="country-Code"  className="input-field-country-Code"></select>
             
                <input type="text" name="phoneNumber" placeholder="phoneNumber" className="input-field-lastname"></input> */}
               

                {/* <PhoneInput placeholder='Phone Number' country={'FI'}  value={phone} onChange={(phone=>setPhone(phone))}> </PhoneInput> */}
                <PhoneInput  placeholder='Phone Number' country={'fi'}  value={phone} onChange={(phone=>setPhone(phone))}> </PhoneInput>

             </div>
             <div className="form-field">
                <input type="text" name="email" placeholder="Email" className="input-field-email"></input>
             </div>
             <div className="form-field">
                <input type="password" name="password" placeholder="Password" className="input-field-password"></input>
             
             </div>
             <div className="form-field">
                <input type="password" name="confirmPassword" placeholder="Confirm Password" className="input-field-confirm-password"></input>
             </div>
             <div className="form-button">
             <button className="register-button" type="submit">Submit</button>
                 <button className="cancel-button" type="submit">Cancel</button>
                 
             </div>
        </form>
       </div>
        
       
    </div>
);
}
export default RegistrationPage