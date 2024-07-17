from django.db import models
from django.contrib.auth.models import User

class Ingredient(models.Model):
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name
    
class Recipe(models.Model):
    CATEGORY_CHOICES = [
        ('breakfast', 'Breakfast'),
        ('lunch', 'Lunch'),
        ('dinner', 'Dinner'),
        ('dessert', 'Dessert'),
    ]
    DIETARY_CHOICES = [
        ('vegan', 'Vegan'),
        ('vegetarian', 'Vegetarian'),
        ('gluten_free', 'Gluten-Free'),
        ('seafood', 'Seafood'),
        ('non_vegetarian', 'Non-Vegetarian'),
    ]
    DIFFICULTY_CHOICES = [
        ('easy', 'Easy'),
        ('medium', 'Medium'),
        ('hard', 'Hard'),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='recipes')
    name = models.CharField(max_length=255)
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES, default='dinner')
    ingredients = models.ManyToManyField(Ingredient)
    cooking_duration = models.PositiveIntegerField(help_text="Duration in minutes")
    dietary_preferences = models.CharField(max_length=50, choices=DIETARY_CHOICES, default='vegan')
    difficulty_level = models.CharField(max_length=50, choices=DIFFICULTY_CHOICES, default='easy')
    instructions = models.TextField()
    # photo = models.ImageField(upload_to='recipe_photos/', blank=True, null=True)

    def __str__(self):
        return self.name