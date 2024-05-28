import React from 'react';
import './AlertBox.css';

const AlertBox = ({ message, onDismiss }) => {
  if (!message) {
    return null;
  }

  return (
    <div className="alert-box">
      <span>{message}</span>
      <button onClick={onDismiss}>Dismiss</button>
    </div>
  );
};

export default AlertBox;
