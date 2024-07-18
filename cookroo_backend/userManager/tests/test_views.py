from django.test import TestCase, Client
from django.urls import reverse, resolve
from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.test import APIClient
from userManager.serializers import UserSerializer

class UserAPITests(TestCase):

    def setUp(self):
        self.client = APIClient()
        self.admin_user = User.objects.create_superuser(
            username='adminuser',
            password='adminpassword',
            email='admin@example.com'
        )
        self.user = User.objects.create_user(
            username='testuser',
            password='testpassword',
            email='test@example.com'
        )

    def test_user_list(self):
        self.client.force_authenticate(user=self.admin_user)
        url = reverse('user_list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), User.objects.count())

    def test_user_detail(self):
        self.client.force_authenticate(user=self.user)
        url = reverse('user_detail', args=[self.user.pk])
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['username'], self.user.username)

    def test_user_detail_no_permission(self):
        other_user = User.objects.create_user(
            username='otheruser',
            password='otherpassword',
            email='other@example.com'
        )
        self.client.force_authenticate(user=self.user)
        url = reverse('user_detail', args=[other_user.pk])
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_register_user(self):
        url = reverse('register_user')
        data = {
            'username': 'newuser',
            'password': 'newpassword',
            'email': 'newuser@example.com'
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(User.objects.filter(username='newuser').exists(), True)

    def test_register_user_invalid_data(self):
        url = reverse('register_user')
        data = {
            'username': 'newuser',
            'email': 'invalidemail'
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_register_user_duplicate_username(self):
        url = reverse('register_user')
        data = {
            'username': 'testuser',
            'password': 'testpassword',
            'email': 'test@example.com'
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
