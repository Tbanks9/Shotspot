from rest_framework import serializers
from cities.models import City
# from users.models import User
from .models import PhotographySpot

class CitySerializer(serializers.ModelSerializer):

    class Meta:
        model = City
        fields = ('id', 'city_name')

# class UserSerializer(serializers.ModelSerializer):

#     class Meta:
#         model = User
#         fields = ('id',)

class PhotographySpotSerializer(serializers.ModelSerializer):
    city = CitySerializer()
    # user = UserSerializer()

    class Meta:
        model = PhotographySpot
        fields = ('location_name', 'location_description', 'location_image', 'city')

    def save(self):
        print('save() is called.')

class PopulatedPhotographySpotSerializer(PhotographySpotSerializer):
    city = CitySerializer()
    # user = UserSerializer()


# class CommentSerializer(serializers.ModelSerializer): 

#     class Meta:
#         model = Comment
#         fields = ('location_name', 'location_description', 'location_image')

# class PopulatedCommentSerializer(CommentSerializer):

#     owner = UserSerializer()

# class PlaceSerializer(serializers.ModelSerializer):

#     class Meta:
#         model = Place
#         fields = ('id', 'owner', 'name', 'postcode', 'image', 'description', 'comments', 'categories')
#         extra_kwargs = {'comments': {'required': False}, 'categories': {'required': False}}


    # user = UserSerializer()
    # comments = PopulatedCommentSerializer(many=True)