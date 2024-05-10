// import React, { useEffect } from "react";
// import { Button, Col, Container, Modal, Row, Table } from "react-bootstrap";
// import "./UserData.css";
// import { useState } from "react";
// import axios from "axios"; // Import axios

// function UserData() {
//   //Modal state
//   const [show, setShow] = useState(false);

//   const handleClose = () => setShow(false);
//   const handleShow = () => setShow(true);

//   //Modal state
//   const [showAdd, setShowAdd] = useState(false);

//   const AddhandleClose = () => setShowAdd(false);
//   const AddhandleShow = () => setShowAdd(true);

//   // ...............user data api state
//   const [userData, setUserData] = useState([]);
//   const fetchData = async () => {
//     try {
//       const response = await axios.get("http://localhost:3000/api/users");
//       console.log(response.data); // Make sure to access response.data
//       setUserData(response.data); // Update state with response.data
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };
//   useEffect(() => {
//     fetchData();
//   }, []);

//   return (
//     <div>
//       <div className="userDataContainer" style={{ overflow: "scroll" }}>
//         <Container>
//           <Row>
//             <Col lg={3}>
//               <h6 style={{ fontWeight: 800, textAlign: "center",paddingTop:'5%' }}>Name</h6>
//             </Col>
//             <Col lg={3}>
//               <h6 style={{ fontWeight: 800, textAlign: "center",paddingTop:'5%' }}>Email</h6>
//             </Col>

//             {userData.map((currentElement) => {
//               return (
//                 <Col lg={12}>
//                   <div className="dataContainer">
//                     <Col lg={3}>
//                       <h5
//                         style={{
//                           textAlign: "center",
//                         }}
//                       >
//                         {currentElement.name}
//                       </h5>
//                     </Col>
//                     <Col lg={3}>
//                       <h5 style={{}}>{currentElement.email}</h5>
//                     </Col>

//                     <Col lg={3}>
//                       <div>
//                         <Button variant="success">Delete</Button>
//                       </div>
//                     </Col>
//                     <Col lg={3}>
//                       <div>
//                         <Button variant="success" onClick={handleShow}>
//                           Explore
//                         </Button>
//                       </div>
//                     </Col>
//                   </div>
//                 </Col>
//               );
//             })}
//           </Row>
//         </Container>
//       </div>

//       {/* ......................Modal..... */}
//       <Modal
//         show={show}
//         onHide={handleClose}
//         animation={false}
//         style={{ justifyContent: "center", alignItems: "center" }}
//       >
//         <Modal.Header closeButton>
//           <Modal.Title>User Details</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           {userData.map((currentElement) => {
//             return (
//               <div>
//                 <div style={{ display: "flex", flexDirection: "row" }}>
//                   <h6>Name : {currentElement.name} </h6>
//                 </div>
//                 <div style={{ display: "flex", flexDirection: "row" }}>
//                   <h6>Email : {currentElement.email} </h6>
//                 </div>
//                 <div style={{ display: "flex", flexDirection: "row" }}>
//                   <h6>Mobile : {currentElement.phone} </h6>
//                 </div>
//               </div>
//             );
//           })}

//           <hr />

//           {/* ..................table......... */}
//           <div>
//             <Table striped bordered hover>
//               <thead>
//                 <tr>
//                   <th colSpan={4}>Assesment History</th>
//                 </tr>

//                 <tr>
//                   <th>No.</th>
//                   <th>Assesment Name</th>
//                   <th>Attempted</th>
//                   <th>Status</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 <tr>
//                   <td>1</td>
//                   <td>react</td>
//                   <td>....</td>
//                   <td>...</td>
//                 </tr>
//                 <tr>
//                   <td>2</td>
//                   <td>angular</td>
//                   <td>.........</td>
//                   <td>.....</td>
//                 </tr>
//                 <tr>
//                   <td>3</td>
//                   <td>DBMS</td>
//                   <td>.....</td>
//                   <td>....</td>
//                 </tr>
//               </tbody>
//             </Table>
//           </div>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleClose}>
//             Close
//           </Button>
//         </Modal.Footer>
//       </Modal>

//       {/* ......................Modal Add User..... */}
//       <Modal
//         show={showAdd}
//         onHide={AddhandleClose}
//         animation={false}
//         style={{ justifyContent: "center", alignItems: "center" }}
//       >
//         <Modal.Header closeButton>
//           <Modal.Title>Add User</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <h6>Enter Name :</h6>
//           <input className="input" type="number" placeholder="Enter Name" />
//           <h6>Enter Location :</h6>
//           <input className="input" type="number" placeholder="Enter Location" />
//           <h6>Enter Mobile Number :</h6>
//           <input
//             className="input"
//             type="number"
//             placeholder="Enter Mobile Number"
//           />
//           <h6>Enter Email :</h6>
//           <input className="input" type="email" placeholder="Enter Email" />
//           <h6>Enter DOB :</h6>
//           <input className="input" type="date" placeholder="Enter DOB" />
//           <h6>Enter GitHub :</h6>
//           <input
//             className="input"
//             type="email"
//             placeholder="Enter GitHub Link"
//           />
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={AddhandleClose}>
//             Close
//           </Button>
//           <Button variant="primary" onClick={AddhandleClose}>
//             Add User
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </div>
//   );
// }
// export default UserData;

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
                        <Button variant="success">Delete</Button>
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
