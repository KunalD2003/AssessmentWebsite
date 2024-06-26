import React, { useState } from 'react';
import './CSS/Register.css';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import logo from './images/AveryBit-Full-114.webp';
import { Col, Container, Row } from 'react-bootstrap';
import { toast } from 'react-toastify';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

function Register() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        phone: ''
    });
    const [error, setError] = useState(null);
    const [loader, setLoader] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'name' || name === 'password' || name === 'phone') {
            if (value.trim() !== '') {
                setFormData({ ...formData, [name]: value });
            } else {
                setFormData({ ...formData, [name]: '' });
            }
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const auth = getAuth();
        setLoader(true);
        try {
            const temp = Number(formData.phone);
            if (!temp) {
                setLoader(false);
                toast.error('Please Enter Valid Mobile No.', {
                    position: 'top-left',
                    theme: "dark",
                });
            } else {
                if (formData.name.trim() === '' || formData.password.trim() === '') {
                    setLoader(false);
                    toast.error('Full Name and Password cannot be empty or just spaces', {
                        position: 'top-left',
                        theme: "dark",
                    });
                    return;
                }

                const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
                const user = userCredential.user;

                const userId = user.uid;
                const userData = {
                    userId,
                    name: formData.name,
                    email: formData.email,
                    password: formData.password,
                    phone: formData.phone
                };

                const response = await fetch(`${import.meta.env.VITE_API_SHIVAM_URL}/api/register`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(userData)
                });

                if (!response.ok) {
                    throw new Error('Failed to save user data in the database');
                } else {
                    toast.success('User registered Successfully', {
                        position: "top-left",
                        theme: "dark",
                    });
                    setLoader(false);
                    navigate("/");
                }
            }
        } catch (error) {
            console.error("Error registering user:", error.message);
            toast.error('Please Enter Valid Email and Mobile', {
                position: 'top-left',
                theme: "dark",
            });
            setLoader(false);
        }
    };

    return (
        <>
            <Container className='reg-container'>
                <Row className='register-row'>
                    <Col>
                        <div className='login-logo-container' style={{ flexDirection: "column" }}>
                            <img className='login-logo' src={logo} alt='logo' />
                            <h1 className='register-col-heading'>Create an Account</h1>
                        </div>
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
                                {loader ? (
                                    <Button variant="success" disabled>
                                        <Spinner
                                            as="span"
                                            animation="border"
                                            size="sm"
                                            role="status"
                                            aria-hidden="true"
                                            style={{ marginRight: "0.5rem" }}
                                        />
                                        Registering
                                    </Button>
                                ) : (
                                    <Button variant='success' type='submit'>Register</Button>
                                )}
                                {error && <p className="error-message">{error}</p>}
                            </form>
                            <p>Already have an account? <Link to='/'>Login</Link></p>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default Register;
