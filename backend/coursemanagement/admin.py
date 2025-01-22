from django.contrib import admin
from .models import CoursePermissions, Payments, CourseTeachers,AdminMessages


class CoursePermissionsAdmin(admin.ModelAdmin):
    list_display = ["label"]


class PaymentsAdmin(admin.ModelAdmin):
    list_display = ["student", "enrollement", "amount", "date"]


class CourseTeachersAdmin(admin.ModelAdmin):
    list_display = ["id", "course", "teacher", "role"]

class AdminMessagesAdmin(admin.ModelAdmin):
    list_display = ["id"]


admin.site.register(CoursePermissions, CoursePermissionsAdmin)
admin.site.register(Payments, PaymentsAdmin)
admin.site.register(CourseTeachers, CourseTeachersAdmin)
admin.site.register(AdminMessages, AdminMessagesAdmin)
