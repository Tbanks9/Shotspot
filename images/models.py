from django.db import models

# Create your models here.
class Image(models.Model):
    # image_title = models.CharField(max_length=50)
    user = models.ForeignKey('users.User', related_name='images', on_delete=models.CASCADE)
    image_url = models.CharField(max_length=200)

    def __str__(self):
        return self.image_url