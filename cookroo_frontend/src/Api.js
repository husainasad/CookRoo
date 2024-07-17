import axios from 'axios';

const API_URL = 'http://localhost:8000/api/';

const getToken = () => localStorage.getItem('access_token');

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

const authHeader = () => {
    const token = getToken();
    if (token) {
        return { Authorization: `Bearer ${token}` };
    }
    return {};
};

export const registerUser = (userData) => api.post('register/', userData);
export const loginUser = (userData) => api.post('token/', userData);
export const refreshToken = (token) => api.post('token/refresh/', { refresh: token });

export const getRecipes = () => api.get('recipes/', { headers: authHeader() });
export const getPublicRecipes = () => api.get('recipes/public/', { headers: authHeader() });
export const getPersonalRecipes = () => api.get('recipes/personal/', { headers: authHeader() });
export const getRecipe = (id) => api.get(`recipes/${id}/`, { headers: authHeader() });
export const addRecipe = (recipeData) => api.post('recipes/add/', recipeData, { headers: authHeader() });
export const editRecipe = (id, recipeData) => api.put(`recipes/${id}/edit/`, recipeData, { headers: authHeader() });
export const deleteRecipe = (id) => api.delete(`recipes/${id}/delete/`, { headers: authHeader() });

export const getIngredients = () => api.get('ingredients/', { headers: authHeader() });
export const getIngredient = (id) => api.get(`ingredients/${id}/`, { headers: authHeader() });
export const addIngredient = (ingredientData) => api.post('ingredients/add/', ingredientData, { headers: authHeader() });
export const editIngredient = (id, ingredientData) => api.put(`ingredients/${id}/edit/`, ingredientData, { headers: authHeader() });
export const deleteIngredient = (id) => api.delete(`ingredients/${id}/delete/`, { headers: authHeader() });