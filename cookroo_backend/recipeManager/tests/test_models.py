from django.test import TestCase, Client
from django.db.utils import IntegrityError
from django.core.exceptions import ValidationError
from recipeManager.models import Ingredient, Recipe
from django.contrib.auth import get_user_model

class IngredientModelTests(TestCase):

    def test_create_ingredient(self):
        ingredient = Ingredient.objects.create(name="Onion")
        self.assertEqual(ingredient.name, "Onion")
        self.assertEqual(str(ingredient), "Onion")

class RecipeModelTests(TestCase):

    def setUp(self):

        self.client = Client()
        self.user = get_user_model().objects.create_user(
            username='testuser', 
            password='testpassword',
            email='test@example.com'
        )

        self.ingredient1 = Ingredient.objects.create(name="Salt")
        self.ingredient2 = Ingredient.objects.create(name="Pepper")

    def test_create_recipe(self):
        recipe = Recipe.objects.create(
            user=self.user,
            name="Pasta",
            category="dinner",
            cooking_duration=20,
            dietary_preferences="vegetarian",
            difficulty_level="medium",
            instructions="Boil pasta and add sauce."
        )
        recipe.ingredients.add(self.ingredient1, self.ingredient2)

        self.assertEqual(recipe.user, self.user)
        self.assertEqual(recipe.name, "Pasta")
        self.assertEqual(recipe.category, "dinner")
        self.assertEqual(recipe.cooking_duration, 20)
        self.assertEqual(recipe.dietary_preferences, "vegetarian")
        self.assertEqual(recipe.difficulty_level, "medium")
        self.assertEqual(recipe.instructions, "Boil pasta and add sauce.")
        self.assertIn(self.ingredient1, recipe.ingredients.all())
        self.assertIn(self.ingredient2, recipe.ingredients.all())

    def test_recipe_default_values(self):
        recipe = Recipe(
            user=self.user,
            name="Default Recipe",
            cooking_duration=10,
            instructions="Instructions here."
        )
        recipe.full_clean()
        self.assertEqual(recipe.category, "breakfast") 
        self.assertEqual(recipe.dietary_preferences, "vegan")
        self.assertEqual(recipe.difficulty_level, "easy")

    def test_invalid_cooking_duration_validation(self):
        recipe = Recipe(
            user=self.user,
            name="Pasta",
            category="dinner",
            cooking_duration=-10,
            dietary_preferences="vegetarian",
            difficulty_level="medium",
            instructions="Boil pasta and add sauce."
        )
        with self.assertRaises(ValidationError):
            recipe.full_clean()

    def test_missing_required_fields(self):
        recipe = Recipe(
            user=self.user,
            category="dinner",
            cooking_duration=20,
            dietary_preferences="vegetarian",
            difficulty_level="medium",
            instructions="Boil pasta and add sauce."
        )
        with self.assertRaises(ValidationError):
            recipe.full_clean()

    def test_unique_recipe_name_per_user(self):
        Recipe.objects.create(
            user=self.user,
            name="Unique Recipe",
            category="dinner",
            cooking_duration=20,
            dietary_preferences="vegetarian",
            difficulty_level="medium",
            instructions="Boil pasta and add sauce."
        )
        with self.assertRaises(IntegrityError):
            Recipe.objects.create(
                user=self.user,
                name="Unique Recipe",
                category="dinner",
                cooking_duration=20,
                dietary_preferences="vegetarian",
                difficulty_level="medium",
                instructions="Different instructions."
            )