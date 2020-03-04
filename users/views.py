# pylint: disable=no-member
from rest_framework.views import APIView # get the APIView class from DRF
from rest_framework.response import Response # get the Response class from DRF
from datetime import datetime, timedelta
from rest_framework.exceptions import PermissionDenied
from rest_framework.permissions import IsAuthenticated
from rest_framework.status import HTTP_422_UNPROCESSABLE_ENTITY, HTTP_204_NO_CONTENT, HTTP_404_NOT_FOUND, HTTP_202_ACCEPTED, HTTP_401_UNAUTHORIZED
from django.contrib.auth import get_user_model
from django.conf import settings
import jwt
from .models import User
from .serializers import PopulatedUserSerializer, UserSerializer, SearchUserSerializer # get the UserSerializer
User = get_user_model()


# Create your views here.
class UserListView(APIView): # extend the APIView

    def get(self, _request):
        users = User.objects.all()
        serialized_users = PopulatedUserSerializer(users, many=True)
        return Response(serialized_users.data)

class UserDetailView(APIView):

    # permission_classes = (IsAuthenticated, )

    def get(self, request, pk):

        try:
            user = User.objects.get(pk=pk)
            serializer = SearchUserSerializer(user)
            return Response(serializer.data)
        except User.DoesNotExist:
            return Response({'message': 'Not Found'}, status=HTTP_404_NOT_FOUND)

    def put(self, request, pk):

        try:
            user = User.objects.get(pk=pk)
            updated_user = SearchUserSerializer(user, data=request.data)
            if updated_user.is_valid():
                updated_user.save()
                return Response(updated_user.data, status=HTTP_202_ACCEPTED)
            return Response(updated_user.errors, status=HTTP_422_UNPROCESSABLE_ENTITY)
        except User.DoesNotExist:
            return  Response({'message': 'UNAUTHORIZED'}, status=HTTP_401_UNAUTHORIZED)

    def delete(self, request, pk):

        try:
            user = request.user
            user = User.objects.get(pk=pk)
            user.delete()
            return Response(status=HTTP_204_NO_CONTENT)
        except User.DoesNotExist:
            return  Response({'message': 'UNAUTHORIZED'}, status=HTTP_401_UNAUTHORIZED)

class UserRegisterView(APIView):

    def post(self, request):
        serialized_user = UserSerializer(data=request.data)
        if serialized_user.is_valid():
            serialized_user.save()
            return Response({'message': 'Registration Successful'})
        return Response(serialized_user.errors, status=HTTP_422_UNPROCESSABLE_ENTITY)

class UserLoginView(APIView):

    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        try: 
            user = User.objects.get(email=email)
            if not user.check_password(password): 
                raise PermissionDenied({'message': 'Invalid Credentials'})
            dt = datetime.now() + timedelta(days=7)
            token = jwt.encode({'sub': user.id, 'exp': int(dt.strftime('%s'))}, settings.SECRET_KEY, algorithm='HS256')
            return Response({'token': token, 'message': f'Welcome back {user.username}'})
        except User.DoesNotExist: 
            raise PermissionDenied({'message': 'Invalid Credentials'})


# class UserDetailView(APIView): # extend the APIView

#     def get(self, _request, pk):
#         user = User.objects.get(pk=pk) # get a book by id (pk means primary key)
#         serializer = UserSerializer(user)

#         return Response(serializer.data) # send the JSON to the client
