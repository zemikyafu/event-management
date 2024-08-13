import Navbar from "../components/Navbar";
import EventForm from "../components/EventForm";
import EventList from "../components/EventList";
import {   useState } from 'react';
 
function EventsPage() {
  const [eventChanged,setEventChanged]=useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formState,setFormState]=useState({});

  const handelEvenchange=(eventChanged)=>
  {
   setEventChanged(eventChanged); 
  }
  const onHandleEdit=(event,isEditing)=>{
        setFormState(event);
        setIsEditing(isEditing)
      
  }
   
  return (
    <div>
      <Navbar></Navbar>
      <div>
         <EventForm onEventChanged={handelEvenchange} formState={formState} isEditing={isEditing}></EventForm>
         <EventList eventChanged={eventChanged} handleEdit={onHandleEdit}></EventList>
      </div>
     
    </div>
  );
 

}
export default EventsPage;
