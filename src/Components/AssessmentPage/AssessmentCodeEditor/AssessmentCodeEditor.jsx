import React, { useEffect, useRef, useState } from 'react';
import { Editor } from '@monaco-editor/react';
import axios from 'axios'; // Import Axios for making HTTP requests
import './AssessmentCodeEditor.css';
import { useDispatch, useSelector } from 'react-redux';
import { setCode } from '../../../Store/assessmentData';

function AssessmentCodeEditor({questionIndex}) {
  const [output, setOutput] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [expectedOutput, setExpectedOutput] = useState('4'); // Set the expected output here
  const editorRef = useRef(null);
  const dispatch = useDispatch()
  const [questionData, setQuestionData] = useState();
  const questions = useSelector((state) => {
    return state.getAssessment.questionBank;
  });
  useEffect(() => {
    setQuestionData(questions[questionIndex].code)
    console.log(questions[questionIndex].code);
  },[questionIndex, questions])
  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;
  }

  // Function to fetch output from API
  async function fetchOutput() {
    try {
      const code = editorRef.current?.getValue(); // Get the user's code from the editor
      const language = document.getElementById('language-selector').value; // Get the selected language
      console.log(code);
      const response = await axios.post('http://localhost:3000/compilex', {
        code: code,
        input: inputValue, // Use inputValue for the input data
        lang: language
      });
      console.log(response.data); // Output received from the API
      const result = response.data.output.replace(/[\r\n]+/g, ''); // Process the output
      setOutput(result); // Update state with the output
      dispatch(setCode({code, questionIndex}))
      return result; // Return the result for comparison
    } catch (error) {
      console.error('Error:', error);
      // Handle errors
    }
  }

  function compareOutputs(actualOutput, expectedOutput) {
    // Remove leading and trailing whitespace from both outputs
    const cleanedActual = actualOutput.trim();
    const cleanedExpected = expectedOutput.trim();

    // Compare the cleaned outputs
    if (cleanedActual === cleanedExpected) {
        console.log('Outputs match!'); // Outputs match
    } else {
        console.log('Outputs do not match!'); // Outputs don't match
    }
  }

  async function handleSubmit() {
    const actualOutput = await fetchOutput(); // Fetch the actual output
    compareOutputs(actualOutput, expectedOutput); // Compare the outputs
  }

  return (
    <div>
      <div className='code-editor-header'>
        <h5>Code Editor</h5>
        <select name="language" id="language-selector">
          <option value="python">Python</option>
          <option value="java">Java</option>
          <option value="cpp">CPP</option>
          <option value="c">C</option>
        </select>
      </div>
      <div className='code-editor-div'>
        <Editor height="50vh" defaultLanguage="python" defaultValue={`${questionData}`} onMount={handleEditorDidMount} />
      </div>
      <div className='run-btn-container'>
        <input type="text" style={{paddingInline: "0.3rem"}} value={inputValue} onChange={(e) => setInputValue(e.target.value)} placeholder="Enter input here" />
        <button type="button" className="btn btn-success code-run" onClick={fetchOutput}>Run</button>
        <button type="button" className="btn btn-success code-run" onClick={handleSubmit}>Submit Code</button>
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