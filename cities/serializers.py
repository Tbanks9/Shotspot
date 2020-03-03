from rest_framework import serializers
from users.models import User
# from images.models import Image
from .models import City
from photographyspots.models import PhotographySpot

class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('id', 'first_name')

class CitySerializer(serializers.ModelSerializer):

    class Meta:
        model = City
        fields = '__all__'

# class ImageSerializer(serializers.ModelSerializer):

#     class Meta:
#         model = Image
#         fields = '__all__'

class PhotographySpotSerializer(serializers.ModelSerializer):

    class Meta:
        model = PhotographySpot
        fields = ('location_name', 'location_description', 'location_image')

class PopulatedCitySerializer(CitySerializer):
    photographyspots = PhotographySpotSerializer(many=True)
    # images = ImageSerializer(many=True)