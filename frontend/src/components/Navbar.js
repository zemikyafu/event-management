import { useState } from "react";
import "../components/Navbar.css";

function Navbar() {
  const [activeMenu, setActiveMenu] = useState("home"); 
  const handleClicked = (e) => {
    const menuName = e.target.getAttribute("name"); 
    setActiveMenu(menuName); 
  };

  return (
    <ul className="nav-bar-list">
      <li className="nav-bar-list-item">
        <a className={activeMenu === "home" ? "active" : ""}
          name="home"
          href="/"
          onClick={handleClicked}>
          Home
        </a>
      </li>
      <li className="nav-bar-list-item">
        <a className={activeMenu === "event" ? "active" : ""}
          name="event"
          href="/events"
          onClick={handleClicked}>
          Events
        </a>
      </li>
      <li className="nav-bar-list-item">
        <a
          className={activeMenu === "profile" ? "active" : ""}
          name="profile"
          href="#"
          onClick={handleClicked}
        >
          Profile
        </a>
      </li>
    </ul>
  );
}

export default Navbar;
