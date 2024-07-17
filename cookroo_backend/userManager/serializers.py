from rest_framework import serializers
from recipeManager.serializers import RecipeSerializer
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken

class UserSerializer(serializers.ModelSerializer):
    # recipes = RecipeSerializer(many=True, read_only=True)
    password = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        # fields = ['id', 'username', 'email', 'recipes']
        fields = ('id', 'username', 'email', 'password')

    def create(self, validated_data):
        user = User.objects.create(
            username=validated_data['username'],
            email=validated_data['email'],
        )
        user.set_password(validated_data['password'])
        user.save()
        return user