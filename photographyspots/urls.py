from django.urls import path
from .views import PhotographySpotListView, PhotographySpotDetailView

urlpatterns = [
    path('photographyspot', PhotographySpotListView.as_view()),
    path('photographyspot/<int:pk>/', PhotographySpotDetailView.as_view()),
]