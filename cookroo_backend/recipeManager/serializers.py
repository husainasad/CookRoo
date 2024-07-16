from rest_framework import serializers
from recipeManager.models import Ingredient, Recipe

class IngredientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ingredient
        # fields = ['id', 'name']
        fields = '__all__'

class RecipeSerializer(serializers.ModelSerializer):
    ingredients = IngredientSerializer(many=True, read_only=True)
    # author = serializers.ReadOnlyField(source='author.username')

    class Meta:
        model = Recipe
        # fields = ['id', 'name', 'category', 'ingredients', 'cooking_duration', 'dietary_preferences', 'difficulty_level', 'instructions', 'author']
        fields = '__all__'