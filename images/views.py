# pylint: disable=no-member
# from rest_framework.views import APIView
# from rest_framework.response import Response

# from .models import Image
# from .serializers import ImageSerializer

# class ImageListView(APIView):

#     def get(self, _request):
#         images = Image.objects.all()
#         serialized_images = ImageSerializer(images, many=True)
#         return Response(serialized_images.data)

# from django.shortcuts import render
# from django.views import View

# # Create your views here.
# class ImageListView(View):

#     def get(self, request):
#         return render(request, 'imagesindex.html')