import React, { useEffect, useState } from "react";
import { Button, Col, Container, Modal, Row, Table } from "react-bootstrap";
import axios from "axios";
import "./UserData.css";
function UserData() {
  const [show, setShow] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null); // State to store selected user
  const handleClose = () => setShow(false);
  // Function to open the modal and set selected user details
  const handleShow = (user) => {
    setSelectedUser(user);
    fetchExamHistory(user.userId); // Fetch exam history for the selected user
    setShow(true);
  };
  

  const [userData, setUserData] = useState([]);
  const [examHistory, setExamHistory] = useState([]); // State to store exam history data
  // Function to fetch user data
  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/users");
      setUserData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Function to fetch exam history for a specific user
  const fetchExamHistory = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:3001/archievedexamresult`);
      // Filter exam history based on user ID
      setExamHistory(response.data.filter((exam) => exam.userid === userId));
    } catch (error) {
      console.error("Error fetching exam history:", error);
    }
  };


  // Fetch user data when the component mounts
  useEffect(() => {
    fetchData();
  }, []);
  
  //delete API integration function
  // Function to delete a user
  const handleDelete = async (userId) => {
    try {
      await axios.delete(`http://localhost:3000/api/users/${userId}`);
      fetchData(); // Fetch data again after deletion
      alert('User Data Deleted');
    } catch (error) {
      console.error("Error deleting user:", error);
      alert('User Data not Deleted');
    }
  };
  return (
    <div>
      <div className="userDataContainer">
        <Container>
          <Row>
            <Col lg={4}>
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
            <Col lg={4}>
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
                    <Col lg={4}>
                      <h5
                        style={{
                          textAlign: "center",
                        }}
                      >
                        {currentElement.name}
                      </h5>
                    </Col>
                    <Col lg={4}>
                      <h5 style={{ textAlign: "center" }}>
                        {currentElement.email}
                      </h5>
                    </Col>
                    <Col lg={4} className="user-data-column-btn">
                      <div>
                        <Button
                          variant="danger"
                          onClick={() => handleDelete(currentElement.userId)}
                        >
                          Delete
                        </Button>
                      </div>
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
                  <th colSpan={3}>Assessment History</th>
                </tr>
                <tr>
                  <th>Assessment Name</th>
                  <th>Date</th>
                  <th>Score</th>
                </tr>
              </thead>
              <tbody>
                {/* Map through exam history and render each exam */}
                {examHistory.map((exam) => (
                  <tr key={exam._id}>
                    <td>{exam.examname}</td>
                    <td>{exam.date}</td>
                    <td>{exam.score}</td>
                  </tr>
                ))}
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
    </div>
  );
}
export default UserData;
