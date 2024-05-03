import React from 'react';
import './AlertBox.css'; // Styling for the alert box

const AlertBox = ({ message, onDismiss }) => {
  if (!message) {
    return null; // If there's no message, don't render the alert
  }

  return (
    <div className="alert-box">
      <span>{message}</span>
      <button onClick={onDismiss}>Dismiss</button>
    </div>
  );
};

export default AlertBox;
