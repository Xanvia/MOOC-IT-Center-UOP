from rest_framework import permissions
from courses.models import Course
from .models import CourseTeachers, CoursePermissions


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
class IsAdminOrCourseCreator(permissions.BasePermission):
    """
    Custom permission to allow only admins or course creators to edit courses.
    """

    def has_permission(self, request, view):
        course_id = view.kwargs["course_id"]
        user = request.user

        # Check if the user is in the admin group
        if user.groups.filter(name="admin").exists():
            return True

        # Only allow course creators (teachers) to edit
        course = Course.objects.get(pk=course_id)
        return course.course_creator == user

class GradePermissions(permissions.BasePermission):
    """
    Custom permission to allow only course creators to create weeks.
    """

    def is_in_group(self, user, group_name):
        return user.groups.filter(name=group_name).exists()

    def has_permission(self, request, view):
        course_id = view.kwargs["course_id"]
    
        user = request.user

        # Only allow course creators (teachers) to create
        course = Course.objects.get(pk=course_id)
        if self.is_in_group(user, "teacher"):
            # Check if the user is the course creator
            if course.course_creator == user:
                return True

            # Check if the user is a CourseTeacher with permission to create course content
            course_teacher = CourseTeachers.objects.filter(
                course_id=course.id, teacher_id=user.id
            ).first()
            create_permission = CoursePermissions.objects.filter(
                label="grade_assignments"
            ).first()
            if course_teacher and create_permission in course_teacher.permissions.all():
                return True