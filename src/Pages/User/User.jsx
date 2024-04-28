import React from 'react'
import './User.css'
import { useRef, useState } from "react";
import userPic from "../../assets/img/user.jpg";
import logo from "../../assets/img/logo.webp";
import CallIcon from "@mui/icons-material/Call";
import { Button, Col, Container, Modal, Row } from "react-bootstrap";
import { DateRange, Email, EmailRounded, Link, LocationCity, Person } from "@mui/icons-material";


function User() {
  const inputRef = useRef(null);
  //Modal state
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // ..........function for add a input image on input field
  const [image, setImage] = useState("");
  const handleImageClick = () => {
    inputRef.current.click();
  };
  // ......function for user profile change on input field
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    console.log(file);
    setImage(event.target.files[0]);
  };

  return (
    <div id="Details">
      {/* ............head.......... */}
      <div id="firstDetails">
        <div style={{display: "flex", width: "100%"}}>
          <img src={logo} alt="user" id="logo" />
          <h1 style={{ textAlign: "center", marginTop: '1%', alignSelf: 'center' }}>User Profile</h1>
        </div>
        <div>
          <button type="button" class="btn btn-danger log-out-btn">Log out</button>
        </div>
      </div>
      <hr id="line" />
      {/* .............about */}
      <div style={{ paddingBottom: "3%" }}>
        {/* <h1 style={{ textAlign: "center" }}>About me</h1> */}
        <div id="secondDetails">
          <div id="userPic" onClick={handleImageClick}>
            {image ? (
              <img
                src={URL.createObjectURL(image)}
                alt=""
                style={{ height: "100px", width: "100px", borderRadius: 50 }}
              />
            ) : (
              <img src={userPic} alt="user" id="user" />
            )}
            <input
              onChange={handleImageChange}
              type="file"
              style={{ display: "none" }}
              ref={inputRef}
            />
          </div>
        </div>
        <Container class="container">
          <Row>
            <Col lg={6}>
              <div className="detailsContainer">
                <Person
                  style={{
                    marginTop: "1%",
                    marginRight: "2%",
                    marginLeft: "3%",
                  }}
                />
                <h3>Name: Krishna Tripathi</h3>
              </div>
            </Col>
            <Col lg={6}>
              <div className="detailsContainer">
                <LocationCity
                  style={{
                    marginTop: "1%",
                    marginRight: "2%",
                    marginLeft: "3%",
                  }}
                />
                <h3>Location: Indore</h3>
              </div>
            </Col>
            <Col lg={6}>
              <div className="detailsContainer">
                <CallIcon
                  style={{
                    marginTop: "1%",
                    marginRight: "2%",
                    marginLeft: "3%",
                  }}
                />
                <h3>Mobile: +91 0000000000</h3>
              </div>
            </Col>
            <Col lg={6}>
              <div className="detailsContainer">
                <EmailRounded
                  style={{
                    marginTop: "1%",
                    marginRight: "2%",
                    marginLeft: "3%",
                  }}
                />
                <h3>Email: onlineExam@gmail.com</h3>
              </div>
            </Col>
            <Col lg={6}>
              <div className="detailsContainer">
                <DateRange
                  style={{
                    marginTop: "1%",
                    marginRight: "2%",
                    marginLeft: "3%",
                  }}
                />
                <h3>DOB: DD/MM/YYYY</h3>
              </div>
            </Col>
            <Col lg={6}>
              <div className="detailsContainer">
                <Link
                  style={{
                    marginTop: "1%",
                    marginRight: "2%",
                    marginLeft: "3%",
                  }}
                />
                <h3>GitHub Link: --------</h3>
              </div>
            </Col>
          </Row>
        </Container>
        <div id="btnContainer">
          <Button
            variant="success"
            onClick={handleShow}
            style={{ display: "flex", margin: "auto", marginTop: "2rem" }}
          >
            Update
          </Button>
        </div>
      </div>
      {/* ......................Modal..... */}
      <Modal
        show={show}
        onHide={handleClose}
        animation={false}
        style={{ justifyContent: "center", alignItems: "center" }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h6>Enter Name :</h6>
          <input className="input" type="number" placeholder="Enter Name" />
          <h6>Enter Location :</h6>
          <input className="input" type="number" placeholder="Enter Location" />
          <h6>Enter Mobile Number :</h6>
          <input
            className="input"
            type="number"
            placeholder="Enter Mobile Number"
          />
          <h6>Enter Email :</h6>
          <input className="input" type="email" placeholder="Enter Email" />
          <h6>Enter DOB :</h6>
          <input className="input" type="date" placeholder="Enter DOB" />
          <h6>Enter GitHub :</h6>
          <input
            className="input"
            type="email"
            placeholder="Enter GitHub Link"
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Update Profile
          </Button>
        </Modal.Footer>
      </Modal>
    </div>

  )
}

export default User