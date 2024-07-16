import React, { useEffect, useState } from 'react';
import { getRecipe, deleteRecipe } from '../../Api';
import { useParams, useNavigate } from 'react-router-dom';

const RecipeDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [recipe, setRecipe] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const response = await getRecipe(id);
                setRecipe(response.data);
            } catch (error) {
                console.error('Failed to fetch recipes:', error);
                setError('Failed to fetch recipe details.');
            }
        };

        fetchRecipes();
    }, [id]);

    const handleDelete = async () => {
        try {
            await deleteRecipe(id);
            alert('Recipe deleted successfully')
            navigate('/')
        } catch (error) {
            alert('Error deleting task')
        }
    };

    return (
        <div>
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
                        <th>Instructions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{recipe.name}</td>
                        <td>{recipe.category}</td>
                        <td>
                            {recipe.ingredients && recipe.ingredients.length > 0
                                ? recipe.ingredients.map((ingredient, index) => (
                                    <span key={index}>
                                        {ingredient.name}
                                        {index < recipe.ingredients.length - 1 ? ', ' : ''}
                                    </span>
                                ))
                                : 'No ingredients listed'}
                        </td>
                        <td>{recipe.cooking_duration}</td>
                        <td>{recipe.dietary_preferences}</td>
                        <td>{recipe.difficulty_level}</td>
                        <td>{recipe.instructions}</td>
                    </tr>
                </tbody>
            </table>
            <button onClick={() => navigate('/')}>All Recipes</button>
            <button onClick={() => navigate(`/recipe/${id}/edit`)}>Edit Recipe</button>
            <button onClick={() => handleDelete(id)}>Delete Recipe</button>
        </div>
    );
};

export default RecipeDetails;