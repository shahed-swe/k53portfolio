from django.contrib import admin
from .models import Service, Employee, Project, ContactInformation, ContactMessage, Testimonial

# Register your models here.

@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ('title', 'created_at', 'updated_at')
    search_fields = ('title', 'description')
    list_filter = ('created_at',)

@admin.register(Employee)
class EmployeeAdmin(admin.ModelAdmin):
    list_display = ('name', 'designation', 'department', 'email', 'is_active')
    search_fields = ('name', 'designation', 'email')
    list_filter = ('department', 'is_active')

@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'client', 'status', 'start_date')
    search_fields = ('title', 'description', 'client')
    list_filter = ('status', 'category')
    filter_horizontal = ('team_members',)

@admin.register(ContactInformation)
class ContactInformationAdmin(admin.ModelAdmin):
    list_display = ('email', 'phone', 'updated_at')

@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'subject', 'status', 'is_read', 'created_at')
    search_fields = ('name', 'email', 'subject', 'message')
    list_filter = ('status', 'is_read', 'created_at')
    readonly_fields = ('created_at', 'updated_at')

@admin.register(Testimonial)
class TestimonialAdmin(admin.ModelAdmin):
    list_display = ('name', 'company', 'rating', 'is_active')
    search_fields = ('name', 'company', 'content')
    list_filter = ('rating', 'is_active')
