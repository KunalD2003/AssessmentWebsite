import React from 'react'
import './TermsandCondition.css';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';

function TermsandCondition() {
    const [isAgreed, setIsAgreed] = useState(false);
    const navigate = useNavigate()
    const {assessmentid} = useParams()
    const handleCheckboxChange = (e) => {
        setIsAgreed(e.target.checked);
    };

    const handleSubmit = () => {
        if (isAgreed) {
            // Handle form submission logic here
            console.log("Terms and Conditions accepted");
            navigate(`/${assessmentid}/scanfaceid`)
        } else {
            console.log("You must agree to the terms and conditions");
        }
    };
    return (
        <div className="terms">
            <h2>Guidelines to Online Examination for Students</h2>
            <ul>
                <li>Arrange for stable Internet connectivity.</li>
                <li>Giving examination on a laptop or desktop is highly recommended.</li>
                <li>
                    Make sure mobile/laptop is fully charged. Power bank for mobile or UPS/Inverter for laptop/desktop should be arranged for uninterrupted power supply.
                </li>
                <li>
                    Students should have sufficient data in the Fair Usage Policy (FUP) / Internet plan with a sufficient data pack from their internet service provider.
                </li>
                <li>Login to the portal 10 minutes before the online examination start time.</li>
                <li>Close all browsers/tabs before starting the online examination.</li>
                <li>
                    Once the exam starts, do not switch to any other window/tab. Doing so may be considered malpractice and your exam could be terminated.
                </li>
                <li>
                    Do not pick up/receive calls during the exam if you are giving the exam on a mobile device. This will also be treated as changing the window.
                </li>
                <li>To avoid unwanted pop-ups, use of an Ad Blocker is recommended.</li>
                <li>Clear browser cache memory on mobile and laptops. Clear browsing history and delete temp files.</li>
                <li>
                    It is recommended to use web browsers like Mozilla Firefox or Google Chrome on a desktop/laptop/tablet/smartphone.
                </li>
                <li>
                    Do not use the back button on your keyboard or close button/icon to go back to the previous page or to close the screen.
                </li>
                <li>
                    Students are not allowed to login after 30 minutes from the start of the examination.
                </li>
            </ul>
            <h3>Helpline Numbers</h3>
            <ul>
                <li>For technical queries/difficulties, email with proper screenshots and student details to test@geca.ac.in.</li>
                <li>Contact the CAW Incharge Miss abc at 8275235489, or CEO xyz at 9404357432.</li>
            </ul>

            <div className="agreement-section">
                <label>
                    <input
                        type="checkbox"
                        checked={isAgreed}
                        onChange={handleCheckboxChange}
                        className='me-2'
                    />
                    I agree to the terms and conditions
                </label>

                <button
                    className="submit-button"
                    onClick={handleSubmit}
                    disabled={!isAgreed} // Button is disabled until the checkbox is checked
                >
                    Submit
                </button>
            </div>
        </div>
    )
}

export default TermsandCondition