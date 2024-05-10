import React, { useState } from 'react';
import './CSS/Register.css';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import logo from './images/AveryBit-Full-114.webp';
import register from '../../assets/img/rj.webp';
import { Col, Container, Row } from 'react-bootstrap';
import { height } from '@fortawesome/free-brands-svg-icons/fa42Group';
import { toast } from 'react-toastify';function Register() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        phone: ''
    });
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const auth = getAuth();

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
            const user = userCredential.user;

            // Fetch the userId from Firebase
            const userId = user.uid;

            // Prepare data to send to the backend API
            const userData = {
                userId,
                name: formData.name,
                email: formData.email,
                password: formData.password,
                phone: formData.phone
            };

            // Send userData to the backend API for storing in the database
            const response = await fetch('http://localhost:3000/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });

            if (!response.ok) {
                throw new Error('Failed to save user data in the database');
            }
            
            // alert('User registered successfully')
            toast.success('User registered Successfully',{
                position: "top-left",
                theme: "dark",
            })
            console.log("User registered successfully");
            navigate("/"); // Redirect to login or home page
        } catch (error) {
            console.error("Error registering user:", error.message);
            toast.error('Please Enter Valid Email and Mobile',{
                position:'top-left',
                theme: "dark",
            })

            // alert("user not register");
        }
    };

    return (
        <>
            <Container className='reg-container'>
                <Row>
                    <Col>
                        <img className='login-logo' src={logo} alt='logo' />
                        <h1 className='register-col-heading'>Create an Account</h1>
                        <div className='Register-container'>
                            <form onSubmit={handleSubmit}>
                                <div className='form-group'>
                                    <label htmlFor='name'>Full Name</label>
                                    <input type='text' id='name' name='name' value={formData.name} onChange={handleChange} placeholder='Enter your full name' required />
                                </div>
                                <div className='form-group'>
                                    <label htmlFor='email'>Email Address</label>
                                    <input type='email' id='email' name='email' value={formData.email} onChange={handleChange} placeholder='Enter your email' required />
                                </div>
                                <div className='form-group'>
                                    <label htmlFor='password'>Password</label>
                                    <input type='password' id='password' name='password' value={formData.password} onChange={handleChange} placeholder='Enter your password' required />
                                </div>
                                <div className='form-group'>
                                    <label htmlFor='phone'>Phone Number</label>
                                    <input type='tel' id='phone' name='phone' value={formData.phone} onChange={handleChange} placeholder='Enter your phone number' required style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '3px' }} />
                                </div>
                                <button type='submit'>Register</button>
                                {error && <p className="error-message">{error}</p>}
                            </form>
                            <p>Already have an account? <Link to='/'>Login</Link></p>
                        </div>
                    </Col>
                    <Col>
                        <div className='register-image'>
                            <img src={register} />
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default Register;
