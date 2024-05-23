import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';
import { v4 as uuidv4 } from 'uuid'; // Generate unique IDs
import './WebcamCapture.css';
import { useNavigate, useParams } from 'react-router';
import { useDispatch } from 'react-redux';
import { setAssessmentStatus } from '../../Store/assessmentData';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';


const WebcamCapture = () => {
  const webcamRef = useRef(null); // Reference for the webcam component
  const [captureMode, setCaptureMode] = useState('face'); // Toggle between capturing face or ID
  const [capturedFace, setCapturedFace] = useState(null); // State to store captured face image
  const [capturedID, setCapturedID] = useState(null); // State to store captured ID image
  const [submitedMessage, setSubmitedMessage] = useState(""); // State to store captured ID image
  const [loader, setLoader] = useState(false)
  const [startDisplay, setStartDisplay] = useState("none")
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { assessmentid } = useParams()
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
  const handleSubmit = async () => {
    if (capturedFace && capturedID) { // Ensure both images are captured
      setLoader(true)
      const uniqueID = uuidv4(); // Generate a unique ID for this submission
      console.log("Hello");
      await fetch('https://assessmentwebsite-webcam4.onrender.com/webcam/saveImage', { // POST request to backend
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
          console.log(response);
          if (!response.ok) {
            throw new Error(`Server error: ${response.status}`); // Handle server errors
          }
          return response.json(); // Return server response
        })
        .then((data) => {
          console.log('Server response:', data); // Log successful response
          dispatch(setAssessmentStatus())
          setLoader(false)
          navigate(`/${assessmentid}/assessment`)
          setSubmitedMessage("Images Submitted Successfully! Now Start the Test")
          setStartDisplay("block")
        })
        .catch((error) => {
          console.error('Error submitting data:', error); // Handle errors
          alert("Error in submitting data")
          setLoader(false)
        });
    } else {
      console.error('Face and/or ID not captured.'); // Ensure both images are captured before submitting
    }
  };

  return (
    <div style={{ textAlign: 'center', display: 'flex', justifyContent: 'center', gap: '3rem', paddingBlock: '2rem' }}>
      {/* Display message based on capture mode */}
      <div >
        {captureMode === 'face' ? (
          <h3>Capture a clear, well-lit image of your face.</h3>
        ) : (
          <h3>Ensure your ID is clear and free of glare.</h3>
        )}

        {/* Webcam component and capture button */}
        <div className='webcam-div'>
          <Webcam ref={webcamRef} screenshotFormat="image/jpeg" />
        </div>
        <button onClick={captureImage} className='capture-btn'>
          {captureMode === 'face' ? 'Capture Face' : 'Capture ID'} {/* Label changes based on mode */}
        </button>
      </div>
      {/* Display captured images */}
      <div style={{ display: 'flex', flexDirection: 'column', marginTop: '10px', gap: '1rem' }}>
        <div className='img-container'>
          <div className='img-captured-container'>
            <h3>Face Capture</h3>
            {capturedFace && (
              <div style={{ height: '100%' }}>
                <img src={capturedFace} alt="Captured Face" width="250" height="100%" /> {/* Display captured face */}
              </div>
            )}
          </div>

          <div className='img-captured-container'>
            <h3>ID Capture</h3>
            {capturedID && (
              <div style={{ height: '100%' }}>
                <img src={capturedID} alt="Captured ID" width="250" height="100%" /> {/* Display captured ID */}
              </div>
            )}
          </div>
        </div>
        {/* Submit button */}
        <div className='submit-btn'>
          {(loader) ? (<Button variant="success" disabled>
            <Spinner
              as="span"
              animation="grow"
              size="sm"
              role="status"
              aria-hidden="true"
            />
            Saving
          </Button>) : <Button variant='success' onClick={handleSubmit}>Submit & Start</Button>}

          {/* <button onClick={handleSubmit} className="button">
            Submit & Start
          </button> */}
        </div>
        <div>

          {submitedMessage}
        </div>
      </div>

    </div>

  );
};

export default WebcamCapture;
