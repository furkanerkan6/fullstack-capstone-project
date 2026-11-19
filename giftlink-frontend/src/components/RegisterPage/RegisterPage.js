import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { urlConfig } from '../../config';
import { useAppContext } from '../../context/AuthContext';
import './RegisterPage.css';

function RegisterPage() {
    // Task 1: Create state variables for all the inputs
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showerr, setShowerr] = useState('');

    const navigate = useNavigate();
    const { setIsLoggedIn, setUserName } = useAppContext();

    // Task 2: Create a function handleRegister that sends a POST request to the backend
    const handleRegister = async () => {
        try {
            const response = await fetch(`${urlConfig.backendUrl}/api/auth/register`, {
                // Task 3: Set the method
                method: 'POST',
                // Task 4: Set the headers
                headers: {
                    'content-type': 'application/json',
                },
                // Task 5: Set the body to send the user details
                body: JSON.stringify({
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    password: password,
                }),
            });

            const json = await response.json();

            if (json.authtoken) {
                // Task 6: Store the auth token, name and email in session storage
                sessionStorage.setItem('auth-token', json.authtoken);
                sessionStorage.setItem('name', firstName);
                sessionStorage.setItem('email', json.email);
                // Task 7: Set the user's state to log in using the useAppContext
                setIsLoggedIn(true);
                setUserName(firstName);
                // Task 8: Navigate to the MainPage after logging in
                navigate('/app');
            }
            if (json.error) {
                setShowerr(json.error);
            } else if (json.errors) {
                setShowerr(json.errors.map(e => e.msg).join(', '));
            }
        } catch (e) {
            console.log("Error fetching details: " + e.message);
            setShowerr('Registration failed. Please try again.');
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6 col-lg-4">
                    <div className="register-card p-4 border rounded">
                        <h2 className="text-center mb-4 font-weight-bold">Register</h2>

                        {/* Task 1: Create input elements for all the variables - firstName, lastName, email, password */}
                        <div className="mb-3">
                            <label htmlFor="firstName" className="form-label">First Name</label>
                            <input
                                id="firstName"
                                type="text"
                                className="form-control"
                                placeholder="Enter your first name"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="lastName" className="form-label">Last Name</label>
                            <input
                                id="lastName"
                                type="text"
                                className="form-control"
                                placeholder="Enter your last name"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input
                                id="email"
                                type="email"
                                className="form-control"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
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
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <div className="text-danger mb-2">{showerr}</div>

                        {/* Task 2: Create a button that performs the `handleRegister` function on click */}
                        <button className="btn btn-primary w-100 mb-3" onClick={handleRegister}>Register</button>

                        <p className="mt-4 text-center">
                            Already a member? <a href="/app/login" className="text-primary">Login</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RegisterPage;
