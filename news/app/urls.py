from django.conf.urls import patterns, url
from app.views import ImageList

urlpatterns = patterns('',
    url(r'^$', ImageList.as_view()),
)
