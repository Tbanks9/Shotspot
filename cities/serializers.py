from rest_framework import serializers
from users.models import User
from photographyspots.models import PhotographySpot
from .models import City

class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('id', 'first_name')

class CitySerializer(serializers.ModelSerializer):

    class Meta:
        model = City
        fields = '__all__'

class PhotographySpotSerializer(serializers.ModelSerializer):

    class Meta:
        model = PhotographySpot
        fields = ('location_name', 'location_description', 'images')

class PopulatedCitySerializer(CitySerializer):
    users = UserSerializer(many=True)
    # photography_spots = PhotographySpotSerializer(many=True)