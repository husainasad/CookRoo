import React from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const PrivateRoute = ({ element: Element, ...rest }) => {
    const token = localStorage.getItem('access');
    let isAuthenticated = false;

    if (token) {
        try {
            const decodedToken = jwtDecode(token);
            isAuthenticated = decodedToken.exp * 1000 > Date.now();
        } catch (e) {
            isAuthenticated = false;
        }
    }

    return isAuthenticated ? <Element {...rest} /> : <Navigate to="/login" />;
};

export default PrivateRoute;