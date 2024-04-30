import React, { useState } from 'react';
import './CSS/Register.css';
import { Link ,useNavigate} from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword, } from "firebase/auth";

function Register() {
    const navigate=useNavigate();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    });
    const [error,setError]=useState(false);
    

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        console.log()
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const auth = getAuth();

        createUserWithEmailAndPassword(auth, formData.email, formData.password)
        .then((userCredential) => {
          // Signed up 
          const user = userCredential.user;
          console.log(user);
          console.log("Register successfuly")
          navigate("/");
          user.updateProfile({
            displayName: user.firstName // Replace with actual display name
        
        }).then(() => {
            // Display name updated successfully
            console.log("profile name");
        }).catch((error) => {
            console.error("Error updating display name:", error.message);
        });
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setError(errorMessage);
          // ..
        });
    };

    return (
        <>
            <div className='container'>
                <div className='row'>
                    <div className='col'>
                        <h4>AveryBit Solutions</h4>
                        <h1>Create an Account</h1>
                        <div className='Register-container'>
                            <form onSubmit={handleSubmit}>
                                <div className='form-group'>
                                    <label htmlFor='firstName'>First Name</label>
                                    <input type='text' id='firstName' name='firstName' value={formData.firstName} onChange={handleChange} placeholder='Enter your first name' required />
                                </div>
                                <div className='form-group'>
                                    <label htmlFor='lastName'>Last Name</label>
                                    <input type='text' id='lastName' name='lastName' value={formData.lastName} onChange={handleChange} placeholder='Enter your last name' required />
                                </div>
                                <div className='form-group'>
                                    <label htmlFor='email'>Email Address</label>
                                    <input type='email' id='email' name='email' value={formData.email} onChange={handleChange} placeholder='Enter your email' required />
                                </div>
                                <div className='form-group'>
                                    <label htmlFor='password'>Password</label>
                                    <input type='password' id='password' name='password' value={formData.password} onChange={handleChange} placeholder='Enter your password' required />
                                </div>
                                <button type='submit'>Register</button>

                            </form>
                            <p>Already have an account? <Link to='/'>Login</Link></p>
                        </div>
                    </div>
                    <div className='col'>
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
 