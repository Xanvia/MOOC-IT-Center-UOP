from rest_framework import viewsets, generics, views, status
from rest_framework.response import Response
from rest_framework.exceptions import NotFound
import hashlib
import uuid
from .serializers import (
    CourseTeachersSerializer,
    EditCoursePermissionsSerializer,
    CoursePermissionsSerializer,
    StudentQuizSerializer,
    StudentCodeDetailSerializer,
    StudentQuizDetailSerializer,
    AdminMessagesSerializer,
    GetCoursePermissionsSerializer,
    StudentListSerializer,
    PaymentSerializer,
    GradeQuizSerializer,
    GradeCodeSerializer,
    CourseMessagesSerializer,
)
from courses.serializers import CourseSerializer
from .models import CourseTeachers, CoursePermissions, AdminMessages, Payments
from .permissions import IsCourseCreator
from courses.models import (
    Course,
    Progress,
    Enrollment,
    StudentCodingAnswer,
    StudentQuiz,
)
from django.conf import settings
from .permissions import GradePermissions


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

    def filter_queryset(self, queryset):

        course_id = self.kwargs.get("course_id")
        return super().filter_queryset(queryset).filter(course_id=course_id)

    def list(self, request, *args, **kwargs):
        response = super().list(request, *args, **kwargs)
        response.data = {
            "status": "success",
            "data": {
                "teachers": response.data,
            },
        }
        return response


class PermissionsListAPIView(generics.ListAPIView):
    queryset = CoursePermissions.objects.all()
    serializer_class = CoursePermissionsSerializer


class EditPermissionAPIView(generics.UpdateAPIView):
    serializer_class = EditCoursePermissionsSerializer
    queryset = CourseTeachers.objects.all()
    permission_classes = [IsCourseCreator]

    def get_object(self):
        return self.queryset.get(course=self.kwargs.get("course_id"))

    def update(self, request, *args, **kwargs):
        response = super().update(request, partial=True, *args, **kwargs)

        response.data = {
            "status": "success",
            "message": "Permissions updated successfully",
        }

        return response


class StudentQuizListAPIView(generics.ListAPIView):
    queryset = Progress.objects.all()
    serializer_class = StudentQuizSerializer

    def get_queryset(self):
        try:
            enrollement = Enrollment.objects.get(
                course=self.kwargs.get("course_id"),
                student=self.kwargs.get("student_id"),
            )
        except Enrollment.DoesNotExist:
            raise NotFound("Student not enrolled in this course")
        return self.queryset.filter(
            enrollment=enrollement,
        )

    def filter_queryset(self, queryset):
        queryset = (
            super()
            .filter_queryset(queryset)
            .exclude(component__type__in=["Note", "Video"])
        )
        return queryset.exclude(completed=False)


class StudentQuizDetailAPIView(generics.RetrieveAPIView):
    queryset = StudentQuiz.objects.all()
    serializer_class = StudentQuizDetailSerializer


class StudentCodingDetailAPIView(generics.RetrieveAPIView):
    queryset = StudentCodingAnswer.objects.all()
    serializer_class = StudentCodeDetailSerializer


class GradeQuizAPIView(generics.UpdateAPIView):
    queryset = StudentQuiz.objects.all()
    serializer_class = GradeQuizSerializer
    permission_classes = [GradePermissions]

    def update(self, request, *args, **kwargs):
        response = super().update(request, partial=True * args, **kwargs)
        response.data = {
            "status": "success",
            "message": "Quiz graded successfully",
        }
        return response


class GradeCodingAPIView(generics.UpdateAPIView):
    queryset = StudentCodingAnswer.objects.all()
    serializer_class = GradeCodeSerializer
    permission_classes = [GradePermissions]

    def update(self, request, *args, **kwargs):
        response = super().update(request, *args, **kwargs)
        response.data = {
            "status": "success",
            "message": "Coding question graded successfully",
        }
        return response


class PublishCourseAPIView(generics.UpdateAPIView):
    queryset = Course.objects.all()

    def update(self, request, *args, **kwargs):

        if not request.user.groups.filter(name="admin").exists():
            return Response(
                {"error": "You do not have permission to perform this action"},
                status=403,
            )

        instance = self.get_object()
        instance.status = "published"
        instance.save()

        return Response(
            {"status": "success", "message": "Course published successfully"},
            status=200,
        )


class AdminMessagesViewSet(viewsets.ModelViewSet):
    serializer_class = AdminMessagesSerializer
    queryset = AdminMessages.objects.all()

    def create(self, request, *args, **kwargs):

        request.data["course"] = kwargs.get("course_id")
        response = super().create(request, *args, **kwargs)
        response.data = {
            "status": "success",
            "message": "Message sent to the course creator",
        }
        return response

    def filter_queryset(self, queryset):
        course_id = self.kwargs.get("course_id")
        return super().filter_queryset(queryset).filter(course_id=course_id)

    def list(self, request, *args, **kwargs):
        response = super().list(request, *args, **kwargs)
        response.data = {
            "status": "success",
            "data": {
                "adminMessages": response.data,
            },
        }
        return response


class TeacherPermissionsRetrieveAPIView(generics.RetrieveAPIView):
    serializer_class = GetCoursePermissionsSerializer
    queryset = CourseTeachers.objects.all()
    permission_classes = [IsCourseCreator]

    def get_object(self):
        return self.queryset.get(course=self.kwargs.get("course_id"))

    def retrieve(self, request, *args, **kwargs):
        response = super().retrieve(request, *args, **kwargs)
        response.data = {
            "status": "success",
            "data": response.data,
        }
        return response


class CourseStudentsListAPIView(generics.ListAPIView):
    queryset = Enrollment.objects.all()
    serializer_class = StudentListSerializer

    def get_queryset(self):
        return self.queryset.filter(course=self.kwargs.get("course_id"))

    def list(self, request, *args, **kwargs):
        response = super().list(request, *args, **kwargs)
        response.data = {
            "status": "success",
            "data": {
                "students": response.data,
            },
        }
        return response


class InitiatePaymentAPIView(generics.CreateAPIView):
    queryset = Payments.objects.all()
    serializer_class = PaymentSerializer

    def create(self, request, *args, **kwargs):

        request.data["student"] = request.user.id
        request.data["enrollement"] = kwargs.get("enrollment_id")

        response = super().create(request, *args, **kwargs)
        amount = response.data["amount"]
        order_id = response.data["order_id"]

        enrollement = Enrollment.objects.get(id=kwargs.get("enrollment_id"))
        course_id = enrollement.course.id
        appid = settings.MERCH_ID
        merchant_secret = settings.MERCH_SECRET
        currency = "USD"

        hash_source = f"{appid}{order_id}{amount}{currency}{hashlib.md5(merchant_secret.encode()).hexdigest().upper()}"
        hash_value = hashlib.md5(hash_source.encode()).hexdigest().upper()

        # Prepare the payload
        payload = {
            "merchant_id": appid,
            "return_url": f"http://localhost:3000/courses/{course_id}/room",
            "cancel_url": f"http://localhost:3000/courses/{course_id}",
            "notify_url": "http://127.0.0.1:8000/api/payments/notify/",
            "order_id": order_id,
            "items": "Course Enrollment",
            "currency": currency,
            "amount": amount,
            "first_name": request.user.first_name,
            "last_name": request.user.last_name,
            "email": request.user.email,
            "address": "Student Address",
            "city": "Student City",
            "country": "Sri Lanka",
            "hash": hash_value,
            "custom_1": request.user.id,
            "custom_2": kwargs.get("enrollment_id"),
        }

        return Response({"payload": payload}, status=status.HTTP_200_OK)


class PaymentNotificationAPIView(views.APIView):
    def post(self, request):
        order_id = request.data.get("order_id")
        user_id = request.data.get("custom_1")
        enrollment_id = request.data.get("custom_2")

        payment = Payments.objects.get(
            order_id=order_id, student=user_id, enrollement=enrollment_id
        )
        payment.status = "completed"
        payment.payment_id = request.data.get("payment_id")
        payment.save()

        return Response(
            {"status": "success", "message": "Payment completed successfully"},
            status=status.HTTP_200_OK,
        )


from rest_framework.response import Response
from rest_framework import status


class CourseMessagesViewSet(viewsets.ModelViewSet):
    serializer_class = CourseMessagesSerializer
    queryset = CourseTeachers.objects.all()

    def get_object(self):
        try:
            if self.kwargs.get("teacher_id"):
                return self.queryset.get(
                    course=self.kwargs.get("course_id"),
                    teacher=self.kwargs.get("teacher_id"),
                )
            else:
                return self.queryset.get(
                    course=self.kwargs.get("course_id"), teacher=self.request.user
                )
        except CourseTeachers.DoesNotExist:
            raise NotFound("Teacher not found")

    def add_message_admin(self, request, *args, **kwargs):
        course_teacher_instance = self.get_object()
        course_teacher_instance.add_message(
            sender="admin", message=request.data["message"]
        )

        return Response(
            {
                "status": "success",
                "message": "Message added successfully",
            }
        )

    def add_message_teacher(self, request, *args, **kwargs):
        course_teacher_instance = self.get_object()
        course_teacher_instance.add_message(
            sender="teacher", message=request.data["message"]
        )

        return Response(
            {
                "status": "success",
                "message": "Message added successfully",
            }
        )

    def update_message_status_admin(self, request, *args, **kwargs):
        course_teacher_instance = self.get_object()
        course_teacher_instance.update_message_status(sender="admin")

        return Response(
            {
                "status": "success",
                "message": "Message status updated successfully",
            }
        )
