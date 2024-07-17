from rest_framework import serializers
from recipeManager.models import Ingredient, Recipe
from django.contrib.auth.models import User

class IngredientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ingredient
        fields = '__all__'

class RecipeSerializer(serializers.ModelSerializer):
    ingredients = IngredientSerializer(many=True, read_only=True)
    user = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), write_only=True, required=False)

    class Meta:
        model = Recipe
        fields = '__all__'
        read_only_fields = ['user']