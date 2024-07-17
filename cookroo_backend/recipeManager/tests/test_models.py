from django.test import TestCase
from django.db.utils import IntegrityError
from django.core.exceptions import ValidationError
from recipeManager.models import Ingredient, Recipe

class IngredientModelTests(TestCase):

    def test_create_ingredient(self):
        ingredient = Ingredient.objects.create(name="Onion")
        self.assertEqual(ingredient.name, "Onion")
        self.assertEqual(str(ingredient), "Onion")

class RecipeModelTests(TestCase):

    def setUp(self):
        self.ingredient1 = Ingredient.objects.create(name="Salt")
        self.ingredient2 = Ingredient.objects.create(name="Pepper")

    def test_create_recipe(self):
        recipe = Recipe.objects.create(
            name="Pasta",
            category="dinner",
            cooking_duration=20,
            dietary_preferences="vegetarian",
            difficulty_level="medium",
            instructions="Boil pasta and add sauce."
        )
        recipe.ingredients.add(self.ingredient1, self.ingredient2)
        self.assertEqual(recipe.name, "Pasta")
        self.assertEqual(recipe.category, "dinner")
        self.assertEqual(recipe.cooking_duration, 20)
        self.assertEqual(recipe.dietary_preferences, "vegetarian")
        self.assertEqual(recipe.difficulty_level, "medium")
        self.assertEqual(recipe.instructions, "Boil pasta and add sauce.")
        self.assertIn(self.ingredient1, recipe.ingredients.all())
        self.assertIn(self.ingredient2, recipe.ingredients.all())

    def test_invalid_cooking_duration_validation(self):
        recipe = Recipe(
            name="Pasta",
            category="dinner",
            cooking_duration=-10,  # Invalid duration
            dietary_preferences="vegetarian",
            difficulty_level="medium",
            instructions="Boil pasta and add sauce."
        )
        with self.assertRaises(ValidationError):
            recipe.full_clean()