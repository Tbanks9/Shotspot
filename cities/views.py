# pylint: disable=no-member
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.status import HTTP_404_NOT_FOUND, HTTP_201_CREATED, HTTP_422_UNPROCESSABLE_ENTITY, HTTP_204_NO_CONTENT, HTTP_202_ACCEPTED, HTTP_401_UNAUTHORIZED
from .models import City
from .serializers import PopulatedCitySerializer, CitySerializer

class CityListView(APIView):

    permission_classes = (IsAuthenticatedOrReadOnly, )

    def get(self, _request):
        cities = City.objects.all()
        serialized_cities = PopulatedCitySerializer(cities, many=True)
        return Response(serialized_cities.data)

    def post(self, request):

        city = CitySerializer(data=request.data)

        if city.is_valid():
            city.save()
            return Response(city.data, status=HTTP_201_CREATED)
        return Response(city.errors, status=HTTP_422_UNPROCESSABLE_ENTITY)

class CityDetailView(APIView):  # extend the APIView

    def get(self, _request, pk):

        try:
            # get a city by id (pk means primary key)
            city = City.objects.get(pk=pk)
            serializer = PopulatedCitySerializer(city)
            return Response(serializer.data)
        except City.DoesNotExist:
            # send the JSON to the client
            return Response({'message': 'Not Found'}, status=HTTP_404_NOT_FOUND)

    def put(self, request, pk):

        try:
            city = City.objects.get(pk=pk)
            updated_city = CitySerializer(city, data=request.data)
            if updated_city.is_valid():
                updated_city.save()
                return Response(updated_city.data, status=HTTP_202_ACCEPTED)
            return Response(updated_city.errors, status=HTTP_422_UNPROCESSABLE_ENTITY)
        except City.DoesNotExist:
            return Response({'message': 'Not Found'}, status=HTTP_204_NO_CONTENT)

    def delete(self, _request, pk):

        try:
            city = City.objects.get(pk=pk)
            city.delete()
            return Response(status=HTTP_204_NO_CONTENT)
        except City.DoesNotExist:
            return Response({'message': 'Not Found'}, status=HTTP_404_NOT_FOUND)
