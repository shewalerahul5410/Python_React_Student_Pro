from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import IsAuthenticated
from .permissions import CanDeleteStudent

from rest_framework.exceptions import APIException

from .models import Student
from .serializers import StudentSerializer

# Create your views here.
#  so here implement the midddleware and singnals that how to work this one and also integrated the authectiocation using the built in install jwtToken and then implement login and register flow
# and also pagainationn API check here as working using the decalre in setting as middlware
#  in setting declare the middleware , app , impage media , pagination url


class StudentListCreateAPIView(APIView):

    def get(self, request):

        try:
            students = Student.objects.all()

            paginator = PageNumberPagination()
            paginator.page_size = 2

            page = paginator.paginate_queryset(students, request)

            serializer = StudentSerializer(page, many=True)

            return paginator.get_paginated_response(serializer.data)

        except Exception as e:

            raise APIException(f"Something went wrong: {str(e)}")

    def post(self, request):
        serializer = StudentSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()

            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class StudentDetailAPIView(APIView):

    permission_classes = [IsAuthenticated, CanDeleteStudent]

    def get_object(self, pk):

        try:
            return Student.objects.get(pk=pk)
        except Student.DoesNotExist:
            return None

    def get(self, request, pk):

        student = self.get_object(pk)

        if student is None:
            return Response(
                {"error": "Student not found"}, status=status.HTTP_404_NOT_FOUND
            )

        serializer = StudentSerializer(student)

        return Response(serializer.data)

    def put(self, request, pk):

        student = self.get_object(pk)

        if student is None:
            return Response(
                {"error": "Student not found"}, status=status.HTTP_404_NOT_FOUND
            )

        serializer = StudentSerializer(student, data=request.data)

        if serializer.is_valid():
            serializer.save()

            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):

        student = self.get_object(pk)

        if student is None:
            return Response(
                {"error": "Student not found"}, status=status.HTTP_404_NOT_FOUND
            )

        student.delete()

        return Response(
            {"message": "Student deleted successfully"},
            status=status.HTTP_204_NO_CONTENT,
        )
