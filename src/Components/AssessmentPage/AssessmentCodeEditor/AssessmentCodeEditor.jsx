import React from 'react'
import {Editor} from '@monaco-editor/react'

function AssessmentCodeEditor() {
  return (
    <div>
        <div>
            
        </div>
        <Editor height="50vh" defaultLanguage="javascript" defaultValue="// some comment" />;
    </div>
  )
}

export default AssessmentCodeEditor