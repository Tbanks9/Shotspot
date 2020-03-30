# pylint: disable=no-member
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.status import HTTP_404_NOT_FOUND, HTTP_201_CREATED, HTTP_422_UNPROCESSABLE_ENTITY, HTTP_204_NO_CONTENT, HTTP_202_ACCEPTED, HTTP_401_UNAUTHORIZED
from .models import PhotographySpot
from .serializers import PopulatedPhotographySpotSerializer, PhotographySpotSerializer

class PhotographySpotListView(APIView):

    # permission_classes = (IsAuthenticated, IsAuthenticatedOrReadOnly)

    def get(self, _request):
        photographyspots = PhotographySpot.objects.all()
        serialized_photographyspots = PopulatedPhotographySpotSerializer(photographyspots, many=True)
        return Response(serialized_photographyspots.data)

    def post(self, request):
        photographyspot = PhotographySpotSerializer(data=request.data)

        if photographyspot.is_valid():
            print(photographyspot.is_valid())
            photographyspot.save()
            return Response(photographyspot.data, status=HTTP_201_CREATED)
        return Response(photographyspot.errors, status=HTTP_422_UNPROCESSABLE_ENTITY)

class PhotographySpotDetailView(APIView):  # extend the APIView

    def get(self, _request, pk):

        try:
            # get a photographyspot by id (pk means primary key)
            photographyspot = PhotographySpot.objects.get(pk=pk)
            serializer = PhotographySpotSerializer(photographyspot)
            return Response(serializer.data)
        except PhotographySpot.DoesNotExist:
            # send the JSON to the client
            return Response({'message': 'Not Found'}, status=HTTP_404_NOT_FOUND)

    # def put(self, request, pk):

        # try:
        #     photographyspot = PhotographySpot.objects.get(pk=pk)
        #     updated_photographyspot = PhotographySpotSerializer(PhotographySpot, data=request.data)
        #     if updated_photographyspot.is_valid():
        #         updated_photographyspot.save()
        #         return Response(updated_photographyspot.data, status=HTTP_202_ACCEPTED)
        #     return Response(updated_photographyspot.errors, status=HTTP_422_UNPROCESSABLE_ENTITY)
        # except PhotographySpot.DoesNotExist:
        #     return Response({'message': 'Not Found'}, status=HTTP_204_NO_CONTENT)

    def delete(self, _request, pk):

        try:
            photographyspot = PhotographySpot.objects.get(pk=pk)
            photographyspot.delete()
            return Response(status=HTTP_204_NO_CONTENT)
        except PhotographySpot.DoesNotExist:
            return Response({'message': 'Not Found'}, status=HTTP_404_NOT_FOUND)
