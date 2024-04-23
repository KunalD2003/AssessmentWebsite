import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import './App.css'
import Dashboard from './Pages/Candidate_Dashboard/Dashbored/Dashboard';
// import TermsAndConditions from './Pages/Terms_And_Conditions/TermsAndCondition';


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div>
    <Dashboard></Dashboard>
      {/* <TermsAndConditions></TermsAndConditions> */}
    </div>
    </>
  )
}

export default App


