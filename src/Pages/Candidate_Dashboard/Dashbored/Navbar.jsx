import React from "react";
import "./Navbar.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";

import { Nav, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { ReactTyped } from "react-typed";
import { useNavigate } from "react-router";
import { setLogoutStatus } from "../../../Store/assessmentData";
import { useDispatch } from "react-redux";
const Navbar = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  function logoutBtn(){
    dispatch(setLogoutStatus())
  }

  return (
    <>
      
      <div className="navbar-candidate">
        <h2>Welcome to <ReactTyped style={{color:'#50BCB6'}} strings={["Candidate Assessment Website",'Averybit']} typeSpeed={40} backSpeed={50} loop /></h2>
        <Nav>
          <NavDropdown
            title="👤Profile"
            style={{
              color: "white",
              borderWidth: 1,
              backgroundColor: "white",
              borderRadius: 5,
            }}
          >
            <LinkContainer to="/userid/profile">
              <NavDropdown.Item> 👤Profile</NavDropdown.Item>
            </LinkContainer>
            <LinkContainer to="/">
              <NavDropdown.Item><button className="btn-logout" onClick={logoutBtn}>↪️Logout</button></NavDropdown.Item>
            </LinkContainer>
            
          </NavDropdown>
        </Nav>
      </div>
      
    </>
  );
};

export default Navbar;
