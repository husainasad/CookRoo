import React from 'react';
import { addRecipe } from '../../Api';
import { useNavigate } from 'react-router-dom';
import RecipeForm from './RecipeForm';

const AddRecipe = () => {
    const navigate = useNavigate();

    const handleAddRecipe = async (recipeData) => {
        try {
            await addRecipe(recipeData);
            navigate('/');
        } catch (error) {
            alert('Error adding recipe');
        }
    };

    return (
        <div>
            <RecipeForm
                initialData={{}}
                onSubmit={handleAddRecipe}
                onCancel={() => navigate('/')}
            />
        </div>
    );
};

export default AddRecipe;