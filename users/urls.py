from django.urls import path
from .views import UserListView, UserDetailView, UserLoginView, UserRegisterView

urlpatterns = [
    path('users', UserListView.as_view()),
    path('users/<int:pk>', UserDetailView.as_view()),
    path('login', UserLoginView.as_view()),
    path('register', UserRegisterView.as_view()),
]