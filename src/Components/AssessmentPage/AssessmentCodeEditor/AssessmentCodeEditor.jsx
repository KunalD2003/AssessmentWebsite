import React, { useRef, useState } from 'react';
import { Editor } from '@monaco-editor/react';
import axios from 'axios';
import './AssessmentCodeEditor.css';

function AssessmentCodeEditor() {
  const [output, setOutput] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [expectedOutputs, setExpectedOutputs] = useState(['4', '-1']); // Added more expected outputs
  const editorRef = useRef(null);

  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;
  }

  async function fetchOutput() {
    try {
      const code = editorRef.current?.getValue();
      const language = document.getElementById('language-selector').value;
      console.log(code);
      const response = await axios.post('http://localhost:3000/compilex', {
        code: code,
        input: inputValue,
        lang: language
      });
      console.log(response.data);
      const result = response.data.output.replace(/[\r\n]+/g, '');
      setOutput(result);
      return result;
    } catch (error) {
      console.error('Error:', error);
    }
  }

  function compareOutputs(actualOutput, expectedOutputs) {
    // Remove leading and trailing whitespace from the actual output
    const cleanedActual = actualOutput.trim();

    // Check if the actual output matches any expected output
    const matchedOutput = expectedOutputs.find(expected => expected.trim() === cleanedActual);
    if (matchedOutput) {
      console.log('Output matched:', matchedOutput);
    } else {
      console.log('Output did not match:', actualOutput);
    }
  }

  async function handleSubmit() {
    const actualOutput = await fetchOutput();
    compareOutputs(actualOutput, expectedOutputs);
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
        <Editor height="50vh" defaultLanguage="python" defaultValue="// Write your code here" onMount={handleEditorDidMount} />
      </div>
      <div className='run-btn-container'>
        <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} placeholder="Enter input here" />
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
