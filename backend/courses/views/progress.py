from rest_framework import viewsets, generics
from ..models import Course, Progress
from ..serializers import (
    ProgressSerializer,
    ProgressTrackSerializer,
)
from django.shortcuts import get_object_or_404


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
