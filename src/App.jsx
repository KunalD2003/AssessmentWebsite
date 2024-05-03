import { useState } from 'react'

import {AssessmentPage} from './index'
import './App.css'
import TestAutoSubmittedPage from './Components/Webcame/TestAutoSubmittedPage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <AssessmentPage />
        {/* <TestAutoSubmittedPage></TestAutoSubmittedPage> */}
      </div>
    </>
  )
}

export default App
