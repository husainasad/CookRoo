import React, { useState, useEffect } from 'react';
import { CATEGORY_CHOICES, DIETARY_CHOICES, DIFFICULTY_CHOICES } from './Choices';

const RecipeForm = ({ initialData, onSubmit, onCancel }) => {
    const [name, setName] = useState(initialData.name || '');
    const [category, setCategory] = useState(initialData.category || 'breakfast');
    const [ingredients, setIngredients] = useState(initialData.ingredients || '');
    const [cookingDuration, setCookingDuration] = useState(initialData.cooking_duration || '10');
    const [dietaryPreferences, setDietaryPreferences] = useState(initialData.dietary_preferences || 'vegan');
    const [difficultyLevel, setDifficultyLevel] = useState(initialData.difficulty_level || 'easy');
    const [instructions, setInstructions] = useState(initialData.instructions || '');

    const handleSubmit = (e) => {
        e.preventDefault();
        const recipeData = {
            name,
            category,
            ingredients,
            cooking_duration: parseInt(cookingDuration, 10),
            dietary_preferences: dietaryPreferences,
            difficulty_level: difficultyLevel,
            instructions,
        };
        onSubmit(recipeData);
    };

    useEffect(() => {
        setName(initialData.name || '');
        setCategory(initialData.category || 'breakfast');
        setIngredients(initialData.ingredients ? initialData.ingredients.map(ingredient => ingredient.name).join(', ') : '');
        setCookingDuration(initialData.cooking_duration || '10');
        setDietaryPreferences(initialData.dietary_preferences || 'vegan');
        setDifficultyLevel(initialData.difficulty_level || 'easy');
        setInstructions(initialData.instructions || '');
    }, [initialData]);

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Recipe Form</h2>
                <div className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                        <input
                            id="name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <div>
                        <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
                        <select
                            id="category"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        >
                            {CATEGORY_CHOICES.map(({ value, label }) => (
                                <option key={value} value={value}>{label}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="ingredients" className="block text-sm font-medium text-gray-700">Ingredients (comma-separated)</label>
                        <input
                            id="ingredients"
                            type="text"
                            value={ingredients}
                            onChange={(e) => setIngredients(e.target.value)}
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <div>
                        <label htmlFor="cookingDuration" className="block text-sm font-medium text-gray-700">Cooking Duration (minutes)</label>
                        <input
                            id="cookingDuration"
                            type="number"
                            value={cookingDuration}
                            onChange={(e) => setCookingDuration(e.target.value)}
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <div>
                        <label htmlFor="dietaryPreferences" className="block text-sm font-medium text-gray-700">Dietary Preferences</label>
                        <select
                            id="dietaryPreferences"
                            value={dietaryPreferences}
                            onChange={(e) => setDietaryPreferences(e.target.value)}
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        >
                            {DIETARY_CHOICES.map(({ value, label }) => (
                                <option key={value} value={value}>{label}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="difficultyLevel" className="block text-sm font-medium text-gray-700">Difficulty Level</label>
                        <select
                            id="difficultyLevel"
                            value={difficultyLevel}
                            onChange={(e) => setDifficultyLevel(e.target.value)}
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        >
                            {DIFFICULTY_CHOICES.map(({ value, label }) => (
                                <option key={value} value={value}>{label}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="instructions" className="block text-sm font-medium text-gray-700">Instructions</label>
                        <textarea
                            id="instructions"
                            value={instructions}
                            onChange={(e) => setInstructions(e.target.value)}
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        ></textarea>
                    </div>
                    <div className="flex justify-end space-x-4">
                        <button
                            type="button"
                            onClick={onCancel}
                            className="px-4 py-2 bg-gray-300 text-gray-700 font-semibold rounded-md shadow-sm hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default RecipeForm;
