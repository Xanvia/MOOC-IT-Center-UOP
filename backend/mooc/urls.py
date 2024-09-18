"""
URL configuration for mooc project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.conf import settings
from django.conf.urls.static import static

from django.contrib import admin
from django.urls import path, include
from userprofiles.views import (
    InterestListAPIView,
    CountryListAPIView,
    InstitutionsListAPIView,
)


urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/user/", include("userprofiles.urls")),
    path("api/course/", include("courses.urls")),
    path("api/course/manage/", include("coursemanagement.urls")),
    path("api/interests/", InterestListAPIView.as_view(), name="interests-list"),
    path("api/countries/", CountryListAPIView.as_view(), name="countries-list"),
    path(
        "api/institutions/", InstitutionsListAPIView.as_view(), name="institutions-list"
    ),
]


if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
