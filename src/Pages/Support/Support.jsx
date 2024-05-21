import React, { useState } from 'react'
import { Alert, Button, Col, Container, Row } from "react-bootstrap";
import "./Support.css";
import axios from "axios";
import Sman from '../../assets/img/sman.png'


function Support() {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" }); // Clear the error when user starts typing again
  };
  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.mobile.trim()) {
      newErrors.mobile = "Mobile is required";
    } else if (!/^\d{10}$/.test(formData.mobile)) {
      newErrors.mobile = "Mobile is invalid";
    }
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = async (e) => {
    // e.preventDefault();
    if (validateForm()) {
      try {
        console.log(formData);
        const response = await fetch('https://assessmentwebsite-4-3u7s.onrender.com/contacts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });
        if (response) {
          console.log(response)
          alert("Successfully send ",);
        }
      } catch (error) {
        alert("Error:", error);
        console.log(error)
        // Handle error, maybe show an error message to the user
      }
    }
  };

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
                <img src={Sman} alt="" id="sMan" className='support-img'></img>
                <h1 style={{ textAlign: "center" }}>Support</h1>
                <p className="para">24/7 Hours Support</p>
              </div>
              {/* .................input............. */}
              <div className='label-input-field'>
                <h6 className="inputText"><span style={{ color: "red" }}>*</span>Enter Name :</h6>
                <input className="support-input" type="text" placeholder="Enter Name" name="name"
                  value={formData.name}
                  required
                  onChange={handleChange}
                />
                {errors.name && <h6 style={{ color: 'red', marginLeft: '2%' }}>❗{errors.name}</h6>}
              </div>
              <div className='label-input-field'>
                <h6 className="inputText"><span style={{ color: "red" }}>*</span>Enter Mobile :</h6>
                <input
                  className="support-input"
                  type="text"
                  placeholder="Enter Mobile"
                  required
                  name="mobile"
                  onChange={handleChange}
                  value={formData.mobile}
                />
                {errors.mobile && <h6 style={{ color: 'red', marginLeft: '2%' }}>❗{errors.mobile}</h6>}
              </div>
              <div className='label-input-field'>
                <h6 className="inputText"><span style={{ color: "red" }}>*</span>Enter Email :</h6>
                <input className="support-input" type="email" placeholder="Enter Email" required
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && <h6 style={{ color: 'red', marginLeft: '2%' }}>❗{errors.email}</h6>}
              </div>
              <div className='label-input-field'>
                <h6 className="inputText"><span style={{ color: "red" }}>*</span>Message</h6>
                <textarea
                  placeholder="Message..."
                  rows={6} // Number of visible text lines
                  cols={60} // Width of the text area (number of characters)
                  required
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                />
                {errors.message && (
                  <h6 style={{ color: 'red', marginLeft: '2%' }}>❗{errors.message}</h6>
                )}
              </div>
              <Button
                variant="success"
                type="submit"
                onClick={handleSubmit}

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