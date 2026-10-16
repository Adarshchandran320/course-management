from enum import unique
from django.db import models

# Create your models here.
class Student(models.Model):
    student_id = models.AutoField(primary_key = True)
    name = models.CharField(max_length=100)
    email = models.EmailField(unique = True)
    phone = models.CharField(max_length=15)
    def __str__(self):
        return self.name
class Course(models.Model):
    course_id = models.AutoField(primary_key = True)
    course_name = models.CharField(max_length=100)
    duration = models.IntegerField()
    fee = models.DecimalField(max_digits=10, decimal_places=2)
    def __str__(self):
        return self.course_name

class Enrollment(models.Model):
    name = models.CharField(max_length=100,unique=True)
    student = models.ManyToManyField(Student,related_name='enrollments')
    def __str__(self):
        return self.name