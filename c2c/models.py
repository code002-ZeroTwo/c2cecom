from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext_lazy as _
from phonenumber_field.modelfields import PhoneNumberField


def upload_to(instance, filename):
    return "posts/{filename}".format(filename=filename)


# Create your models here.


class User(AbstractUser):
    name = models.CharField(max_length=255)
    email = models.CharField(max_length=255, unique=True)
    password = models.CharField(max_length=255)
    username = models.CharField(max_length=150, unique=True)
    phone = PhoneNumberField(null=True, blank=True)

    REQUIRED_FIELDS = []


class Category(models.Model):
    category_name = models.CharField(max_length=64)

    def __str__(self) -> str:
        return self.category_name


class Product(models.Model):
    listed_by = models.ForeignKey(
        User, on_delete=models.CASCADE, to_field="id", related_name="product"
    )
    name = models.CharField(max_length=64)
    category = models.ForeignKey(Category, to_field="id", on_delete=models.CASCADE)
    price = models.IntegerField()
    description = models.CharField(max_length=1064)
    quantity = models.IntegerField()
    image = models.ImageField(_("Image"), upload_to=upload_to)


class Order(models.Model):
    ordered_by = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="orders"
    )
    ordered_item = models.ForeignKey(
        Product, on_delete=models.CASCADE, related_name="items"
    )

    def __str__(self) -> str:
        return f"{self.ordered_item} ordered by {self.ordered_by}"