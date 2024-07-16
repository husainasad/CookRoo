import React, { createContext, useContext, useState, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode';

// Create AuthContext
const AuthContext = createContext();

// AuthProvider Component
export const AuthProvider = ({ children }) => {
    const [authToken, setAuthToken] = useState(localStorage.getItem('access') || null);

    useEffect(() => {
        if (authToken) {
            const decodedToken = jwtDecode(authToken);
            if (decodedToken.exp * 1000 < Date.now()) {
                setAuthToken(null);
                localStorage.removeItem('access');
                localStorage.removeItem('refresh');
            }
        }
    }, [authToken]);

    const saveAuthToken = (token) => {
        localStorage.setItem('access', token);
        setAuthToken(token);
    };

    const clearAuthToken = () => {
        localStorage.removeItem('access');
        localStorage.removeItem('refresh');
        setAuthToken(null);
    };

    return (
        <AuthContext.Provider value={{ authToken, setAuthToken: saveAuthToken, clearAuthToken }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};