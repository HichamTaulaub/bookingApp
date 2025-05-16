import { Link, useNavigate } from "react-router-dom";
import "./navbar.css"
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";


import {
  faBed,
  faCar,
  faPlane,
  faTaxi,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LogoutButton from "./LogoutButton";


const Navbar = () => {

    const { user } = useContext(AuthContext);
      const navigate = useNavigate()
      const handleClick = () =>{
        navigate('/login')
      }
  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
          <span className="logo">Booking</span>
        </Link>
       
<div className="headerListnav">
          <div className="headerListItem active">
            <FontAwesomeIcon icon={faBed} />
            <span>Stays</span>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faPlane} />
            <span>Flights</span>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faCar} />
            <span>Car rentals</span>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faBed} />
            <span>Attractions</span>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faTaxi} />
            <span>Airport taxis</span>
          </div>
        </div>

         {user ? <div>{user.username} <LogoutButton/></div>  
          : <div className="navItems">

            <button onClick={handleClick} className="navButton">Login</button>
            
          </div>}
        
          
        
      </div>
    </div>
  );
}

export default Navbar