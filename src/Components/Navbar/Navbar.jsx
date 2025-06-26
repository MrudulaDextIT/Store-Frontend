import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import logo from "../../assets/logo.svg";

const handleLogout = () => {
  localStorage.removeItem("user");   
  navigate("/");                     
};


const Navbar = () => {
  
  return (
    <div className="navbar">
      <img src={logo} alt="Logo" />
      
      <ul className="nav-menu">
        <li>
          <Link to="/home">Home</Link>
        </li>
        <li>
          <Link to="/form">Order Form</Link> 
        </li>
        <li> 
          <Link to="/list">Order List</Link> 
        </li>
        <li>
          <Link to="/contact">Contact</Link> 
        </li>
        <li>
          <Link to="/" onClick={handleLogout}>Logout</Link> 
        </li>
      </ul>
      
    </div>
  );
};




export default Navbar;
