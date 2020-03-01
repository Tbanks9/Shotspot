from rest_framework import serializers
from users.models import User
from .models import Image

class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('username', 'first_name')

class ImageSerializer(serializers.ModelSerializer):

    class Meta:
        model = Image
        fields = '__all__'

# class PopulatedImageSerializer(ImageSerializer):
#     users = UserSerializer(many=True)