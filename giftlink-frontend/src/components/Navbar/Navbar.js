import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AuthContext';

export default function Navbar() {
    const { isLoggedIn, setIsLoggedIn, userName, setUserName } = useAppContext();
    const navigate = useNavigate();

    useEffect(() => {
        const authTokenFromSession = sessionStorage.getItem('auth-token');
        const nameFromSession = sessionStorage.getItem('name');
        if (authTokenFromSession) {
            if (isLoggedIn && nameFromSession) {
                setUserName(nameFromSession);
            } else {
                sessionStorage.removeItem('auth-token');
                sessionStorage.removeItem('name');
                sessionStorage.removeItem('email');
                setIsLoggedIn(false);
            }
        }
    }, [isLoggedIn, setIsLoggedIn, setUserName]);

    const handleLogout = () => {
        sessionStorage.removeItem('auth-token');
        sessionStorage.removeItem('name');
        sessionStorage.removeItem('email');
        setIsLoggedIn(false);
        navigate(`/app`);
    };

    const profileSection = () => {
        navigate(`/app/profile`);
    };

    return (
        <nav className="navbar navbar-expand navbar-light bg-light px-3 flex-wrap" id="navbar_container">
            <a className="navbar-brand" href={`${process.env.PUBLIC_URL}/home.html`}>GiftLink</a>

            <div className="collapse navbar-collapse flex-wrap" id="navbarNav">
                <ul className="navbar-nav">
                    {/* Task 1: Add links to Home and Gifts below*/}
                    <li className="nav-item">
                        <a className="nav-link" href={`${process.env.PUBLIC_URL}/home.html`}>Home</a>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/app">Gifts</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/app/search">Search</Link>
                    </li>
                </ul>
                <ul className="navbar-nav ms-auto">
                    {isLoggedIn ? (
                        <>
                            <li className="nav-item">
                                <span className="nav-link" style={{ color: "black", cursor: "pointer" }} onClick={profileSection}>Welcome, {userName}</span>
                            </li>
                            <li className="nav-item">
                                <button className="nav-link login-btn btn btn-link" onClick={handleLogout}>Logout</button>
                            </li>
                        </>
                    ) : (
                        <>
                            <li className="nav-item">
                                <Link className="nav-link login-btn" to="/app/login">Login</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link register-btn" to="/app/register">Register</Link>
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </nav>
    );
}
