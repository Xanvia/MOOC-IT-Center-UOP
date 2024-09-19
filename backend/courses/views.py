from rest_framework import viewsets, generics
from .models import (
    Course,
    Week,
    Chapter,
    Note,
    Image,
    Video,
    Quiz,
    VideoFile,
    Question,
    Enrollment,
    Progress,
    Component,
)
from .serializers import (
    CourseSerializer,
    WeekSerializer,
    ChapterSerializer,
    NoteSerializer,
    QuizSerializer,
    ImageSerializer,
    VideoSerializer,
    EnrollementSerializer,
    QuestionSerializer,
    ProgressSerializer,
    ProgressTrackSerializer,
)
from rest_framework import status
from rest_framework.response import Response
from rest_framework.exceptions import ValidationError
from django.db.models.deletion import ProtectedError
from django.shortcuts import get_object_or_404
from .permissons import (
    CourseContentListAccess,
    CousrseContentDeleteAccess,
    CourseContentCreateAccess,
    CourseContentEditAccess,
    CourseFileUploadAccess,
)


class CourseViewSet(viewsets.ModelViewSet):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer

    def filter_queryset(self, queryset):
        if self.action == "list":
            return super().filter_queryset(queryset).filter(status="published")
        return super().filter_queryset(queryset)

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

    def list(self, request, *args, **kwargs):
        response = super().list(request, *args, **kwargs)

        response.data = {
            "status": "success",
            "data": {
                "courses": response.data,
            },
        }
        return response


class WeekViewSet(viewsets.ModelViewSet):
    queryset = Week.objects.all()
    serializer_class = WeekSerializer

    def get_permissions(self):
        """
        Return different permission classes based on the action.
        """
        if self.action == "list":
            # Students can list weeks if they are enrolled
            permission_classes = [CourseContentListAccess]
        elif self.action == "destroy":
            # Only course creators can delete weeks
            permission_classes = [CousrseContentDeleteAccess]
        elif self.action == "create":
            # Only course creators can create weeks
            permission_classes = [CourseContentCreateAccess]
        else:
            permission_classes = []
        return [permission() for permission in permission_classes]

    def get_queryset(self):
        if self.action == "destroy":
            return super().get_queryset()
        return super().get_queryset().filter(course=self.kwargs["course_id"])

    def create(self, request, *args, **kwargs):

        request.data["course"] = kwargs["course_id"]
        response = super().create(request, *args, **kwargs)

        response.data = {
            "status": "success",
            "message": "Week created successfully",
            "data": {"id": response.data["id"]},
        }
        return response

    def list(self, request, *args, **kwargs):
        response = super().list(request, *args, **kwargs)
        response.data = {
            "status": "success",
            "data": {
                "weeks": response.data,
            },
        }
        return response

    def destroy(self, request, *args, **kwargs):
        try:
            response = super().destroy(request, *args, **kwargs)
        except ProtectedError:
            return Response(
                {"status": "error", "message": "Week is not empty"},
                status=status.HTTP_400_BAD_REQUEST,
            )
        except Exception as e:
            print(e)
            return Response(
                {"status": "error", "message": "An unexpected error occurred"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

        response.data = {
            "status": "success",
            "message": "Week deleted successfully",
        }
        return response


class ChapterViewSet(viewsets.ModelViewSet):
    queryset = Chapter.objects.all()
    serializer_class = ChapterSerializer

    def get_permissions(self):
        """
        Return different permission classes based on the action.
        """
        if self.action == "destroy":
            # Only course creators can delete weeks
            permission_classes = [CousrseContentDeleteAccess]
        elif self.action == "create":
            # Only course creators can create weeks
            permission_classes = [CourseContentCreateAccess]
        else:
            permission_classes = []
        return [permission() for permission in permission_classes]

    def create(self, request, *args, **kwargs):

        request.data["week"] = kwargs["pk"]
        response = super().create(request, *args, **kwargs)

        response.data = {
            "status": "success",
            "message": "Chapter created successfully",
            "data": {"id": response.data["id"]},
        }
        return response

    def destroy(self, request, *args, **kwargs):
        try:
            response = super().destroy(request, *args, **kwargs)
        except ProtectedError:
            return Response(
                {"status": "error", "message": "Chapter is not empty"},
                status=status.HTTP_400_BAD_REQUEST,
            )
        except Exception as e:
            print(e)
            return Response(
                {"status": "error", "message": "An unexpected error occurred"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

        response.data = {
            "status": "success",
            "message": "Chapter deleted successfully",
        }
        return response


class NoteViewSet(viewsets.ModelViewSet):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer

    def get_permissions(self):
        """
        Return different permission classes based on the action.
        """
        if self.action == "destroy":
            # Only course creators can delete weeks
            permission_classes = [CousrseContentDeleteAccess]
        elif self.action == "create":
            # Only course creators can create weeks
            permission_classes = [CourseContentCreateAccess]
        elif self.action == "update":
            # Only course creators can create weeks
            permission_classes = [CourseContentEditAccess]

        else:
            permission_classes = []
        return [permission() for permission in permission_classes]

    def create(self, request, *args, **kwargs):

        request.data["chapter"] = kwargs["chapter_id"]
        response = super().create(request, *args, **kwargs)

        response.data = {
            "status": "success",
            "message": "Note created successfully",
            "data": {
                "id": response.data["id"],
            },
        }
        return response

    def update(self, request, *args, **kwargs):
        response = super().update(request, partial=True, *args, **kwargs)

        response.data = {
            "status": "success",
            "message": "Note updated successfully",
        }
        return response


class ImageUpload(generics.CreateAPIView):
    queryset = Image.objects.all()
    serializer_class = ImageSerializer
    permission_classes = [CourseFileUploadAccess]

    def create(self, request, *args, **kwargs):
        request.data["note"] = kwargs["note_id"]
        response = super().create(request, *args, **kwargs)

        response.data = {
            "status": "success",
            "message": "Image uploaded successfully",
            "data": {
                "id": response.data["id"],
                "url": response.data["image"],
            },
        }
        return response


class VideoViewSet(viewsets.ModelViewSet):
    queryset = Video.objects.all()
    serializer_class = VideoSerializer

    def get_permissions(self):
        """
        Return different permission classes based on the action.
        """
        if self.action == "destroy":
            # Only course creators can delete weeks
            permission_classes = [CousrseContentDeleteAccess]
        elif self.action == "create":
            # Only course creators can create weeks
            permission_classes = [CourseContentCreateAccess]
        elif self.action == "update":
            # Only course creators can create weeks
            permission_classes = [CourseContentEditAccess]
        elif self.action == "edit_quiz":
            # Only course creators can create weeks
            permission_classes = [CourseContentEditAccess]
        elif self.action == "get_video_link":
            permission_classes = [CourseFileUploadAccess]

        else:
            permission_classes = []
        return [permission() for permission in permission_classes]

    def get_video_link(self, request, *args, **kwargs):
        print(request.data)
        if "video_file" not in request.data:
            raise ValidationError({"video_file": "Video file is required"})

        video_file = request.data["video_file"]
        saved_video_file = VideoFile.objects.create(file=video_file)
        return saved_video_file.file.url, saved_video_file.id

    def create(self, request, *args, **kwargs):

        request.data["chapter"] = kwargs["chapter_id"]
        response = super().create(request, *args, **kwargs)

        response.data = {
            "status": "success",
            "message": "Video created successfully",
            "data": {
                "id": response.data["id"],
            },
        }
        return response

    def update(self, request, *args, **kwargs):
        link, id = self.get_video_link(request, *args, **kwargs)
        request.data["video_link"] = link
        request.data["video_id"] = id
        response = super().update(request, partial=True, *args, **kwargs)

        response.data = {
            "status": "success",
            "message": "Video updated successfully",
            "data": {"url": link},
        }
        return response

    def edit_quiz(self, request, *args, **kwargs):
        response = super().update(request, partial=True, *args, **kwargs)

        response.data = {
            "status": "success",
            "message": "Quiz updated successfully",
        }
        return response


class EnrollementViewSet(viewsets.ModelViewSet):
    serializer_class = EnrollementSerializer
    queryset = Enrollment.objects.all()

    def enroll(self, request, *args, **kwargs):
        student = request.user
        request.data["course"] = kwargs["course_id"]
        request.data["student"] = student.id

        response = super().create(request, *args, **kwargs)

        response.data = {
            "status": "success",
            "message": "Enrolled successfully",
        }
        return response


class QuizViewSet(viewsets.ModelViewSet):
    serializer_class = QuizSerializer
    queryset = Quiz.objects.all()

    def get_permissions(self):
        """
        Return different permission classes based on the action.
        """
        if self.action == "destroy":
            # Only course creators can delete weeks
            permission_classes = [CousrseContentDeleteAccess]
        elif self.action == "create":
            # Only course creators can create weeks
            permission_classes = [CourseContentCreateAccess]
        elif self.action == "update":
            # Only course creators can create weeks
            permission_classes = [CourseContentEditAccess]

        else:
            permission_classes = []
        return [permission() for permission in permission_classes]

    def create(self, request, *args, **kwargs):

        request.data["chapter"] = kwargs["chapter_id"]
        response = super().create(request, *args, **kwargs)

        response.data = {
            "status": "success",
            "message": "Quiz created successfully",
            "data": {
                "id": response.data["id"],
            },
        }
        return response

    def update(self, request, *args, **kwargs):
        response = super().update(request, partial=True, *args, **kwargs)

        response.data = {
            "status": "success",
            "message": "Quiz Details Added successfully",
        }
        return response


class AddQuestionsViewSet(viewsets.ModelViewSet):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer
    permission_classes = [CourseContentEditAccess]

    def create(self, request, *args, **kwargs):

        request.data["quiz"] = kwargs["pk"]
        response = super().create(request, *args, **kwargs)
        response.data = {
            "status": "success",
            "message": "Question added successfully",
            "data": {
                "id": response.data["id"],
            },
        }
        return response


class ProgressTrackViewSet(viewsets.ModelViewSet):
    queryset = Progress.objects.all()
    serializer_class = ProgressSerializer

    def get_object(self):
        if self.action == "mark_as_completed":
            progress = get_object_or_404(
                Progress.objects.filter(enrollment__student=self.request.user),
                component=self.kwargs["pk"],
            )
            return progress
        return super().get_object()

    def start_component(self, request, component_id, *args, **kwargs):

        request.data["component"] = component_id
        response = super().create(request, *args, **kwargs)
        response.data = {
            "status": "success",
            "message": "Component started successfully",
            "data": {
                "id": response.data["id"],
            },
        }

        return response

    def mark_as_completed(self, request, *args, **kwargs):

        request.data["completed"] = True
        response = super().update(request, partial=True, *args, **kwargs)
        response.data = {
            "status": "success",
            "message": "Component marked as completed successfully",
        }

        return response


class GetProgressAPIView(generics.RetrieveAPIView):
    serializer_class = ProgressTrackSerializer
    queryset = Course.objects.all()

    def retrieve(self, request, *args, **kwargs):
        response = super().retrieve(request, *args, **kwargs)

        response.data = {"status": "success", "data": response.data}
        return response
