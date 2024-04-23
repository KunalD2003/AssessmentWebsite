import React from 'react';
import './Hero_Section.css';

function Hero_section() {
  return (
    <div className="grid-container">
    {/* First Card */}
    <div className="card">
    <div className='content'>
      <h2>Web Development</h2>
      <p>Learn the basics of HTML, CSS, and JavaScript to build your own websites.</p>
      </div>
      <button onClick={() => navigate('/TermsAndCondition')}>Next Page</button>
    </div>

    {/* Second Card */}
    <div className="card">
      <h2>Advanced Web Development</h2>
      <p>Explore advanced topics in web development, including frameworks and backend technologies.</p>
      <button onClick={() => navigate('/page2')}>Next Page</button>
    </div>

    {/* Third Card */}
    <div className="card">
      <h2>Full-Stack Development</h2>
      <p>Learn how to develop complete web applications, from frontend to backend.</p>
      <button onClick={() => navigate('/page3')}>Next Page</button>
    </div>

    <div className="card">
      <h2>Web Development</h2>
      <p>Learn the basics of HTML, CSS, and JavaScript to build your own websites.</p>
      <button onClick={() => navigate('/page1')}>Next Page</button>
    </div>

    {/* Second Card */}
    <div className="card">
      <h2>Advanced Web Development</h2>
      <p>Explore advanced topics in web development, including frameworks and backend technologies.</p>
      <button onClick={() => navigate('/page2')}>Next Page</button>
    </div>

    {/* Third Card */}
    <div className="card">
      <h2>Full-Stack Development</h2>
      <p>Learn how to develop complete web applications, from frontend to backend.</p>
      <button onClick={() => navigate('/page3')}>Next Page</button>
    </div>
  </div>
  )
}

export default Hero_section