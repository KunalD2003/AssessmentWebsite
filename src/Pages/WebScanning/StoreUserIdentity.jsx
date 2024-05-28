import React, { useRef } from 'react';
import Webcam from 'react-webcam'; // Assuming you're using 'react-webcam'

const StoreUserIdentity = () => {
  const webcamRef = useRef(null); // Reference for the webcam

  const captureAndSendImage = () => {
    const screenshot = webcamRef.current.getScreenshot(); // Capture the image
    console.log('Captured image:', screenshot); // Validate the captured image

    if (screenshot) {
      fetch(`${import.meta.env.VITE_API_PRIYANKA_URL}/webcam/addImage`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ imageBase64: screenshot, uniqueID: '12345' }), // Include unique ID
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Server error: ${response.status}`); // Handle server errors
          }
          return response.json();
        })
        .then((data) => {
          console.log('Server response:', data); // Validate the response
        })
        .catch((error) => {
          console.error('Error sending image:', error); // Handle errors
        });
    }
  };

  return (
    <div>
      <Webcam ref={webcamRef} screenshotFormat="image/jpeg" />
      <button onClick={captureAndSendImage}>Capture and Send Image</button> {/* Button to send image */}
    </div>
  );
};

export default StoreUserIdentity;
