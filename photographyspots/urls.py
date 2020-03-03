from django.urls import path
from .views import PhotographySpotListView, PhotographySpotDetailView

urlpatterns = [
    path('', PhotographySpotListView.as_view()),
    path('<int:pk>', PhotographySpotDetailView.as_view()),
]