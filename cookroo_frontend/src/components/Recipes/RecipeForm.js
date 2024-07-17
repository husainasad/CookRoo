import React, { useState, useEffect } from 'react';
import { CATEGORY_CHOICES, DIETARY_CHOICES, DIFFICULTY_CHOICES, ChoiceMapper } from './Choices';

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
        setIngredients(initialData.ingredients ? initialData.ingredients.map(ingredient => ingredient.name).join(', '): '');
        setCookingDuration(initialData.cooking_duration || '10');
        setDietaryPreferences(initialData.dietary_preferences || 'vegan');
        setDifficultyLevel(initialData.difficulty_level || 'easy');
        setInstructions(initialData.instructions || '');
    }, [initialData]);

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Name:
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
            </label>
            <br />
            <label>
                Category:
                <select value={category} onChange={(e) => setCategory(e.target.value)} required>
                    {Object.entries(CATEGORY_CHOICES).map(([value, label]) => (
                        <option key={value} value={value}>{label}</option>
                    ))}
                </select>
            </label>
            <br />
            <label>
                Ingredients (comma-separated):
                <input type="text" value={ingredients} onChange={(e) => setIngredients(e.target.value)} required />
            </label>
            <br />
            <label>
                Cooking Duration (minutes):
                <input type="number" value={cookingDuration} onChange={(e) => setCookingDuration(e.target.value)} required />
            </label>
            <br />
            <label>
                Dietary Preferences:
                <select value={dietaryPreferences} onChange={(e) => setDietaryPreferences(e.target.value)} required>
                    {Object.entries(DIETARY_CHOICES).map(([value, label]) => (
                        <option key={value} value={value}>{label}</option>
                    ))}
                </select>
            </label>
            <br />
            <label>
                Difficulty Level:
                <select value={difficultyLevel} onChange={(e) => setDifficultyLevel(e.target.value)} required>
                    {Object.entries(DIFFICULTY_CHOICES).map(([value, label]) => (
                        <option key={value} value={value}>{label}</option>
                    ))}
                </select>
            </label>
            <br />
            <label>
                Instructions:
                <textarea value={instructions} onChange={(e) => setInstructions(e.target.value)} required></textarea>
            </label>
            <br />
            <button type="reset">Reset</button>
            <button type="submit">Submit</button>
        </form>
    );
};

export default RecipeForm;