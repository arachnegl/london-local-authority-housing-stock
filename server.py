import os
import sys

from django.conf import settings

BASE_DIR = os.path.dirname(__file__)
DEBUG = os.environ.get('DEBUG', 'on') == 'on'
SECRET_KEY = os.environ.get('SECRET_KEY', os.urandom(32))
ALLOWED_HOSTS = os.environ.get('ALLOWED_HOSTS', 'localhost').split(',')

settings.configure(
    DEBUG=DEBUG,
    SECRET_KEY=SECRET_KEY,
    ALLOWED_HOSTS=ALLOWED_HOSTS,
    ROOT_URLCONF=__name__,
    # TODO do I need this middleware?
    MIDDLEWARE_CLASSES=(
        'django.middleware.common.CommonMiddleware',
        'django.middleware.csrf.CsrfViewMiddleware',
        'django.middleware.clickjacking.XFrameOptionsMiddleware',
    ),
    INSTALLED_APPS=(
        'django.contrib.staticfiles',
    ),
    TEMPLATE_DIRS=(
        os.path.join(BASE_DIR, 'templates'),
    ),
    STATICFILES_DIR=(
        os.path.join(BASE_DIR, 'static'),
    ),
    STATIC_URL='/static/',
    STATIC_ROOT='',
    STATICFILES_FINDERS=(
        'django.contrib.staticfiles.finders.FileSystemFinder',
        'django.contrib.staticfiles.finders.AppDirectoriesFinder',
    ),
)

from django.conf.urls import url
from django.core.wsgi import get_wsgi_application
from django.shortcuts import render

from main import get_sums_and_years


def index(request):
    sums, _ = get_sums_and_years()
    return render(request, 'index.html', {'sums': sums})


urlpatterns = (
    url(r'^$', index),
)

application = get_wsgi_application()


if __name__ == "__main__":
    from django.core.management import execute_from_command_line

    execute_from_command_line(sys.argv)
