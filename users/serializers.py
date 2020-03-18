from rest_framework import serializers
from django.contrib.auth import get_user_model
# from django.contrib.auth.models import get_user_model
import django.contrib.auth.password_validation as validations
from django.contrib.auth.hashers import make_password
from django.core.exceptions import ValidationError
from cities.models import City
from photographyspots.models import PhotographySpot
from .models import User
User = get_user_model()

class CitySerializer(serializers.ModelSerializer):

    class Meta:
        model = City
        fields = ('id', 'city_name')

class PhotographySpotSerializer(serializers.ModelSerializer):

    class Meta:
        model = PhotographySpot
        fields = ('id', 'location_name', 'location_description', 'location_image')

class SearchUserSerializer(serializers.ModelSerializer):
    cities = CitySerializer(many=True, read_only=True)
    photographyspots = PhotographySpotSerializer(many=True, read_only=True)


    class Meta:
        model = User
        fields = ('id', 'first_name', 'second_name', 'username', 'email', 'cities', 'photographyspots')

class UserSerializer(serializers.ModelSerializer):

    password = serializers.CharField(write_only=True)
    password_confirmation = serializers.CharField(write_only=True)

    def validate(self, data):

        password = data.pop('password')
        password_confirmation = data.pop('password_confirmation')

        if password != password_confirmation:
            raise serializers.ValidationError({'password_confirmation': 'Passwords do not match'})

        try:
            validations.validate_password(password=password)
        except ValidationError as err:
            raise serializers.ValidationError({'password': err.messages})

        data['password'] = make_password(password)
        return data

    class Meta:
        model = User
        fields = '__all__'

class PopulatedUserSerializer(UserSerializer):
    cities = CitySerializer(many=True)
    photographyspots = PhotographySpotSerializer(many=True)

