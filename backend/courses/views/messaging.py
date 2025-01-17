from rest_framework import viewsets, generics, permissions
from ..models import (
    Course,
    Announcement,
    Message,
    Reply,
    ItemChat,
    ThreadMessage,
    LastSeen,
    LastSeenCourse,
)
from ..serializers import (
    AnnouncementSerializer,
    MessageSerializer,
    ReplySerializer,
    ItemChatSerializer,
    ThreadMessageSerializer,
    LastSeenSerializer,
    CheckUpdatesSerializer,
    UpdateLastSeenSerializer,
)
from rest_framework import status
from rest_framework.response import Response
from django.db.models.deletion import ProtectedError
from django.utils import timezone
from ..permissons import (
    AnnouncemantAccess,
)


class AnnouncementViewSet(viewsets.ModelViewSet):
    queryset = Announcement.objects.all()
    serializer_class = AnnouncementSerializer
    permission_classes = [AnnouncemantAccess]

    def filter_queryset(self, queryset):
        if self.action == "destroy" or self.action == "update":
            return super().filter_queryset(queryset)
        return super().filter_queryset(queryset).filter(course=self.kwargs["course_id"])

    def create(self, request, *args, **kwargs):
        request.data["course"] = kwargs["course_id"]
        request.data["user"] = request.user.id
        response = super().create(request, *args, **kwargs)
        response.data = {
            "status": "success",
            "message": "Announcement created successfully",
        }
        return response

    def destroy(self, request, *args, **kwargs):
        try:
            response = super().destroy(request, *args, **kwargs)
        except ProtectedError:
            return Response(
                {"status": "error", "message": "Announcement is not empty"},
                status=status.HTTP_400_BAD_REQUEST,
            )
        except Exception as e:
            return Response(
                {"status": "error", "message": "An unexpected error occurred"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

        response.data = {
            "status": "success",
            "message": "Announcement deleted successfully",
        }
        return response

    def update(self, request, *args, **kwargs):
        response = super().update(request, partial=True, *args, **kwargs)

        response.data = {
            "status": "success",
            "message": "Announcement updated successfully",
        }
        return response

    def list(self, request, *args, **kwargs):
        response = super().list(request, *args, **kwargs)

        response.data = {
            "status": "success",
            "data": {
                "announcements": response.data,
            },
        }
        return response


class MessageViewSet(viewsets.ModelViewSet):
    queryset = Message.objects.all()
    serializer_class = MessageSerializer

    def filter_queryset(self, queryset):
        if self.action == "destroy" or self.action == "update":
            return super().filter_queryset(queryset)
        return super().filter_queryset(queryset).filter(course=self.kwargs["course_id"])

    def create(self, request, *args, **kwargs):
        request.data["course"] = kwargs["course_id"]
        request.data["user"] = request.user.id
        response = super().create(request, *args, **kwargs)
        response.data = {
            "status": "success",
            "message": "Message created successfully",
        }
        return response

    def destroy(self, request, *args, **kwargs):
        try:
            response = super().destroy(request, *args, **kwargs)
        except ProtectedError:
            return Response(
                {"status": "error", "message": "Message is not empty"},
                status=status.HTTP_400_BAD_REQUEST,
            )
        except Exception as e:
            return Response(
                {"status": "error", "message": "An unexpected error occurred"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

        response.data = {
            "status": "success",
            "message": "Message deleted successfully",
        }
        return response

    def update(self, request, *args, **kwargs):
        response = super().update(request, partial=True, *args, **kwargs)

        response.data = {
            "status": "success",
            "message": "Message updated successfully",
        }
        return response

    def list(self, request, *args, **kwargs):
        response = super().list(request, *args, **kwargs)

        response.data = {
            "status": "success",
            "data": {
                "messages": response.data,
            },
        }
        return response


class ReplyViewSet(viewsets.ModelViewSet):
    queryset = Reply.objects.all()
    serializer_class = ReplySerializer

    def filter_queryset(self, queryset):
        if self.action == "destroy" or self.action == "update":
            return super().filter_queryset(queryset)
        return (
            super().filter_queryset(queryset).filter(message=self.kwargs["message_id"])
        )

    def create(self, request, *args, **kwargs):
        request.data["message"] = kwargs["message_id"]
        request.data["user"] = request.user.id
        response = super().create(request, *args, **kwargs)
        response.data = {
            "status": "success",
            "message": "Thread created successfully",
            "data": response.data,
        }
        return response

    def destroy(self, request, *args, **kwargs):
        try:
            response = super().destroy(request, *args, **kwargs)
        except Exception as e:
            return Response(
                {"status": "error", "message": "An unexpected error occurred"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

        response.data = {
            "status": "success",
            "message": "Thread deleted successfully",
        }
        return response

    def update(self, request, *args, **kwargs):
        response = super().update(request, partial=True, *args, **kwargs)

        response.data = {
            "status": "success",
            "message": "Thread updated successfully",
        }
        return response

    def list(self, request, *args, **kwargs):
        response = super().list(request, *args, **kwargs)

        response.data = {
            "status": "success",
            "data": {
                "threads": response.data,
            },
        }
        return response


class ItemChatViewSet(viewsets.ModelViewSet):
    queryset = ItemChat.objects.all()
    serializer_class = ItemChatSerializer

    def filter_queryset(self, queryset):
        if self.action == "destroy" or self.action == "update":
            return super().filter_queryset(queryset)
        return (
            super()
            .filter_queryset(queryset)
            .filter(component=self.kwargs["component_id"])
        )

    def create(self, request, *args, **kwargs):
        request.data["component"] = kwargs["component_id"]
        request.data["user"] = request.user.id
        response = super().create(request, *args, **kwargs)
        response.data = {
            "status": "success",
            "message": "Item chat created successfully",
        }
        return response

    def destroy(self, request, *args, **kwargs):
        try:
            response = super().destroy(request, *args, **kwargs)
        except ProtectedError:
            return Response(
                {"status": "error", "message": "Item chat is not empty"},
                status=status.HTTP_400_BAD_REQUEST,
            )
        except Exception as e:
            return Response(
                {"status": "error", "message": "An unexpected error occurred"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

        response.data = {
            "status": "success",
            "message": "Item chat deleted successfully",
        }
        return response

    def update(self, request, *args, **kwargs):
        response = super().update(request, partial=True, *args, **kwargs)

        response.data = {
            "status": "success",
            "message": "Item chat updated successfully",
        }
        return response

    def list(self, request, *args, **kwargs):
        response = super().list(request, *args, **kwargs)

        response.data = {
            "status": "success",
            "data": {
                "item_chats": response.data,
            },
        }
        return response


class ThreadMessageViewSet(viewsets.ModelViewSet):
    queryset = ThreadMessage.objects.all()
    serializer_class = ThreadMessageSerializer

    def filter_queryset(self, queryset):
        if self.action == "destroy" or self.action == "update":
            return super().filter_queryset(queryset)
        return super().filter_queryset(queryset).filter(chat=self.kwargs["pk"])

    def create(self, request, *args, **kwargs):
        request.data["chat"] = kwargs["pk"]
        request.data["user"] = request.user.id
        response = super().create(request, *args, **kwargs)
        response.data = {
            "status": "success",
            "message": "Thread message created successfully",
        }
        return response

    def destroy(self, request, *args, **kwargs):
        try:
            response = super().destroy(request, *args, **kwargs)
        except ProtectedError:
            return Response(
                {"status": "error", "message": "Thread message is not empty"},
                status=status.HTTP_400_BAD_REQUEST,
            )
        except Exception as e:
            return Response(
                {"status": "error", "message": "An unexpected error occurred"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

        response.data = {
            "status": "success",
            "message": "Thread message deleted successfully",
        }
        return response

    def update(self, request, *args, **kwargs):
        response = super().update(request, partial=True, *args, **kwargs)

        response.data = {
            "status": "success",
            "message": "Thread message updated successfully",
        }
        return response

    def list(self, request, *args, **kwargs):
        response = super().list(request, *args, **kwargs)

        response.data = {
            "status": "success",
            "data": {
                "thread_messages": response.data,
            },
        }
        return response


class LastSeenViewSet(viewsets.ModelViewSet):
    queryset = LastSeen.objects.all()
    serializer_class = LastSeenSerializer

    def filter_queryset(self, queryset):
        chat_id = self.kwargs.get("pk")
        return (
            super()
            .filter_queryset(queryset)
            .filter(user=self.request.user, chat=chat_id)
        )

    def create_or_update(self, request, *args, **kwargs):
        chat_id = self.kwargs.get("pk")
        user = request.user

        last_seen = LastSeen.objects.filter(user=user, chat=chat_id).first()

        if last_seen:
            response = super().update(request, partial=True, *args, **kwargs)
            response_data = {
                "status": "success",
                "message": "Last seen updated successfully",
            }
            response.data = response_data
        else:
            response = super().create(request, *args, **kwargs)
            response_data = {
                "status": "success",
                "message": "Last seen created successfully",
            }
            response.data = response_data
        return response


class CheckUpdatesRetrieveView(generics.RetrieveAPIView):
    serializer_class = CheckUpdatesSerializer
    queryset = Course.objects.all()


class UpdateLastSeenView(generics.UpdateAPIView):
    serializer_class = UpdateLastSeenSerializer
    queryset = LastSeenCourse.objects.all()

    def update(self, request, *args, **kwargs):
        course_id = self.kwargs.get("pk")
        user = request.user

        # Get or create the LastSeenCourse instance for the user and course
        last_seen, created = LastSeenCourse.objects.get_or_create(
            user=user, course_id=course_id
        )

        if created:
            message = "Last seen created successfully with both timestamps updated."
        else:
            # Update the specified field based on the action
            action = request.data.get("action")
            if action == "announcements":
                last_seen.last_seen_announcement = timezone.now()
                message = "Last seen announcement timestamp updated successfully."
            elif action == "discussions":
                last_seen.last_seen_discussion = timezone.now()
                message = "Last seen discussion timestamp updated successfully."
            else:
                return Response(
                    {"status": "error", "message": "Invalid action"},
                    status=status.HTTP_400_BAD_REQUEST,
                )

        last_seen.save()

        response_data = {
            "status": "success",
            "message": message,
            "course": course_id,
            "user": user.id,
        }

        return Response(response_data, status=status.HTTP_200_OK)
