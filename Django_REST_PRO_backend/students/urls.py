from django.urls import path
from .views import StudentListCreateAPIView, StudentDetailAPIView

# decalre the path and class view to perform logic to address wise and navigate
urlpatterns = [
    path("students/", StudentListCreateAPIView.as_view(), name="student-list-create"),
    path("students/<int:pk>/", StudentDetailAPIView.as_view(), name="student-detail"),
]
