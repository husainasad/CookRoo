# Generated by Django 5.0.7 on 2024-07-15 21:35

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('recipeManager', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='recipe',
            name='author',
        ),
    ]
