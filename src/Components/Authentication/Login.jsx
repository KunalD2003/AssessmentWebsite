import React, {useState} from 'react';
import './CSS/Login.css';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useDispatch, useSelector } from 'react-redux'
import { setLoginStatus } from '../../Store/assessmentData';
import logo from './images/AveryBit-Full-114.webp'
import { toast } from 'react-toastify';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import { AxiosInstance } from '../../AxiosInstance';

function Login() {
    const [loader, setLoader] = useState(false)
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        rememberMe: false,
    });
    const AssessmentData = useSelector((state) => {
        return state.getAssessment;
    });
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const newValue = type === 'checkbox' ? checked : value;
        setFormData({ ...formData, [name]: newValue });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoader(true)
        const auth = getAuth();
        try {
            const userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password);
            const user = userCredential.user;
            updateProfile(user, {
                displayName: user.email,
            });
            AxiosInstance.get(`/api/users/${user.uid}`)
                .then((response) => {
                    return response.data
                })
                .then((response) => {
                    dispatch(setLoginStatus(response))
                    setLoader(false)
                    navigate("/userid/assessments");
                    toast.success('Login successfully', {
                        position: "top-left",
                        // theme: "dark",
                    })
                })
                .catch((error) => console.log(error))
            // alert('Login successfully')
            // if(formData.email==="admin@averybit.in"){
            //     navigate("/userid/")
            // }

            // Redirect to a new page or handle successful login
        } catch (error) {
            // alert('Invalid Email and password')
            setLoader(false)
            toast.error('Invalid Email and Password', {
                position: 'top-left',
                // theme: "dark",
            })

            console.error('Login error:', error.message);
            // Display an error message to the user

        }
    };
    return (
        <div className='container login-container'>
            <div className='login-row'>
                <div className='login-col'>
                    <div className='login-logo-container'>
                        <img className='login-logo' src={logo} alt='logo' />
                    </div>
                    {/* <h4>AveryBit Solutions</h4> */}

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
                                {/* <div className='form-group section-checkbox'>
                                    <input type='checkbox' id='rememberMe' name='rememberMe' checked={formData.rememberMe} onChange={handleChange} />
                                    <label htmlFor='rememberMe'>Remember Me</label>
                                </div> */}
                            </div>
                            {(loader) ? (<Button variant="success" disabled>
                                <Spinner
                                    as="span"
                                    animation="border"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                    style={{marginRight: "0.5rem"}}
                                />
                                Login
                            </Button>) : (<Button variant='success' type='submit'>Login</Button>)}
                            {/* <button type='submit'>Login</button> */}
                        </form>
                        <p>Don't have an account? <Link to='/register'>Register</Link></p>
                        <h1></h1>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
