from rest_framework import viewsets
from .models import Course
from .serializers import CourseSerializer


class CourseCreateView(viewsets.ModelViewSet):
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
