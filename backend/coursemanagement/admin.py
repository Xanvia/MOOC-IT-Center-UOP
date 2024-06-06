from django.contrib import admin
from .models import Course, CourseTeacher, Student, Enrollment, Assignment, Submission

admin.site.register(Course)
admin.site.register(CourseTeacher)
admin.site.register(Student)
admin.site.register(Enrollment)
admin.site.register(Assignment)
admin.site.register(Submission)