import React from 'react';

const CATEGORY_CHOICES = [
    { value: 'breakfast', label: 'Breakfast' },
    { value: 'lunch', label: 'Lunch' },
    { value: 'dinner', label: 'Dinner' },
    { value: 'dessert', label: 'Dessert' }
];

const DIETARY_CHOICES = [
    { value: 'vegan', label: 'Vegan' },
    { value: 'vegetarian', label: 'Vegetarian' },
    { value: 'gluten_free', label: 'Gluten-Free' },
    { value: 'seafood', label: 'Seafood' },
    { value: 'non_vegetarian', label: 'Non-Vegetarian' }
];

const DIFFICULTY_CHOICES = [
    { value: 'easy', label: 'Easy' },
    { value: 'medium', label: 'Medium' },
    { value: 'hard', label: 'Hard' }
];

const ChoiceMapper = ({ value, choices }) => {
    return <span>{choices.find(choice => choice.value === value)?.label || value}</span>;
};

export { CATEGORY_CHOICES, DIETARY_CHOICES, DIFFICULTY_CHOICES, ChoiceMapper };