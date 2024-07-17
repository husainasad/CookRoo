import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Auth/AuthContext';

const Navbar = () => {
    const { isAuthenticated, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <nav>
            <button onClick={() => navigate('/')}>All Recipes</button>
            {isAuthenticated ? (
                <>
                    <button onClick={() => navigate('/personal-recipes')}>Personal Recipes</button>
                    <button onClick={() => navigate('/add-recipe')}>Add Recipe</button>
                    <button onClick={handleLogout}>Logout</button>
                </>
            ) : (
                <>
                    <button onClick={() => navigate('/login')}>Login</button>
                    <button onClick={() => navigate('/register')}>Register</button>
                </>
            )}
        </nav>
    );
};

export default Navbar;