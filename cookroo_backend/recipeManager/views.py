from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status
from recipeManager.models import Ingredient, Recipe
from recipeManager.serializers import IngredientSerializer, RecipeSerializer
from django.db import transaction
from recipeManager.permissions import IsOwnerOrReadOnly

def process_ingredients(input_ingredients):
    ingredient_names = [name.strip() for name in input_ingredients.split(',') if name.strip()]
    ingredients = []
    for name in ingredient_names:
        ingredient, created = Ingredient.objects.get_or_create(name=name)
        ingredients.append(ingredient)
    return ingredients

def cleanup_ingredients(ingredients, recipe):
    for ingredient in ingredients:
        if Recipe.objects.filter(ingredients=ingredient).count() == 1:
            ingredient.delete()
        else:
            recipe.ingredients.remove(ingredient)

@api_view(['GET'])
@permission_classes([AllowAny])
def get_all_recipes(request):
    try:
        recipes = Recipe.objects.all()
        serializer = RecipeSerializer(recipes, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({'detail': f'Error fetching recipes: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET'])
@permission_classes([AllowAny])
def get_recipe_by_id(request, pk):
    recipe = get_object_or_404(Recipe, pk=pk)
    try:
        serializer = RecipeSerializer(recipe)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({'detail': f'Error fetching recipe by id: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET'])
@permission_classes([AllowAny])
def get_personal_recipes(request):
    try:
        if request.user.is_authenticated:
            recipes = Recipe.objects.filter(user=request.user)
        else:
            recipes = Recipe.objects.none()
            
        serializer = RecipeSerializer(recipes, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({'detail': f'Error fetching recipes: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
@api_view(['GET'])
@permission_classes([AllowAny])
def get_public_recipes(request):
    try:
        if request.user.is_authenticated:
            recipes = Recipe.objects.exclude(user=request.user)
        else:
            recipes = Recipe.objects.all()

        serializer = RecipeSerializer(recipes, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({'detail': f'Error fetching recipes: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['POST'])
def add_new_recipe(request):
    serializer = RecipeSerializer(data=request.data)
    if serializer.is_valid():
        try:
            with transaction.atomic():
                recipe = serializer.save(user=request.user)
                ingredients = process_ingredients(request.data.get('ingredients', ''))
                recipe.ingredients.set(ingredients)
                return Response(RecipeSerializer(recipe).data, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({'detail': f'Error adding recipe: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    print(serializer.errors)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
@permission_classes([IsOwnerOrReadOnly])
def edit_recipe_by_id(request, pk):
    recipe = get_object_or_404(Recipe, pk=pk)
    if recipe.user != request.user:
        return Response({'detail': 'You do not have permission to edit this recipe.'}, status=status.HTTP_403_FORBIDDEN)
    
    serializer = RecipeSerializer(recipe, data=request.data, partial=True)
    if serializer.is_valid():
        try:
            with transaction.atomic():
                updated_recipe = serializer.save()
                updated_ingredients = process_ingredients(request.data.get('ingredients', ''))
                prev_ingredients = recipe.ingredients.all()
                prev_only_ingredients = [ingredient for ingredient in prev_ingredients if ingredient not in updated_ingredients]
                cleanup_ingredients(prev_only_ingredients, recipe)
                updated_recipe.ingredients.set(updated_ingredients)
                return Response(RecipeSerializer(updated_recipe).data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'detail': f'Error updating recipe: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
@permission_classes([IsOwnerOrReadOnly])
def delete_recipe_by_id(request, pk):
    recipe = get_object_or_404(Recipe, pk=pk)
    if recipe.user != request.user:
        return Response({'detail': 'You do not have permission to delete this recipe.'}, status=status.HTTP_403_FORBIDDEN)
    
    try:
        with transaction.atomic():
            associated_ingredients = recipe.ingredients.all()
            cleanup_ingredients(associated_ingredients, recipe)
            recipe.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
    except Exception as e:
        return Response({'detail': f'Error deleting recipe: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET'])
@permission_classes([AllowAny])
def get_all_ingredients(request):
    try:
        ingredients = Ingredient.objects.all()
        serializer = IngredientSerializer(ingredients, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({'detail': f'Error fetching ingredients: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET'])
@permission_classes([AllowAny])
def get_ingredient_by_id(request, pk):
    ingredient = get_object_or_404(Ingredient, pk=pk)
    try:
        serializer = IngredientSerializer(ingredient)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({'detail': f'Error fetching ingredient by id: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['POST'])
def add_new_ingredient(request):
    serializer = IngredientSerializer(data=request.data)
    if serializer.is_valid():
        try:
            with transaction.atomic():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({'detail': f'Error adding ingredient: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
@permission_classes([IsOwnerOrReadOnly])
def edit_ingredient_by_id(request, pk):
    ingredient = get_object_or_404(Ingredient, pk=pk)
    if ingredient.user != request.user:
        return Response({'detail': 'You do not have permission to edit this ingredient.'}, status=status.HTTP_403_FORBIDDEN)
    
    serializer = IngredientSerializer(ingredient, data=request.data, partial=True)
    if serializer.is_valid():
        try:
            with transaction.atomic():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'detail': f'Error editing ingredient: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
@permission_classes([IsOwnerOrReadOnly])
def delete_ingredient_by_id(request, pk):
    ingredient = get_object_or_404(Ingredient, pk=pk)
    if ingredient.user != request.user:
        return Response({'detail': 'You do not have permission to delete this ingredient.'}, status=status.HTTP_403_FORBIDDEN)
    
    try:
        with transaction.atomic():
            ingredient.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
    except Exception as e:
        return Response({'detail': f'Error deleting ingredient: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)