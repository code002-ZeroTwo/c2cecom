from django.urls import path

from . import views

urlpatterns = [
    # user login and authentication endpoints
    path('',views.UserView.as_view(),name="user"),
    path('register',views.RegisterView.as_view(),name="register"),
    path('login',views.LoginView.as_view(),name="login"),
    path('logout',views.LogoutView.as_view(),name="logout"),

    # product endpoint
    path('product',views.ProductView.as_view(),name="product"),

    # category endpoint
    path('category',views.CategoryView.as_view(),name="category"),

    # order endpoint
    path('order',views.OrderView.as_view(),name="order"),
]