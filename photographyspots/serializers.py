from rest_framework import serializers
# from cities.models import City
from images.models import Image
from .models import PhotographySpot

# class CitySerializer(serializers.ModelSerializer):

#     class Meta:
#         model = City
#         fields = '__all__'

class ImageSerializer(serializers.ModelSerializer):

    class Meta:
        model = Image
        fields = '__all__'

class PhotographySpotSerializer(serializers.ModelSerializer):

    class Meta:
        model = PhotographySpot
        fields = '__all__'

# class PopulatedPhotographySpotSerializer(PhotographySpotSerializer):
#     cities = CitySerializer(many=True)