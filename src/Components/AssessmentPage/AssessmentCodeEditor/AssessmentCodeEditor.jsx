import React, { useRef } from 'react'
import { Editor } from '@monaco-editor/react'
import './AssessmentCodeEditor.css'

function AssessmentCodeEditor() {
  const editorRef = useRef(null);
  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;
  }
  // const fetchCode =  useQuestionData();
  function fetchCode() {
    console.log(editorRef.current?.getValue());
  }
  return (

    <div>
      <div className='code-editor-header'>
        <h5>Code Editor</h5>
        <select name="language" id="language-selector">
          <option value="python">Python</option>
          <option value="python">Java</option>
          <option value="python">CPP</option>
          <option value="python">C</option>
        </select>
      </div>
      <div className='code-editor-div'>
        <Editor height="50vh" defaultLanguage="python" defaultValue="// Write your code here" onMount={handleEditorDidMount} />
      </div>
      <div className='run-btn-container'>
        <button type="button" className="btn btn-success code-run" onClick={fetchCode}>Run</button>
      </div>
      <div className='compiler-div'>
        <div className='compiler'></div>
      </div>
    </div>
  )
}

export default AssessmentCodeEditor