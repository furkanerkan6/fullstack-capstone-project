import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { urlConfig } from '../../config';
import { useAppContext } from '../../context/AuthContext';
import './LoginPage.css';

function LoginPage() {
    // Task 1: Create state variables for email, password and errors
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [incorrect, setIncorrect] = useState('');

    const navigate = useNavigate();
    const bearerToken = sessionStorage.getItem('auth-token');
    const { setIsLoggedIn, setUserName } = useAppContext();

    // If the user is already logged in, go straight to the main page
    useEffect(() => {
        if (sessionStorage.getItem('auth-token')) {
            navigate('/app');
        }
    }, [navigate]);

    // Task 2: Create a function handleLogin that sends a POST request to the backend
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${urlConfig.backendUrl}/api/auth/login`, {
                // Task 3: Set the method
                method: 'POST',
                // Task 4: Set the headers, including Content-Type and Authorization
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': bearerToken ? `Bearer ${bearerToken}` : '',
                },
                // Task 5: Set the body to send the user credentials
                body: JSON.stringify({
                    email: email,
                    password: password,
                }),
            });

            // Task 6: Access the data and set the user details
            const json = await response.json();
            if (json.authtoken) {
                sessionStorage.setItem('auth-token', json.authtoken);
                sessionStorage.setItem('name', json.userName);
                sessionStorage.setItem('email', json.userEmail);
                // Task 7: Set the user's state to log in using the useAppContext
                setIsLoggedIn(true);
                setUserName(json.userName);
                // Task 8: Navigate to the MainPage after logging in
                navigate('/app');
            } else {
                // Task 9: Clear the input fields and show an error message
                document.getElementById("email").value = "";
                document.getElementById("password").value = "";
                setEmail('');
                setPassword('');
                setIncorrect("Wrong email or password. Try again.");
                // Remove the error message after 2 seconds
                setTimeout(() => {
                    setIncorrect("");
                }, 2000);
            }
        } catch (e) {
            console.log("Error fetching details: " + e.message);
            setIncorrect('Login failed. Please try again.');
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6 col-lg-4">
                    <form className="login-card p-4 border rounded" onSubmit={handleLogin}>
                        <h2 className="text-center mb-4 font-weight-bold">Login</h2>

                        {/* Task 1: Create input elements for email and password */}
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input
                                id="email"
                                type="email"
                                className="form-control"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => { setEmail(e.target.value); setIncorrect(''); }}
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input
                                id="password"
                                type="password"
                                className="form-control"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => { setPassword(e.target.value); setIncorrect(''); }}
                            />
                        </div>

                        <span style={{ color: 'red', height: '.5cm', display: 'block', fontStyle: 'italic', fontSize: '12px' }}>{incorrect}</span>

                        {/* Task 2: Create a button that performs the `handleLogin` function on click */}
                        <button type="submit" className="btn btn-primary w-100 mb-3">Login</button>

                        <p className="mt-4 text-center">
                            New here? <a href="/app/register" className="text-primary">Register Here</a>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
