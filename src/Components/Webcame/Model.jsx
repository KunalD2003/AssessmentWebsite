import React,{useState} from 'react';
import './Model.css';

const Modal = ({ noFaceWarning, isOpen, onClose }) => {
    const [warning, setWarning] = useState(false);
  
  if (!isOpen) {
    return null; // If not open, don't render the modal
  }
  console.log(noFaceWarning);

  return (
    <div className="modal-overlay"> {/* Dark background */}
      <div className="modal-content"> {/* Centered content */}
        <h2>Warning</h2>
        {noFaceWarning && (
        <div style={{ color: 'red', fontWeight: 'bold' }}>
        
          Warning: No face detected for 10 seconds!
        </div>
      )}
      {/* {gadgetWarning && (
        <div style={{ color: 'orange', fontWeight: 'bold' }}>
          Warning: Electronic gadget detected!
        </div>
      )}
      {multipleFacesWarning && (
        <div style={{ color: 'yellow', fontWeight: 'bold' }}>
          Warning: Multiple faces detected!
        </div>
      )} */}
        <button onClick={onClose}>OK</button> {/* Close button */}
      </div>
    </div>
  );
};

export default Modal;
