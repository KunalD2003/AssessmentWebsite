import React from 'react'
import { Button, Col, Container, Row } from "react-bootstrap";
import "./Support.css";


function Support() {
  return (
    <div id="main">
      <Container>
        <Row>
          <Col>
            <div
              id="formContainer"
              style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}
            >
              <div>
                <img src="src/assets/img/sman.png" alt="" id="sMan" className='support-img'></img>
                <h1 style={{ textAlign: "center" }}>Support</h1>
                <p className="para">24/7 Hours Support</p>
              </div>
              {/* .................input............. */}
              <div className='label-input-field'>
                <h6 className="inputText">Enter Name :</h6>
                <input className="support-input" type="text" placeholder="Enter Name" />
              </div>
              <div className='label-input-field'>
                <h6 className="inputText">Enter Mobile :</h6>
                <input
                  className="support-input"
                  type="text"
                  placeholder="Enter Mobile"
                />
              </div>
              <div className='label-input-field'>
                <h6 className="inputText">Enter Email :</h6>
                <input className="support-input" type="email" placeholder="Enter Email" />
              </div>
              <div className='label-input-field'>
                <h6 className="inputText">Message</h6>
                <textarea
                  placeholder="Message..."
                  rows={6} // Number of visible text lines
                  cols={60} // Width of the text area (number of characters)
                />
              </div>
              <Button
                variant="success"
              >
                Send Message
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Support