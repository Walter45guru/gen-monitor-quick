import os
from django.core.wsgi import get_wsgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'generator_backend.settings')

application = get_wsgi_application()
app = application  # For Vercel compatibility 