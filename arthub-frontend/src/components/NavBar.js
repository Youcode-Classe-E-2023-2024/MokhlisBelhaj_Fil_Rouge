import React, { useContext, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../img/logo512.png';
import { logoutQuery } from '../auth/user-axios';
import UserContext from '../auth/user-context';

const NavBar = () => {
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const [showUserProfile, setShowUserProfile] = useState(false);
    const location = useLocation();
    const [currentUser, setCurrentUser] = useContext(UserContext);

    const handleMobileMenuToggle = () => {
        setShowMobileMenu(!showMobileMenu);
    };

    const handleUserProfileToggle = () => {
        setShowUserProfile(!showUserProfile);
    };

    const isLoginPage = location.pathname === '/login';
    const isRegisterPage = location.pathname === '/register';

    if (isLoginPage || isRegisterPage) {
        return null;
    }

    return (
        <nav className="bg-gray-200">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center py-4">
                    <Link to="/" className="flex items-center">
                        <img src={logo} className="w-12 h-12" alt="Arthub Logo" />
                        <span className="ml-2 text-black text-lg font-bold">ArtHub</span>
                    </Link>

                    <div className="hidden md:flex items-center space-x-6 font-bold">
                        <NavLink to="/artists">Artists</NavLink>
                        <NavLink to="/articles">Articles</NavLink>
                    </div>

                    <div className="flex items-center space-x-4">
                        {currentUser ? (
                            <div className="relative">
                                <button onClick={handleUserProfileToggle} className="hidden md:flex items-center space-x-2 rounded-full bg-gray-200 hover:bg-gray-300 py-2 px-4 focus:outline-none">
                                    <img src={currentUser.imageUrl} className="w-8 h-8 rounded-full" alt="User Image" />
                                    <svg className="w-4 h-4 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>
                                {showUserProfile && (
                                    <div className="hidden md:block absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg">
                                        <div className="py-1">
                                        <NavLink to="/MyProfile" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">My Profile</NavLink>
                                            {currentUser.role === 'admin' && (
                                                <NavLink to="/dashboard" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Dashboard</NavLink>
                                            )}
                                            <button className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200 focus:outline-none" onClick={() => logoutQuery(setCurrentUser)}>Logout</button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <>
                            <div className='hidden md:flex'>
                                <NavLink to="/login">Login</NavLink>
                                <NavLink to="/register" className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition duration-300">Sign up</NavLink>
                            </div>
                            </>
                        )}

                    </div>
                        <button className="md:hidden" onClick={handleMobileMenuToggle}>
                            <svg className="w-6 h-6 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                </div>
            </div>

            {showMobileMenu && (
                <div className="md:hidden bg-gray-800 py-4">
                    <MobileNavLink to="/artists">Artists</MobileNavLink>
                    <MobileNavLink to="/articles">Articles</MobileNavLink>
                    {!currentUser ? (
                        <>
                            <MobileNavLink to="/login">Login</MobileNavLink>
                            <MobileNavLink to="/register">Sign up</MobileNavLink>
                        </>
                    ) : (
                        <>
                            {currentUser.role === 'admin' && (
                                <MobileNavLink to="/dashboard">Dashboard</MobileNavLink>
                            )}
                            <MobileNavLink to="/MyProfile">My Profile</MobileNavLink>
                            <button className="block py-2 px-4 text-white hover:bg-gray-700" onClick={() => logoutQuery(setCurrentUser)}>Logout</button>
                        </>
                    )}
                </div>
            )}
        </nav>
    );
};

const NavLink = ({ to, children }) => {
    const location = useLocation();
    const isActive = location.pathname === to;

    return (
        <Link to={to} className={`block px-4 py-2 text-gray-800 hover:bg-gray-200 ${isActive ? 'font-semibold' : ''}`}>
            {children}
        </Link>
    );
};

const MobileNavLink = ({ to, children }) => {
    const location = useLocation();
    const isActive = location.pathname === to;

    return (
        <Link to={to} className={`block py-2 px-4 text-white hover:bg-gray-700 ${isActive ? 'font-semibold' : ''}`}>
            {children}
        </Link>
    );
};

export default NavBar;
