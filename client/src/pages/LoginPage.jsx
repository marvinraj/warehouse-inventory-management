import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const login = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/api/auth/", { username, password });
            if (response.data && response.data.length > 0) {
                const user = response.data[0];
                const role = user.role;
                localStorage.setItem('role', role);
                localStorage.setItem('username', user.username);
                navigate("/dashboard");
            } else {
                setErrorMessage("wrong username or password.");
            }
        } catch (err) {
            if (err.response && err.response.data) {
                setErrorMessage(err.response.data.message);
            } else {
                setErrorMessage('error occurred');
            }
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            {/* login form */}
            <form className="max-w-sm w-full mx-auto" onSubmit={login}>
                {/* title */}
                <h1 className="font-bold text-2xl text-center mb-5">LOGIN FORM</h1>
                {/* inputs & labels */}
                <div className="mb-5">
                    <label className="block mb-2 text-sm font-medium text-gray-900 ">Your username:</label>
                    <input
                        type="text"
                        onChange={(e) => setUsername(e.target.value)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                        placeholder="Username"
                        required/>
                </div>
                <div className="mb-5">
                    <label className="block mb-2 text-sm font-medium text-gray-900 ">Your password:</label>
                    <input
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                        placeholder="Password"
                        required/>
                </div>
                {/* login button */}
                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">
                    Login
                </button>
                {/* display error message if login fails */}
                {errorMessage && <div className="text-red-500 text-center mt-3">{errorMessage}</div>}
            </form>
        </div>
    );
};

export default LoginPage;
