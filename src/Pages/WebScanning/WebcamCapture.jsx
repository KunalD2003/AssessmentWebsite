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
  const webcamRef = useRef(null); 
  const [captureMode, setCaptureMode] = useState('face'); 
  const [capturedFace, setCapturedFace] = useState(null); 
  const [capturedID, setCapturedID] = useState(null);
  const [submitedMessage, setSubmitedMessage] = useState(""); 
  const [loader, setLoader] = useState(false)
  const [startDisplay, setStartDisplay] = useState("none")
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { assessmentid } = useParams()
  const captureImage = () => {
    const screenshot = webcamRef.current.getScreenshot();
    if (screenshot) {
      if (captureMode === 'face') { 
        setCapturedFace(screenshot); 
        setCaptureMode('id'); 
      } else {
        setCapturedID(screenshot); 
        setCaptureMode('face'); 
      }
    }
  };

  const handleSubmit = async () => {
    if (capturedFace && capturedID) { 
      setLoader(true)
      const uniqueID = uuidv4(); 
      console.log("Query Started");
      await fetch(`${import.meta.env.VITE_API_PRIYANKA_URL}/webcam/saveImage`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          uniqueID,
          faceImage: capturedFace,
          idImage: capturedID,
        }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Server error: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          dispatch(setAssessmentStatus())
          setLoader(false)
          navigate(`/${assessmentid}/assessment`)
          setSubmitedMessage("Images Submitted Successfully! Now Start the Test")
          setStartDisplay("block")
        })
        .catch((error) => {
          console.error('Error submitting data:', error); 
          alert("Error in submitting data")
          setLoader(false)
        });
    } else {
      console.error('Face and/or ID not captured.'); 
    }
  };

  return (
    <div style={{ textAlign: 'center', display: 'flex', justifyContent: 'center', gap: '3rem', paddingBlock: '2rem' }}>

      <div >
        {captureMode === 'face' ? (
          <h3>Capture a clear, well-lit image of your face.</h3>
        ) : (
          <h3>Ensure your ID is clear and free of glare.</h3>
        )}

        <div className='webcam-div'>
          <Webcam ref={webcamRef} screenshotFormat="image/jpeg" />
        </div>
        <button onClick={captureImage} className='capture-btn'>
          {captureMode === 'face' ? 'Capture Face' : 'Capture ID'} 
        </button>
      </div>
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
                <img src={capturedID} alt="Captured ID" width="250" height="100%" /> 
              </div>
            )}
          </div>
        </div>
        <div className='submit-btn'>
          {(loader) ? (<Button variant="success" disabled>
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
              style={{marginRight: "0.5rem"}}
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
