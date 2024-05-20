import React, { useEffect, useRef, useState } from 'react';
import * as blazeface from '@tensorflow-models/blazeface';
import * as cocoSsd from '@tensorflow-models/coco-ssd';
import { useNavigate } from 'react-router-dom';
import './TestAutoSubmittedPage.css'
import Cross from '../../assets/img/RedCross.jpg'
import { useDispatch } from 'react-redux';
import { setAssessmentStatus } from '../../Store/assessmentData';

const TestAutoSubmittedPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()

  return (
    <div className='violation-page'>
      <div className='cross-div'>
        <img src={Cross} alt="" className='red-cross-image' />
      </div>
      <h1>Assessment Ended</h1>
      <h3>The assessment has been ended because you have exceeded the warning limit.</h3>
      <p>Please review the guidelines and ensure compliance in the future assessments.</p>
      <button onClick={() => {
        dispatch(setAssessmentStatus)
        navigate('/userid/assessments')
      }}>Back to Dashboard</button>
    </div>
  );

};

export default TestAutoSubmittedPage;








