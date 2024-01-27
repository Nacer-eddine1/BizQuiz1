from rest_framework import serializers
from .models import CustomUser

class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'email', 'password']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        # Extract and remove the 'password' field from the validated data
        password = validated_data.pop('password', None)

        # Create a new instance of the CustomUser model with the remaining validated data
        instance = self.Meta.model(**validated_data)

        # If a password is provided, set the password for the new user instance
        if password is not None:
            instance.set_password(password)

        # Save the new user instance to the database
        instance.save()

        # Return the created user instance
        return instance
