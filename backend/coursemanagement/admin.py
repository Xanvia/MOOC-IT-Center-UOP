from django.contrib import admin
from .models import CoursePermissions, Payments, CourseTeachers


class CoursePermissionsAdmin(admin.ModelAdmin):
    list_display = ["label"]


class PaymentsAdmin(admin.ModelAdmin):
    list_display = ["user", "enrollement", "amount", "date"]


class CourseTeachersAdmin(admin.ModelAdmin):
    list_display = ["id", "course", "teacher", "role"]


admin.site.register(CoursePermissions, CoursePermissionsAdmin)
admin.site.register(Payments, PaymentsAdmin)
admin.site.register(CourseTeachers, CourseTeachersAdmin)
