from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.

class User(AbstractUser):
    pass


class Category(models.Model):
    category_name = models.CharField(max_length=64)

    def __str__(self) -> str:
        return  self.category_name 

class Product(models.Model):
    listed_by = models.ForeignKey(User, on_delete=models.CASCADE,related_name='product')
    name = models.CharField(max_length=64)
    category = models.ForeignKey(Category,on_delete=models.CASCADE)
    price = models.IntegerField()
    description = models.CharField(max_length=1064)    
    image = models.ImageField()
