import React, { useEffect, useState } from 'react';
import { getRecipe, deleteRecipe } from '../../Api';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { CATEGORY_CHOICES, DIETARY_CHOICES, DIFFICULTY_CHOICES, ChoiceMapper } from './Choices';

const RecipeDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const { isPersonal } = location.state || {};

    const [recipe, setRecipe] = useState([]);

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const response = await getRecipe(id);
                setRecipe(response.data);
            } catch (error) {
                console.error('Failed to fetch recipes:', error);
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
            <h2>Recipes Details</h2>
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
                        <td><ChoiceMapper value={recipe.category} choices={CATEGORY_CHOICES} /></td>
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
                        <td><ChoiceMapper value={recipe.dietary_preferences} choices={DIETARY_CHOICES} /></td>
                        <td><ChoiceMapper value={recipe.difficulty_level} choices={DIFFICULTY_CHOICES} /></td>
                        <td>{recipe.instructions}</td>
                    </tr>
                </tbody>
            </table>
            {isPersonal && (
                <>
                    <button onClick={() => navigate(`/recipe/${id}/edit`)}>Edit Recipe</button>
                    <button onClick={handleDelete}>Delete Recipe</button>
                </>
            )}
        </div>
    );
};

export default RecipeDetails;