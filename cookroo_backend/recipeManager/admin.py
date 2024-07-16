from django.contrib import admin
from recipeManager.models import Ingredient, Recipe

admin.site.register(Ingredient)
admin.site.register(Recipe)