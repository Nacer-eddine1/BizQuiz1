from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
from .models import CustomUser
from .serializers import CustomUserSerializer
import jwt, datetime

# Register View: Handles user registration
class RegisterView(APIView):
    def post(self, request):
        # Deserialize the request data using CustomUserSerializer
        serializer = CustomUserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        # Save the new user and return the serialized data in the response
        serializer.save()
        return Response(serializer.data)

# Login View: Handles user login and generates a JWT token
class LoginView(APIView):
    def post(self, request):
        # Extract email and password from request data
        email = request.data['email']
        password = request.data['password']

        # Check if a user with the provided email exists
        user = CustomUser.objects.filter(email=email).first()

        if user is None:
            raise AuthenticationFailed('User not found!')

        # Check if the provided password is correct
        if not user.check_password(password):
            raise AuthenticationFailed('Incorrect password!')

        # Generate JWT token with user ID, expiration time, and issued at time
        payload = {
            'id': user.id,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=60),
            'iat': datetime.datetime.utcnow()
        }
        token = jwt.encode(payload, 'secret', algorithm='HS256')

        # Set the JWT token as a cookie in the response
        response = Response()
        response.set_cookie(key='jwt', value=token, httponly=True)
        response.data = {'jwt': token}

        return response

# User View: Retrieves user information based on the provided JWT token
class UserView(APIView):
    def get(self, request):
        # Extract JWT token from cookies
        token = request.COOKIES.get('jwt')

        # Check if the token is present
        if not token:
            raise AuthenticationFailed('Unauthenticated')

        try:
            # Decode the JWT token and retrieve user ID
            payload = jwt.decode(token, 'secret', algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Unauthenticated')

        # Retrieve user based on the decoded user ID and serialize the data
        user = CustomUser.objects.filter(id=payload['id']).first()
        serializer = CustomUserSerializer(user)
        return Response(serializer.data)

# Logout View: Clears the JWT token cookie in the response
class LogoutView(APIView):
    def post(self, request):
        response = Response()
        response.delete_cookie('jwt')
        response.data = {'message': 'success'}
        return response
