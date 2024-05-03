import React, { useEffect, useRef, useState } from 'react';
import * as blazeface from '@tensorflow-models/blazeface'; // Face detection model
import * as cocoSsd from '@tensorflow-models/coco-ssd'; // Object detection model

const FaceDetection = () => {
  const videoRef = useRef(null);
  const [noFaceWarning, setNoFaceWarning] = useState(false);
  const [gadgetWarning, setGadgetWarning] = useState(false);
  const [multipleFacesWarning, setMultipleFacesWarning] = useState(false); // New state for multiple faces
  const faceTimer = useRef(null);

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
            setMultipleFacesWarning(true); // Show warning if more than one face
          } else {
            setMultipleFacesWarning(false); // Clear the warning if one or zero faces
          }

          if (facePredictions.length === 0) {
            // Start a 10-second timer to trigger the no-face warning
            faceTimer.current = setTimeout(() => {
              setNoFaceWarning(true);
            }, 10000); // 10 seconds
          } else {
            setNoFaceWarning(false);
            clearTimeout(faceTimer.current); // Clear the no-face timer
          }

          // Detect electronic gadgets
          const objectPredictions = await objectModel.detect(videoRef.current);
          const gadgetClasses = ['cell phone', 'laptop', 'tablet'];
          const gadgetsFound = objectPredictions.some(prediction =>
            gadgetClasses.includes(prediction.class)
          );
          setGadgetWarning(gadgetsFound);

          requestAnimationFrame(checkForFacesAndObjects); // Continue checking
        }
      };

      checkForFacesAndObjects(); // Start checking for faces and gadgets
    };

    initializeCamera(); // Start the camera
    detectFacesAndObjects(); // Start face and object detection

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach(track => track.stop());
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


// import React, { useEffect, useRef, useState } from 'react';
// import * as blazeface from '@tensorflow-models/blazeface';
// import * as cocoSsd from '@tensorflow-models/coco-ssd';
// import Modal from './Model';

// const FaceDetection = () => {
//   const videoRef = useRef(null);
//   const [noFaceWarning, setNoFaceWarning] = useState(false);
//   const [gadgetWarning, setGadgetWarning] = useState(false);
//   const [multipleFacesWarning, setMultipleFacesWarning] = useState(false);
//   const [warningCount, setWarningCount] = useState(0); // Track the warning count
//   const [isModalOpen, setIsModalOpen] = useState(false); // Control modal visibility
//   const faceTimer = useRef(null);

//   const closeWarningModal = () => {
//     setIsModalOpen(false); // Close the modal
//   };
//   console.log("no face waarning",noFaceWarning);

//   useEffect(() => {
//     if (noFaceWarning || gadgetWarning || multipleFacesWarning) {
//       setWarningCount(prevCount => prevCount + 1);
//       if (warningCount >= 2) {
//         // After 3 warnings, submit the test or perform desired action
//         alert("Test submitted due to multiple warnings.");
//         return; // Exit early
//       }
//       setIsModalOpen(true); // Open the modal
//     }

//     const initializeCamera = async () => {
//       try {
//         const stream = await navigator.mediaDevices.getUserMedia({ video: true });
//         if (videoRef.current) {
//           videoRef.current.srcObject = stream;
//         }
//       } catch (error) {
//         console.error("Error accessing camera:", error);
//       }
//     };

//     const detectFacesAndObjects = async () => {
//       const faceModel = await blazeface.load();
//       const objectModel = await cocoSsd.load();

//       const checkForFacesAndObjects = async () => {
//         if (videoRef.current) {
//           // Detect faces
//           const facePredictions = await faceModel.estimateFaces(videoRef.current);

//           if (facePredictions.length > 1) {
//             setMultipleFacesWarning(true);
//           } else {
//             setMultipleFacesWarning(false);
//           }

//           if (facePredictions.length === 0) {
//             faceTimer.current = setTimeout(() => {
//               setNoFaceWarning(true);
//             }, 10000); // 10 seconds
//           } else {
//             setNoFaceWarning(false);
//             clearTimeout(faceTimer.current);
//           }

//           // Detect gadgets
//           const objectPredictions = await objectModel.detect(videoRef.current);
//           const gadgetClasses = ['cell phone', 'laptop', 'tablet'];
//           const gadgetsFound = objectPredictions.some(prediction =>
//             gadgetClasses.includes(prediction.class)
//           );
//           setGadgetWarning(gadgetsFound);

//           requestAnimationFrame(checkForFacesAndObjects); // Continue checking
//         }
//       };

//       checkForFacesAndObjects();
//     };

//     initializeCamera();
//     detectFacesAndObjects(); // Start detection

//     return () => {
//       if (videoRef.current && videoRef.current.srcObject) {
//         videoRef.current.srcObject.getTracks().forEach(track => track.stop());
//       }
//     };
//   }, [warningCount]); // Re-run if the warning count changes

//   return (
//     <div>
//       {/* {noFaceWarning && (
//         <div style={{ color: 'red', fontWeight: 'bold' }}>
        
//           Warning: No face detected for 10 seconds!
//         </div>
//       )}
//       {gadgetWarning && (
//         <div style={{ color: 'orange', fontWeight: 'bold' }}>
//           Warning: Electronic gadget detected!
//         </div>
//       )}
//       {multipleFacesWarning && (
//         <div style={{ color: 'yellow', fontWeight: 'bold' }}>
//           Warning: Multiple faces detected!
//         </div>
//       )} */}
//       <video ref={videoRef} autoPlay playsInline style={{ width: '100%' }} /> {/* Display the video */}

//       <Modal
//         noFaceWarning = {noFaceWarning}
//         isOpen={isModalOpen}
//         onClose={closeWarningModal} // Close modal on click
//       />
//     </div>
//   );
// };

// export default FaceDetection;
