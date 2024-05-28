import React, { useEffect, useRef, useState } from 'react';
import { Editor } from '@monaco-editor/react';
import axios from 'axios'; // Import Axios for making HTTP requests
import './AssessmentCodeEditor.css';
import { useDispatch, useSelector } from 'react-redux';
import { setCode, setAttempt, setCodingScore } from '../../../Store/assessmentData';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useParams } from 'react-router';

function AssessmentCodeEditor({ questionIndex }) {
  const [output, setOutput] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [expectedOutput, setExpectedOutput] = useState(['4', '-1']); // Set the expected output here
  const editorRef = useRef(null);
  const dispatch = useDispatch()
  const [questionData, setQuestionData] = useState();
  const [disabled, setDisabled] = useState();
  // const [codingScore, setCodingScore] = useState();
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const { assessmentid } = useParams()
  const questions = useSelector((state) => {
    return state.getAssessment.questionBank;
  });
  const userId = useSelector((state) => {
    return state.getAssessment.userDetails.userId;
  })
  const attemptedStatus = useSelector((state) => {
    return state.getAssessment.questionBank[questionIndex].isAttempted
  })
  useEffect(() => {
    setQuestionData(questions[questionIndex].code)
    setExpectedOutput([questions[questionIndex].examples[0].output, questions[questionIndex].examples[1].output])
    setDisabled(attemptedStatus)

  }, [questionIndex, questions, attemptedStatus])
  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;
  }

  // Function to fetch output from API
  async function fetchOutput() {
    try {
      const code = editorRef.current?.getValue(); // Get the user's code from the editor
      const language = document.getElementById('language-selector').value; // Get the selected language
      const temp = `print(${expectedOutput})`
      if (code.includes(`print(${expectedOutput[0]})`) || code.includes(`print(${expectedOutput[1]})`) || code.includes(`print("${expectedOutput[0]}")`) || code.includes(`print("${expectedOutput[1]}")`) || code.includes(`cout << ${expectedOutput[0]} << endl;`) || code.includes(`cout << ${expectedOutput[1]} << endl;`) || code.includes(`cout << "${expectedOutput[0]}" << endl;`) || code.includes(`cout << "${expectedOutput[1]}" << endl;`) || code.includes(`System.out.println("${expectedOutput[0]}");`) || code.includes(`System.out.println("${expectedOutput[1]}");`) || code.includes(`System.out.println(${expectedOutput[0]});`) || code.includes(`System.out.println(${expectedOutput[1]});`)) {
        setShow(true)
      } else {
        const response = await axios.post(`${import.meta.env.VITE_API_SHIVAM_URL}/compilex`, {
          code: code,
          input: inputValue, // Use inputValue for the input data
          lang: language
        });
        const result = response.data.output.replace(/[\r\n]+/g, ''); // Process the output
        dispatch(setCode({ code, questionIndex }))
        setOutput(result); // Update state with the output
        return result; // Return the result for comparison
      }
    } catch (error) {
      console.error('Error:', error);
      // Handle errors
    }
  }

  async function compareOutputs(actualOutput, expectedOutput) {
    // Remove leading and trailing whitespace from both outputs
    const cleanedActual = actualOutput.trim();
    const cleanedExpected = expectedOutput[0].trim();
    const cleanedExpected1 = expectedOutput[1].trim();
    // Compare the cleaned outputs
    if (cleanedActual === cleanedExpected || cleanedActual === cleanedExpected1) {
      console.log('Outputs match!'); // Outputs match
      dispatch(setCodingScore())
      // setCodingScore((prevScore) => prevScore + 5)
      // console.log(codingScore);
      // await axios.put(`http://localhost:3001/result/${userId}/${assessmentid}`, {
      //   UcodingScore: codingScore
      // })
      //   .then((response) => {
      //     console.log(response);
      //   })
    } else {
      console.log('Outputs do not match!'); // Outputs don't match
    }
  }

  async function handleSubmit() {
    setShow1(true)
  }
  async function handleConfirm() {
    const actualOutput = await fetchOutput(); // Fetch the actual output
    await compareOutputs(actualOutput, expectedOutput); // Compare the outputs
    dispatch(setAttempt(questionIndex))
    console.log(attemptedStatus);  
    setShow1(false)
  }
  const handleClose = () => setShow(false);
  const handleClose1 = () => setShow1(false);
  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Hey! you can't directly print output. You have to generate it!</Modal.Title>
        </Modal.Header>
        <Modal.Body>Now edit your code and then Submit.</Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={show1} onHide={handleClose1}>
        <Modal.Header closeButton>
          <Modal.Title>Do you want to submit this code ?</Modal.Title>
        </Modal.Header>
        <Modal.Body>Remember, once you submit this code, then you can't resubmit it.</Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handleClose1}>
            Close
          </Button>
          <Button variant="success" onClick={handleConfirm}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
      <div className='code-editor-header'>
        <h5>Code Editor</h5>
        <select name="language" id="language-selector">
          <option value="python">Python</option>
          <option value="java">Java</option>
          <option value="cpp">CPP</option>
        </select>
      </div>
      <div className='code-editor-div'>
        <Editor height="50vh" defaultLanguage="python" value={`${questionData}`} onMount={handleEditorDidMount} />
      </div>
      <div className='run-btn-container'>
        <input type="text" style={{ paddingInline: "0.3rem" }} value={inputValue} onChange={(e) => setInputValue(e.target.value)} placeholder="Enter input here" />
        <button type="button" className="btn btn-success code-run" onClick={fetchOutput}>Run</button>
        {(disabled) ? <button type="button" className="btn btn-success code-run" onClick={handleSubmit} disabled>Submit Code</button> : <button type="button" className="btn btn-success code-run" onClick={handleSubmit}>Submit Code</button>}

      </div>
      <div className='inputField-container'>
        <h3>Input Field:</h3>
        <h3>   <pre>{inputValue}</pre> </h3>
      </div>
      <div className='compiler-div'>
        <div className='compiler'>
          <div className='output-container'>
            <h3>Output:</h3>
            <h3>   <pre>{output}</pre> </h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AssessmentCodeEditor;