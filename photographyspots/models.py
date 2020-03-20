from django.db import models

# Create your models here.
class PhotographySpot(models.Model):
    location_name = models.CharField(max_length=50, unique=True)
    location_description = models.CharField(max_length=400, blank=True)
    location_image = models.CharField(max_length=200, blank=True)
    city = models.ForeignKey(
        'cities.City', 
        related_name='photographyspots', 
        on_delete=models.CASCADE,
        default='City',
        blank=True
        )
    # user = models.ForeignKey(
    #     'users.User',
    #     related_name='users',
    #     on_delete=models.CASCADE,
    #     null=True,
    #     blank=True
    # )

    def __str__(self):
        return self.location_name

# class Comment(models.Model):
#     text = models.TextField(max_length=1000, blank=True)
#     photographyspots = models.ForeignKey(
#         PhotographySpot,
#         related_name='comments',
#         on_delete=models.CASCADE,
#         null=True,
#         blank=True
#     )
#     owner = models.ForeignKey(
#         User,
#         related_name='comments',
#         on_delete=models.CASCADE,
#         null=True,
#         blank=True
#     )

#     def __str__(self):
#         return f'Comment {self.id} - {self.owner}'