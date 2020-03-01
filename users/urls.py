from django.urls import path
from .views import UserListView, UserLoginView, UserRegisterView

urlpatterns = [
    path('users', UserListView.as_view()),
    path('login', UserLoginView.as_view()),
    path('register', UserRegisterView.as_view()),
]