import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { handleError } from '../utils.js';
import { toast } from 'react-toastify';
import '../App.css';
// import { FaInstagram, FaFacebook, FaTwitter } from 'react-icons/fa';
import { FaUser, FaLock, FaInstagram, FaFacebook, FaTwitter } from "react-icons/fa";


const Login = () => {

    const [loginInfo, setLoginInfo] = useState({
        email: '',
        password: ''
    })

    const navigate = useNavigate();

    const handlechange = (e) => {
        const { name, value } = e.target;
        console.log(name, value);
        const copyLogin = { ...loginInfo };
        copyLogin[name] = value;
        setLoginInfo(copyLogin);
    }

    const handlesubmit = async (e) => {
        e.preventDefault();

        const { email, password } = loginInfo;

        if (!email || !password) {
            return handleError('Please fill all the fields.');
        }

        try {
            const url = "http://localhost:2000/auth/login";
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginInfo)
            });

            const data = await response.json();
            const { jwttoken, username } = data;

            if (response.ok) {
                toast.success('Login successful!');
                console.log(data);

                localStorage.setItem('token', jwttoken);
                localStorage.setItem('username', username);

                setTimeout(() => {
                    navigate('/dashboard')
                }, 1000);

            } else {
                handleError(data.message || 'Something went wrong. Please try again.');
            }

        } catch (error) {
            handleError('Network error, please try again later.', error);
            console.log(error);

        }
    };

    return (
        <>
            <div className="container-fluid d-flex justify-content-center align-items-center">
                <div className="card border-0 shadow-lg p-4" style={{ maxWidth: '420px', borderRadius: '15px', backgroundColor: '#fff' }}>
                    <h2 className="text-center mb-4 text-uppercase" style={{ fontWeight: 'bold', letterSpacing: '1px' }}>Login</h2>

                    <form className="login" onSubmit={handlesubmit}>
                        {/* Email Field */}
                        <div className="form-group mb-3">
                            <div className="input-group">
                                <span className="input-group-text bg-transparent text-dark border-0">
                                    <FaUser />
                                </span>
                                <input
                                    type="email"
                                    className="form-control border-bottom border-dark bg-transparent rounded-0"
                                    placeholder="Email"
                                    name="email"
                                    onChange={handlechange}
                                    value={loginInfo.email}
                                    required
                                />
                            </div>
                        </div>

                        {/* Password Field */}
                        <div className="form-group mb-4">
                            <div className="input-group">
                                <span className="input-group-text bg-transparent text-dark border-0">
                                    <FaLock />
                                </span>
                                <input
                                    type="password"
                                    className="form-control border-bottom border-dark bg-transparent rounded-0"
                                    placeholder="Password"
                                    name="password"
                                    onChange={handlechange}
                                    value={loginInfo.password}
                                    required
                                />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            className="btn btn-dark btn-block w-100 py-2 mb-3"
                            type="submit"
                            style={{ borderRadius: '30px', letterSpacing: '1px' }}
                        >
                            Log In
                        </button>
                        <div>
                            <Link to="/register" className="text-center text-dark">Don&apos;t have an account?
                            <span className="text-primary"> Sign Up</span>
                            </Link>
                        </div>
                    </form>

                    {/* Social Login Section */}
                    <div className="social-login text-center mt-3">
                        <p className="text-muted mb-2">Or log in with</p>
                        <div className="d-flex justify-content-center">
                            <a href="#" className="btn btn-outline-dark mx-2" style={{ borderRadius: '50%', width: '50px', height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <FaInstagram />
                            </a>
                            <a href="#" className="btn btn-outline-dark mx-2" style={{ borderRadius: '50%', width: '50px', height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <FaFacebook />
                            </a>
                            <a href="#" className="btn btn-outline-dark mx-2" style={{ borderRadius: '50%', width: '50px', height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <FaTwitter />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;