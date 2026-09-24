from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.exceptions import APIException

from .serializers import RegisterSerializer


class RegisterAPIView(APIView):
    #  this persmission allow to only one new user have no permission
    permission_classes = [AllowAny]

    def post(self, request):

        try:
            serializer = RegisterSerializer(data=request.data)

            if serializer.is_valid():

                serializer.save()

                return Response(
                    {
                        "message": "User registered successfully",
                        "user": serializer.data,
                    },
                    status=status.HTTP_201_CREATED,
                )

            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        except Exception as e:

            raise APIException(f"Something went wrong: {str(e)}")
