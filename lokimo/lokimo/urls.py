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
    url(r'^blog/', 'blog'),
    url(r'^invite/', 'invite'),
    url(r'^activity/', 'activity'),
    url(r'^test/','test'),
    url(r'^addAct/','addAct'),
    url(r'^upfile/','upfile'),
    url(r'^detail/','detail'),
    url(r'^login/','login'),
    url(r'^logout/','logout'),
    url(r'^register/','register'),
    url(r'^addComment/','addComment'),
    url(r'^apply/','apply'),
    url(r'^applyInfo/','applyInfo'),
    url(r'^addLike/','addLike'),
    url(r'^deleteLike/','deleteLike'),
    url(r'^cancel/','cancel')
)

urlpatterns += patterns('',
        url(r'^static/(?P<path>.*)$','django.views.static.serve',{
            'document_root':settings.STATIC_ROOT,
        }),
)