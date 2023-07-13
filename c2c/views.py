from django.shortcuts import render
from django.contrib.auth import authenticate, login, logout
from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status


from .models import User
from .serializers import *

# Create your views here.


def login_view(request):
    if request.method == "POST":
        # attempt the user login
        email = request.POST["email"]
        password = request.POST["password"]
        user = authenticate(request, username=email, password=password)

        if user is not None:
            login(request, user)
            # return the home page of the app
            # like return httpresponse('url name')
            return JsonResponse({"login": "login sucessful"})

        else:
            # unsucessful attempt
            # return same page with error message
            return JsonResponse({"login": "login unsucessful"})

    return render(request, "login.html")


class UserView(APIView):
    def get(self, request):
        output = [
            {
                "username": output.username,
                "id": output.id,
                "email": output.email,
                "first_name": output.first_name,
                "last_name": output.last_name,
            }
            for output in User.objects.all()
        ]
        return Response(output)

    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
        return Response(serializer.data)

class ProductView(APIView):
    def get(self,request):
        output = [
            {
                "listed_by":output.listed_by.id,
                "name":output.name,
                "category":output.category.category_name
            }
            for output in Product.objects.all()
        ]
        return Response(output)
    
    def post(self,request):
        serializer = ProductSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
        return Response(serializer.data)

class CategoryView(APIView):
    def get(self,request):
        output = [
            {
                "category_name": output.category_name 
            }
            for output in Category.objects.all()
        ]
        return Response(output)

    def post(self,request):
        serializer = CategorySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
        return Response(serializer.data)