import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import RecipeList from './components/Recipes/RecipeList';
import AddRecipe from './components/Recipes/AddRecipe';
import RecipeDetails from './components/Recipes/RecipeDetails';
import EditRecipe from './components/Recipes/EditRecipe';
import Navbar from './components/Recipes/Navbar';
import AuthProvider from './components/Auth/AuthContext';

const App = () => (
    <AuthProvider>
        <Navbar />
        <Routes>
            <Route path="/" element={<RecipeList />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/add-recipe" element={<AddRecipe />} />
            <Route path="/recipe/:id" element={<RecipeDetails />} />
            <Route path="/recipe/:id/edit" element={<EditRecipe />} />
        </Routes>
    </AuthProvider>
);

const AppWrapper = () => (
    <Router>
        <App />
    </Router>
);

export default AppWrapper;