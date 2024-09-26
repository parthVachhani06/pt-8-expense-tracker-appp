
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import { RiFacebookFill } from 'react-icons/ri';
// import { MdEmail } from "react-icons/md";
import { FaUser, FaLock, FaEnvelope, FaInstagram, FaFacebook, FaTwitter } from "react-icons/fa";

import { handleError } from '../utils';
import { toast } from 'react-toastify';
import '../App.css';

const Register = () => {
    const [signInfo, setSignInfo] = useState({
        username: '',
        email: '',
        password: ''
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSignInfo((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { username, email, password } = signInfo;
        if (!username || !email || !password) {
            return handleError('Please fill all the fields.');
        }

        try {
            const url = "http://localhost:2000/auth/register";
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(signInfo)
            });

            const data = await response.json();

            if (response.ok) {
                toast.success('User created successfully!');
                setTimeout(() => {
                    navigate('/');
                }, 1000);
            } else {
                handleError(data.message || 'Something went wrong. Please try again.');
            }
        } catch (error) {
            handleError('Network error, please try again later.', error);
        }
    };

    return (
        <div className="container-fluid d-flex justify-content-center align-items-center">
        <div className="card border-0 shadow-lg p-4" style={{ maxWidth: '420px', borderRadius: '15px', backgroundColor: '#fff' }}>
          <h2 className="text-center mb-4 text-uppercase" style={{ fontWeight: 'bold', letterSpacing: '1px' }}>Sign Up</h2>
          
          <form className="login" onSubmit={handleSubmit}>
            {/* Username Field */}
            <div className="form-group mb-3">
              <div className="input-group">
                <span className="input-group-text bg-transparent text-dark border-0">
                  <FaUser />
                </span>
                <input
                  type="text"
                  className="form-control border-bottom border-dark bg-transparent rounded-0"
                  placeholder="Username"
                  name="username"
                  onChange={handleChange}
                  value={signInfo.username}
                  required
                />
              </div>
            </div>
  
            {/* Email Field */}
            <div className="form-group mb-3">
              <div className="input-group">
                <span className="input-group-text bg-transparent text-dark border-0">
                  <FaEnvelope />
                </span>
                <input
                  type="email"
                  className="form-control border-bottom border-dark bg-transparent rounded-0"
                  placeholder="Email"
                  name="email"
                  onChange={handleChange}
                  value={signInfo.email}
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
                  onChange={handleChange}
                  value={signInfo.password}
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
              Sign Up Now
            </button>
            <div>
              <p className="text-center">Already have an account? <Link to="/">Login</Link></p>
            </div>
          </form>
  
          {/* Social Login Section */}
          <div className="social-login text-center">
            <p className="text-muted mb-2">Or sign up with</p>
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
      );
};

export default Register;