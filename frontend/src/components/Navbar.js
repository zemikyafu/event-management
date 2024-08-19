import { useEffect, useState} from "react";
import "../components/Navbar.css";
import { useNavigate } from "react-router-dom";
import { faUser, faSignOutAlt, faCog } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
function Navbar() {
  const [activeMenu, setActiveMenu] = useState("home");
  const [loggedInUser,setLoggedInUser]=useState("home");
  const handleClicked = (e) => {
    const menuName = e.target.getAttribute("name");
    setActiveMenu(menuName);
  };
  const navigate  = useNavigate()

  useEffect(()=>{
    const user=JSON.parse(localStorage.getItem('user'));
    console.log('loggedin as',user);
    if(user)
    {
      setLoggedInUser(user.name);
    }
  },[])
  
const handleLogout=()=>{
  localStorage.removeItem("user");
  localStorage.removeItem("token");
  navigate('/')
}

const handleProfile=()=>{
  navigate('/profile')
}
  return (
    <ul className="nav-bar-list">
      <li className="nav-bar-list-item">
        <a
          className={activeMenu === "home" ? "active" : ""}
          name="home"
          href="/"
          onClick={handleClicked}
        >
          Home
        </a>
      </li>
      <li className="nav-bar-list-item">
        <a
          className={activeMenu === "event" ? "active" : ""}
          name="event"
          href="/events"
          onClick={handleClicked}
        >
          Events
        </a>
      </li>
      <li className="nav-bar-list-item profile">
        <a
          className={activeMenu === "profile" ? "active" : ""}
          name="profile"
          href="#"
          onClick={handleClicked} fon
        >
        <FontAwesomeIcon icon={faUser} />
          Profile
        </a>
        <ul className="profile-dropdown-menu">
        <li className="user-name">Hi! <strong>{loggedInUser}</strong></li>
          <li>
           <a onClick={handleLogout} > <FontAwesomeIcon icon={faSignOutAlt} />Logout</a>
          </li>
          <li>
         <a onClick={handleProfile}> <FontAwesomeIcon icon={faCog} /> Manage Profile</a>
          </li>
        </ul>
      </li>
    </ul>
  );
}

export default Navbar;
