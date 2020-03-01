from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    first_name = models.CharField(max_length=50, default='name')
    second_name = models.CharField(max_length=50, default='Surname')
    email = models.EmailField(max_length=100, unique=True, default='Enter email')
    cities = models.ManyToManyField('cities.City', related_name='users', blank=True)

    def __str__(self):
        return self.first_name

    # USERNAME_FIELD = 'usernames'
