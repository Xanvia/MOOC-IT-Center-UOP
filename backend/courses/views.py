from rest_framework import viewsets, generics
from .models import Course, Week, Chapter, Note
from .serializers import (
    CourseSerializer,
    WeekSerializer,
    ChapterSerializer,
    NoteSerializer,
)
from rest_framework import status
from rest_framework.response import Response


class CourseViewSet(viewsets.ModelViewSet):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer

    def retrieve(self, request, *args, **kwargs):
        response = super().retrieve(request, *args, **kwargs)

        response.data = {"status": "success", "data": response.data}
        return response

    def create(self, request, *args, **kwargs):

        # we need to add course creator
        request.data["course_creator"] = request.user.id

        response = super().create(request, *args, **kwargs)
        course_id = response.data["id"]
        response.data = {
            "status": "success",
            "message": "Course created successfully",
            "data": {"id": course_id},
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
        request.data._mutable = True
        request.data["course_creator"] = request.user.id

        response = super().update(request, partial=True, *args, **kwargs)

        response.data = {
            "status": "success",
            "message": "Course updated successfully",
        }
        return response


class WeekViewSet(viewsets.ModelViewSet):
    queryset = Week.objects.all()
    serializer_class = WeekSerializer

    def create(self, request, *args, **kwargs):

        request.data["course"] = kwargs["pk"]
        response = super().create(request, *args, **kwargs)

        response.data = {
            "status": "success",
            "message": "Week created successfully",
        }
        return response


class ChapterViewSet(viewsets.ModelViewSet):
    queryset = Chapter.objects.all()
    serializer_class = ChapterSerializer

    def create(self, request, *args, **kwargs):

        request.data["week"] = kwargs["pk"]
        response = super().create(request, *args, **kwargs)

        response.data = {
            "status": "success",
            "message": "Chapter created successfully",
        }
        return response


class NoteViewSet(viewsets.ModelViewSet):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer

    def create(self, request, *args, **kwargs):

        request.data["chapter"] = kwargs["chapter_id"]
        request.data["component_type"] = "note"
        response = super().create(request, *args, **kwargs)

        response.data = {
            "status": "success",
            "message": "Note created successfully",
        }
        return response
