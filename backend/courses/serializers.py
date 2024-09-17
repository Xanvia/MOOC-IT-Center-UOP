from rest_framework import serializers
from django.contrib.auth.models import User
from .models import (
    Course,
    Week,
    Chapter,
    Component,
    Note,
    Image,
    Video,
    Quiz,
    Enrollment,
    Question,
    Answer,
    Progress,
)
from userprofiles.models import Institution
from userprofiles.serializers import InterestSerializer


class CourseTeacherSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ["email", "first_name", "last_name"]

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation["full_name"] = f"{instance.first_name} {instance.last_name}"
        representation["headline"] = instance.userprofile.headline
        representation.pop("first_name")
        representation.pop("last_name")
        return representation


class CourseSerializer(serializers.ModelSerializer):
    institution = serializers.CharField()

    class Meta:
        model = Course
        fields = "__all__"

    def validate(self, data):
        request = self.context.get("request")

        if request and request.method == "POST" or request.method == "PUT":
            institution_name = data.pop("institution")
            institution, _ = Institution.objects.get_or_create(label=institution_name)
            data["institution"] = institution

        if request and request.method == "PATCH":
            allowed_fields = {"outcomes", "specifications", "description"}
            # Filter the data to only include allowed fields
            data = {key: value for key, value in data.items() if key in allowed_fields}
        return data

    def to_representation(self, instance):
        # if request.user is a student and if student has an enrollement with this course set isEnrolled to True
        request = self.context.get("request")

        representation = super().to_representation(instance)
        representation["course_creator"] = CourseTeacherSerializer(
            instance.course_creator
        ).data
        representation["category"] = InterestSerializer(instance.category).data
        representation["institution"] = instance.institution.label

        if request and request.user.is_authenticated:
            user = request.user
            try:
                Enrollment.objects.get(student=user, course=instance)
                representation["isEnrolled"] = "true"
            except Enrollment.DoesNotExist:
                representation["isEnrolled"] = "false"
        return representation


class WeekSerializer(serializers.ModelSerializer):

    class Meta:
        model = Week
        fields = "__all__"

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation["chapters"] = ChapterSerializer(
            instance.chapters, many=True
        ).data
        return representation


class ChapterSerializer(serializers.ModelSerializer):

    class Meta:
        model = Chapter
        fields = "__all__"

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation["items"] = ItemSerializer(instance.components, many=True).data
        return representation


class ItemSerializer(serializers.ModelSerializer):

    class Meta:
        model = Component
        fields = "__all__"

    def to_representation(self, instance):
        if instance.type == "Note":
            return NoteSerializer(instance.note).data
        elif instance.type == "Quiz":
            return QuizSerializer(instance.quiz).data
        elif instance.type == "Video":
            return VideoSerializer(instance.video).data
        return super().to_representation(instance)


class NoteSerializer(serializers.ModelSerializer):
    type = serializers.CharField(default="Note")

    class Meta:
        model = Note
        fields = "__all__"

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation["content"] = instance.content
        return representation


class ImageSerializer(serializers.ModelSerializer):

    class Meta:
        model = Image
        fields = "__all__"


class QuizSerializer(serializers.ModelSerializer):
    type = serializers.CharField(default="Quiz")

    class Meta:
        model = Quiz
        fields = "__all__"

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation["content"] = {
            "deadline": instance.deadline,
            "full_grades": instance.full_grades,
            "questions": QuestionSerializer(instance.questions, many=True).data,
        }
        return representation


class VideoSerializer(serializers.ModelSerializer):
    type = serializers.CharField(default="Video")

    class Meta:
        model = Video
        fields = "__all__"

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation.pop("video_link")
        representation.pop("video_id")
        representation["content"] = {
            "video_link": instance.video_link,
            "duration": instance.duration,
        }
        return representation


class EnrollementSerializer(serializers.ModelSerializer):

    class Meta:
        model = Enrollment
        fields = "__all__"

    def validate(self, attrs):
        # check if user has an enrollement with this course already
        request = self.context.get("request")
        user = request.user
        course = attrs.get("course")
        try:
            Enrollment.objects.get(student=user, course=course)
            raise serializers.ValidationError("You are already enrolled in this course")
        except Enrollment.DoesNotExist:
            pass
        # TODO: check if user has an payment object that has not linked with an enrollement object
        return super().validate(attrs)


class AnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Answer
        fields = ["text", "is_correct"]


class QuestionSerializer(serializers.ModelSerializer):
    answers = AnswerSerializer(many=True, required=False)

    class Meta:
        model = Question
        fields = "__all__"

    def create(self, validated_data):
        answers_data = validated_data.pop("answers", [])
        question = Question.objects.create(**validated_data)
        if answers_data:
            for answer_data in answers_data:
                Answer.objects.create(question=question, **answer_data)
        return question


class ProgressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Progress
        fields = "__all__"

    def to_internal_value(self, data):
        request = self.context.get("request")
        if request.method == "POST":
            component_id = data.get("component")
            component = Component.objects.get(id=component_id)
            user = request.user
            course = course = component.chapter.week.course
            try:
                enrollement = Enrollment.objects.get(student=user, course=course)
            except Enrollment.DoesNotExist:
                raise serializers.ValidationError("You are not enrolled in this course")
            data["enrollment"] = enrollement.id
        return super().to_internal_value(data)


class ProgressTrackSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = ["id"]

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        components = Component.objects.filter(chapter__week__course=instance)

        request = self.context.get("request")
        user = request.user
        try:
            enrollement = Enrollment.objects.get(student=user.id, course=instance.id)
            completed_components = components.filter(
                progress__completed=True, progress__enrollment=enrollement.id
            )
            progress_percentage = round(
                (completed_components.count() / components.count()) * 100
                if components.count() > 0
                else 0
            )

            # Identify the current component
            current_component = components.filter(
                progress__completed=False, progress__enrollment__student=user
            ).first()

            representation["progress"] = progress_percentage
            if current_component:
                representation["current_component"] = {
                    "week": current_component.chapter.week.id,
                    "chapter": current_component.chapter.id,
                    "id": current_component.id,
                    "name": current_component.name,
                }
            return representation

        except Enrollment.DoesNotExist:
            raise serializers.ValidationError(
                {"error": "You are not enrolled in this course"}
            )
