import './App.css';
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage';
import RegistrationPage from './pages/RegistrationPage'
import {BrowserRouter,Route,Routes,Navigate, json} from 'react-router-dom'
import EventsPage from './pages/EventsPage'
import { useState } from 'react'

function App() {
  const [isAuthenticated,setIsAuthenticated] = useState(false) 
  const [check,setCheck]=useState('');
  const [message,setMessage]=useState({messageType:'',message:''})
  
 const handleAuth=(authState)=>{ 
   setIsAuthenticated(authState);
  }
  const PrivateRoute= ({element:Component})=>{
    return isAuthenticated? <Component/>:<Navigate to="/"/>
  }

  const handleMessage =(registrationMessage)=>{
   setMessage(registrationMessage);
  }
  return (
    <div className="App">
     
      <BrowserRouter>
      <Routes>
       <Route path='/' element={<LoginPage handleAuth={handleAuth} message={message}/>} />
        <Route path='/home' element={<PrivateRoute element= {HomePage}/>}/>
        <Route path='/registration' element={<RegistrationPage registrationMessage={handleMessage}/ > } />
        <Route path='/events' element={<PrivateRoute element={EventsPage}/>}/>  
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;


