from rest_framework import viewsets
from .models import Course
from .serializers import CourseSerializer


class CourseViewSet(viewsets.ModelViewSet):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer

    def create(self, request, *args, **kwargs):

        # we need to add course creator
        request.data["course_creator"] = request.user.id

        response = super().create(request, *args, **kwargs)
        response.data = {
            "status": "success",
            "message": "Course created successfully",
        }
        return response

    def add_details(self, request, *args, **kwargs):

        request.data["course_creator"] = request.user.id



        response = super().update(request, partial=True, *args, **kwargs)

        response.data = {
            "status": "success",
            "message": "Course details added successfully",
        }
        return response
    
    def update(self, request, *args, **kwargs):

        request.data["course_creator"] = request.user.id

        response = super().update(request, partial=True, *args, **kwargs)

        response.data = {
            "status": "success",
            "message": "Course updated successfully",
        }
        return response

