import React, { useRef, useState } from 'react';
import { Editor } from '@monaco-editor/react';
import axios from 'axios'; // Import Axios for making HTTP requests
import './AssessmentCodeEditor.css';

function AssessmentCodeEditor() {
  const [output, setOutput] = useState('');
  const editorRef = useRef(null);

  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;
  }

  // Function to fetch output from API
  async function fetchOutput() {
    try {
      const code = editorRef.current?.getValue(); // Get the user's code from the editor
      const language = document.getElementById('language-selector').value; // Get the selected language
      const response = await axios.post('http://localhost:3000/compilex', {
        code: code,
        input: '',
        lang: language
      });
      console.log(response.data); // Output received from the API
      const result = response.data.output.replace(/[\r\n]+/g, ''); // Process the output
      setOutput(result); // Update state with the output
    } catch (error) {
      console.error('Error:', error);
      // Handle errors
    }
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
        <button type="button" className="btn btn-success code-run" onClick={fetchOutput}>Run</button>
      </div>
      <div className='output-container'>
        <h3>Output:</h3>
       
      </div>
      <div className='compiler-div'>
        <div className='compiler'>   <pre>{output}</pre> </div>
      </div>
    </div>
  );
}
export default AssessmentCodeEditor;
