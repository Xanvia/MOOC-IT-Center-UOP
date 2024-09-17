from rest_framework import permissions
from .models import Enrollment, Course, Week


class CourseContentListAccess(permissions.BasePermission):
    """
    Custom permission to allow students (if enrolled) and course creators to list weeks.
    """

    def is_in_group(self, user, group_name):
        return user.groups.filter(name=group_name).exists()

    def has_permission(self, request, view):
        course_id = view.kwargs["course_id"]
        user = request.user
        # Allow course creator (teacher)
        if (
            self.is_in_group(user, "teacher")
            and Course.objects.filter(id=course_id, course_creator=user).exists()
        ):
            return True

        # Allow enrolled students
        if (
            self.is_in_group(user, "student")
            and Enrollment.objects.filter(
                course_id=course_id, student_id=user.id
            ).exists()
        ):
            return True

        return False


class CousrseContentDeleteAccess(permissions.BasePermission):
    """
    Custom permission to allow only course creators to delete weeks.
    """

    def is_in_group(self, user, group_name):
        return user.groups.filter(name=group_name).exists()

    def has_permission(self, request, view):
        week_id = view.kwargs["pk"]
        user = request.user

        # Only allow course creators (teachers) to delete
        week = Week.objects.get(pk=week_id)
        course = week.course
        return self.is_in_group(user, "teacher") and course.course_creator == user
