import React, { useState } from 'react';
import './CSS/Register.css';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import logo from './images/AveryBit-Full-114.webp'

function Register() {
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

            console.log("User registered successfully");
            navigate("/"); // Redirect to login or home page
        } catch (error) {
            console.error("Error registering user:", error.message);
            setError('Error registering user');
        }
    };

    return (
        <>
            <div className='register-container'>
                <div className='register-row'>
                    <div className='register-col'>
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
                    </div>
                    <div className='register-col'>
                        <div className='register-image'>
                            <h1>Register Image</h1>
                            <p>Some text about registration</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Register;
