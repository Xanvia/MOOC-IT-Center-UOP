from django.shortcuts import get_object_or_404, render
from requests import Response
from rest_framework import viewsets, generics
from .serializers import CourseTeachersSerializer, CoursePermissionsSerializer
from .models import CourseTeachers, CoursePermissions
from .permissions import IsCourseCreator


class CourseTeacherViewSet(viewsets.ModelViewSet):
    serializer_class = CourseTeachersSerializer
    queryset = CourseTeachers.objects.all()
    permission_classes = [IsCourseCreator]

    def create(self, request, *args, **kwargs):

        request.data["course"] = kwargs.get("course_id")
        response = super().create(request, *args, **kwargs)
        response.data = {
            "status": "success",
            "message": "Teacher added to course",
        }
        return response


# class GetAllPermissionAPIView(viewsets.ModelViewSet):
#     serializer_class = CoursePermissionsSerializer
#     queryset = CoursePermissions.objects.all()

class EditPermissionAPIView(generics.UpdateAPIView):
    serializer_class = CoursePermissionsSerializer
    queryset = CourseTeachers.objects.all()

    def update(self, request, *args, **kwargs):
        # Get the CourseTeachers object by id from the URL kwargs
        course_teacher = get_object_or_404(CourseTeachers, pk=kwargs['pk'])
        
        # Parse the permissions from the request body (should be a list of permission labels)
        permissions = request.data.get("permissions", [])
        
        # Ensure permissions is a list
        if not isinstance(permissions, list):
            return Response({"error": "Permissions must be a list."}, status=400)

        # Fetch permission objects based on labels and clear old permissions
        course_teacher.permissions.clear()
        permission_list = []

        for p in permissions:
            try:
                permission = CoursePermissions.objects.get(label=p)
                permission_list.append(permission)
            except CoursePermissions.DoesNotExist:
                return Response({"error": f"Permission '{p}' does not exist."}, status=400)
        
        # Add the new permissions to the CourseTeachers instance
        course_teacher.permissions.set(permission_list)
        course_teacher.save()

        # Return a success response
        return Response({"message": "Permissions updated successfully."}, status=200)