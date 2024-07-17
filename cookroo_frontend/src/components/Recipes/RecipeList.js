import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CATEGORY_CHOICES, DIETARY_CHOICES, DIFFICULTY_CHOICES, ChoiceMapper } from './Choices';

const RecipeList = ({ fetchRecipes, isPersonal }) => {
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        const fetchRecipeData = async () => {
            try {
                const response = await fetchRecipes();
                setRecipes(response.data);
            } catch (error) {
                console.error('Failed to fetch recipes:', error);
            }
        };

        fetchRecipeData();
    }, [fetchRecipes]);

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h2 className="text-4xl font-extrabold mb-8 text-center text-gray-800">
                {isPersonal ? 'Personal Recipes' : 'Public Recipes'}
            </h2>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
                    <thead className="bg-gray-200 border-b border-gray-300">
                        <tr>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Name</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Category</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Ingredients</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Cooking Duration</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Dietary Preferences</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Difficulty Level</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {recipes.map((recipe) => (
                            <tr key={recipe.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <Link to={`/recipe/${recipe.id}`} state={{ isPersonal }} className="text-indigo-600 hover:text-indigo-800 font-medium">
                                        {recipe.name}
                                    </Link>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                    <ChoiceMapper value={recipe.category} choices={CATEGORY_CHOICES} />
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                    {recipe.ingredients.map(ingredient => ingredient.name).join(', ')}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                    {recipe.cooking_duration}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                    <ChoiceMapper value={recipe.dietary_preferences} choices={DIETARY_CHOICES} />
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                    <ChoiceMapper value={recipe.difficulty_level} choices={DIFFICULTY_CHOICES} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default RecipeList;