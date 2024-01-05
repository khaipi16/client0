import { useContext, useEffect, useState } from 'react';
import {NavLink} from 'react-router-dom';
import { UserContext, UserContextType } from '../../UserContext';
import './Navbar.css'


export const Navbar = () => {
    const {userData, setUserData} = useContext(UserContext) as UserContextType;

    useEffect(() => {
        fetch('http://localhost:4000/profile', {
            credentials: 'include',
        }).then(response => {
            response.json().then(userInfo => {
                setUserData(userInfo)
            });
        });
    }, []);

    const logout = () => {
        fetch('http://localhost:4000/logout', {
            credentials: 'include',
            method: 'POST'
        });
        setUserData({username: '', id: ''})
    }

    const username = userData.username

    return (
        <nav className='navbar navbar-expand-lg navbar-dark bg-dark'> { /* shading and configurations for the navbar itself */}
            <div className='container'>
                <div className='left-container'>
                        {username && (
                            <div>
                            <NavLink to="/login" onClick={logout} className='navbar-link'>Logout</NavLink>
                            <span>|</span>
                            <NavLink to="/" className='navbar-brand'>| My Blog</NavLink>
                            </div>
                        )}
                        {!username && (
                            <div>
                            <NavLink to="/login" className='navbar-link'>Login</NavLink>
                            <span>|</span>
                            <NavLink to="/" className='navbar-brand'>| My Blog</NavLink>
                            </div>
                        )}
                </div>
                <ul className='navbar-menu'>
                    <li className='navbar-item'>
                        <NavLink to='write' className='navbar-link'>Write</NavLink>
                    </li>
                    <li className='navbar-item'>
                        <NavLink to='recent-blogs' className='navbar-link'>Recent Blogs</NavLink>
                    </li>
                    <li className='navbar-item'>
                        <NavLink to='/projects' className='navbar-link'>Projects</NavLink>
                    </li>
                    <li className='navbar-item'>
                        <NavLink to="/about" className='navbar-link'>About</NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    )
}