# pylint: disable=no-member
from rest_framework.views import APIView # get the APIView class from DRF
from rest_framework.response import Response # get the Response class from DRF
from datetime import datetime, timedelta
from rest_framework.exceptions import PermissionDenied
from rest_framework.status import HTTP_422_UNPROCESSABLE_ENTITY
from django.contrib.auth import get_user_model
from django.conf import settings
import jwt
from .models import User
from .serializers import PopulatedUserSerializer, UserSerializer # get the UserSerializer
User = get_user_model()


# Create your views here.
class UserListView(APIView): # extend the APIView

    def get(self, _request):
        users = User.objects.all()
        serialized_users = PopulatedUserSerializer(users, many=True)
        return Response(serialized_users.data)

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

            token = jwt.encode({'sub': user.id, 'exp': int(dt.strftime('%s'))}, settings.SECRET_KEY, algorithm=['HS256'])

            return Response({'token': token, 'message': f'Welcome back {user.username}'})

        except User.DoesNotExist: 
            raise PermissionDenied({'message': 'Invalid Credentials'})


# class UserDetailView(APIView): # extend the APIView

#     def get(self, _request, pk):
#         user = User.objects.get(pk=pk) # get a book by id (pk means primary key)
#         serializer = UserSerializer(user)

#         return Response(serializer.data) # send the JSON to the client
