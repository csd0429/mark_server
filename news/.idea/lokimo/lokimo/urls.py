from django.conf.urls import patterns, include, url
from django.contrib import admin
from lokimo import settings
admin.autodiscover()

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'lokimo.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),

    url(r'^admin/', include(admin.site.urls)),
)


urlpatterns += patterns('app.views',
    # Examples:
    # url(r'^$', 'RMS.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),

    url(r'^index/', 'index'),
    url(r'^addBlog/', 'addBlog'),
)

urlpatterns += patterns('',
        url(r'^static/(?P<path>.*)$','django.views.static.serve',{
            'document_root':settings.STATIC_ROOT,
        }),
)