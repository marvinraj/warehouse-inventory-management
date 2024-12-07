import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    
    const navigate = useNavigate();

    // Handles login
    const login = async (e) => {
        e.preventDefault();  // Prevent form default submission
        try {
            const response = await axios.post("http://localhost:5000/api/auth/", { username, password });
            console.log(response.data);  // Log the response to see if it's successful

            // Check if login was successful (you can adjust based on response structure)
            if (response.data && response.data.length > 0) {
                // After successful login, redirect to inventory page
                navigate("/inventory");
            } else {
                console.log("Invalid credentials");
                // Optionally, show a message in the UI
            }
        } catch (err) {
            // Handle error, set the error message to display on the UI
            if (err.response && err.response.data) {
                setErrorMessage(err.response.data.message);  // Set the error message from backend
            } else {
                setErrorMessage('An error occurred. Please try again.');
            }
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <form className="max-w-sm w-full mx-auto" onSubmit={login}>
                <h1 className="font-bold text-2xl text-center mb-5">LOGIN FORM</h1>
                <div className="mb-5">
                    <label className="block mb-2 text-sm font-medium text-gray-900 ">Your email</label>
                    <input
                        type="text"
                        onChange={(e) => setUsername(e.target.value)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="Username"
                        required/>
                </div>
                <div className="mb-5">
                    <label className="block mb-2 text-sm font-medium text-gray-900 ">Your password</label>
                    <input
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="Password"
                        required/>
                </div>
                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">
                    Login
                </button>
                {/* Display error message if login fails */}
                {errorMessage && <div className="text-red-500 text-center mt-3">{errorMessage}</div>}
            </form>
        </div>
    );
};

export default LoginPage;
