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
)
from rest_framework import status
from rest_framework.response import Response
from rest_framework.exceptions import ValidationError
from django.db.models.deletion import ProtectedError


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

    def get_video_link(self, request, *args, **kwargs):
        if "video_file" not in request.data:
            raise ValidationError({"video_file": "This field is required"})

        video_file = request.data["video_file"]
        saved_video_file = VideoFile.objects.create(file=video_file)
        return saved_video_file.file.url, saved_video_file.id

    def create(self, request, *args, **kwargs):

        request.data["chapter"] = kwargs["chapter_id"]
        response = super().create(request, *args, **kwargs)

        response.data = {
            "status": "success",
            "message": "Video created successfully",
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

    def create(self, request, *args, **kwargs):

        request.data["quiz"] = kwargs["pk"]
        response = super().create(request, *args, **kwargs)

        response.data = {
            "status": "success",
            "message": "Questions added successfully",
            "data": {
                "id": response.data["id"],
            },
        }
        return response
    
    