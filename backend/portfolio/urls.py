from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    ServiceViewSet,
    EmployeeViewSet,
    ProjectViewSet,
    ContactInformationViewSet,
    ContactMessageViewSet,
    TestimonialViewSet,
)

router = DefaultRouter()
router.register(r'services', ServiceViewSet)
router.register(r'employees', EmployeeViewSet)
router.register(r'projects', ProjectViewSet)
router.register(r'contact-info', ContactInformationViewSet)
router.register(r'contact-messages', ContactMessageViewSet)
router.register(r'testimonials', TestimonialViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
