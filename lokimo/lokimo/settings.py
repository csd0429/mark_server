# encoding:utf-8
"""
Django settings for lokimo project.

For more information on this file, see
https://docs.djangoproject.com/en/1.7/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/1.7/ref/settings/
"""

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
import os

BASE_DIR = os.path.dirname(os.path.dirname(__file__))


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/1.7/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'tptgn&%k!dh=pd-^_u@*+ui811of#uq*^ybv0ze+7v*t=k*uaq'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

TEMPLATE_DEBUG = True

TEMPLATE_DIRS = (
    # Put strings here, like "/home/html/django_templates".
    # Always use forward slashes, even on Windows.
    './templates',
)

ALLOWED_HOSTS = ['*']


# Application definition

INSTALLED_APPS = (
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'app',
)

MIDDLEWARE_CLASSES = (
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.auth.middleware.SessionAuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
)

ROOT_URLCONF = 'lokimo.urls'

WSGI_APPLICATION = 'lokimo.wsgi.application'

#
# Database
# https://docs.djangoproject.com/en/1.7/ref/settings/#databases
# DATABASES = {
#     'default': {
#         'ENGINE': 'django.db.backends.postgresql_psycopg2',
#         'NAME': 'markdb',
#         'USER': 'markuser',
#         'PASSWORD': 'm4BunFfEtyns9c',
#         'HOST': 'markdb.ctltwc1dor1y.rds.cn-north-1.amazonaws.com.cn',
#         'PORT': '5432',
#     }
# }
# DATABASES1 = {
#         'drivername':'postgres',
#         'host':'markdb.ctltwc1dor1y.rds.cn-north-1.amazonaws.com.cn',
#         'port':'5432',
#         'username':'markuser',
#         'password':'m4BunFfEtyns9c',
#         'database':'markdb'
# }
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'HOST': 'markdb.ctltwc1dor1y.rds.cn-north-1.amazonaws.com.cn',
        'PORT': '5432',
        'USER': 'markuser',
        'PASSWORD': 'm4BunFfEtyns9c',
        'NAME': 'lokimoDB'
    }
}

# Internationalization
# https://docs.djangoproject.com/en/1.7/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'Asia/Shanghai'

USE_I18N = True

USE_L10N = True

USE_TZ = False


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/1.7/howto/static-files/
AUTH_USER_MODEL = "app.MyUser"

# ----服务器配置----
STATIC_URL = '/usr/workspace/lokimo/static/'

STATIC_ROOT= '/usr/workspace/lokimo/static/'

#----本地配置----
#
# STATIC_URL = '/Users/Csd/Desktop/lokimo_website_git/lokimo/static/'
#
# STATIC_ROOT = '/Users/Csd/Desktop/lokimo_website_git/lokimo/static/'
