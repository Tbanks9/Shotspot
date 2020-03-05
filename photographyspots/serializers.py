from rest_framework import serializers
from cities.models import City
# from images.models import Image
from .models import PhotographySpot

class CitySerializer(serializers.ModelSerializer):

    class Meta:
        model = City
        fields = ('id', 'city_name')

class PhotographySpotSerializer(serializers.ModelSerializer):

    class Meta:
        model = PhotographySpot
        fields = ('location_name', 'location_description', 'location_image', 'visited', 'city')

# class CommentSerializer(serializers.ModelSerializer): 

#     class Meta:
#         model = Comment
#         fields = ('location_name', 'location_description', 'location_image')

# class PopulatedCommentSerializer(CommentSerializer):

#     owner = UserSerializer()

# class PlaceSerializer(serializers.ModelSerializer):

#     class Meta:
#         model = Place
#         fields = ('id', 'owner', 'name', 'postcode', 'image', 'description', 'visited', 'comments', 'categories')
#         extra_kwargs = {'comments': {'required': False}, 'categories': {'required': False}}

class PopulatedPhotographySpotSerializer(PhotographySpotSerializer):
    city = CitySerializer()
    # owner = UserSerializer()
    # comments = PopulatedCommentSerializer(many=True)