

// import React, { useRef, useState } from 'react';
// import Webcam from 'react-webcam';

// const WebcamCapture = () => {
//   const webcamRef = useRef(null); // Reference for the webcam
//   const [captureMode, setCaptureMode] = useState('face'); // Toggle between face and ID capture
//   const [capturedFace, setCapturedFace] = useState(null); // Store captured face image
//   const [capturedID, setCapturedID] = useState(null); // Store captured ID image

//   // Function to capture images based on the current mode
//   const captureImage = () => {
//     const screenshot = webcamRef.current.getScreenshot(); // Capture image from the webcam
//     if (screenshot) {
//       if (captureMode === 'face') {
//         setCapturedFace(screenshot); // Store captured face image
//         setCaptureMode('id'); // Switch to ID capture mode
//       } else {
//         setCapturedID(screenshot); // Store captured ID image
//       }
//     }
//   };

//   // Function to submit both images to the backend
//   const handleSubmit = () => {
//     if (capturedFace && capturedID) { // Ensure both images are captured
//       fetch('http://localhost:300/webcam/addImage', { // Endpoint for POST request
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           uniqueID: 'unique-identifier', // Use a unique identifier for the document
//           faceImage: capturedFace, // Base64-encoded face image
//           idImage: capturedID, // Base64-encoded ID image
//         }),
//       })
//         .then((response) => {
//           if (!response.ok) {
//             throw new Error(`Server error: ${response.status}`);
//           }
//           return response.json();
//         })
//         .then((data) => {
//           console.log('Server response:', data); // Log successful response
//         })
//         .catch((error) => {
//           console.error('Error submitting data:', error); // Handle fetch-related errors
//         });
//     } else {
//       console.error('Face and/or ID not captured.'); // Ensure both images are captured before submitting
//     }
//   };

//   return (
//     <div style={{ padding: '20px', textAlign: 'center' }}>
//       <Webcam ref={webcamRef} screenshotFormat="image/jpeg" /> {/* Webcam component */}
//       <button onClick={captureImage}>
//         {captureMode === 'face' ? 'Capture Face' : 'Capture ID'} {/* Capture button changes based on mode */}
//       </button>

//       {/* Display Captured Images */}
//       <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '20px' }}>
//         {capturedFace && (
//           <div>
//             <h3>Face Capture</h3>
//             <img src={capturedFace} alt="Captured Face" width="150" /> {/* Display captured face */}
//           </div>
//         )}

//         {capturedID && (
//           <div>
//             <h3>ID Capture</h3>
//             <img src={capturedID} alt="Captured ID" width="150" /> {/* Display captured ID */}
//           </div>
//         )}
//       </div>

//       {/* Submit Button */}
//       <button onClick={handleSubmit}>Submit</button> {/* Button to submit data */}
//     </div>
//   );
// };

// export default WebcamCapture;


// import React, { useRef, useState } from 'react';
// import Webcam from 'react-webcam';

// const WebcamCapture = () => {
//   const webcamRef = useRef(null); // Reference for the webcam
//   const [captureMode, setCaptureMode] = useState('face'); // Toggle between face and ID capture
//   const [capturedFace, setCapturedFace] = useState(null); // Store captured face image
//   const [capturedID, setCapturedID] = useState(null); // Store captured ID image

//   // Function to capture images from the webcam
//   const captureImage = () => {
//     const screenshot = webcamRef.current.getScreenshot(); // Capture a screenshot from the webcam
//     if (screenshot) {
//       if (captureMode === 'face') {
//         setCapturedFace(screenshot); // Store captured face
//         setCaptureMode('id'); // Switch to ID capture mode
//       } else {
//         setCapturedID(screenshot); // Store captured ID
//       }
//     }
//   };

//   // Function to submit the captured images to the backend
//   const handleSubmit = () => {
//     if (capturedFace && capturedID) { // Ensure both images are captured
//       fetch('http://localhost:3000/webcam/addImage', { // Correct POST endpoint
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           faceImage: capturedFace, // Base64-encoded face image
//           idImage: capturedID, // Base64-encoded ID image
//         }),
//       })
//         .then((response) => {
//           if (!response.ok) {
//             throw new Error(`Server error: ${response.status}`); // Handle server errors
//           }
//           return response.json();
//         })
//         .then((data) => {
//           console.log('Server response:', data); // Log successful response
//         })
//         .catch((error) => {
//           console.error('Error submitting data:', error); // Handle errors
//         });
//     } else {
//       console.error('Face and/or ID not captured.'); // Ensure both images are captured before submitting
//     }
//   };

//   return (
//     <div style={{ padding: '20px', textAlign: 'center' }}>
//       <Webcam ref={webcamRef} screenshotFormat="image/jpeg" /> {/* Webcam component */}
//       <button onClick={captureImage}>
//         {captureMode === 'face' ? 'Capture Face' : 'Capture ID'} {/* Button to capture image */}
//       </button>

//       {/* Display Captured Images */}
//       <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '20px' }}>
//         {capturedFace && (
//           <div>
//             <h3>Face Capture</h3>
//             <img src={capturedFace} alt="Captured Face" width={150} /> {/* Display captured face */}
//           </div>
//         )}

//         {capturedID && (
//           <div>
//             <h3>ID Capture</h3>
//             <img src={capturedID} alt="Captured ID" width={150} /> {/* Display captured ID */}
//           </div>
//         )}
//       </div>

//       {/* Submit Button */}
//       <button onClick={handleSubmit}>Submit</button> {/* Button to submit captured images */}
//     </div>
//   );
// };

// export default WebcamCapture; // Export the component


import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';
import { v4 as uuidv4 } from 'uuid'; // Generate unique IDs

const WebcamCapture = () => {
  const webcamRef = useRef(null); // Reference for the webcam component
  const [captureMode, setCaptureMode] = useState('face'); // Toggle between capturing face or ID
  const [capturedFace, setCapturedFace] = useState(null); // State to store captured face image
  const [capturedID, setCapturedID] = useState(null); // State to store captured ID image

  // Function to capture images based on the current mode
  const captureImage = () => {
    const screenshot = webcamRef.current.getScreenshot(); // Capture image from the webcam
    if (screenshot) {
      if (captureMode === 'face') { // If capturing face
        setCapturedFace(screenshot); // Store the face image
        setCaptureMode('id'); // Switch to ID capture mode
      } else { // If capturing ID
        setCapturedID(screenshot); // Store the ID image
        setCaptureMode('face'); // Reset to face capture mode
      }
    }
  };

  // Function to submit both captured images to the backend
  const handleSubmit = () => {
    if (capturedFace && capturedID) { // Ensure both images are captured
      const uniqueID = uuidv4(); // Generate a unique ID for this submission
      
      fetch('http://localhost:3000/webcam/saveImage', { // POST request to backend
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          uniqueID, // Unique identifier
          faceImage: capturedFace, // Base64-encoded face image
          idImage: capturedID, // Base64-encoded ID image
        }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Server error: ${response.status}`); // Handle server errors
          }
          return response.json(); // Return server response
        })
        .then((data) => {
          console.log('Server response:', data); // Log successful response
        })
        .catch((error) => {
          console.error('Error submitting data:', error); // Handle errors
        });
    } else {
      console.error('Face and/or ID not captured.'); // Ensure both images are captured before submitting
    }
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      {/* Display message based on capture mode */}
      {captureMode === 'face' ? (
        <h3>Capture a clear, well-lit image of your face.</h3>
      ) : (
        <h3>Ensure your ID is clear and free of glare.</h3>
      )}

      {/* Webcam component and capture button */}
      <Webcam ref={webcamRef} screenshotFormat="image/jpeg" />
      <button onClick={captureImage}>
        {captureMode === 'face' ? 'Capture Face' : 'Capture ID'} {/* Label changes based on mode */}
      </button>

      {/* Display captured images */}
      <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '20px' }}>
        {capturedFace && (
          <div>
            <h3>Face Capture</h3>
            <img src={capturedFace} alt="Captured Face" width="150" /> {/* Display captured face */}
          </div>
        )}
        
        {capturedID && (
          <div>
            <h3>ID Capture</h3>
            <img src={capturedID} alt="Captured ID" width="150" /> {/* Display captured ID */}
          </div>
        )}
      </div>

      {/* Submit button */}
      <button onClick={handleSubmit}>Submit</button> {/* Submit both images */}
    </div>
  );
};

export default WebcamCapture;
