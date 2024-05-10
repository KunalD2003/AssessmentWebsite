

import React, { useEffect, useState } from "react";
import { Button, Col, Container, Modal, Row, Table } from "react-bootstrap";
import axios from "axios";
import "./UserData.css";

function UserData() {
  const [show, setShow] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null); // State to store selected user

  const handleClose = () => setShow(false);
  const handleShow = (user) => {
    // Modify handleShow to accept user parameter
    setSelectedUser(user); // Set selected user details
    setShow(true);
  };

  // Modal Add User
  const [showAdd, setShowAdd] = useState(false);
  const AddhandleClose = () => setShowAdd(false);
  const AddhandleShow = () => setShowAdd(true);

  const [userData, setUserData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/users");
      setUserData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  //delete API integration function
  const handleDelete = async (userId) => {
    try {
      await axios.delete(`http://localhost:3000/api/users/${userId}`); // Remove colon (:) before userId
      fetchData(); // Fetch data again after deletion
      alert('User Data Delete');
    } catch (error) {
      console.error("Error deleting user:", error);
      alert('User Data not Delete');
    }
  };

  return (
    <div>
      <div className="userDataContainer" style={{ overflow: "scroll" }}>
        <Container>
          <Row>
            <Col lg={3}>
              <h6
                style={{
                  fontWeight: 800,
                  textAlign: "center",
                  paddingTop: "5%",
                }}
              >
                Name
              </h6>
            </Col>
            <Col lg={3}>
              <h6
                style={{
                  fontWeight: 800,
                  textAlign: "center",
                  paddingTop: "5%",
                }}
              >
                Email
              </h6>
            </Col>

            {userData.map((currentElement) => {
              return (
                <Col lg={12} key={currentElement.id}>
                  <div className="dataContainer">
                    <Col lg={3}>
                      <h5
                        style={{
                          textAlign: "center",
                        }}
                      >
                        {currentElement.name}
                      </h5>
                    </Col>
                    <Col lg={3}>
                      <h5 style={{}}>{currentElement.email}</h5>
                    </Col>

                    <Col lg={3}>
                      <div>
                        <Button variant="success" onClick={() => handleDelete(currentElement.userId)}>Delete</Button>
                      </div>
                    </Col>
                    <Col lg={3}>
                      <div>
                        {/* Pass currentElement as parameter to handleShow */}
                        <Button
                          variant="success"
                          onClick={() => handleShow(currentElement)}
                        >
                          Explore
                        </Button>
                      </div>
                    </Col>
                  </div>
                </Col>
              );
            })}
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
          <Modal.Title>User Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Display selected user details */}
          {selectedUser && (
            <div>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <h6>Name : {selectedUser.name} </h6>
              </div>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <h6>Email : {selectedUser.email} </h6>
              </div>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <h6>Email : {selectedUser.phone} </h6>
              </div>
              {/* Add more user details here */}
            </div>
          )}
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

      {/* Modal Add User */}
      {/* Add your modal content here */}
    </div>
  );
}
export default UserData;
