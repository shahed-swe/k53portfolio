from django.db import models
from django.core.validators import EmailValidator, URLValidator

class Service(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    icon = models.CharField(max_length=50)  # FontAwesome icon name
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

    class Meta:
        ordering = ['created_at']

class Employee(models.Model):
    DEPARTMENT_CHOICES = [
        ('MANAGEMENT', 'Management'),
        ('DEVELOPMENT', 'Development'),
        ('DESIGN', 'Design'),
        ('MARKETING', 'Marketing'),
        ('SALES', 'Sales'),
    ]

    name = models.CharField(max_length=100)
    designation = models.CharField(max_length=100)
    department = models.CharField(max_length=20, choices=DEPARTMENT_CHOICES)
    bio = models.TextField()
    image = models.ImageField(upload_to='employees/')
    email = models.EmailField(validators=[EmailValidator()])
    phone = models.CharField(max_length=20, blank=True)
    linkedin_url = models.URLField(validators=[URLValidator()], blank=True)
    twitter_url = models.URLField(validators=[URLValidator()], blank=True)
    github_url = models.URLField(validators=[URLValidator()], blank=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.name} - {self.designation}"

    class Meta:
        ordering = ['name']

class Project(models.Model):
    STATUS_CHOICES = [
        ('ONGOING', 'Ongoing'),
        ('COMPLETED', 'Completed'),
        ('MAINTENANCE', 'Maintenance'),
    ]

    title = models.CharField(max_length=200)
    description = models.TextField()
    category = models.CharField(max_length=100)
    image = models.ImageField(upload_to='projects/')
    client = models.CharField(max_length=200)
    start_date = models.DateField()
    end_date = models.DateField(null=True, blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES)
    technologies = models.JSONField()  # Store as a list of technologies
    project_url = models.URLField(validators=[URLValidator()], blank=True)
    github_url = models.URLField(validators=[URLValidator()], blank=True)
    team_members = models.ManyToManyField(Employee, related_name='projects')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

    class Meta:
        ordering = ['-created_at']

class ContactInformation(models.Model):
    address = models.TextField()
    email = models.EmailField(validators=[EmailValidator()])
    phone = models.CharField(max_length=20)
    working_hours = models.CharField(max_length=200)
    google_maps_url = models.URLField(validators=[URLValidator()], blank=True)
    facebook_url = models.URLField(validators=[URLValidator()], blank=True)
    twitter_url = models.URLField(validators=[URLValidator()], blank=True)
    linkedin_url = models.URLField(validators=[URLValidator()], blank=True)
    instagram_url = models.URLField(validators=[URLValidator()], blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Contact Information - {self.email}"

    class Meta:
        verbose_name = "Contact Information"
        verbose_name_plural = "Contact Information"

class ContactMessage(models.Model):
    STATUS_CHOICES = [
        ('NEW', 'New'),
        ('IN_PROGRESS', 'In Progress'),
        ('COMPLETED', 'Completed'),
        ('ARCHIVED', 'Archived'),
    ]

    name = models.CharField(max_length=100)
    email = models.EmailField(validators=[EmailValidator()])
    subject = models.CharField(max_length=200)
    message = models.TextField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='NEW')
    is_read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.name} - {self.subject}"

    class Meta:
        ordering = ['-created_at']

class Testimonial(models.Model):
    name = models.CharField(max_length=100)
    position = models.CharField(max_length=100)
    company = models.CharField(max_length=100)
    image = models.ImageField(upload_to='testimonials/', blank=True)
    content = models.TextField()
    rating = models.PositiveIntegerField(default=5)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.name} - {self.company}"

    class Meta:
        ordering = ['-created_at']
