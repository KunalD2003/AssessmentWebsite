// import React, { useEffect, useState } from 'react';

// const WebStoring = () => {
//   const [images, setImages] = useState([]);

//   useEffect(() => {
//     fetch('http://localhost:3002/webcam/getImages', {
//       method: 'GET',
//     })
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error(`Error fetching images: ${response.status}`);
//         }
//         return response.json();
//       })
//       .then((data) => {
//         setImages(data);
//       })
//       .catch((error) => {
//         console.error('Error fetching images:', error);
//       });
//   }, []); // Fetch once on component mount

//   return (
//     <div>
//       <h2>Stored Images</h2>
//       {images.length === 0 ? (
//         <p>No images found.</p>
//       ) : (
//         <div>
//           {images.map((image, index) => (
//             <div key={index}>
//               <img src={image.imageBase64} alt={`Image ${index}`} width="150" />
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default WebStoring;


// import React, { useEffect, useState } from 'react';

// const WebStoring = () => {
//   const [images, setImages] = useState([]);

//   useEffect(() => {
//     fetch('http://localhost:3002/webcam/getImages', {
//       method: 'GET',
//     })
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error(`Error fetching images: ${response.status}`);
//         }
//         return response.json();
//       })
//       .then((data) => {
//         setImages(data); // Keep fetching the images but do not render them
//       })
//       .catch((error) => {
//         console.error('Error fetching images:', error);
//       });
//   }, []); // Fetch once on component mount

//   return (
//     <div>
//       <h2>Stored Images</h2> {/* Heading is optional */}
//       {/* We do not render the fetched images */}
//     </div>
//   );
// };

// export default WebStoring;


// import React from 'react';
// import Webcam from 'react-webcam';

// const StoreUserIdentity = () => {
//   const webcamRef = useRef(null);

//   const captureAndStoreIdentity = () => {
//     const screenshot = webcamRef.current.getScreenshot(); // Capture face image

//     if (screenshot) {
//       const uniqueID = 'unique-id-base64'; // This would be your unique ID (like Aadhar card)

//       // Send face image and unique ID to the backend
//       fetch('http://localhost:3002/webcam/storeUserIdentity', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ faceImage: screenshot, uniqueID }), // Send both data
//       })
//         .then((response) => {
//           if (!response.ok) {
//             throw new Error(`Server error: ${response.status}`);
//           }
//           return response.json();
//         })
//         .then((data) => {
//           console.log('Server response:', data);
//         })
//         .catch((error) => {
//           console.error('Error storing user identity:', error);
//         });
//     }
//   };

//   return (
//     <div>
//       <Webcam ref={webcamRef} screenshotFormat="image/jpeg" /> {/* Webcam component */}
//       <button onClick={captureAndStoreIdentity}>Store User Identity</button> {/* Button to store identity */}
//     </div>
//   );
// };

// export default StoreUserIdentity;



// import React, { useRef } from 'react'; // Ensure 'useRef' is imported
// import Webcam from 'react-webcam'; // Assuming you're using 'react-webcam'

// const StoreUserIdentity = () => {
//   const webcamRef = useRef(null); // Reference for the webcam component

//   const captureImage = () => {
//     const screenshot = webcamRef.current.getScreenshot(); // Capture image

//     if (screenshot) {
//       // Logic to handle captured image (like sending to the server)
//       console.log('Captured image:', screenshot);
//     }
//   };

//   return (
//     <div>
//       <Webcam ref={webcamRef} screenshotFormat="image/jpeg" />
//       <button onClick={captureImage}>Capture Image</button>
//     </div>
//   );
// };

// export default StoreUserIdentity;

// import React, { useRef } from 'react';
// import Webcam from 'react-webcam'; // Assuming you're using 'react-webcam'

// const StoreUserIdentity = () => {
//   const webcamRef = useRef(null); // Reference for the webcam

//   // Function to capture and send the image
//   const captureAndSendImage = () => {
//     const screenshot = webcamRef.current.getScreenshot(); // Capture the image
//     if (screenshot) {
//       // Send the captured image to the backend
//       fetch('http://localhost:3002/webcam/addImage', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ imageBase64: screenshot }), // Send the captured image
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
//           console.error('Error sending image:', error); // Handle errors
//         });
//     }
//   };

//   return (
//     <div>
//       <Webcam ref={webcamRef} screenshotFormat="image/jpeg" />
//       <button onClick={captureAndSendImage}>Capture and Send Image</button> {/* Button to trigger the function */}
//     </div>
//   );
// };

// export default StoreUserIdentity;



import React, { useRef } from 'react';
import Webcam from 'react-webcam'; // Assuming you're using 'react-webcam'

const StoreUserIdentity = () => {
  const webcamRef = useRef(null); // Reference for the webcam

  const captureAndSendImage = () => {
    const screenshot = webcamRef.current.getScreenshot(); // Capture the image
    console.log('Captured image:', screenshot); // Validate the captured image

    if (screenshot) {
      fetch('http://localhost:3000/webcam/addImage', {
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
