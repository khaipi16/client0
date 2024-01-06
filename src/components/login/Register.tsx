import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import "./Login.css"

export const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async (ev: React.FormEvent) => {
        ev.preventDefault();

        try {
            const response = await fetch('https://khai-blog-api.vercel.app/register', {
                method: 'POST',
                body: JSON.stringify({ username, password }),
                headers: { 'Content-Type': 'application/json' },
            });
    
            if (response.ok) {
                alert('Successfully registered!');
            } else {
                // Handle non-success status codes (e.g., 400 Bad Request)
                alert('Failed to register. Please check your input.');
            }
        } catch (error) {
            // Handle network errors or other exceptions
            console.error('Registration error:', error);
            alert('An error occurred while registering. Please try again later.');
        }
    }


    return (
        <div className="content">
            <div className="container">
                <div className="row">
                    <div className="col-md-6 offset-md-3">
                        <div className="card">
                            <div className="card-body">
                                <h3 className="card-title text-center">Register</h3>
                                    <form onSubmit={handleRegister}>
                                        <div className="mb-3">
                                            <label htmlFor="email" className="form-label">Email</label>
                                            <input type="email" className="form-control" 
                                                id="email" placeholder="Enter your email"
                                                value={username} 
                                                onChange={ev => setUsername(ev.target.value)}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="password" className="form-label">Password</label>
                                            <input type="password" className="form-control" 
                                            id="password" placeholder="Enter your password" 
                                            value={password}
                                            onChange={ev => setPassword(ev.target.value)}
                                            />
                                        </div>
                                        <div className="register-container">  
                                            <button type="submit" className="btn btn-primary btn-block">Register</button>
                                            <div className="login-container">
                                                <p className="message-container">Already have an account? </p>
                                                <NavLink to="/login" className='register'> Login</NavLink>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                        </div>
                    </div>
                </div>
            </div>
      </div>
  //need all these divs to pretty up the login page, container, row, col, card are all bootstrap classes
    )
}