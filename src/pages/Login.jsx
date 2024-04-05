import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const navigate = useNavigate(); // Utilize useNavigate hook for redirection

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);

        try {
            const response = await fetch('http://localhost:8000/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error('Failed to login');
            }

            const data = await response.json();

            // Store successful login data (replace with your logic)
            localStorage.setItem('user', JSON.stringify(data.data));
            localStorage.setItem("token", data.token); // Assuming you receive a token

            console.log('User logged in successfully:', data);
            navigate('/'); // Redirect to Home page after successful login
        } catch (error) {
            console.error('Error logging in:', error.message);
            // Handle errors appropriately (e.g., display error message)
        }
    };

    return (
        <div className="login-form-container">
            <h2>Login</h2>
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
                <Link to='/signup'><span className='account'>Don't have an account?</span></Link>
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default Login;
