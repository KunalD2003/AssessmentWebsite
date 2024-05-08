import { useRef, useState } from "react";
import "./User.css";
import logo from "../../assets/img/logo.webp";
import CallIcon from "@mui/icons-material/Call";
import { Button, Col, Container, Modal, Row } from "react-bootstrap";
import {
  DateRange,
  Email,
  EmailRounded,
  Link,
  LocationCity,
  Person,
} from "@mui/icons-material";
export default function User() {
  const inputRef = useRef(null);
  //Modal state
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // ..........function for add a input image on input field
  // const [image, setImage] = useState("");
  // const handleImageClick = () => {
  //   inputRef.current.click();
  // };
  // ......function for user profile change on input field
  // const handleImageChange = (event) => {
  //   const file = event.target.files[0];
  //   console.log(file);
  //   setImage(event.target.files[0]);
  // };
  return (
    <div id="Details">
      {/* ............head.......... */}
      <div id="firstDetails">
        <img src={logo} alt="user" id="logo" />
        <h1 style={{ textAlign: "center", marginTop: '1%', alignSelf: 'center' }}>User Profile</h1>
      </div>
      <hr id="line" /> 
      {/* .............about */}
      <div style={{ paddingBottom: "3%" }}>
        
        <Container class="container">
          <Row className="row">
            <Col lg={6} >
              <div className="detailsContainer">
                <Person
                  style={{
                  }}
                />
                <h3>Name: prashu tripathi</h3>
              </div>
            </Col>
            </Row>
            </Container>
            
            <Container class="container">
          <Row className="row">
            <Col lg={6}>
              <div className="detailsContainer">
                <CallIcon
                  style={{
                  }}
                />
                <h3>Mobile: <span className="details-user">+91 9098077658</span></h3>
              </div>
            </Col>
            </Row>
            </Container>
            <Container class="container">
          <Row className="row">
            <Col lg={6}>
              <div className="detailsContainer">
                <EmailRounded
                  style={{
                  }}
                />
                <div>
                  <h3>Email: <span className="details-user">prashu10@gmail.com</span></h3>
                </div>
              </div>
            </Col>
            </Row>
            </Container>
            
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
          {/* <h6>Enter Location :</h6>
          <input className="input" type="number" placeholder="Enter Location" /> */}
          <h6>Enter Mobile Number :</h6>
          <input
            className="input"
            type="number"
            placeholder="Enter Mobile Number"
          />
          <h6>Enter Email :</h6>
          <input className="input" type="email" placeholder="Enter Email" />
          {/* <h6>Enter DOB :</h6>
          <input className="input" type="date" placeholder="Enter DOB" />
          <h6>Enter GitHub :</h6>
          <input
            className="input"
            type="email"
            placeholder="Enter GitHub Link"
          /> */}
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
  );
}





