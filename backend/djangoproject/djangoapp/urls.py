from django.urls import path
from .views import LoginView, RegisterView, UserView, LogoutView

# Define URL patterns for authentication-related views
urlpatterns = [
    # Path for user registration
    path('register', RegisterView.as_view(), name='register'),

    # Path for user login
    path('login', LoginView.as_view(), name='login'),

    # Path for retrieving user information
    path('user', UserView.as_view(), name='user'),

    # Path for user logout
    path('logout', LogoutView.as_view(), name='logout'),
]
