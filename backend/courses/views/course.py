from rest_framework import viewsets, generics, permissions
from ..models import (
    Course,
    Enrollment,
)
from ..serializers import (
    CourseSerializer,
    EnrollementSerializer,
    CourseCreatorsSerializer,
    GetCertificateSerializer,
)
from rest_framework import status
from rest_framework.response import Response
from ..permissons import EditPublicDetailsAccess
from django.contrib.auth.models import User, Group
from rest_framework.filters import SearchFilter


class CourseViewSet(viewsets.ModelViewSet):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    filter_backends = [SearchFilter]
    search_fields = ["name", "description", "institution__label", "category__label"]

    def get_permissions(self):
        """
        Return different permission classes based on the action.
        """
        if self.action == "update" or self.action == "add_details":
            # Only course creators can create weeks
            permission_classes = [EditPublicDetailsAccess]
        elif self.action == "retrieve" or self.action == "list":
            permission_classes = [permissions.AllowAny]
        else:
            permission_classes = []
        return [permission() for permission in permission_classes]

    def get_object(self):
        self.kwargs["pk"] = self.kwargs.get("course_id")
        return super().get_object()

    def filter_queryset(self, queryset):
        """
        The default Query set is all the courses in the database.
        We filter them based on the action.
        """
        if self.action == "list":
            # Returns all the published courses
            return super().filter_queryset(queryset).filter(status="published")
        elif self.action == "my_courses":
            # Returns all the courses created by the user or the courses in which the user is enrolled
            if self.request.user.groups.filter(name="teacher").exists():
                creator_courses = (
                    super()
                    .filter_queryset(queryset)
                    .filter(course_creator=self.request.user)
                )
                teacher_courses = (
                    super()
                    .filter_queryset(queryset)
                    .filter(courseteachers__teacher=self.request.user)
                )
                return creator_courses.union(teacher_courses)
            elif self.request.user.groups.filter(name="student").exists():
                return (
                    super()
                    .filter_queryset(queryset)
                    .filter(enrollment__student=self.request.user)
                )
        elif self.action == "unpublished":
            # Returns all the unpublished courses
            return super().filter_queryset(queryset).filter(status="unpublished")
        elif self.action == "recommended_courses":
            # Returns all the recommended courses

            """
            The recommended courses are the courses that are in the same category as the user's interests.
            """
            user = self.request.user
            interests = user.userprofile.interests.all()
            recommended_courses = queryset.filter(
                category__in=interests, status="published"
            ).distinct()[:4]
            if recommended_courses.count() < 4:
                additional_courses = (
                    queryset.filter(status="published")
                    .exclude(id__in=recommended_courses)
                    .distinct()[: 4 - recommended_courses.count()]
                )
                recommended_courses = recommended_courses | additional_courses
            return recommended_courses
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
        course = self.get_object()
        request.data["course_creator"] = course.course_creator.id

        response = super().update(request, partial=True, *args, **kwargs)

        response.data = {
            "status": "success",
            "message": "Course details added successfully",
        }
        return response

    def update(self, request, *args, **kwargs):
        course = self.get_object()
        request.data._mutable = True
        request.data["course_creator"] = course.course_creator.id

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

    def unpublished(self, request, *args, **kwargs):
        response = super().list(request, *args, **kwargs)

        response.data = {
            "status": "success",
            "data": {
                "courses": response.data,
            },
        }
        return response

    def my_courses(self, request, *args, **kwargs):
        response = super().list(request, *args, **kwargs)
        response.data = {
            "status": "success",
            "data": {
                "courses": response.data,
            },
        }
        return response

    def recommended_courses(self, request, *args, **kwargs):
        response = super().list(request, *args, **kwargs)
        response.data = {
            "status": "success",
            "data": {
                "courses": response.data,
            },
        }
        return response


class EnrollementViewSet(viewsets.ModelViewSet):
    serializer_class = EnrollementSerializer
    queryset = Enrollment.objects.all()

    def check_already_enrolled(self, request, *args, **kwargs):
        course = Course.objects.get(id=kwargs["course_id"])
        student = request.user
        enrollment = Enrollment.objects.filter(course=course, student=student).first()
        if enrollment:
            return enrollment.id
        return None

    def enroll(self, request, *args, **kwargs):
        student = request.user

        enrollement_id = self.check_already_enrolled(request, *args, **kwargs)
        if enrollement_id:
            return Response(
                {
                    "status": "success",
                    "message": "You are already enrolled",
                    "data": {"id": enrollement_id},
                },
                status=status.HTTP_200_OK,
            )

        request.data["course"] = kwargs["course_id"]
        request.data["student"] = student.id

        response = super().create(request, *args, **kwargs)
        response.data = {
            "status": "success",
            "message": "Enrolled successfully",
            "data": {
                "id": response.data["id"],
            },
        }
        return response


class ListCourseCreators(generics.ListAPIView):
    serializer_class = CourseCreatorsSerializer
    pagination_class = None

    def get_queryset(self):
        student_group = Group.objects.get(name="teacher")  # Get the "student" group
        return User.objects.filter(
            groups=student_group
        )  # Filter users in the "student" group

    def list(self, request, *args, **kwargs):
        response = super().list(request, *args, **kwargs)
        return Response(
            {"status": "success", "data": {"teachers": response.data}},
            status=status.HTTP_200_OK,
        )


class GetCertifcateView(generics.RetrieveAPIView):
    serializer_class = GetCertificateSerializer
    queryset = Course.objects.all()

    def get_object(self):
        enrollement = Enrollment.objects.filter(
            course=self.kwargs["pk"], student=self.request.user
        ).first()
        return enrollement

    def retrieve(self, request, *args, **kwargs):
        response = super().retrieve(request, *args, **kwargs)

        response.data = {"status": "success", "data": response.data}
        return response
