import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaSort, FaSortUp, FaSortDown } from 'react-icons/fa';
import { CATEGORY_CHOICES, DIETARY_CHOICES, DIFFICULTY_CHOICES, ChoiceMapper } from './Choices';
import RecipeFilter from './RecipeFilter';

const difficultyOrder = {
    easy: 1,
    medium: 2,
    hard: 3,
};

const RecipeList = ({ fetchRecipes, isPersonal }) => {
    const [recipes, setRecipes] = useState([]);
    const [filteredRecipes, setFilteredRecipes] = useState([]);
    const [sortCriteria, setSortCriteria] = useState('duration');
    const [sortOrder, setSortOrder] = useState('asc');

    useEffect(() => {
        const fetchRecipeData = async () => {
            try {
                const response = await fetchRecipes();
                setRecipes(response.data);
            } catch (error) {
                console.error('Failed to fetch recipes:', error);
            }
        };

        fetchRecipeData();
    }, [fetchRecipes]);

    const sortRecipes = (recipes, criteria, order) => {
        return [...recipes].sort((a, b) => {
            if (criteria === 'difficulty') {
                const diffA = difficultyOrder[a.difficulty_level];
                const diffB = difficultyOrder[b.difficulty_level];
                if (diffA < diffB) return order === 'asc' ? -1 : 1;
                if (diffA > diffB) return order === 'asc' ? 1 : -1;
                return 0;
            } else if (criteria === 'duration') {
                if (a.cooking_duration < b.cooking_duration) return order === 'asc' ? -1 : 1;
                if (a.cooking_duration > b.cooking_duration) return order === 'asc' ? 1 : -1;
                return 0;
            }
            return 0;
        });
    };

    const handleSortChange = (criteria) => {
        if (sortCriteria === criteria) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortCriteria(criteria);
            setSortOrder('asc');
        }
    };

    const renderSortArrow = (criteria) => {
        if (sortCriteria === criteria) {
            return sortOrder === 'asc' ? <FaSortUp className="inline ml-1" /> : <FaSortDown className="inline ml-1" />;
        }
        return <FaSort className="inline ml-1" />;
    };

    const sortedRecipes = sortRecipes(filteredRecipes, sortCriteria, sortOrder);

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h2 className="text-4xl font-extrabold mb-8 text-center text-gray-800">
                {isPersonal ? 'Personal Recipes' : 'Public Recipes'}
            </h2>
            <RecipeFilter recipes={recipes} onFilter={setFilteredRecipes} />
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
                    <thead className="bg-gray-200 border-b border-gray-300">
                        <tr>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                                Name
                            </th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                                Category
                            </th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                                Ingredients
                            </th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider cursor-pointer" onClick={() => handleSortChange('duration')}>
                                <span className="flex items-center">
                                    Cooking Duration {renderSortArrow('duration')}
                                </span>
                            </th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                                Dietary Preferences
                            </th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider cursor-pointer" onClick={() => handleSortChange('difficulty')}>
                                <span className="flex items-center">
                                    Difficulty Level {renderSortArrow('difficulty')}
                                </span>
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {sortedRecipes.map((recipe) => (
                            <tr key={recipe.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <Link to={`/recipe/${recipe.id}`} state={{ isPersonal }} className="text-indigo-600 hover:text-indigo-800 font-medium">
                                        {recipe.name}
                                    </Link>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                    <ChoiceMapper value={recipe.category} choices={CATEGORY_CHOICES} />
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                    {recipe.ingredients.map(ingredient => ingredient.name).join(', ')}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                    {recipe.cooking_duration}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                    <ChoiceMapper value={recipe.dietary_preferences} choices={DIETARY_CHOICES} />
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                    <ChoiceMapper value={recipe.difficulty_level} choices={DIFFICULTY_CHOICES} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default RecipeList;