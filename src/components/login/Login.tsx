import React, { useContext, useState } from 'react';
import { Navigate, NavLink } from 'react-router-dom';
import { UserContext, UserContextType } from '../../UserContext';
import "./Login.css"

export const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);
    const {setUserData} = useContext(UserContext) as UserContextType;

    const handleLogin = async (ev: React.FormEvent) => {
        ev.preventDefault();
        const isAuthenticated = await fetch('https://khai-blog-api.vercel.app/login', {
            method: 'POST',
            body: JSON.stringify({username, password}),
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
        });
        if (isAuthenticated.ok) {
            isAuthenticated.json().then(userInfo => {
                setUserData(userInfo);
                setRedirect(true);
            })
        }
        else {
            alert("Wrong username or password.")
        }
    }
    
    if (redirect) {
        return <Navigate to={'/'} />
    }



    return (
        <div className="content">
            <div className="container">
                <div className="row">
                    <div className="col-md-6 offset-md-3">
                        <div className="card">
                            <div className="card-body">
                                <h3 className="card-title text-center">Login</h3>
                                    <form onSubmit={handleLogin}>
                                        <div className="mb-3">
                                            <label htmlFor="email" className="form-label">Email</label>
                                            <input type="email" className="form-control" 
                                                id="email" placeholder="Enter your email" 
                                                value={username}
                                                onChange={ev => setUsername(ev.target.value)}/>
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="password" className="form-label">Password</label>
                                            <input type="password" className="form-control" 
                                                id="password" placeholder="Enter your password" 
                                                value={password}
                                                onChange={ev => setPassword(ev.target.value)}/>
                                        </div>
                                        <div className="register-container">
                                            <button type="submit" className="btn btn-primary btn-block">Login</button>
                                            <NavLink to="/register" className='register'>Register</NavLink>
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