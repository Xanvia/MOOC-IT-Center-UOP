from rest_framework import permissions
from .models import Enrollment, Course
from django.contrib.auth.models import Group


class hasCourseListPermissions(permissions.BasePermission):
    """
    Custom permission to check if a student is enrolled in the course.
    Teachers always pass this permission check.
    """

    def is_in_group(self, user, group_name):
        """
        Check if a user is in a given group.
        """
        return user.groups.filter(name=group_name).exists()

    def has_permission(self, request, view):
        course_id = view.kwargs["course_id"]
        user = request.user

        # Check if the user is in teacher gorup
        if (
            self.is_in_group(user, "teacher")
            and Course.objects.filter(id=course_id, course_creator=user).exists()
        ):
            return True

        # Check if the user is a student and enrolled in the course
        if self.is_in_group(user, "student"):
            try:
                enrollment = Enrollment.objects.get(
                    course_id=course_id, student_id=user.id
                )
                return True
            except Course.DoesNotExist:
                return False

        return False
