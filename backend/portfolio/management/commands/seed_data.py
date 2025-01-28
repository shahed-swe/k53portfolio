from django.core.management.base import BaseCommand
from django.core.files.base import ContentFile
from portfolio.models import Service, Employee, Project, ContactInformation, Testimonial
import requests
from datetime import date, timedelta

class Command(BaseCommand):
    help = 'Seed database with initial data'

    def handle(self, *args, **kwargs):
        self.stdout.write('Seeding data...')
        
        # Clear existing data
        Service.objects.all().delete()
        Employee.objects.all().delete()
        Project.objects.all().delete()
        ContactInformation.objects.all().delete()
        Testimonial.objects.all().delete()

        # Seed Services
        services = [
            {
                'title': 'Web Development',
                'description': 'Custom web applications built with modern technologies and best practices.',
                'icon': 'faCode',
            },
            {
                'title': 'Mobile Development',
                'description': 'Native and cross-platform mobile apps for iOS and Android devices.',
                'icon': 'faMobileScreen',
            },
            {
                'title': 'UI/UX Design',
                'description': 'Beautiful and intuitive user interfaces that enhance user experience.',
                'icon': 'faPaintBrush',
            },
            {
                'title': 'Digital Marketing',
                'description': 'Data-driven marketing strategies to grow your online presence.',
                'icon': 'faChartLine',
            },
            {
                'title': 'Cloud Solutions',
                'description': 'Scalable cloud infrastructure and DevOps services for your applications.',
                'icon': 'faServer',
            },
            {
                'title': 'Cybersecurity',
                'description': 'Comprehensive security solutions to protect your digital assets.',
                'icon': 'faShieldHalved',
            },
        ]

        for service_data in services:
            Service.objects.create(**service_data)
        self.stdout.write(self.style.SUCCESS('Services created successfully'))

        # Seed Employees
        employees = [
            {
                'name': 'John Doe',
                'designation': 'CEO & Founder',
                'department': 'MANAGEMENT',
                'bio': 'Experienced leader with a passion for innovation and technology.',
                'email': 'john@example.com',
                'phone': '+1 (555) 123-4567',
                'linkedin_url': 'https://linkedin.com',
                'twitter_url': 'https://twitter.com',
                'github_url': 'https://github.com',
                'image_url': 'https://images.unsplash.com/photo-1560250097-0b93528c311a',
            },
            {
                'name': 'Jane Smith',
                'designation': 'Lead Designer',
                'department': 'DESIGN',
                'bio': 'Creative designer with expertise in user experience and interface design.',
                'email': 'jane@example.com',
                'phone': '+1 (555) 234-5678',
                'linkedin_url': 'https://linkedin.com',
                'twitter_url': 'https://twitter.com',
                'github_url': 'https://github.com',
                'image_url': 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2',
            },
            {
                'name': 'Mike Johnson',
                'designation': 'Senior Developer',
                'department': 'DEVELOPMENT',
                'bio': 'Full-stack developer with a focus on scalable web applications.',
                'email': 'mike@example.com',
                'phone': '+1 (555) 345-6789',
                'linkedin_url': 'https://linkedin.com',
                'twitter_url': 'https://twitter.com',
                'github_url': 'https://github.com',
                'image_url': 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
            },
            {
                'name': 'Sarah Williams',
                'designation': 'Marketing Head',
                'department': 'MARKETING',
                'bio': 'Marketing professional with expertise in digital strategies.',
                'email': 'sarah@example.com',
                'phone': '+1 (555) 456-7890',
                'linkedin_url': 'https://linkedin.com',
                'twitter_url': 'https://twitter.com',
                'github_url': 'https://github.com',
                'image_url': 'https://images.unsplash.com/photo-1580489944761-15a19d654956',
            },
        ]

        created_employees = []
        for employee_data in employees:
            image_url = employee_data.pop('image_url')
            response = requests.get(f"{image_url}?w=800&q=80")
            if response.status_code == 200:
                employee = Employee(**employee_data)
                employee.image.save(
                    f"{employee_data['name'].lower().replace(' ', '_')}.jpg",
                    ContentFile(response.content),
                    save=True
                )
                created_employees.append(employee)
        self.stdout.write(self.style.SUCCESS('Employees created successfully'))

        # Seed Projects
        projects = [
            {
                'title': 'E-commerce Platform',
                'description': 'A modern e-commerce platform with advanced features.',
                'category': 'Web Development',
                'client': 'RetailCo Inc.',
                'start_date': date.today() - timedelta(days=180),
                'end_date': date.today() - timedelta(days=30),
                'status': 'COMPLETED',
                'technologies': ['React', 'Node.js', 'MongoDB', 'AWS'],
                'image_url': 'https://images.unsplash.com/photo-1661956602116-aa6865609028',
            },
            {
                'title': 'Mobile Banking App',
                'description': 'Secure and user-friendly mobile banking application.',
                'category': 'Mobile Development',
                'client': 'FinBank Corp',
                'start_date': date.today() - timedelta(days=90),
                'end_date': None,
                'status': 'ONGOING',
                'technologies': ['React Native', 'Firebase', 'Node.js'],
                'image_url': 'https://images.unsplash.com/photo-1555421689-491a97ff2040',
            },
            {
                'title': 'Healthcare Platform',
                'description': 'Comprehensive healthcare management system.',
                'category': 'Web & Mobile',
                'client': 'HealthCare Plus',
                'start_date': date.today() - timedelta(days=270),
                'end_date': date.today() - timedelta(days=90),
                'status': 'MAINTENANCE',
                'technologies': ['Angular', 'Django', 'PostgreSQL', 'Docker'],
                'image_url': 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d',
            },
        ]

        for project_data in projects:
            image_url = project_data.pop('image_url')
            response = requests.get(f"{image_url}?w=1200&q=80")
            if response.status_code == 200:
                project = Project(**project_data)
                project.image.save(
                    f"{project_data['title'].lower().replace(' ', '_')}.jpg",
                    ContentFile(response.content),
                    save=True
                )
                # Assign random team members
                project.team_members.add(*created_employees[:2])
        self.stdout.write(self.style.SUCCESS('Projects created successfully'))

        # Seed Contact Information
        contact_info = {
            'address': '123 Business Street, New York, NY 10001',
            'email': 'contact@company.com',
            'phone': '+1 (555) 123-4567',
            'working_hours': 'Mon - Fri: 9:00 AM - 6:00 PM',
            'google_maps_url': 'https://maps.google.com',
            'facebook_url': 'https://facebook.com',
            'twitter_url': 'https://twitter.com',
            'linkedin_url': 'https://linkedin.com',
            'instagram_url': 'https://instagram.com',
        }
        ContactInformation.objects.create(**contact_info)
        self.stdout.write(self.style.SUCCESS('Contact information created successfully'))

        # Seed Testimonials
        testimonials = [
            {
                'name': 'Alex Thompson',
                'position': 'CEO',
                'company': 'Tech Solutions Inc.',
                'content': 'Working with this team was an absolute pleasure. They delivered our project on time and exceeded our expectations.',
                'rating': 5,
            },
            {
                'name': 'Emily Chen',
                'position': 'Marketing Director',
                'company': 'Growth Co.',
                'content': 'The team\'s expertise in digital marketing helped us achieve remarkable growth in our online presence.',
                'rating': 5,
            },
            {
                'name': 'Michael Brown',
                'position': 'CTO',
                'company': 'Innovate Labs',
                'content': 'Their technical expertise and attention to detail made our complex project a success.',
                'rating': 5,
            },
        ]

        for testimonial_data in testimonials:
            Testimonial.objects.create(**testimonial_data)
        self.stdout.write(self.style.SUCCESS('Testimonials created successfully'))

        self.stdout.write(self.style.SUCCESS('All data seeded successfully'))
