from django.db import models

# Create your models here.
class City(models.Model):
    city_name = models.CharField(max_length=50)
    city_description = models.CharField(max_length=400)
    photography_spot = models.ForeignKey('photographyspots.PhotographySpot', 
    related_name='cities', 
    on_delete=models.CASCADE,
    )

    def __str__(self):
        return self.city_name