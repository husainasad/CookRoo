from django.test import TestCase, Client
from django.urls import reverse
from django.contrib.auth import get_user_model
from recipeManager.models import Ingredient, Recipe
from rest_framework import status
from rest_framework.test import APIClient

class RecipeAPITests(TestCase):

    def setUp(self):
        self.client = APIClient()
        self.user = get_user_model().objects.create_user(
            username='testuser', 
            password='testpassword',
            email='test@example.com'
        )
        self.other_user = get_user_model().objects.create_user(
            username='otheruser', 
            password='otherpassword',
            email='other@example.com'
        )
        self.ingredient1 = Ingredient.objects.create(name="Salt")
        self.ingredient2 = Ingredient.objects.create(name="Pepper")
        self.recipe = Recipe.objects.create(
            user=self.user,
            name="Pasta",
            category="dinner",
            cooking_duration=20,
            dietary_preferences="vegetarian",
            difficulty_level="medium",
            instructions="Boil pasta and add sauce."
        )
        self.recipe.ingredients.add(self.ingredient1, self.ingredient2)

    def test_get_all_recipes(self):
        response = self.client.get(reverse('get_all_recipes'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn("Pasta", str(response.data))

    def test_get_recipe_by_id(self):
        response = self.client.get(reverse('get_recipe_by_id', args=[self.recipe.pk]))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['name'], 'Pasta')

    def test_get_public_recipes_unauthenticated(self):
        response = self.client.get(reverse('get_public_recipes'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn("Pasta", str(response.data))

    def test_get_public_recipes_authenticated(self):
        self.client.force_authenticate(user=self.user)
        response = self.client.get(reverse('get_public_recipes'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertNotIn("Pasta", str(response.data))

    def test_get_personal_recipes_unauthenticated(self):
        response = self.client.get(reverse('get_personal_recipes'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, [])

    def test_get_personal_recipes_authenticated(self):
        self.client.force_authenticate(user=self.user)
        response = self.client.get(reverse('get_personal_recipes'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn("Pasta", str(response.data))

    def test_add_new_recipe_unauthenticated(self):
        data = {
            'name': 'New Recipe',
            'category': 'lunch',
            'cooking_duration': 30,
            'dietary_preferences': 'gluten_free',
            'difficulty_level': 'hard',
            'instructions': 'Cook ingredients together.',
            'ingredients': 'Tomato, Basil'
        }
        response = self.client.post(reverse('add_new_recipe'), data, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_add_new_recipe_authenticated(self):
        self.client.force_authenticate(user=self.user)
        data = {
            'name': 'New Recipe',
            'category': 'lunch',
            'cooking_duration': 30,
            'dietary_preferences': 'gluten_free',
            'difficulty_level': 'hard',
            'instructions': 'Cook ingredients together.',
            'ingredients': 'Tomato, Basil'
        }
        response = self.client.post(reverse('add_new_recipe'), data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Recipe.objects.count(), 2)
        self.assertEqual(Recipe.objects.latest('id').name, 'New Recipe')

    def test_edit_recipe_by_id_unauthenticated(self):
        data = {
            'name': 'Updated Pasta',
            'instructions': 'Boil pasta and add a different sauce.'
        }
        response = self.client.put(reverse('edit_recipe_by_id', args=[self.recipe.pk]), data, format='json')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
    
    def test_edit_recipe_by_id_authenticated(self):
        self.client.force_authenticate(user=self.user)
        data = {
            'name': 'Updated Pasta',
            'instructions': 'Boil pasta and add a different sauce.'
        }
        response = self.client.put(reverse('edit_recipe_by_id', args=[self.recipe.pk]), data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.recipe.refresh_from_db()
        self.assertEqual(self.recipe.name, 'Updated Pasta')

    def test_edit_recipe_by_id_not_owner(self):
        self.client.force_authenticate(user=self.other_user)
        data = {
            'name': 'Unauthorized Update',
        }
        response = self.client.put(reverse('edit_recipe_by_id', args=[self.recipe.pk]), data, format='json')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_delete_recipe_by_id_unauthenticated(self):
        response = self.client.delete(reverse('delete_recipe_by_id', args=[self.recipe.pk]))
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
    
    def test_delete_recipe_by_id_authenticated(self):
        self.client.force_authenticate(user=self.user)
        response = self.client.delete(reverse('delete_recipe_by_id', args=[self.recipe.pk]))
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Recipe.objects.count(), 0)

    def test_delete_recipe_by_id_not_owner(self):
        self.client.force_authenticate(user=self.other_user)
        response = self.client.delete(reverse('delete_recipe_by_id', args=[self.recipe.pk]))
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)