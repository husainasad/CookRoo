import React, { useEffect, useState } from 'react';
import { getRecipe, deleteRecipe } from '../../Api';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { CATEGORY_CHOICES, DIETARY_CHOICES, DIFFICULTY_CHOICES, ChoiceMapper } from './Choices';

const RecipeDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const { isPersonal } = location.state || {};

    const [recipe, setRecipe] = useState({});

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const response = await getRecipe(id);
                setRecipe(response.data);
            } catch (error) {
                console.error('Failed to fetch recipe:', error);
            }
        };

        fetchRecipe();
    }, [id]);

    const handleDelete = async () => {
        try {
            await deleteRecipe(id);
            alert('Recipe deleted successfully');
            navigate('/');
        } catch (error) {
            alert('Error deleting recipe');
        }
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-3xl font-bold mb-4">{recipe.name}</h2>
                <div className="mb-8">
                    <h3 className="text-xl font-semibold mb-2">Category</h3>
                    <p className="text-gray-700"><ChoiceMapper value={recipe.category} choices={CATEGORY_CHOICES} /></p>
                </div>
                <div className="mb-8">
                    <h3 className="text-xl font-semibold mb-2">Ingredients</h3>
                    <p className="text-gray-700">
                        {recipe.ingredients && recipe.ingredients.length > 0
                            ? recipe.ingredients.map((ingredient, index) => (
                                <span key={index}>
                                    {ingredient.name}
                                    {index < recipe.ingredients.length - 1 ? ', ' : ''}
                                </span>
                            ))
                            : 'No ingredients listed'}
                    </p>
                </div>
                <div className="mb-8">
                    <h3 className="text-xl font-semibold mb-2">Cooking Duration</h3>
                    <p className="text-gray-700">{recipe.cooking_duration} minutes</p>
                </div>
                <div className="mb-8">
                    <h3 className="text-xl font-semibold mb-2">Dietary Preferences</h3>
                    <p className="text-gray-700"><ChoiceMapper value={recipe.dietary_preferences} choices={DIETARY_CHOICES} /></p>
                </div>
                <div className="mb-8">
                    <h3 className="text-xl font-semibold mb-2">Difficulty Level</h3>
                    <p className="text-gray-700"><ChoiceMapper value={recipe.difficulty_level} choices={DIFFICULTY_CHOICES} /></p>
                </div>
                <div className="mb-8">
                    <h3 className="text-xl font-semibold mb-2">Instructions</h3>
                    <p className="text-gray-700 whitespace-pre-line">{recipe.instructions}</p>
                </div>
                {isPersonal && (
                    <div className="mt-6 flex justify-end space-x-4">
                        <button
                            onClick={() => navigate(`/recipe/${id}/edit`)}
                            className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            Edit Recipe
                        </button>
                        <button
                            onClick={handleDelete}
                            className="px-4 py-2 bg-red-600 text-white font-semibold rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                        >
                            Delete Recipe
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default RecipeDetails;