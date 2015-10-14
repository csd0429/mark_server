from django.conf.urls import patterns, include, url
from django.contrib import admin
admin.autodiscover()
import resNews,download,homepage
from django.conf import settings
import editImage,user,token,addNews

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'news.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),
    (r'^resNews/',resNews.headinfo),
    (r'^setCover/$',download.setCover),
    (r'^showCover/$',download.showCover),
    (r'^deleteCover/$',download.deleteCover),
    (r'^downloadImg/$',download.addImg),
    url(r'^admin/', include(admin.site.urls)),
    url(r'^getToken/$',token.getToken),
    url(r'^init/$',homepage.init),
    url(r'^delete/$',homepage.delete),
    url(r'^fresh/$',homepage.fresh),
    url(r'^loading/$',homepage.loading),
    url(r'^upload/$',editImage.upload),
    (r'^editImage/$',editImage),
    (r'^user/register/$',user.register),
    (r'^user/check/$',user.check),
    (r'^user/login/$',user.login),
    (r'^user/changePwd/$',user.changePwd),
    (r'^user/changeName/$',user.changeName),
    (r'^user/sendEmail/$',user.sendEmail),
    (r'^user/checkEmail/$',user.checkEmail),
    (r'^user/resIdCode/$',user.resIdCode),
    (r'^user/resetPwd/$',user.resetPwd),
    (r'^user/forgetPwd/$',user.forgetPwd),
    (r'^user/forgetSMS/$',user.forgetSMS),
    (r'^addNews/$',addNews.addNews),
    (r'^getInviteCode/$',user.getInviteCode),
    (r'^website/$',user.website),
    (r'^addBlog/$',user.addBlog),
    (r'^website/$',user.website),
)

if settings.DEBUG is False:
    urlpatterns += patterns('',

        url(r'^static/(?P<path>.*)$','django.views.static.serve',{'document_root':settings.STATIC_ROOT1,}),
        url(r'^(?P<path>.*)$','django.views.static.serve',{'document_root':settings.STATIC_ROOT,}),

        )
