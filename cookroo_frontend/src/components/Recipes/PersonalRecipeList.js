import React from 'react';
import { getPersonalRecipes } from '../../Api';
import RecipeList from './RecipeList';

const PersonalRecipeList = () => {
    return <RecipeList fetchRecipes={getPersonalRecipes} isPersonal={true}/>;
};

export default PersonalRecipeList;