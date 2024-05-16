// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "./Hero.css";
// import { Button, Modal, Table } from "react-bootstrap";

// function Hero() {
//   const [resultShow, setResultShow] = useState(false);
//   const [resultHistory, setResultHistory] = useState([]);
//   const [userNames, setUserNames] = useState({});

//   const handleResultClose = () => setResultShow(false);

//   const handleResultShow = async (assessmentId) => {
//     setResultShow(true);
//     await fetchResultHistory(assessmentId);
//   };

//   const [assessmentData, setAssessmentData] = useState([]);
//   const [show, setShow] = useState(false);
//   const [formData, setFormData] = useState({
//     _id: "",
//     AssessmentTitle: "",
//     AssessmentDate: "",
//     AssessmentStartTime: "",
//     AssessmentEndTime: "",
//     AssessmentDuration: "",
//   });

//   const handleClose = () => setShow(false);
//   const handleShow = () => setShow(true);

//   const fetchData = async () => {
//     try {
//       const response = await axios.get("https://assessmentwebsite-6.onrender.com/api/assessments");
//       setAssessmentData(response.data);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };

//   const fetchResultHistory = async (assessmentId) => {
//     try {
//       const response = await axios.get("https://assessmentwebsite-4-3u7s.onrender.com/archievedexamresult");
//       setResultHistory(response.data.filter((result) => result.assessmentid === assessmentId));
//       const userIds = response.data.map((result) => result.userid);
//       const userNamesData = await fetchUserNames(userIds);
//       setUserNames(userNamesData);
//     } catch (error) {
//       console.error("Error fetching exam history:", error);
//     }
//   };

//   const fetchUserNames = async (userIds) => {
//     try {
//       const response = await axios.get("https://assessmentwebsite-6.onrender.com/api/users", {
//         params: {
//           userIds: userIds.join(","),
//         },
//       });
//       const userNameMap = {};
//       response.data.forEach((user) => {
//         userNameMap[user.userId] = user.name;
//       });
//       return userNameMap;
//     } catch (error) {
//       console.error("Error fetching user names:", error);
//       return {};
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`https://assessmentwebsite-6.onrender.com/api/assessments/${id}`);
//       alert("Assessment Deleted");
//       fetchData();
//     } catch (error) {
//       console.error("Error deleting assessment:", error);
//       alert("Assessment not Deleted");
//     }
//   };

//   const handleUpdate = async () => {
//     try {
//       await axios.put(`https://assessmentwebsite-6.onrender.com/api/assessments/${formData._id}`, formData);
//       alert("Assessment Updated");
//       handleClose();
//       fetchData();
//     } catch (error) {
//       console.error("Error updating assessment:", error);
//       alert("Assessment not Updated");
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   return (
//     <div className="herosection">
//       {assessmentData.map((index) => (
//         <div className="card user-dashboard-card" key={index._id}>
//           <div
//             className="assessment-role-title"
//             style={{ justifyContent: "center", alignItems: "center" }}
//           >
//             <h2 style={{ textAlign: "center" }}>{index.AssessmentTitle}</h2>
//           </div>
//           <div className="card-body assessment-start-card-body">
//             <div className="assessment-details">
//               <div>
//                 <i className="bx bx-calendar assessment-details-icon"></i>
//                 <p>Date:</p>
//               </div>
//               <p>
//                 {index.AssessmentDate}
//                 <span className="start-assessment-time"></span>
//               </p>
//             </div>
//             <div className="assessment-details">
//               <div>
//                 <i className="bx bx-stopwatch assessment-details-icon"></i>
//                 <p>Exam Start:</p>
//               </div>
//               <p>{index.AssessmentStartTime}</p>
//             </div>

//             <div className="assessment-details">
//               <div>
//                 <i className="bx bx-calendar assessment-details-icon"></i>
//                 <p>Exam End:</p>
//               </div>
//               <p>
//                 {index.AssessmentEndTime}
//                 <span className="start-assessment-time"></span>
//               </p>
//             </div>
//             <div className="start-assesment-btn">
//               <button type="button" className="btn btn-info" onClick={() => handleResultShow(index._id)}>
//                 View Results
//               </button>
//               <button
//                 type="button"
//                 className="btn btn-primary"
//                 onClick={() => {
//                   setFormData({
//                     _id: index._id,
//                     AssessmentTitle: index.AssessmentTitle,
//                     AssessmentDate: index.AssessmentDate,
//                     AssessmentStartTime: index.AssessmentStartTime,
//                     AssessmentEndTime: index.AssessmentEndTime,
//                     AssessmentDuration: index.AssessmentDuration,
//                   });
//                   handleShow();
//                 }}
//               >
//                 Edit
//               </button>
//               <button
//                 type="button"
//                 className="btn btn-danger"
//                 onClick={() => handleDelete(index._id)}
//               >
//                 Delete
//               </button>
//             </div>
//           </div>
//         </div>
//       ))}

//       <Modal show={show} onHide={handleClose}>
//         <form>
//           <h3 style={{ marginTop: "2%", textAlign: "center", fontWeight: 700 }}>
//             UPDATE EXAM
//           </h3>
//           <div className="modalinputContainer">
//             <h6 style={{ marginTop: "3%" }}>Assessment Title:</h6>
//             <input
//               type="text"
//               name="AssessmentTitle"
//               value={formData.AssessmentTitle}
//               onChange={handleChange}
//               placeholder="Assessment Title"
//               style={{
//                 alignSelf: "center",
//                 width: "98%",
//                 borderRadius: 8,
//                 marginRight: "1%",
//                 marginBottom: "4%",
//               }}
//             />
//           </div>
//           <div className="modalinputContainer">
//             <h6>Assessment Start Date:</h6>
//             <input
//               type="date"
//               name="AssessmentDate"
//               value={formData.AssessmentDate}
//               onChange={handleChange}
//               style={{
//                 alignSelf: "center",
//                 width: "98%",
//                 borderRadius: 8,
//                 marginRight: "1%",
//               }}
//             />
//           </div>
//           <br />
//           <div className="modalinputContainer">
//             <h6>Assessment Start Time:</h6>
//             <input
//               type="time"
//               name="AssessmentStartTime"
//               value={formData.AssessmentStartTime}
//               onChange={handleChange}
//               style={{
//                 alignSelf: "center",
//                 width: "98%",
//                 borderRadius: 8,
//                 marginRight: "1%",
//               }}
//             />
//           </div>
//           <br />
//           <div className="modalinputContainer">
//             <h6>Assessment End Time:</h6>
//             <input
//               type="time"
//               name="AssessmentEndTime"
//               value={formData.AssessmentEndTime}
//               onChange={handleChange}
//               style={{
//                 alignSelf: "center",
//                 width: "98%",
//                 borderRadius: 8,
//                 marginRight: "1%",
//               }}
//             />
//           </div>
//           <br />
//           <div className="modalinputContainer">
//             <h6>Assessment duration:</h6>
//             <input
//               type="text"
//               placeholder="Assessment duration"
//               name="AssessmentDuration"
//               value={formData.AssessmentDuration}
//               onChange={handleChange}
//               style={{
//                 alignSelf: "center",
//                 width: "98%",
//                 borderRadius: 8,
//                 marginLeft: "1%",
//                 marginBottom: "2%",
//               }}
//             />
//           </div>
//         </form>

//         <Button
//           variant="primary"
//           onClick={handleUpdate}
//           style={{ width: "50%", marginBottom: "2%", marginLeft: "25%" }}
//         >
//           Update
//         </Button>

//         <Button
//           variant="secondary"
//           onClick={handleClose}
//           style={{ width: "50%", marginBottom: "2%", marginLeft: "25%" }}
//         >
//           Close
//         </Button>
//       </Modal>

//       {/* Modal for results */}
//       <Modal show={resultShow} onHide={handleResultClose}>
//         <Modal.Header closeButton>
//           <Modal.Title>Users Result</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Table striped bordered hover>
//             <thead>
//               <tr>
//                 <th>User Name</th>
//                 <th>Date</th>
//                 <th>Score</th>
//               </tr>
//             </thead>
//             <tbody>
//               {resultHistory.map((result) => (
//                 <tr key={result._id}>
//                   <td>{userNames[result.userid]}</td>
//                   <td>{result.date}</td>
//                   <td>{result.score}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </Table>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleResultClose}>
//             Close
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </div>
//   );
// }

// export default Hero;


import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Hero.css";
import { Button, Modal, Table } from "react-bootstrap";

function Hero() {
  // State variables for showing/hiding result modal, storing result history, user names, assessment data, and modal visibility
  const [resultShow, setResultShow] = useState(false);
  const [resultHistory, setResultHistory] = useState([]);
  const [userNames, setUserNames] = useState({});
  const [assessmentData, setAssessmentData] = useState([]);
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({
    _id: "",
    AssessmentTitle: "",
    AssessmentDate: "",
    AssessmentStartTime: "",
    AssessmentEndTime: "",
    AssessmentDuration: "",
  });

  // Function to close the result modal
  const handleResultClose = () => setResultShow(false);

  // Function to open the result modal and fetch result history for a specific assessment
  const handleResultShow = async (assessmentId) => {
    setResultShow(true);
    await fetchResultHistory(assessmentId);
  };

  // Function to close the edit modal
  const handleClose = () => setShow(false);

  // Function to open the edit modal
  const handleShow = () => setShow(true);

  // Function to fetch assessment data
  const fetchData = async () => {
    try {
      const response = await axios.get("https://assessmentwebsite-6.onrender.com/api/assessments");
      setAssessmentData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Function to fetch result history for a specific assessment
  const fetchResultHistory = async (assessmentId) => {
    try {
      const response = await axios.get("https://assessmentwebsite-4-3u7s.onrender.com/archievedexamresult");
      setResultHistory(response.data.filter((result) => result.assessmentid === assessmentId));
      const userIds = response.data.map((result) => result.userid);
      const userNamesData = await fetchUserNames(userIds);
      setUserNames(userNamesData);
    } catch (error) {
      console.error("Error fetching exam history:", error);
    }
  };

  // Function to fetch user names based on user IDs
  const fetchUserNames = async (userIds) => {
    try {
      const response = await axios.get("https://assessmentwebsite-6.onrender.com/api/users", {
        params: {
          userIds: userIds.join(","),
        },
      });
      const userNameMap = {};
      response.data.forEach((user) => {
        userNameMap[user.userId] = user.name;
      });
      return userNameMap;
    } catch (error) {
      console.error("Error fetching user names:", error);
      return {};
    }
  };

  // Function to handle assessment deletion
  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://assessmentwebsite-6.onrender.com/api/assessments/${id}`);
      alert("Assessment Deleted");
      fetchData();
    } catch (error) {
      console.error("Error deleting assessment:", error);
      alert("Assessment not Deleted");
    }
  };

  // Function to handle assessment update
  const handleUpdate = async () => {
    try {
      await axios.put(`https://assessmentwebsite-6.onrender.com/api/assessments/${formData._id}`, formData);
      alert("Assessment Updated");
      handleClose();
      fetchData();
    } catch (error) {
      console.error("Error updating assessment:", error);
      alert("Assessment not Updated");
    }
  };

  // Function to handle changes in form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // useEffect hook to fetch assessment data on component mount
  useEffect(() => {
    fetchData();
  }, []);

  // JSX for rendering assessments, edit modal, and result modal
  return (
    <div className="herosection">
      {/* Rendering assessment cards */}
      {assessmentData.map((index) => (
        <div className="card user-dashboard-card" key={index._id}>
          <div className="assessment-role-title" style={{ justifyContent: "center", alignItems: "center" }}>
            <h2 style={{ textAlign: "center" }}>{index.AssessmentTitle}</h2>
          </div>
          <div className="card-body assessment-start-card-body">
            {/* Displaying assessment details */}
            <div className="assessment-details">
              <div>
                <i className="bx bx-calendar assessment-details-icon"></i>
                <p>Date:</p>
              </div>
              <p>
                {index.AssessmentDate}
                <span className="start-assessment-time"></span>
              </p>
            </div>
            <div className="assessment-details">
              <div>
                <i className="bx bx-stopwatch assessment-details-icon"></i>
                <p>Exam Start:</p>
              </div>
              <p>{index.AssessmentStartTime}</p>
            </div>
            <div className="assessment-details">
              <div>
                <i className="bx bx-calendar assessment-details-icon"></i>
                <p>Exam End:</p>
              </div>
              <p>
                {index.AssessmentEndTime}
                <span className="start-assessment-time"></span>
              </p>
            </div>
            {/* Buttons to view results, edit, and delete assessment */}
            <div className="start-assesment-btn">
              <button type="button" className="btn btn-info" onClick={() => handleResultShow(index._id)}>
                View Results
              </button>
              <button type="button" className="btn btn-primary" onClick={() => {
                setFormData({
                  _id: index._id,
                  AssessmentTitle: index.AssessmentTitle,
                  AssessmentDate: index.AssessmentDate,
                  AssessmentStartTime: index.AssessmentStartTime,
                  AssessmentEndTime: index.AssessmentEndTime,
                  AssessmentDuration: index.AssessmentDuration,
                });
                handleShow();
              }}>
                Edit
              </button>
              <button type="button" className="btn btn-danger" onClick={() => handleDelete(index._id)}>
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* Modal for editing assessment */}
      <Modal show={show} onHide={handleClose}>
        <form>
          <h3 style={{ marginTop: "2%", textAlign: "center", fontWeight: 700 }}>
            UPDATE EXAM
          </h3>
          {/* Input fields for updating assessment details */}
          <div className="modalinputContainer">
            <h6 style={{ marginTop: "3%" }}>Assessment Title:</h6>
            <input
              type="text"
              name="AssessmentTitle"
              value={formData.AssessmentTitle}
              onChange={handleChange}
              placeholder="Assessment Title"
              style={{
                alignSelf: "center",
                width: "98%",
                borderRadius: 8,
                marginRight: "1%",
                marginBottom: "4%",
              }}
            />
          </div>
          <div className="modalinputContainer">
            <h6>Assessment Start Date:</h6>
            <input
              type="date"
              name="AssessmentDate"
              value={formData.AssessmentDate}
              onChange={handleChange}
              style={{
                alignSelf: "center",
                width: "98%",
                borderRadius: 8,
                marginRight: "1%",
              }}
            />
          </div>
          <br />
          <div className="modalinputContainer">
            <h6>Assessment Start Time:</h6>
            <input
              type="time"
              name="AssessmentStartTime"
              value={formData.AssessmentStartTime}
              onChange={handleChange}
              style={{
                alignSelf: "center",
                width: "98%",
                borderRadius: 8,
                marginRight: "1%",
              }}
            />
          </div>
          <br />
          <div className="modalinputContainer">
            <h6>Assessment End Time:</h6>
            <input
              type="time"
              name="AssessmentEndTime"
              value={formData.AssessmentEndTime}
              onChange={handleChange}
              style={{
                alignSelf: "center",
                width: "98%",
                borderRadius: 8,
                marginRight: "1%",
              }}
            />
          </div>
          <br />
          <div className="modalinputContainer">
            <h6>Assessment duration:</h6>
            <input
              type="text"
              placeholder="Assessment duration"
              name="AssessmentDuration"
              value={formData.AssessmentDuration}
              onChange={handleChange}
              style={{
                alignSelf: "center",
                width: "98%",
                borderRadius: 8,
                marginLeft: "1%",
                marginBottom: "2%",
              }}
            />
          </div>
        </form>
        {/* Buttons to update or close the modal */}
        <Button
          variant="primary"
          onClick={handleUpdate}
          style={{ width: "50%", marginBottom: "2%", marginLeft: "25%" }}
        >
          Update
        </Button>
        <Button
          variant="secondary"
          onClick={handleClose}
          style={{ width: "50%", marginBottom: "2%", marginLeft: "25%" }}
        >
          Close
        </Button>
      </Modal>

      {/* Modal for displaying assessment results */}
      <Modal show={resultShow} onHide={handleResultClose}>
        <Modal.Header closeButton>
          <Modal.Title>Users Result</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>User Name</th>
                <th>Date</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>
              {/* Rendering result history */}
              {resultHistory.map((result) => (
                <tr key={result._id}>
                  <td>{userNames[result.userid]}</td>
                  <td>{result.date}</td>
                  <td>{result.score}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Modal.Body>
        {/* Button to close the result modal */}
        <Modal.Footer>
          <Button variant="secondary" onClick={handleResultClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Hero;
