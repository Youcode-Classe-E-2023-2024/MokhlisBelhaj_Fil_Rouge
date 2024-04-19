import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../img/logo512.png';
import UserContext from '../auth/user-context';
import { useContext } from 'react';
import { logoutQuery } from '../auth/user-axios';

const NavBar = () => {
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const location = useLocation();
    const [currentUser, setCurrentUser] = useContext(UserContext);


    const handleMobileMenuToggle = () => {
        setShowMobileMenu(!showMobileMenu);
    };

    // Check if the current path is login or register
    const isLoginPage = location.pathname === '/login';
    const isRegisterPage = location.pathname === '/register';

    // Conditionally render the navbar based on the current page
    if (isLoginPage || isRegisterPage) {
        return null; // Return null to hide the navbar on login and register pages
    }

    return (
        <nav className="bg-gray-200">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center py-4">

                    {/* Logo */}
                    <Link to="/" className="flex items-center">
                        <img src={logo} className="w-28" alt="Arthub Logo" />
                        <span className="ml-2 text-black text-lg font-bold">ArtHub</span>
                    </Link>

                    {/* Primary Navigation */}
                    <div className="hidden md:flex  items-center font-bold space-x-6">
                        <NavLink to="/artists" className="font-bold">Artists</NavLink>
                        <NavLink to="/article" className="font-bold">Articles</NavLink>
                    </div>

                    {/* Secondary Navigation & Mobile Menu Button */}
                    
                    <div className="flex items-center space-x-4">
                        {!currentUser ?<>
                            <NavLink to="/login">Login</NavLink>
                        <NavLink to="/register" className="bg-black text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-100 transition duration-300">Sign up</NavLink>
                        </>:<> 
                        <NavLink to="/MyProfile"> {currentUser.name}</NavLink>
                        {
                            currentUser?.role==="admin"
                            ?<>
                            
                            <NavLink to="/dashboard"> dashboard</NavLink>

                            </>
                            :<>
                            </>
                        }
                         <button onClick={()=>logoutQuery(setCurrentUser)} >logout</button>
                        </>}
                       

                        <button className="md:hidden" onClick={handleMobileMenuToggle}>
                            <svg className="w-6 h-6 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>

                </div>
            </div>

            {/* Mobile Menu */}
            {showMobileMenu && (
                <div className="md:hidden bg-gray-800 py-4">
                    <MobileNavLink to="/artists">Artists</MobileNavLink>
                    <MobileNavLink to="/article">Articles</MobileNavLink>
                    <MobileNavLink to="/login">Login</MobileNavLink>
                    <MobileNavLink to="/register">Sign up</MobileNavLink>
                </div>
            )}
        </nav>
    );
};

// Custom NavLink component to handle active state
const NavLink = ({ to, children }) => {
    const location = useLocation();
    const isActive = location.pathname === to;

    return (
        <Link to={to} className={`text-black hover:text-blue-500 transition duration-300 ${isActive ? 'font-semibold' : ''}`}>
            {children}
        </Link>
    );
};

// Custom NavLink component for mobile menu
const MobileNavLink = ({ to, children }) => {
    const location = useLocation();
    const isActive = location.pathname === to;

    return (
        <Link to={to} className={`block py-2 px-4 text-black hover:bg-gray-700 ${isActive ? 'font-semibold' : ''}`}>
            {children}
        </Link>
    );
};

export default NavBar;
