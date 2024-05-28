import React, { useRef } from 'react';
import Webcam from 'react-webcam'; 

const StoreUserIdentity = () => {
  const webcamRef = useRef(null); 

  const captureAndSendImage = () => {
    const screenshot = webcamRef.current.getScreenshot(); 
    console.log('Captured image:', screenshot);

    if (screenshot) {
      fetch(`${import.meta.env.VITE_API_PRIYANKA_URL}/webcam/addImage`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ imageBase64: screenshot, uniqueID: '12345' }), 
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Server error: ${response.status}`); 
          }
          return response.json();
        })
        .then((data) => {
          console.log('Server response:', data); 
        })
        .catch((error) => {
          console.error('Error sending image:', error); 
        });
    }
  };

  return (
    <div>
      <Webcam ref={webcamRef} screenshotFormat="image/jpeg" />
      <button onClick={captureAndSendImage}>Capture and Send Image</button> 
    </div>
  );
};

export default StoreUserIdentity;
