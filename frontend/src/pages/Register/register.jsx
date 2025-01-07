import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './register.css';

const Register = () => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '', age: '', gender: '', country: '' });
 

  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        alert('Registration successful');
        navigate('/login');
      } else {
        alert('Registration failed');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('padla may sayop');
    }
  };

  return (
    <div className="register">
      <div className="register-form">
        <h1>Sign Up</h1>
        <form onSubmit={handleSubmit}>
          <input type="text" name="username" placeholder="Name" onChange={handleChange} required />
          <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
          <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
          <input type="number" name="age" placeholder="Age" onChange={handleChange} required />
          <select name="gender" onChange={handleChange} required>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          <input type="text" name="country" placeholder="Country" onChange={handleChange} required />
          <button type="submit">Sign Up</button>
          <div className="form-switch">
            <p>
              Already have an account? <span><Link to="/login">Sign In Now</Link></span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
