from django.contrib import admin
from .models import Title
from .models import OfferedBy
from .models import CourseCreator
from .models import Duration

class TitleAdmin(admin.ModelAdmin):
    list_display = ("label", "description")

class OfferdByAdmin(admin.ModelAdmin):
    list_display = ("label", "institution")  

class CourseCreatorAdmin(admin.ModelAdmin):
    list_display = ("label", )  

class DurationAdmin(admin.ModelAdmin):
    list_display = ("label", "start_date", "end_date" )        

admin.site.register(Title, TitleAdmin)
admin.site.register(OfferedBy, OfferdByAdmin)
admin.site.register(CourseCreator, CourseCreatorAdmin)
admin.site.register(Duration, DurationAdmin)