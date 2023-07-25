import base64
from django.shortcuts import render
from django.contrib.auth import authenticate, login, logout
from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.views.decorators.csrf import csrf_exempt
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework import renderers
import jwt, datetime

from .models import User
from .serializers import *

# Create your views here.


class RegisterView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)


class LoginView(APIView):
    def post(self, request):
        email = request.data["email"]
        password = request.data["password"]

        user = User.objects.filter(email=email).first()

        if user is None:
            raise AuthenticationFailed("user not found")

        if not user.check_password(password):
            raise AuthenticationFailed("Incorrect password")

        payload = {
            "id": user.id,
            "exp": datetime.datetime.utcnow() + datetime.timedelta(minutes=60),
            "iat": datetime.datetime.utcnow(),
        }

        token = jwt.encode(payload, "secret", algorithm="HS256")

        response = Response()

        response.set_cookie(key="jwt", value=token, httponly=True)
        response.data = {"jwt": token}

        return response


class UserView(APIView):
    def get(self, request):
        token = request.COOKIES.get("jwt")

        if not token:
            raise AuthenticationFailed("unauthenticated")

        try:
            payload = jwt.decode(token, "secret", algorithms=["HS256"])
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed("Unauthenticated!")

        user = User.objects.get(id=payload["id"])
        serializer = UserSerializer(user)

        return Response(serializer.data)

    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
        return Response(serializer.data)


class LogoutView(APIView):
    def post(self, request):
        response = Response()
        response.delete_cookie("jwt")
        response.data = {"message": "success"}
        return response


class OrderView(APIView):
    def post(self, request):
        auth_header = request.headers.get("Authorization")
        if auth_header:
            # Split the header value to separate the authentication scheme and the token
            auth_parts = auth_header.split(" ")
            if len(auth_parts) == 2 and auth_parts[0].lower() == "bearer":
                jwt_token = auth_parts[1]

        if not jwt_token:
            raise AuthenticationFailed("unauthenticated not valid")

        product_id = request.data["ordered_item"]

        # get product and update the product quantity
        product = Product.objects.get(id=product_id)
        product.quantity = product.quantity - 1
        product.save()

        serializer = OrderSerializer(data=request.data)

        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(
                {"quantity": product.quantity, "success": "success"},
                status=status.HTTP_200_OK,
            )
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ProductView(APIView):
    parser_classes = [MultiPartParser, FormParser]

    def get(self, request):
        output = [
            {
                "product_id": product.id,
                "listed_by": product.listed_by.username,
                "name": product.name,
                "category": product.category.category_name,
                "price": product.price,
                "description": product.description,
                "quantity": product.quantity,
                "image": base64.b64encode(product.image.read()),
            }
            for product in Product.objects.all()
        ]

        return Response(output)

    def post(self, request):
        token = request.COOKIES.get("jwt")
        if not token:
            raise AuthenticationFailed("unauthenticated")

        try:
            payload = jwt.decode(token, "secret", algorithms=["HS256"])
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed("Unauthenticated!")

        user = User.objects.get(id=payload["id"])

        user_id = user.id
        request.data["listed_by"] = user_id

        serializer = ProductSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CategoryView(APIView):
    def get(self, request):
        output = [
            {"id": output.id, "category_name": output.category_name}
            for output in Category.objects.all()
        ]
        return Response(output)

    def post(self, request):
        serializer = CategorySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
        return Response(serializer.data)
