import React from 'react';
import { getPublicRecipes } from '../../Api';
import RecipeList from './RecipeList';

const PublicRecipeList = () => {
    return <RecipeList fetchRecipes={getPublicRecipes} isPersonal={false}/>;
};

export default PublicRecipeList;