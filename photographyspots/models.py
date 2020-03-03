from django.db import models

# Create your models here.
class PhotographySpot(models.Model):
    location_name = models.CharField(max_length=50, unique=True)
    location_description = models.CharField(max_length=400, blank=True)
    location_image = models.CharField(max_length=200, blank=True)
    visited = models.BooleanField(default=False)
    city = models.ForeignKey(
        'cities.City', 
        related_name='photographyspots', 
        on_delete=models.CASCADE,
        default='City'
        )
    # images = models.OneToOneField(
    #     'images.Image', 
    #     related_name='photographyspots', 
    #     on_delete=models.CASCADE,
    #     default='Image'
    #     )

    def __str__(self):
        return self.location_name