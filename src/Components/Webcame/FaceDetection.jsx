
import React, { useEffect, useRef, useState } from 'react';
import * as blazeface from '@tensorflow-models/blazeface';
import * as cocoSsd from '@tensorflow-models/coco-ssd';

const FaceDetection = () => {
  const videoRef = useRef(null);
  const [noFaceWarning, setNoFaceWarning] = useState(false);
  const [gadgetWarning, setGadgetWarning] = useState(false);
  const [multipleFacesWarning, setMultipleFacesWarning] = useState(false);
  const [warningCount, setWarningCount] = useState(0); // Track warning counts
  const faceTimer = useRef(null);

  const handleWarning = (message) => {
 

    alert(message); // Display an alert with the warning message

    setWarningCount((prevCount) => {
      const newCount = prevCount + 1;

      if (newCount >= 3) {
        alert("Test submitted due to multiple warnings."); // Show final alert
        navigate('/SampleHome.jsx'); // Redirect to the results page
        return newCount; // Stop further processing after redirecting
      }

      return newCount; 
    });
  };

  useEffect(() => {
    const initializeCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error("Error accessing camera:", error);
      }
    };

    const detectFacesAndObjects = async () => {
      const faceModel = await blazeface.load();
      const objectModel = await cocoSsd.load();

      const checkForFacesAndObjects = async () => {
        if (videoRef.current) {
          // Detect faces
          const facePredictions = await faceModel.estimateFaces(videoRef.current);

          if (facePredictions.length > 1) {
            handleWarning("Multiple faces detected. Click OK to continue.");
            setMultipleFacesWarning(true); // Multiple faces detected
          } else {
            setMultipleFacesWarning(false); // Clear the warning
          }

          if (facePredictions.length === 0) {
            // Start a 10-second timer to trigger the no-face warning
            faceTimer.current = setTimeout(() => {
              handleWarning("No face detected for 10 seconds. Click OK to continue.");
              setNoFaceWarning(true);
            }, 10000); // 10 seconds
          } else {
            clearTimeout(faceTimer.current); // Clear the no-face timer
            setNoFaceWarning(false); // Reset warning
          }

          // Detect electronic gadgets
          const objectPredictions = await objectModel.detect(videoRef.current);
          const gadgetClasses = ['cell phone', 'laptop', 'tablet'];
          const gadgetsFound = objectPredictions.some(prediction =>
            gadgetClasses.includes(prediction.class)
          );

          if (gadgetsFound) {
            handleWarning("Electronic gadget detected. Click OK to continue.");
            setGadgetWarning(true); // Gadget detected
          } else {
            setGadgetWarning(false); // Reset warning
          }

          requestAnimationFrame(checkForFacesAndObjects); // Continue checking
        }
      };

      checkForFacesAndObjects(); // Start checking for faces and gadgets
    };

    initializeCamera(); // Start the camera
    detectFacesAndObjects(); // Start face and object detection

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach((track) => track.stop()); // Stop the camera
      }
    };
  }, []); // Run only once when component mounts

  return (
    <div>
      {noFaceWarning && (
        <div style={{ color: 'red', fontWeight: 'bold' }}>
          Warning: No face detected for 10 seconds!
        </div>
      )}
      {gadgetWarning && (
        <div style={{ color: 'orange', fontWeight: 'bold' }}>
          Warning: Electronic gadget detected!
        </div>
      )}
      {multipleFacesWarning && (
        <div style={{ color: 'yellow', fontWeight: 'bold' }}>
          Warning: Multiple faces detected!
        </div>
      )}
      <video ref={videoRef} autoPlay playsInline style={{ width: '100%' }} /> {/* Display the video */}
    </div>
  );
};

export default FaceDetection;








