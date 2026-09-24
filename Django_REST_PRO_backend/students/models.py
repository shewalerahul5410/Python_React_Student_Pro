from django.db import models

# Create your models here.


class Student(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    age = models.IntegerField()
    course = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class AuditLog(models.Model):

    action = models.CharField(max_length=50)

    student_id = models.IntegerField(null=True, blank=True)

    description = models.TextField()

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.action
