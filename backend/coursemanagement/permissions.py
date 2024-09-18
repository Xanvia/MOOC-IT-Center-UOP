from rest_framework import permissions
from courses.models import Course


class IsCourseCreator(permissions.BasePermission):
    """
    Custom permission to allow only course creators to edit courses.
    """

    def has_permission(self, request, view):
        course_id = view.kwargs["course_id"]
        user = request.user
            
        # Only allow course creators (teachers) to edit
        course = Course.objects.get(pk=course_id)
        return course.course_creator == user
