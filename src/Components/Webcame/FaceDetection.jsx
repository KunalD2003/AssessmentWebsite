
import React, { useEffect, useRef, useState } from 'react';
import * as blazeface from '@tensorflow-models/blazeface';
import * as cocoSsd from '@tensorflow-models/coco-ssd';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';

const FaceDetection = () => {
  const videoRef = useRef(null);
  const [noFaceWarning, setNoFaceWarning] = useState(false);
  const [gadgetWarning, setGadgetWarning] = useState(false);
  const [multipleFacesWarning, setMultipleFacesWarning] = useState(false);
  const [warningCount, setWarningCount] = useState(0); 
  const faceTimer = useRef(null);
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const handleWarning = (message) => {

    alert(message); 

    setWarningCount((prevCount) => {
      const newCount = prevCount + 1;

      if (newCount >= 3) {
        videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
        alert("Test submitted due to multiple warnings."); 
        navigate('/assessmentid/guidlinesvoilated'); 
        return newCount; 
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
          
          const facePredictions = await faceModel.estimateFaces(videoRef.current);

          if (facePredictions.length > 1) {
            handleWarning("Multiple faces detected. Click OK to continue.");
            setMultipleFacesWarning(true); 
          } else {
            setMultipleFacesWarning(false); 
          }

          if (facePredictions.length === 0) {
            faceTimer.current = setTimeout(() => {
              handleWarning("No face detected for 10 seconds. Click OK to continue.");
              setNoFaceWarning(true);
            }, 30000); 
          } else {
            clearTimeout(faceTimer.current); 
            setNoFaceWarning(false); 
          }

          const objectPredictions = await objectModel.detect(videoRef.current);
          const gadgetClasses = ['cell phone', 'laptop', 'tablet'];
          const gadgetsFound = objectPredictions.some(prediction =>
            gadgetClasses.includes(prediction.class)
          );

          if (gadgetsFound) {
            handleWarning("Electronic gadget detected. Click OK to continue.");
            setGadgetWarning(true); 
          } else {
            setGadgetWarning(false); 
          }

          requestAnimationFrame(checkForFacesAndObjects); 
        }
      };
      checkForFacesAndObjects(); 
    };
    
    initializeCamera(); 
    detectFacesAndObjects(); 
    return () => {
      if ((videoRef.current && videoRef.current.srcObject)) {
        videoRef.current.srcObject.getTracks().forEach((track) => track.stop()); 
      }
    };
  }, []); 
  return (
    <div>
      <video ref={videoRef} autoPlay playsInline style={{ width: '100%' }} /> 
    </div>
  );
};

export default FaceDetection;