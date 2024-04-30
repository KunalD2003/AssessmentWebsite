import React, { useState } from 'react';
import './CSS/Login.css';
import loginImage from './images/andrew-neel-ute2XAFQU2I-unsplash.jpg'; // Assuming this is your image path
import { Link,useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword ,updateProfile} from "firebase/auth";

import logo from './images/AveryBit-Full-114.webp'

function Login() {
    const navigate=useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        rememberMe: false,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const newValue = type === 'checkbox' ? checked : value;
        setFormData({ ...formData, [name]: newValue });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const auth = getAuth();
        try {
            const userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password);
            const user = userCredential.user;
            console.log('User signed in:', user);
            updateProfile(user,{
                displayName:user.email,
            });
            console.log("Login successfully")
            navigate("/assessment");
          
            // Redirect to a new page or handle successful login
        } catch (error) {
            console.error('Login error:', error.message);
            // Display an error message to the user
        }
    };

    return (
        <>
            <div className='container'>
                <div className='row'>
                    <div className='col'>
                    <img className='logo' src={logo} alt='logo'/>
                        {/* <h4>AveryBit Solutions</h4> */}
                        
                        <h1>Welcome Back</h1>
                        <div className='Login-container'>
                            <form onSubmit={handleSubmit}>
                                <div className='form-group'>
                                    <label htmlFor='email'>Email Address</label>
                                    <input type='email' id='email' name='email' value={formData.email} onChange={handleChange} placeholder='Enter your email' required />
                                </div>
                                <div className='form-group'>
                                    <label htmlFor='password'>Password</label>
                                    <input type='password' id='password' name='password' value={formData.password} onChange={handleChange} placeholder='Enter your password' required />
                                </div>
                                <div className='box1'>
                                    <div className='form-group section-checkbox'>
                                        <input type='checkbox' id='rememberMe' name='rememberMe' checked={formData.rememberMe} onChange={handleChange} />
                                        <label htmlFor='rememberMe'>Remember Me</label>
                                    </div>
                                    <div className='form-group section-checkbox'>
                                        <Link to='/forgot-password'>Forgot Password?</Link>
                                    </div>
                                </div>
                                <button type='submit'>Login</button>
                            </form>
                            <p>Don't have an account? <Link to='/register'>Register</Link></p>
                        </div>
                    </div>
                    <div className='col'>
                        <div className='login-image'>
                            <h1>Login Image</h1>
                            <p>Some text about Digital Recruitment</p>
                            <img src={loginImage} alt='Login' />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;
