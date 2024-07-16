import React from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import RecipeList from './components/Recipes/RecipeList';
import AddRecipe from './components/Recipes/AddRecipe';
import RecipeDetails from './components/Recipes/RecipeDetails';
import EditRecipe from './components/Recipes/EditRecipe';

const App = () => {
    const navigate = useNavigate();

    return (
        <div>
            <Routes>
                <Route path="/" element={<RecipeList />} />
                <Route path="/add-recipe" element={<AddRecipe />} />
                <Route path="/recipe/:id" element={<RecipeDetails />} />
                <Route path="/recipe/:id/edit" element={<EditRecipe />} />
            </Routes>
        </div>
    );
};

const AppWrapper = () => (
    <Router>
        <App />
    </Router>
);

export default AppWrapper;