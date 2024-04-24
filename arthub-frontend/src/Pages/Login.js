import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import useApiAxios from '../config/axios';
import UserContext from '../auth/user-context';




const Login = () => {
  //CurrentUser
  const [currentUser, setCurrentUser] = useContext(UserContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const Navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        try {
            const response = await useApiAxios.post('/login', {
                email: email,
                password: password
            });

            // Assuming the token is returned in the response data
            const token = response.data.data.token;
            const user = response.data.data.user;

            // Store the token in local storage or session storage
            localStorage.setItem('token', token);
            setCurrentUser(user);
            console.log(currentUser);

            // Redirect the user to another page, e.g., dashboard
            Navigate('/');
        } catch (error) {
            console.error('Login failed:', error.response.data.message);
            setError(error.response.data.message); // Set error message state
        }
    };

    return (
        <section className="flex flex-col md:flex-row h-screen items-center"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1615184697985-c9bde1b07da7?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" }}>

            <div className="w-full md:w-1/2 xl:w-2/3 h-screen hidden lg:block">
                {/* Your background image */}
            </div>

            <div className="w-full md:max-w-md lg:max-w-full md:mx-auto md:mx-0 md:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12
                flex items-center justify-center backdrop-blur-xl">

                <div className="w-full h-100">
                    <Link to="/" className="text-8xl text-white text-center font-semibold outline-text si">
                        <h1 className="">ArtHub</h1>
                    </Link>
                    <h1 className="text-xl md:text-4xl text-white font-bold leading-tight mt-12 text-3d">Log in to your account</h1>


                    <form onSubmit={handleSubmit} className="mt-6">
                        <div>
                            <label htmlFor="email" className="block text-white text-lg  font-bold">Email Address</label>
                            <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter Email Address"
                                className="w-full px-4 py-3 rounded-lg  mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                                autoFocus autoComplete="email" required />
                        </div>

                        <div className="mt-4">
                            <label htmlFor="password" className="block text-white text-lg font-bold">Password</label>
                            <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter Password" minLength="6"
                                className="w-full px-4 py-3 rounded-lg  mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                                autoComplete="current-password" required />
                        </div>
                                {error && <p className="text-white text-center text-lg bg-red-500 font-bold rounded-lg  mt-2">{error}</p>} {/* Display error message if error state is not empty */}

                        <div className="text-right mt-2">
                            <a href="#" className="text-lg font-semibold text-white hover:text-blue-700 font-bold focus:text-blue-700">Forgot Password?</a>
                        </div>

                        <button type="submit"
                            className="w-full block bg-yellow-500 hover:bg-yellow-400 focus:bg-yellow-400 text-white font-semibold rounded-lg
                            px-4 py-3 mt-6">Log In</button>
                    </form>

                    <hr className="my-6 border-gray-300 w-full" />

                    <p className="mt-8 text-md font-bold text-center  w-fit backdrop-blur-xl">Need an account? <Link to="/register" className="text-white hover:text-blue-700  font-semibold backdrop-blur-xl">Create an account</Link ></p>
                </div>
            </div>
        </section>
    );
};

export default Login;
