import { useRef, useState } from "react";
import "./User.css";
import logo from "../../assets/img/logo.webp";
import CallIcon from "@mui/icons-material/Call";
import { useSelector } from "react-redux";
import { Button, Col, Container, Modal, Row } from "react-bootstrap";
import {
  EmailRounded,
  Person,
} from "@mui/icons-material";
export default function User() {


  const inputRef = useRef(null);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const AssessmentData = useSelector((state) => {
    return state.getAssessment;
  });

  return (
    <div id="Details">
      <div id="firstDetails">
        <img src={logo} alt="user" id="logo" />
        <h1 style={{ textAlign: "center", marginTop: '1%', alignSelf: 'center' }}>User Profile</h1>
      </div>
      <hr id="line" /> 
      <div style={{ paddingBottom: "3%" }}>
        
        <Container className="container">
          <Row className="row">
            <Col lg={6} >
              <div className="detailsContainer">
                <Person
                  style={{
                  }}
                />
                <h3>Name: {AssessmentData.userDetails.name}</h3>
              </div>
            </Col>
            </Row>
            </Container>
            
            <Container className="container">
          <Row className="row">
            <Col lg={6}>
              <div className="detailsContainer">
                <CallIcon
                  style={{
                  }}
                />
                <h3>Mobile: <span className="details-user">{AssessmentData.userDetails.phone}</span></h3>
              </div>
            </Col>
            </Row>
            </Container>
            <Container className="container">
          <Row className="row">
            <Col lg={6}>
              <div className="detailsContainer">
                <EmailRounded
                  style={{
                  }}
                />
                <div>
                  <h3>Email: <span className="details-user">{AssessmentData.userDetails.email}</span></h3>
                </div>
              </div>
            </Col>
            </Row>
            </Container>
            
      </div>
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





