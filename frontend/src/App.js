import './App.css';
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage';
import RegistrationPage from './pages/RegistrationPage'
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import EventsPage from './pages/EventsPage'

function App() {
  return (
    <div className="App">
      {/* <HomePage></HomePage> */}
      <BrowserRouter>
      <Routes>
       <Route index element={<HomePage/>} />
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/registration' element={<RegistrationPage/>}/>
        <Route path='/events' element={<EventsPage/>}/>
       
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;


