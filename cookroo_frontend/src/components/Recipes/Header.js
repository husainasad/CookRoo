import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Auth/AuthContext';
import { FaBars, FaTimes } from 'react-icons/fa';

const Header = () => {
    const { isAuthenticated, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <nav className="bg-indigo-600 p-4 shadow-md">
            <div className="container mx-auto flex items-center justify-between">
                <div className="flex items-center">
                    <button
                        onClick={() => navigate('/')}
                        className="text-white text-2xl font-bold hover:text-gray-200"
                    >
                        Home
                    </button>
                </div>
                <div className="lg:hidden">
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="text-white text-2xl"
                    >
                        {isMenuOpen ? <FaTimes /> : <FaBars />}
                    </button>
                </div>
                <div className={`lg:flex flex-grow items-center justify-center lg:justify-end space-x-4 ${isMenuOpen ? 'block' : 'hidden'}`}>
                    {isAuthenticated ? (
                        <>
                            <button
                                onClick={() => navigate('/personal-recipes')}
                                className="text-white text-lg font-medium hover:text-gray-200"
                            >
                                Personal Recipes
                            </button>
                            <button
                                onClick={() => navigate('/add-recipe')}
                                className="text-white text-lg font-medium hover:text-gray-200"
                            >
                                Add Recipe
                            </button>
                            <button
                                onClick={handleLogout}
                                className="text-white text-lg font-medium hover:text-gray-200"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <button
                                onClick={() => navigate('/login')}
                                className="text-white text-lg font-medium hover:text-gray-200"
                            >
                                Login
                            </button>
                            <button
                                onClick={() => navigate('/register')}
                                className="text-white text-lg font-medium hover:text-gray-200"
                            >
                                Register
                            </button>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Header;
