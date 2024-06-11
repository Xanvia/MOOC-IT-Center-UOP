from django.apps import AppConfig

class CoursemanagementConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'coursemanagement'

    def ready(self):
        import coursemanagement.signals  # Import signals to ensure they are registered
