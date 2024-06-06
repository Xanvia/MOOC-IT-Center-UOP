from django.contrib import admin
from .models import Course, CourseTeachers, Student, Enrollment, Assignment, Submission

admin.site.register(Course)
admin.site.register(CourseTeachers)
admin.site.register(Student)
admin.site.register(Enrollment)
admin.site.register(Assignment)
admin.site.register(Submission)