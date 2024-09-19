from rest_framework import permissions
from .models import Enrollment, Course, Week,Chapter,Video,Quiz,Note
from coursemanagement.models import CourseTeachers, CoursePermissions


class CourseContentListAccess(permissions.BasePermission):
    """
    Custom permission to allow students (if enrolled) and course creators to list weeks.
    """

    def get_course_id(self, view):
        if "course_id" in view.kwargs:
            return view.kwargs["course_id"]
        elif "week_id" in view.kwargs:
            week = Week.objects.get(pk=view.kwargs["week_id"])
            return week.course_id
        elif "chapter_id" in view.kwargs:
            chapter = Chapter.objects.get(pk=view.kwargs["chapter_id"])
            return chapter.week.course_id
        elif "video_id" in view.kwargs:
            video = Video.objects.get(pk=view.kwargs["video_id"])
            return video.chapter.week.course_id
        elif "quiz_id" in view.kwargs:
            quiz = Quiz.objects.get(pk=view.kwargs["quiz_id"])
            return quiz.chapter.week.course_id
        elif "note_id" in view.kwargs:
            note = Note.objects.get(pk=view.kwargs["note_id"])
            return note.chapter.week.course_id

    def is_in_group(self, user, group_name):
        return user.groups.filter(name=group_name).exists()

    def has_permission(self, request, view):
        course_id = self.get_course_id(view)
        user = request.user
        # Allow course creator (teacher)
        if self.is_in_group(user, "teacher"):
            # Check if the user is the course creator
            if Course.objects.filter(id=course_id, course_creator=user).exists():
                return True

            # Check if the user is a CourseTeacher with permission to view course content

            course_teacher = CourseTeachers.objects.filter(
                course_id=course_id, teacher_id=user.id
            ).first()
            view_permission = CoursePermissions.objects.filter(
                label="view_course_content"
            ).first()
            if course_teacher and view_permission in course_teacher.permissions.all():
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
    def get_course_id(self, view):
        if "course_id" in view.kwargs:
            return view.kwargs["course_id"]
        elif "week_id" in view.kwargs:
            week = Week.objects.get(pk=view.kwargs["week_id"])
            return week.course_id
        elif "chapter_id" in view.kwargs:
            chapter = Chapter.objects.get(pk=view.kwargs["chapter_id"])
            return chapter.week.course_id
        elif "video_id" in view.kwargs:
            video = Video.objects.get(pk=view.kwargs["video_id"])
            return video.chapter.week.course_id
        elif "quiz_id" in view.kwargs:
            quiz = Quiz.objects.get(pk=view.kwargs["quiz_id"])
            return quiz.chapter.week.course_id
        elif "note_id" in view.kwargs:
            note = Note.objects.get(pk=view.kwargs["note_id"])
            return note.chapter.week.course_id

    def is_in_group(self, user, group_name):
        return user.groups.filter(name=group_name).exists()

    def has_permission(self, request, view):
        user = request.user

        # Only allow course creators (teachers) to delete
        course_id = self.get_course_id(view)
        course = Course.objects.get(pk=course_id)
        

        if self.is_in_group(user, "teacher"):
            # Check if the user is the course creator
            if course.course_creator == user:
                return True

            # Check if the user is a CourseTeacher with permission to delete course content
            course_teacher = CourseTeachers.objects.filter(
                course_id=course.id, teacher_id=user.id
            ).first()
            delete_permission = CoursePermissions.objects.filter(
                label="delete_course_content"
            ).first()
            if course_teacher and delete_permission in course_teacher.permissions.all():
                return True


class CourseContentEditAccess(permissions.BasePermission):
    """
    Custom permission to allow only course creators to edit weeks.
    """
    def get_course_id(self, view):
        if "course_id" in view.kwargs:
            return view.kwargs["course_id"]
        elif "week_id" in view.kwargs:
            week = Week.objects.get(pk=view.kwargs["week_id"])
            return week.course_id
        elif "chapter_id" in view.kwargs:
            chapter = Chapter.objects.get(pk=view.kwargs["chapter_id"])
            return chapter.week.course_id
        elif "video_id" in view.kwargs:
            video = Video.objects.get(pk=view.kwargs["video_id"])
            return video.chapter.week.course_id
        elif "quiz_id" in view.kwargs:
            quiz = Quiz.objects.get(pk=view.kwargs["quiz_id"])
            return quiz.chapter.week.course_id
        elif "note_id" in view.kwargs:
            note = Note.objects.get(pk=view.kwargs["note_id"])
            return note.chapter.week.course_id

    def is_in_group(self, user, group_name):
        return user.groups.filter(name=group_name).exists()

    def has_permission(self, request, view):
        user = request.user

        # Only allow course creators (teachers) to edit
        course_id = self.get_course_id(view)
        course = Course.objects.get(pk=course_id)

        if self.is_in_group(user, "teacher"):
            # Check if the user is the course creator
            if course.course_creator == user:
                return True

            # Check if the user is a CourseTeacher with permission to edit course content
            course_teacher = CourseTeachers.objects.filter(
                course_id=course.id, teacher_id=user.id
            ).first()
            edit_permission = CoursePermissions.objects.filter(
                label="edit_course_content"
            ).first()
            if course_teacher and edit_permission in course_teacher.permissions.all():
                return True
            

class CourseContentCreateAccess(permissions.BasePermission):
    """
    Custom permission to allow only course creators to create weeks.
    """
    def get_course_id(self, view):
        if "course_id" in view.kwargs:
            return view.kwargs["course_id"]
        elif "week_id" in view.kwargs:
            week = Week.objects.get(pk=view.kwargs["week_id"])
            return week.course_id
        elif "chapter_id" in view.kwargs:
            chapter = Chapter.objects.get(pk=view.kwargs["chapter_id"])
            return chapter.week.course_id
        elif "video_id" in view.kwargs:
            video = Video.objects.get(pk=view.kwargs["video_id"])
            return video.chapter.week.course_id
        elif "quiz_id" in view.kwargs:
            quiz = Quiz.objects.get(pk=view.kwargs["quiz_id"])
            return quiz.chapter.week.course_id
        elif "note_id" in view.kwargs:
            note = Note.objects.get(pk=view.kwargs["note_id"])
            return note.chapter.week.course_id

    def is_in_group(self, user, group_name):
        return user.groups.filter(name=group_name).exists()

    def has_permission(self, request, view):
        course_id = self.get_course_id(view)
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
                label="create_course_content"
            ).first()
            if course_teacher and create_permission in course_teacher.permissions.all():
                return True
            
class CourseFileUploadAccess(permissions.BasePermission):
    """
    Custom permission to allow only course creators to upload files.
    """

    def get_course_id(self, view):
        if "course_id" in view.kwargs:
            return view.kwargs["course_id"]
        elif "week_id" in view.kwargs:
            week = Week.objects.get(pk=view.kwargs["week_id"])
            return week.course_id
        elif "chapter_id" in view.kwargs:
            chapter = Chapter.objects.get(pk=view.kwargs["chapter_id"])
            return chapter.week.course_id
        elif "video_id" in view.kwargs:
            video = Video.objects.get(pk=view.kwargs["video_id"])
            return video.chapter.week.course_id
        elif "quiz_id" in view.kwargs:
            quiz = Quiz.objects.get(pk=view.kwargs["quiz_id"])
            return quiz.chapter.week.course_id
        elif "note_id" in view.kwargs:
            note = Note.objects.get(pk=view.kwargs["note_id"])
            return note.chapter.week.course_id

    def is_in_group(self, user, group_name):
        return user.groups.filter(name=group_name).exists()

    def has_permission(self, request, view):
        course_id = self.get_course_id(view)
        user = request.user

        # Only allow course creators (teachers) to upload files
        course = Course.objects.get(pk=course_id)
        if self.is_in_group(user, "teacher"):
            # Check if the user is the course creator
            if course.course_creator == user:
                return True

            # Check if the user is a CourseTeacher with permission to upload files
            course_teacher = CourseTeachers.objects.filter(
                course_id=course.id, teacher_id=user.id
            ).first()
            upload_permission = CoursePermissions.objects.filter(
                label="upload_files"
            ).first()
            if course_teacher and upload_permission in course_teacher.permissions.all():
                return True
            

class EditPublicDetailsAccess(permissions.BasePermission):
    """
    Custom permission to allow only course creators to edit public details.
    """

    def is_in_group(self, user, group_name):
        return user.groups.filter(name=group_name).exists()

    def has_permission(self, request, view):
        course_id = view.kwargs["course_id"]
        user = request.user

        # Only allow course creators (teachers) to edit public details
        course = Course.objects.get(pk=course_id)
        if self.is_in_group(user, "teacher"):
            # Check if the user is the course creator
            if course.course_creator == user:
                return True

            # Check if the user is a CourseTeacher with permission to edit public details
            course_teacher = CourseTeachers.objects.filter(
                course_id=course.id, teacher_id=user.id
            ).first()
            edit_permission = CoursePermissions.objects.filter(
                label="edit_public_details"
            ).first()
            if course_teacher and edit_permission in course_teacher.permissions.all():
                return True