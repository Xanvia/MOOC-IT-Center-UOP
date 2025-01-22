from rest_framework import viewsets, generics
from ..models import (
    Course,
    Week,
    Chapter,
    Note,
    Image,
    Video,
    VideoFile,
)
from ..serializers import (
    WeekSerializer,
    ChapterSerializer,
    NoteSerializer,
    ImageSerializer,
    VideoSerializer,
)
from rest_framework import status
from rest_framework.response import Response
from rest_framework.exceptions import ValidationError
from django.db.models.deletion import ProtectedError
from ..permissons import (
    CourseContentListAccess,
    CousrseContentDeleteAccess,
    CourseContentCreateAccess,
    CourseContentEditAccess,
    CourseFileUploadAccess,
)
from coursemanagement.models import CourseTeachers
from ..utils import segment_video




class WeekViewSet(viewsets.ModelViewSet):
    queryset = Week.objects.all()
    serializer_class = WeekSerializer

    def get_object(self):
        self.kwargs["pk"] = self.kwargs.get("week_id")
        return super().get_object()

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

    def get_custom_permissions(self, user):
        course = Course.objects.get(id=self.kwargs["course_id"])
        representation = {}
        if user.groups.filter(name="teacher").exists():
            if course.course_creator == user:
                representation["canEdit"] = True
                representation["canDelete"] = True
                representation["canUploadFiles"] = True
                representation["canCreateItems"] = True

            else:
                course_teacher = CourseTeachers.objects.filter(
                    teacher=user, course=course
                ).first()

                representation["canEdit"] = course_teacher.permissions.filter(
                    label="edit_course_content"
                ).exists()
                representation["canDelete"] = course_teacher.permissions.filter(
                    label="delete_course_content"
                ).exists()
                representation["canUploadFiles"] = course_teacher.permissions.filter(
                    label="upload_files"
                ).exists()
                representation["canCreateItems"] = course_teacher.permissions.filter(
                    label="create_course_content"
                ).exists()
        else:
            representation["canEdit"] = False
            representation["canDelete"] = False
            representation["canUploadFiles"] = False
            representation["canCreateItems"] = False
        return representation

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

        user = self.request.user
        if user:
            custom_permissions = self.get_custom_permissions(user)

        response.data = {
            "status": "success",
            "data": {"weeks": response.data, "permissions": custom_permissions},
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

    def get_object(self):
        self.kwargs["pk"] = self.kwargs.get("chapter_id")
        return super().get_object()

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

        request.data["week"] = kwargs["week_id"]
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

    def get_object(self):
        self.kwargs["pk"] = self.kwargs.get("note_id")
        return super().get_object()

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

    def get_object(self):
        self.kwargs["pk"] = self.kwargs.get("video_id")
        return super().get_object()

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
        """
        Handle video upload and conversion
        Returns the HLS playlist URL and video ID
        """
        if "video_file" not in request.data:
            raise ValidationError({"video_file": "Video file is required"})

        video_file = request.data["video_file"]

        saved_video_file = VideoFile.objects.create(file=video_file)

        # Generate HLS playlist
        playlist_url = segment_video(saved_video_file)

        # Update video file record with playlist URL
        saved_video_file.hls_playlist = playlist_url
        saved_video_file.file = None
        saved_video_file.save()
        return playlist_url, saved_video_file.id

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