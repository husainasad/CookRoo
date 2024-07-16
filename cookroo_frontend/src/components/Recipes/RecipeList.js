import React, { useEffect, useState } from 'react';
import { getRecipes } from '../../Api';
import { Link, useNavigate } from 'react-router-dom';


const RecipeList = () => {
    const [recipes, setRecipes] = useState([]);
    const navigate = useNavigate()

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const response = await getRecipes();
                setRecipes(response.data);
            } catch (error) {
                console.error('Failed to fetch recipes:', error);
            }
        };

        fetchRecipes();
    }, []);

    return (
        <div>
            <nav>
                <button onClick={() => navigate('/add-recipe')}>Add Recipe</button>
            </nav>
            <h2>Recipes</h2>
            <table border="1">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Ingredients</th>
                        <th>Cooking Duration</th>
                        <th>Dietary Preferences</th>
                        <th>Difficulty Level</th>
                    </tr>
                </thead>
                <tbody>
                    {recipes.map((recipe) => (
                        <tr key={recipe.id}>
                            <td><Link to={`/recipe/${recipe.id}`}>{recipe.name}</Link></td>
                            <td>{recipe.category}</td>
                            <td>{recipe.ingredients.map(ingredient => ingredient.name).join(', ')}</td>
                            <td>{recipe.cooking_duration}</td>
                            <td>{recipe.dietary_preferences}</td>
                            <td>{recipe.difficulty_level}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default RecipeList;