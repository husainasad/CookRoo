import axios from 'axios';

const API_URL = 'http://localhost:8000/api/';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const getRecipes = () => api.get('recipes/');
export const getRecipe = (id) => api.get(`recipes/${id}/`);
export const addRecipe = (recipeData) => api.post('recipes/add/', recipeData);
export const editRecipe = (id, recipeData) => api.put(`recipes/${id}/edit/`, recipeData);
export const deleteRecipe = (id) => api.delete(`recipes/${id}/delete/`);

export const getIngredients = () => api.get('ingredients/');
export const getIngredient = (id) => api.get(`ingredients/${id}/`);
export const addIngredient = (ingredientData) => api.post('ingredients/add/', ingredientData);
export const editIngredient = (id, ingredientData) => api.put(`ingredients/${id}/edit/`, ingredientData);
export const deleteIngredient = (id) => api.delete(`ingredients/${id}/delete/`);