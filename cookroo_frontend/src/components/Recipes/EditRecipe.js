import React, { useEffect, useState } from 'react';
import { getRecipe, editRecipe } from '../../Api';
import { useParams, useNavigate } from 'react-router-dom';
import RecipeForm from './RecipeForm'; // Adjust the import path as needed

const EditRecipe = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [recipeData, setRecipeData] = useState(null);

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const recipeData = await getRecipe(id);
                setRecipeData(recipeData.data);
            } catch (error) {
                alert('Error fetching recipe');
            }
        };
        fetchRecipe();
    }, [id]);

    const handleUpdateRecipe = async (updatedData) => {
        try {
            await editRecipe(id, updatedData);
            navigate('/');
        } catch (error) {
            alert('Error updating recipe');
        }
    };

    return (
        <div>
            {recipeData ? (
                <RecipeForm
                    initialData={recipeData}
                    onSubmit={handleUpdateRecipe}
                    onCancel={() => navigate('/')}
                />
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default EditRecipe;