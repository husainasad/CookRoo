from django.test import TestCase
from django.urls import reverse, resolve
from userManager import views

class URLTests(TestCase):

    def test_get_all_users(self):
        url = reverse('user_list')
        found = resolve(url)
        self.assertEqual(found.func, views.user_list)

    def test_get_user_by_id(self):
        url = reverse('user_detail', args=[1])
        found = resolve(url)
        self.assertEqual(found.func, views.user_detail)

    def test_add_new_user(self):
        url = reverse('register_user')
        found = resolve(url)
        self.assertEqual(found.func, views.register_user)