from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext_lazy as _

def upload_to(instance,filename):
    return 'posts/{filename}'.format(filename=filename)


# Create your models here.


class User(AbstractUser):
    name = models.CharField(max_length=255)
    email = models.CharField(max_length=255, unique=True)
    password = models.CharField(max_length=255)
    username = models.CharField(max_length=150,unique=True)

    REQUIRED_FIELDS = []


class Category(models.Model):
    category_name = models.CharField(max_length=64)

    def __str__(self) -> str:
        return self.category_name


class Product(models.Model):
    listed_by = models.ForeignKey(
        User, on_delete=models.CASCADE,to_field="id", related_name="product"
    )
    name = models.CharField(max_length=64)
    category = models.ForeignKey(Category,to_field="id", on_delete=models.CASCADE)
    price = models.IntegerField()
    description = models.CharField(max_length=1064)
    image = models.ImageField(_("Image"), upload_to=upload_to)
