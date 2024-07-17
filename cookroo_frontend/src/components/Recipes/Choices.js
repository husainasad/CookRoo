import React from 'react';

// Define choice mappings
const CATEGORY_CHOICES = {
    'breakfast': 'Breakfast',
    'lunch': 'Lunch',
    'dinner': 'Dinner',
    'dessert': 'Dessert'
};

const DIETARY_CHOICES = {
    'vegan': 'Vegan',
    'vegetarian': 'Vegetarian',
    'gluten_free': 'Gluten-Free',
    'seafood': 'Seafood',
    'non_vegetarian': 'Non-Vegetarian'
};

const DIFFICULTY_CHOICES = {
    'easy': 'Easy',
    'medium': 'Medium',
    'hard': 'Hard'
};

const ChoiceMapper = ({ value, choices }) => {
    return <span>{choices[value] || value}</span>;
};

export { CATEGORY_CHOICES, DIETARY_CHOICES, DIFFICULTY_CHOICES, ChoiceMapper };