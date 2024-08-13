// src/components/EventPage.js
import React, { useEffect, useState } from 'react';
import { useTable } from 'react-table';
import '../components/Event.css'
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const EventForm = (prob) => {
    axios.defaults.baseURL = "http://localhost:8080/api/";
    const navigate =  useNavigate();
    const[message,setMessage]=useState({messageType:'',message:''})
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        venue: '',
        date: '',
        user_id:''
    });
    const [isEditing, setIsEditing] = useState(false);

    const handleChange = (e) => {
        const {name,value}=e.target;
        setFormData({ ...formData, [name]: value });
    };
    useEffect((()=>{
        if(prob.isEditing)
            {
             const formState= prob.formState ;//new Date(prob.formState.date).toISOString().split('T')[0];
             formState.date=new Date(prob.formState.date).toISOString().split('T')[0];
             setFormData(formState);
             setIsEditing(prob.isEditing);
            }
       }
    
       ),[prob.formState,prob.isEditing])
  
    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEditing) {
        //update existing event
        const id = formData.id;
        axios.put('/events/'+id,formData).then((response)=>{
            if (response.status === 200) {
                setMessage({messageType:'success-message',message:'Event updated successfully.'})
                setFormData({ title: '', description: '', venue: '', date: '' });
                setIsEditing(false);
                prob.onEventChanged(response.data);
               }
        }).catch((error)=>{
            if(error.response)
                {
                    const statusCode= error.response.status;
                    if (statusCode === 400) {
                        setMessage({messageType:'error-message',message:'Missing required fields.'})
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
        })

           
            
          
        } else {
        //add new event
        const user=JSON.parse(localStorage.getItem('user'));
        if(!user){
             return navigate('/');
        }
     
        setFormData({ ...formData, user_id: user.id });
        
        axios.post('/events',formData).then((response)=>{
            if (response.status === 201) {
                setMessage({messageType:'success-message',message:'Event registered successfully.'})
                setFormData({ title: '', description: '', venue: '', date: '' });
                prob.onEventChanged(response.data);
               }
        }).catch((error)=>{
            if(error.response)
                {
                    const statusCode= error.response.status;
                    if (statusCode === 400) {
                        setMessage({messageType:'error-message',message:'Missing required fields.'})
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
        })
        }
       
       

    };

  

    return (
        <div className='event-form-container'>
            <h1>Event Registration</h1>
            {message.message && <span className={message.messageType}> {message.message} </span>}
            <form onSubmit={handleSubmit}>
            <div className='event-form'>
                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    // {...prob.isEditing && value={{prob.formState}} }
                    onChange={handleChange}
                    placeholder="Event Title"
                    required
                />
                <input
                    type="text"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Event Description"
                    required
                />
                <input
                    type="text"
                    name="venue"
                    value={formData.venue}
                    onChange={handleChange}
                    placeholder="Event Venue"
                    required
                />
                <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                />
                <button className={isEditing ? 'update-event-button' : 'register-event-button'} type="submit">{isEditing ? 'Update Event' : 'Register Event'}</button>
                </div>
            </form>

        </div>
    );
};

export default EventForm;
