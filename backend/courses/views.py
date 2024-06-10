from django.shortcuts import render

# Create your views here.
from rest_framework import generics
from .models import Course
from .serializers import CourseSerializer


class CourseCreateView(generics.CreateAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer

    def create(self, serializer, request):
        # Assume the user is available in the request context
        user = self.request.user
        serializer.save(course_creator=user)

        request.data["course_creator"] = request.user.id


    


