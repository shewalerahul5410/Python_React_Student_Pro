from django.contrib.auth.models import User
from rest_framework import serializers
import re

# to convert the django object into json format and also use the validation error to serilizar


class RegisterSerializer(serializers.ModelSerializer):

    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ["username", "email", "password"]

    # this is do the vadalidation in the user input
    # def validate_username(self, value):

    #     if not value.isChar():
    #         raise serializers.ValidationError("Username must contain only digits.")

    #     return value

    def create(self, validated_data):

        user = User.objects.create_user(
            username=validated_data["username"],
            email=validated_data["email"],
            password=validated_data["password"],
        )

        return user
