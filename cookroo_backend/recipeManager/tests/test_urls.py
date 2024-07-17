from django.test import TestCase
from django.urls import reverse, resolve
from recipeManager import views

class URLTests(TestCase):

    def test_get_all_recipes(self):
        url = reverse('get_all_recipes')
        found = resolve(url)
        self.assertEqual(found.func, views.get_all_recipes)

    def test_add_new_recipe(self):
        url = reverse('add_new_recipe')
        found = resolve(url)
        self.assertEqual(found.func, views.add_new_recipe)

    def test_get_recipe_by_id(self):
        url = reverse('get_recipe_by_id', args=[1])
        found = resolve(url)
        self.assertEqual(found.func, views.get_recipe_by_id)

    def test_edit_recipe_by_id(self):
        url = reverse('edit_recipe_by_id', args=[1])
        found = resolve(url)
        self.assertEqual(found.func, views.edit_recipe_by_id)

    def test_delete_recipe_by_id(self):
        url = reverse('delete_recipe_by_id', args=[1])
        found = resolve(url)
        self.assertEqual(found.func, views.delete_recipe_by_id)

    def test_get_all_ingredients(self):
        url = reverse('get_all_ingredients')
        found = resolve(url)
        self.assertEqual(found.func, views.get_all_ingredients)

    def test_add_new_ingredient(self):
        url = reverse('add_new_ingredient')
        found = resolve(url)
        self.assertEqual(found.func, views.add_new_ingredient)

    def test_get_ingredient_by_id(self):
        url = reverse('get_ingredient_by_id', args=[1])
        found = resolve(url)
        self.assertEqual(found.func, views.get_ingredient_by_id)

    def test_edit_ingredient_by_id(self):
        url = reverse('edit_ingredient_by_id', args=[1])
        found = resolve(url)
        self.assertEqual(found.func, views.edit_ingredient_by_id)

    def test_delete_ingredient_by_id(self):
        url = reverse('delete_ingredient_by_id', args=[1])
        found = resolve(url)
        self.assertEqual(found.func, views.delete_ingredient_by_id)