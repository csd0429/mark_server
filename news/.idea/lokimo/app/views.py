# encoding:utf-8
from django.shortcuts import render_to_response, HttpResponseRedirect,HttpResponse
from django.views.decorators.csrf import csrf_exempt
from sqlalchemy import Column, String
from models import *
import datetime
from lokimo import db
from sqlalchemy.ext.declarative import declarative_base
import string,random
import urllib


Base = declarative_base()

class Blog(Base):
    # 表的名字:
    __tablename__ = 'app_blog'

    # 表的结构:
    blog_id = Column(String, primary_key=True)
    blog_tel = Column('blog_tel', String, nullable=False)
    blog_name = Column('blog_name', String, nullable=True)
    blog_title = Column('blog_title', String, nullable=False)
    blog_content = Column('blog_content', String, nullable=False)
    blog_role = Column('blog_role', String, nullable=False)
    blog_status = Column('blog_status', String, nullable=False)


def index(request):

    return render_to_response('../static/base.html')


@csrf_exempt
def addBlog(request):
    print 's'
    blog_title = request.POST.get('blog_title')
    blog_content = request.POST.get('blog_content')
    blog_tel = request.POST.get('blog_tel')
    blog_name = request.POST.get('blog_name')
    blog_role = request.POST.get('blog_role')
    print blog_title,blog_content,blog_tel,blog_name
    blog_time=str(datetime.datetime.now())
    session = db.db_createSession()
    chars=string.ascii_letters+string.digits
    ss=''.join([random.choice(chars) for i in range(4)])
    print 'a'
    blog_id=blog_tel.encode('utf-8')+ss
    status=True
    print 'b'
    while status:
        print 'a'
        chars=string.ascii_letters+string.digits
        ss=''.join([random.choice(chars) for i in range(4)])
        blog_id=blog_tel.encode('utf-8')+ss
        print 's'
        if check(session,blog_id):
            status=False
    print 'sds'
    blog=Blog()
    blog.blog_id=blog_id
    blog.blog_tel=blog_tel
    if blog_name:
        blog.blog_name=blog_name
    blog.blog_title=blog_title
    blog.blog_content=blog_content
    blog.blog_role=blog_role
    blog.blog_time=blog_time
    blog.blog_status='0'
    print 's'

    f=request.FILES["blog_img"]
    # f=request.GET.get('blog_img')
    file_name=blog_id+'.jpg'
    print 'sd'
    with open('/usr/workspace/mark_repository/news/static/images/'+file_name,'wb+') as destination:
    # with open('/Users/Csd/PycharmProjects/lokimo/static/images/'+file_name,'wb+') as destination:
        for chunk in f.chunks():
            destination.write(chunk)

    print 'sdfsdf'
    session.add(blog)
    session.commit()
    session.close()
    response=HttpResponse("succeed")
    response.__setitem__("Access-Control-Allow-Origin","*")
    return response


def check(session,blog_id):

    user = session.query(Blog).filter(Blog.blog_id == blog_id).all()
    if len(user)==0:
        return True
    else:
        return False