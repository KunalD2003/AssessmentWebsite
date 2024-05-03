import React from "react";
import { Button, Col, Container, Modal, Row, Table } from "react-bootstrap";
import "./UserData.css";
import { useState } from "react";

function UserData() {
  //Modal state
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //Modal state
  const [showAdd, setShowAdd] = useState(false);

  const AddhandleClose = () => setShowAdd(false);
  const AddhandleShow = () => setShowAdd(true);

  const Users = [
    { id: 0, name: "Krishna", Email: "krishna@gmail.com" },
    { id: 1, name: "Ankit", Email: "ankit@gmail.com" },
    { id: 2, name: "Kunal", Email: "kunal@gmail.com" },
    { id: 3, name: "Priyanka", Email: "priyanka@gmail.com" },
    { id: 4, name: "Shivam", Email: "shivam@gmail.com" },
  ];
  return (
    <div>
      <div id="userDataContainer">
        <Container>
          <Row>
            <Col lg={1}>
              <h6 style={{ fontWeight: 800, textAlign: "center" }}>S.N.</h6>
            </Col>
            <Col lg={3} style={{}}>
              <h6 style={{ fontWeight: 800, textAlign: "center" }}>Name</h6>
            </Col>
            <Col lg={4}>
              <h6 style={{ fontWeight: 800, textAlign: "center" }}>Email</h6>
            </Col>
          </Row>
        </Container>
        {Users.map((currentElement) => {
          return (
            <Container>
              <Row>
                <Col lg={1}>
                  <h5
                    style={{
                      textAlign: "center",
                    }}
                  >
                    {currentElement.id}
                  </h5>
                </Col>
                <Col lg={3}>
                  <h5
                    style={{
                      textAlign: "center",
                    }}
                  >
                    {currentElement.name}
                  </h5>
                </Col>
                <Col lg={4}>
                  <h5 style={{ marginLeft: "20%" }}>{currentElement.Email}</h5>
                </Col>

                <Col lg={2} style={{ paddingBottom: "1%" }}>
                  <Button variant="success">Delete</Button>
                </Col>

                <Col lg={2}>
                  <Button variant="success" onClick={handleShow}>
                    Explore
                  </Button>
                </Col>
              </Row>
            </Container>
          );
        })}
        <div id="buttonAdd">
          <Button variant="success" onClick={AddhandleShow}>
            Add User
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
          <Modal.Title>User Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <h6>Name : abcd </h6>
            </div>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <h6>Email : abcd@gmail.com </h6>
            </div>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <h6>Mobile : +91 1234567890 </h6>
            </div>
          </div>
          <hr />

          {/* ..................table......... */}
          <div>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th colSpan={4}>Assesment History</th>
                </tr>

                <tr>
                  <th>No.</th>
                  <th>Assesment Name</th>
                  <th>Attempted</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>react</td>
                  <td>....</td>
                  <td>...</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>angular</td>
                  <td>.........</td>
                  <td>.....</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>DBMS</td>
                  <td>.....</td>
                  <td>....</td>
                </tr>
              </tbody>
            </Table>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* ......................Modal Add User..... */}
      <Modal
        show={showAdd}
        onHide={AddhandleClose}
        animation={false}
        style={{ justifyContent: "center", alignItems: "center" }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h6>Enter Name :</h6>
          <input className="input" type="text" placeholder="Enter Name" />
          <h6>Enter Location :</h6>
          <input className="input" type="text" placeholder="Enter Location" />
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
          <Button variant="secondary" onClick={AddhandleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={AddhandleClose}>
            Add User
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
export default UserData;
