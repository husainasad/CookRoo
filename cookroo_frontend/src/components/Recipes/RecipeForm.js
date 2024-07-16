// import React, { useState, useEffect } from 'react';

// function RecipeForm({ onSubmit, initialValues = {} }) {
//     console.log('form rendering')

//     const [name, setName] = useState('');
//     const [category, setCategory] = useState('breakfast');
//     const [ingredients, setIngredients] = useState('');
//     const [cookingDuration, setCookingDuration] = useState('10');
//     const [dietaryPreferences, setDietaryPreferences] = useState('vegan');
//     const [difficultyLevel, setDifficultyLevel] = useState('easy');
//     const [instructions, setInstructions] = useState('');
//     const [error, setError] = useState('');
    
//     const categoryOptions = ['breakfast', 'lunch', 'dinner', 'dessert'];
//     const dietaryOptions = ['vegan', 'vegetarian', 'gluten_free', 'seafood', 'non_vegetarian'];
//     const difficultyOptions = ['easy', 'medium', 'hard'];

//     useEffect(() => {
//         setName(initialValues.name || '');
//         setCategory(initialValues.category || 'breakfast');
//         setIngredients(initialValues.ingredients ? initialValues.ingredients.join(', ') : '');
//         setCookingDuration(initialValues.cooking_duration || '10');
//         setDietaryPreferences(initialValues.dietary_preferences || 'vegan');
//         setDifficultyLevel(initialValues.difficulty_level || 'easy');
//         setInstructions(initialValues.instructions || '');
//     }, [initialValues]);

//     const handleSubmit = async (event) => {
//         event.preventDefault();
//         try {
//             const recipeData = {
//                 name,
//                 category,
//                 ingredients: ingredients.split(',').map(ingredient => ingredient.trim()),
//                 cooking_duration: parseInt(cookingDuration, 10),
//                 dietary_preferences: dietaryPreferences,
//                 difficulty_level: difficultyLevel,
//                 instructions,
//             };
//             await onSubmit(recipeData);
//         } catch (error) {
//             setError('Error submitting recipe');
//         }
//     };

//     return (
//         <div>
//             {error && <p style={{ color: 'red' }}>{error}</p>}
//             <form onSubmit={handleSubmit}>
//                 <label>
//                     Name:
//                     <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
//                 </label>
//                 <br />
//                 <label>
//                     Category:
//                     <select value={category} onChange={(e) => setCategory(e.target.value)} required>
//                         <option value="" disabled>Select a category</option>
//                         {categoryOptions.map(option => (
//                             <option key={option} value={option}>{option}</option>
//                         ))}
//                     </select>
//                 </label>
//                 <br />
//                 <label>
//                     Ingredients (comma-separated):
//                     <input type="text" value={ingredients} onChange={(e) => setIngredients(e.target.value)} required />
//                 </label>
//                 <br />
//                 <label>
//                     Cooking Duration (minutes):
//                     <input type="number" value={cookingDuration} onChange={(e) => setCookingDuration(e.target.value)} required />
//                 </label>
//                 <br />
//                 <label>
//                     Dietary Preferences:
//                     <select value={dietaryPreferences} onChange={(e) => setDietaryPreferences(e.target.value)} required>
//                         <option value="" disabled>Select a preference</option>
//                         {dietaryOptions.map(option => (
//                             <option key={option} value={option}>{option}</option>
//                         ))}
//                     </select>
//                 </label>
//                 <br />
//                 <label>
//                     Difficulty Level:
//                     <select value={difficultyLevel} onChange={(e) => setDifficultyLevel(e.target.value)} required>
//                         <option value="" disabled>Select a level</option>
//                         {difficultyOptions.map(option => (
//                             <option key={option} value={option}>{option}</option>
//                         ))}
//                     </select>
//                 </label>
//                 <br />
//                 <label>
//                     Instructions:
//                     <textarea value={instructions} onChange={(e) => setInstructions(e.target.value)} required></textarea>
//                 </label>
//                 <br />
//                 <button type="reset">Reset</button>
//                 <button type="submit">Submit</button>
//             </form>
//         </div>
//     );
// }

// export default RecipeForm;

import React, { useState, useEffect } from 'react';

const RecipeForm = ({ initialData, onSubmit, onCancel }) => {
    const [name, setName] = useState(initialData.name || '');
    const [category, setCategory] = useState(initialData.category || 'breakfast');
    const [ingredients, setIngredients] = useState(initialData.ingredients || '');
    const [cookingDuration, setCookingDuration] = useState(initialData.cooking_duration || '10');
    const [dietaryPreferences, setDietaryPreferences] = useState(initialData.dietary_preferences || 'vegan');
    const [difficultyLevel, setDifficultyLevel] = useState(initialData.difficulty_level || 'easy');
    const [instructions, setInstructions] = useState(initialData.instructions || '');

    const categoryOptions = ['breakfast', 'lunch', 'dinner', 'dessert'];
    const dietaryOptions = ['vegan', 'vegetarian', 'gluten_free', 'seafood', 'non_vegetarian'];
    const difficultyOptions = ['easy', 'medium', 'hard'];

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
                    {categoryOptions.map(option => (
                        <option key={option} value={option}>{option}</option>
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
                    {dietaryOptions.map(option => (
                        <option key={option} value={option}>{option}</option>
                    ))}
                </select>
            </label>
            <br />
            <label>
                Difficulty Level:
                <select value={difficultyLevel} onChange={(e) => setDifficultyLevel(e.target.value)} required>
                    {difficultyOptions.map(option => (
                        <option key={option} value={option}>{option}</option>
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
            <button type="button" onClick={onCancel}>All Recipes</button>
        </form>
    );
};

export default RecipeForm;