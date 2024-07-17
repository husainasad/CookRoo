import React, { useEffect, useState } from 'react';
import { getRecipes } from '../../Api';
import { Link, useNavigate } from 'react-router-dom';
import { CATEGORY_CHOICES, DIETARY_CHOICES, DIFFICULTY_CHOICES, ChoiceMapper } from './Choices';

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
                            <td><ChoiceMapper value={recipe.category} choices={CATEGORY_CHOICES} /></td>
                            <td>{recipe.ingredients.map(ingredient => ingredient.name).join(', ')}</td>
                            <td>{recipe.cooking_duration}</td>
                            <td><ChoiceMapper value={recipe.dietary_preferences} choices={DIETARY_CHOICES} /></td>
                            <td><ChoiceMapper value={recipe.difficulty_level} choices={DIFFICULTY_CHOICES} /></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default RecipeList;