from rest_framework import viewsets
from ..models import (
    Quiz,
    Question,
    Progress,
    CodingAssignment,

)
from ..serializers import (
    QuizSerializer,
    QuestionSerializer,
    CodingQuizSerializer,
    StudentQuizSerializer,
    StudentCodingSerializer,
)
from ..permissons import (
    CousrseContentDeleteAccess,
    CourseContentCreateAccess,
    CourseContentEditAccess,
)

class QuizViewSet(viewsets.ModelViewSet):
    serializer_class = QuizSerializer
    queryset = Quiz.objects.all()

    def get_object(self):
        self.kwargs["pk"] = self.kwargs.get("quiz_id")
        return super().get_object()

    def get_permissions(self):
        """
        Return different permission classes based on the action.
        """
        if self.action == "destroy":
            # Only course creators can delete weeks
            permission_classes = [CousrseContentDeleteAccess]
        elif self.action == "create":
            # Only course creators can create weeks
            permission_classes = [CourseContentCreateAccess]
        elif self.action == "update":
            # Only course creators can create weeks
            permission_classes = [CourseContentEditAccess]

        else:
            permission_classes = []
        return [permission() for permission in permission_classes]

    def create(self, request, *args, **kwargs):

        request.data["chapter"] = kwargs["chapter_id"]
        response = super().create(request, *args, **kwargs)

        response.data = {
            "status": "success",
            "message": "Quiz created successfully",
            "data": {
                "id": response.data["id"],
            },
        }
        return response

    def update(self, request, *args, **kwargs):
        response = super().update(request, partial=True, *args, **kwargs)

        response.data = {
            "status": "success",
            "message": "Quiz Details Added successfully",
        }
        return response


class CodingQuizViewSet(viewsets.ModelViewSet):
    serializer_class = CodingQuizSerializer
    queryset = CodingAssignment.objects.all()

    def get_object(self):
        self.kwargs["pk"] = self.kwargs.get("code_id")
        return super().get_object()

    def get_permissions(self):
        """
        Return different permission classes based on the action.
        """
        if self.action == "destroy":
            # Only course creators can delete weeks
            permission_classes = [CousrseContentDeleteAccess]
        elif self.action == "create":
            # Only course creators can create weeks
            permission_classes = [CourseContentCreateAccess]
        elif self.action == "update":
            # Only course creators can create weeks
            permission_classes = [CourseContentEditAccess]

        else:
            permission_classes = []
        return [permission() for permission in permission_classes]

    def create(self, request, *args, **kwargs):

        request.data["chapter"] = kwargs["chapter_id"]
        response = super().create(request, *args, **kwargs)

        response.data = {
            "status": "success",
            "message": "Coding Quiz created successfully",
            "data": {
                "id": response.data["id"],
            },
        }
        return response

    def update(self, request, *args, **kwargs):
        response = super().update(request, partial=True, *args, **kwargs)

        response.data = {
            "status": "success",
            "message": "Quiz Details Added successfully",
        }
        return response



class StudentQuizViewSet(viewsets.ModelViewSet):
    queryset = Progress.objects.all()
    serializer_class = StudentQuizSerializer

    def submit_quiz(self, request, *args, **kwargs):
        student = request.user
        request.data["quiz"] = kwargs["pk"]
        response = super().create(request, *args, **kwargs)
        response.data = {
            "status": "success",
            "message": "Quiz submitted successfully",
        }
        return response


class StudentCodingViewSet(viewsets.ModelViewSet):
    queryset = Progress.objects.all()
    serializer_class = StudentCodingSerializer

    def submit_code(self, request, *args, **kwargs):
        request.data["coding_assignment"] = kwargs["pk"]
        response = super().create(request, *args, **kwargs)
        response.data = {
            "status": "success",
            "message": "Code submitted successfully",
        }
        return response


class AddQuestionsViewSet(viewsets.ModelViewSet):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer
    permission_classes = [CourseContentEditAccess]

    def create(self, request, *args, **kwargs):

        request.data["quiz"] = kwargs["quiz_id"]
        response = super().create(request, *args, **kwargs)
        response.data = {
            "status": "success",
            "message": "Question added successfully",
            "data": {
                "id": response.data["id"],
            },
        }
        return response