from django.urls import path
from recipeManager import views

urlpatterns = [
    path('recipes/', views.get_all_recipes, name='get_all_recipes'),
    path('recipes/public/', views.get_public_recipes, name='get_public_recipes'),
    path('recipes/personal/', views.get_personal_recipes, name='get_personal_recipes'),
    path('recipes/add/', views.add_new_recipe, name='add_new_recipe'),
    path('recipes/<int:pk>/', views.get_recipe_by_id, name='get_recipe_by_id'),
    path('recipes/<int:pk>/edit/', views.edit_recipe_by_id, name='edit_recipe_by_id'),
    path('recipes/<int:pk>/delete/', views.delete_recipe_by_id, name='delete_recipe_by_id'),

    path('ingredients/', views.get_all_ingredients, name='get_all_ingredients'),
    path('ingredients/add/', views.add_new_ingredient, name='add_new_ingredient'),
    path('ingredients/<int:pk>/', views.get_ingredient_by_id, name='get_ingredient_by_id'),
    path('ingredients/<int:pk>/edit/', views.edit_ingredient_by_id, name='edit_ingredient_by_id'),
    path('ingredients/<int:pk>/delete/', views.delete_ingredient_by_id, name='delete_ingredient_by_id'),
]