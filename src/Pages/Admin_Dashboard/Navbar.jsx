import React from 'react';
import "./Navbar.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";

import { Button, Nav, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { ReactTyped } from "react-typed";


const Navbar = () => {

  return (
    <div className="navbar-candidate">
        <h2>Welcome to <ReactTyped style={{color:'#50BCB6'}} strings={["Candidate Assessment Website",'Averybit']} typeSpeed={40} backSpeed={50} loop /></h2>
        <Button variant="danger"><h5>↪️ Logout</h5></Button>
      </div>
  );
};

export default Navbar;