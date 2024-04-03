import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './SignUp.css'

function SignUp() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        name: '',
        phoneNumber: '',
        sem: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:8000/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Failed to sign up');
            }

            const data = await response.json();

            // Store the user data in localStorage
            localStorage.setItem('user', JSON.stringify(data.data));

            console.log('User signed up successfully:', data.data);
        } catch (error) {
            console.error('Error signing up:', error.message);
        }
    };


    return (
        <div className="signup-form-container">
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
                <input
                    type="tel"
                    name="phoneNumber"
                    placeholder="Phone Number"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    required
                />
                <input
                    type="number"
                    name="sem"
                    placeholder="Semester"
                    value={formData.sem}
                    onChange={handleChange}
                    required
                />
                <Link to='/login'><span className='account'>Already have an accout?</span></Link>
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
}

export default SignUp;
