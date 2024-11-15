from rest_framework import viewsets, generics, views, status
from rest_framework.response import Response
from rest_framework.exceptions import NotFound
import requests
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
        return (
            super()
            .filter_queryset(queryset)
            .exclude(component__type__in=["Note", "Video"])
        )


class StudentQuizDetailAPIView(generics.RetrieveAPIView):
    queryset = StudentQuiz.objects.all()
    serializer_class = StudentQuizDetailSerializer


class StudentCodingDetailAPIView(generics.RetrieveAPIView):
    queryset = StudentCodingAnswer.objects.all()
    serializer_class = StudentCodeDetailSerializer


class GradeQuizAPIView(generics.UpdateAPIView):
    queryset = StudentQuiz.objects.all()
    serializer_class = StudentQuizDetailSerializer

    def update(self, request, *args, **kwargs):
        response = super().update(request, *args, **kwargs)
        response.data = {
            "status": "success",
            "message": "Quiz graded successfully",
        }
        return response


class GradeCodingAPIView(generics.UpdateAPIView):
    queryset = StudentCodingAnswer.objects.all()
    serializer_class = StudentCodeDetailSerializer

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

        appid = "4OVxg4aBaTo4JEVh6oKv1N3LF"

        order_id = str(uuid.uuid4())

        # Prepare payload for the PayHere API
        payload = {
            "merchant_id": appid,
            "return_url": "http://127.0.0.1:8000/admin/coursemanagement/payments/",
            "cancel_url": "http://127.0.0.1:8000/admin/coursemanagement/payments/",
            "notify_url": "http://127.0.0.1:8000/api/payments/notify/",
            "order_id": order_id,  # Corrected this line
            "items": "Course Enrollment",
            "currency": "LKR",
            "amount": amount,
            "first_name": request.user.first_name,
            "last_name": request.user.last_name,
            "email": request.user.email,
            "address": "Student Address",
            "city": "Student City",
            "country": "Sri Lanka",
        }

        # Make the POST request to PayHere Checkout API
        payment_res = requests.post(
            "https://sandbox.payhere.lk/pay/checkout", json=payload
        )

        # Handle the response from PayHere
        if payment_res.status_code == 200:
            payment_data = payment_res.json().get("data", {})
            payment_url = payment_data.get("payment_url")
            if payment_url:
                return Response({"payment_url": payment_url}, status=status.HTTP_200_OK)
            else:
                return Response(
                    {"error": "Payment URL not received"},
                    status=status.HTTP_400_BAD_REQUEST,
                )
        else:
            print(payment_res.text)
            return Response(
                {"error": "Failed to initiate payment"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )
