import React, { useState, useEffect } from 'react';
import { CATEGORY_CHOICES, DIETARY_CHOICES } from './Choices';

const RecipeFilter = ({ recipes, onFilter }) => {
    const [categoryFilter, setCategoryFilter] = useState('');
    const [dietaryFilter, setDietaryFilter] = useState('');
    const [ingredientFilter, setIngredientFilter] = useState('');

    useEffect(() => {
        const filterRecipes = () => {
            const ingredientsArray = ingredientFilter.split(',').map(ingredient => ingredient.trim().toLowerCase());
            let filteredRecipes = recipes.filter(recipe => {
                const categoryMatch = categoryFilter ? recipe.category === categoryFilter : true;
                const dietaryMatch = dietaryFilter ? recipe.dietary_preferences === dietaryFilter : true;
                const ingredientMatch = ingredientsArray.length > 0 
                    ? ingredientsArray.some(ingredient => 
                        recipe.ingredients.some(recipeIngredient => 
                            recipeIngredient.name.toLowerCase().includes(ingredient)
                        )
                    )
                    : true;
                return categoryMatch && dietaryMatch && ingredientMatch;
            });

            onFilter(filteredRecipes);
        };

        filterRecipes();
    }, [recipes, categoryFilter, dietaryFilter, ingredientFilter, onFilter]);

    return (
        <div className="mb-4 flex flex-col md:flex-row md:space-x-6">
            <div className="flex-shrink-0 mb-4 md:mb-0">
                <label className="block text-gray-700 text-sm font-bold mb-2">Filter by Category:</label>
                <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                    <option value="">All Categories</option>
                    {CATEGORY_CHOICES.map(choice => (
                        <option key={choice.value} value={choice.value}>{choice.label}</option>
                    ))}
                </select>
            </div>
            <div className="flex-shrink-0">
                <label className="block text-gray-700 text-sm font-bold mb-2">Filter by Dietary Preferences:</label>
                <select value={dietaryFilter} onChange={(e) => setDietaryFilter(e.target.value)} className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                    <option value="">All Preferences</option>
                    {DIETARY_CHOICES.map(choice => (
                        <option key={choice.value} value={choice.value}>{choice.label}</option>
                    ))}
                </select>
            </div>
            <div className="flex-shrink-0">
                <label className="block text-gray-700 text-sm font-bold mb-2">Filter by Ingredients:</label>
                <input
                    type="text"
                    value={ingredientFilter}
                    onChange={(e) => setIngredientFilter(e.target.value)}
                    className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    placeholder="Comma separated ingredients"
                />
            </div>
        </div>
    );
};

export default RecipeFilter;