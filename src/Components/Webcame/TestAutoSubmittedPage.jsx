import React from 'react';
import { useNavigate } from 'react-router-dom';
import './TestAutoSubmittedPage.css'; // Optional: For styling

const TestAutoSubmittedPage = () => {
  const navigate = useNavigate(); // For navigation

  return (
    <div className="test-auto-submitted-container">
      <h1>Your Test Has Been Auto-Submitted</h1>
      <p>
        Your test has been auto-submitted because you reached more than three warnings.
      </p>
      <button
        className="navigate-dashboard-button"
        onClick={() => navigate('/dashboard')} // Navigates to the dashboard
      >
        Go to Dashboard
      </button>
    </div>
  );
};

export default TestAutoSubmittedPage;
