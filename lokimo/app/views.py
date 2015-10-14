# encoding:utf-8
import sys

reload(sys)
sys.setdefaultencoding('utf-8')

from django.shortcuts import render_to_response, HttpResponseRedirect, HttpResponse
from django.views.decorators.csrf import csrf_exempt
from sqlalchemy import Column, String
from models import *
import datetime
from lokimo import db
from sqlalchemy.ext.declarative import declarative_base
import string, random
from form import *
import json
from django.contrib import auth

Base = declarative_base()


@csrf_exempt
def login(request):
    # if request.user.is_authenticated():
    # return HttpResponseRedirect('/homepage/')
    type = 0
    if request.method == 'POST':
        form = LoginForm(request.POST)
        if form.is_valid():
            print form
            cd = form.cleaned_data
            type = cd['type']
            user = auth.authenticate(tel=cd['tel'], password=cd['password'], )
            if user is not None and user.is_active and user.type == int(type):
                auth.login(request, user)
                if len(request.session['pageStatus']) == 16:
                    return HttpResponseRedirect('/detail/?act_id=' + request.session['pageStatus'])
                else:
                    return HttpResponseRedirect('/activity/?type='+ request.session['pageStatus'])

                    # return HttpResponseRedirect(request.session['login_from'])
            else:
                return HttpResponseRedirect('/activity/?action=login&type='+type)
                # return HttpResponseRedirect(request.session['login_from'])
        else:
            return HttpResponseRedirect('/activity/?action=login&type='+type)
            # return HttpResponseRedirect(request.session['login_from'])
    else:
        if len(request.session['pageStatus'])==16:
            return HttpResponseRedirect('/detail/?action=login&act_id='+request.session['pageStatus'])
        else:
            return HttpResponseRedirect('/activity/?action=login&type='+request.session['pageStatus'])


def logout(request):
    auth.logout(request)
    # return HttpResponseRedirect('/activity/?type=1')
    return HttpResponseRedirect(request.META.get('HTTP_REFERER', '/'))


@csrf_exempt
def register(request):
    # if request.user.is_authenticated():
    # return HttpResponseRedirect('/homepage/')
    type = 0
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            print form
            password = form.clean_password2()
            cd = form.cleaned_data
            type = cd['type']
            new_user = MyUser(tel=cd['tel'], type=int(type))
            new_user.set_password(password)
            new_user.save()
            user = auth.authenticate(tel=cd['tel'], password=password, type=int(type))
            auth.login(request, user)

            if len(request.session['pageStatus']) == 16:
                return HttpResponseRedirect('/detail/?act_id=' + request.session['pageStatus'])
            else:
                return HttpResponseRedirect('/activity/?type='+request.session['pageStatus'])
                # return HttpResponseRedirect('/activity/?type=1')
                # return HttpResponseRedirect(request.session['register_from'])
                # return HttpResponseRedirect(request.META.get('HTTP_REFERER', '/'))
        else:
            return HttpResponseRedirect('/activity/?action=register&type='+type)
            # return HttpResponseRedirect('/activity/?type=1')
    else:
        if len(request.session['pageStatus'])==16:
            return HttpResponseRedirect('/detail/?action=register&act_id='+request.session['pageStatus'])
        else:
            return HttpResponseRedirect('/activity/?action=register&type='+request.session['pageStatus'])

@csrf_exempt
def addBlog(request):
    blog_title = request.POST.get('blog_title')
    blog_content = request.POST.get('blog_content')
    blog_tel = request.POST.get('blog_tel')
    blog_name = request.POST.get('blog_name')
    blog_role = request.POST.get('blog_role')
    print blog_title, blog_content, blog_tel, blog_name
    blog_time = str(datetime.datetime.now())
    chars = string.ascii_letters + string.digits
    ss = ''.join([random.choice(chars) for i in range(4)])
    blog_id = blog_tel.encode('utf-8') + ss
    status = True
    while status:
        chars = string.ascii_letters + string.digits
        ss = ''.join([random.choice(chars) for i in range(4)])
        blog_id = blog_tel.encode('utf-8') + ss
        if check(blog_id):
            status = False
    blog = Blog()
    blog.blog_id = blog_id
    blog.blog_tel = blog_tel
    if len(blog_name) > 0:
        print 'a'
        blog.blog_name = blog_name
        if blog_name.encode("utf-8") == 'lokimo':
            print 'b'
            blog.blog_role = '10'
            blog.blog_status = '1'
        else:
            blog.blog_status = '0'
            blog.blog_role = blog_role
    else:
        blog.blog_status = '0'
        blog.blog_name = '游客'
        blog.blog_role = blog_role
    blog.blog_title = blog_title
    blog.blog_content = blog_content
    # blog.blog_role = blog_role
    blog.blog_time = blog_time

    f = request.FILES["blog_img"]
    # f=request.GET.get('blog_img')
    file_name = blog_id + '.jpg'
    with open('/usr/workspace/lokimo/static/images/' + file_name, 'wb+') as destination:
    # with open('/Users/Csd/PycharmProjects/lokimo/static/images/' + file_name, 'wb+') as destination:
        for chunk in f.chunks():
            destination.write(chunk)

    blog.save()
    return HttpResponseRedirect('/blog/?type=' + blog_role)


def check(blog_id):
    user = Blog.objects.filter(blog_id=blog_id).all()
    # user = session.query(Blog).filter(Blog.blog_id == blog_id).all()
    if len(user) == 0:
        return True
    else:
        return False


def blog(request):
    print 'b'
    type = request.GET.get("type")
    user = None
    # session = db.db_createSession()
    # blogs = session.query(Blog).filter(Blog.blog_role == type, Blog.blog_status == '1').all()
    blogs = Blog.objects.filter(blog_role=type, blog_status='1').all()
    if request.user.is_authenticated():
        user = request.user
    if len(blogs) == 0:
        return render_to_response('blog.html', {"user": user})
    else:
        return render_to_response('blog.html', {"blogs": blogs, "user": user})


def activity(request):

    type = request.GET.get("type")
    request.session['pageStatus'] = type
    print 'type:'+type
    print '现在的session值：'+request.session['pageStatus']
    action = ""
    user = None
    result_openday = []
    result_hackday = []
    if request.GET.get("action") == 'login':
        action = "login"
        # request.session['login_from'] = request.META.get('HTTP_REFERER', '/')
    elif request.GET.get("action") == 'register':
        action = "register"
        # request.session['register_from'] = request.META.get('HTTP_REFERER', '/')
    elif request.GET.get("action") == 'apply':
        if not request.user.is_authenticated():
            return HttpResponseRedirect('/activity/?action=login&type='+type)

        action = "apply"
        # request.session['apply_from'] = request.META.get('HTTP_REFERER', '/')
        now = datetime.datetime.now()
        act_hackdays = Activity.objects.filter(act_type=1).all()
        act_opendays = Activity.objects.filter(act_type=0).all()
        print 'b'
        for act_hackday in act_hackdays:
            print 'c'
            deadline = datetime.datetime.strptime(str(str(act_hackday.act_time)[:10] + " 00:00:00"),
                                                  "%Y-%m-%d %H:%M:%S")
            if now < deadline:
                apply = Apply.objects.filter(act_id=act_hackday.act_id, tel=request.user.tel).all()
                if len(apply) == 0:
                    result_hackday.append(act_hackday)
                    print result_hackday

        for act_openday in act_opendays:
            print 'd'
            deadline = datetime.datetime.strptime(str(str(act_openday.act_time)[:10] + " 00:00:00"),
                                                  "%Y-%m-%d %H:%M:%S")
            if now < deadline:
                apply = Apply.objects.filter(act_id=act_openday.act_id, tel=request.user.tel).all()
                if len(apply) == 0:
                    result_openday.append(act_openday)
                    print result_openday
        print 'dsdf'
    activities = Activity.objects.filter(act_type=type).all()
    if request.user.is_authenticated():
        user = MyUser.objects.get(tel=request.user.tel)


    # if len(activities) == 0:
    # print 'no'
    # return render_to_response('activity.html', {"user": user, "action": action})
    # else:
    now = datetime.datetime.now()
    for act in activities:
        deadline = datetime.datetime.strptime(str(str(act.act_time)[:10] + " 00:00:00"), "%Y-%m-%d %H:%M:%S")
        if now >= deadline:
            act.status = 'over'
        else:
            if request.user.is_authenticated():
                apply = Apply.objects.filter(act_id=act.act_id, tel=request.user.tel)
                if len(apply) == 0:
                    act.status = 'in'
                else:
                    act.status = 'apply'
            else:
                act.status = 'in'
    print 'sdfsdf'
    return render_to_response('activity.html',
                              {"activities": activities, "user": user, "action": action, 'opendays': result_openday,
                               'hackdays': result_hackday})


def invite(request):
    print 'a'
    return render_to_response('website.html')


def test(request):
    return render_to_response('detail.html')


@csrf_exempt
def addAct(request):
    print 'a'
    if request.method == 'POST':
        print 'b'
        form = addActForm(request.POST)

        print form
        if form.is_valid():
            cd = form.cleaned_data
            now = datetime.datetime.now()
            chars = string.ascii_letters + string.digits
            rand = ''.join(random.sample(chars, 2))
            act_id = str(now)[0:4] + str(now)[5:7] + str(now)[8:10] + str(now)[11:13] + \
                     str(now)[14:16] + str(now)[17:19] + rand[:2]
            print act_id
            print cd['act_title']
            print cd['act_content']
            newAct = Activity(act_id=act_id, act_title=cd['act_title'], act_summary=cd['act_summary'],
                              act_content=cd['act_content'], act_time=cd['act_time'], act_type=cd['act_type'], )
            print newAct
            newAct.save()
            print 'succeed!'

            f = request.FILES["act_cover"]
            # f=request.GET.get('blog_img')
            file_name = act_id + '.jpg'
            with open('/usr/workspace/lokimo/static/images/' + file_name, 'wb+') as destination:
            # with open('/Users/Csd/Desktop/lokimo_website_git/lokimo/static/images/' + file_name, 'wb+') as destination:
                for chunk in f.chunks():
                    destination.write(chunk)

            return render_to_response('addAct.html')

    else:
        return render_to_response('addAct.html')


@csrf_exempt
def upfile(request):
    file = request.FILES['upfile']
    print file.name
    with open('/usr/workspace/lokimo/static/UEditor/img/' + file.name, 'wb+') as destination:
    # with open('/Users/Csd/Desktop/lokimo_website_git/lokimo/static/UEditor/img/' + file.name, 'wb+') as destination:
        for chunk in file.chunks():
            destination.write(chunk)
    url = file.name
    title = file.name[:-4]
    original = file.name
    print url, title, original
    # return HttpResponse("{'url':'" + '/static/UEditor/img/' + file.name + "','title':'" + file.name + "','original':'" + file.name + "','state':'" + "SUCCESS" + "'}",content_type="application/json")
    response = HttpResponse(
        "{'state': 'SUCCESS', 'url':'" + url + "','title':'" + title + "', 'original':'" + original + "'}")
    response.__setitem__("Access-Control-Allow-Origin", "*")
    return response


def detail(request):

    user = None
    if request.user.is_authenticated():
        user = MyUser.objects.get(tel=request.user.tel)
    act_id = request.GET.get('act_id')
    request.session['pageStatus'] = act_id
    print '现在的session值：'+request.session['pageStatus']
    act = Activity.objects.get(act_id=act_id)
    now = datetime.datetime.now()
    deadline = datetime.datetime.strptime(str(str(act.act_time)[:10] + " 00:00:00"), "%Y-%m-%d %H:%M:%S")
    if now >= deadline:
        act.status = 'over'
    else:
        if request.user.is_authenticated():
            apply = Apply.objects.filter(act_id=act.act_id, tel=request.user.tel)
            if len(apply) == 0:
                act.status = 'in'
            else:
                act.status = 'apply'
        else:
            act.status = 'in'

    coms = Comment.objects.filter(act_id=act_id).order_by('com_time')
    coms.com_total = len(coms)
    now = datetime.datetime.now()
    result_openday = []
    result_hackday = []
    action = ""

    likes = Like.objects.filter(act_id=act_id).all()
    likes.count = len(likes)
    likes.status = 'dislike'
    if request.user.is_authenticated():
        for like in likes:
            if like.tel == request.user.tel:
                likes.status = 'like'

    if request.GET.get("action") == 'login':
        action = "login"
        # request.session['login_from'] = request.META.get('HTTP_REFERER', '/')
    elif request.GET.get("action") == 'register':
        action = "register"
        # request.session['register_from'] = request.META.get('HTTP_REFERER', '/')
    elif request.GET.get("action") == 'apply':
        print 'ganma'
        if not request.user.is_authenticated():
            return HttpResponseRedirect('/detail/?act_id=' + act_id + '&action=login')
        action = "apply"
        # request.session['apply_from'] = request.META.get('HTTP_REFERER', '/')
        act_hackdays = Activity.objects.filter(act_type=1).all()
        act_opendays = Activity.objects.filter(act_type=0).all()
        for act_hackday in act_hackdays:
            deadline = datetime.datetime.strptime(str(str(act_hackday.act_time)[:10] + " 00:00:00"),
                                                  "%Y-%m-%d %H:%M:%S")
            if now < deadline:
                apply = Apply.objects.filter(act_id=act_hackday.act_id, tel=request.user.tel).all()
                if len(apply) == 0:
                    result_hackday.append(act_hackday)

        for act_openday in act_opendays:
            deadline = datetime.datetime.strptime(str(str(act_openday.act_time)[:10] + " 00:00:00"),
                                                  "%Y-%m-%d %H:%M:%S")
            if now < deadline:
                apply = Apply.objects.filter(act_id=act_openday.act_id, tel=request.user.tel).all()
                if len(apply) == 0:
                    result_openday.append(act_openday)

        return render_to_response('detail.html',
                                  {'act': act, 'user': user, 'action': action, 'coms': coms, 'opendays': result_openday,
                                   'hackdays': result_hackday})

    return render_to_response('detail.html', {'act': act, 'user': user, 'action': action, 'coms': coms, 'likes': likes})


@csrf_exempt
def addComment(request):
    # 37
    adj = ['原始的', '野蛮的', '呆萌的', '毛躁的', '凶悍的', '努力的', '没洗澡的', '举着石头的', '害羞的', '裂开的', '睡着的', '刚睡醒的', '睡眼惺忪的',
           '蹲着的', '饿着肚子的', '疯狂奔跑的', '穿着毛皮的', '爱吃猛犸象的', '挖鼻孔的', '抠脚的', '好奇的', '易怒的', '疯狂的', '鼻孔很大的', '倒立的',
           '用舌头洗脸的', '从来不洗脸的', '邋遢的', '睡不醒的', '凶巴巴的', '霸道的', '碎碎念的', '自以为是的', '会飞的', '躺在水里的', '埋在土里的', '从山上滚下来的', ]
    # 15
    n = ['骨头', '头盖骨', '猛犸', '野人', '猪', '小豹几', '小脑虎', '小熊', '猩猩', '猴几', '山鸡', '青蛙', '小龙虾', '走地鸡', '螃蟹', ]

    if request.method == 'POST':
        print 'aaaa'
        form = addCommentForm(request.POST)
        print 'bbb'
        if form.is_valid():
            cd = form.cleaned_data
            now = datetime.datetime.now()
            comment = Comment.objects.filter(act_id=cd['act_id'], tel=request.user.tel).all()
            if len(comment) == 0:
                com_head = random.randint(1, 27)
                com_name = adj[random.randint(0, 36)] + n[random.randint(0, 14)]
                com = Comment(act_id=cd['act_id'], tel=request.user.tel, com_time=now, com_content=cd['com_content'],
                              com_head=com_head, com_name=com_name)
                com.save()
            else:
                com_head = comment[0].com_head
                com_name = comment[0].com_name
                com = Comment(act_id=cd['act_id'], tel=request.user.tel, com_time=now, com_content=cd['com_content'],
                              com_head=com_head, com_name=com_name)
                com.save()
            return HttpResponseRedirect('/detail/?act_id=' + cd['act_id'])


def apply(request):
    openday = request.GET.get('openday')
    hackday = request.GET.get('hackday')
    opens = openday.split(',')
    hacks = hackday.split(',')
    for open in opens:
        print 'open'
        if len(open) == 16:
            print 'open16'
            apply = Apply(act_id=open, tel=request.user.tel)
            apply.save()
    for hack in hacks:
        print 'hack'
        if len(hack) == 16:
            print 'hack16'
            apply = Apply(act_id=hack, tel=request.user.tel)
            apply.save()
    return HttpResponseRedirect(request.session['apply_from'])


def addLike(request):
    act_id = request.GET.get('act_id')
    tel = request.GET.get('tel')
    if not request.user.is_authenticated():
        return HttpResponseRedirect('/detail/?act_id=' + act_id + '&action=login')

    if not Like.objects.filter(act_id=act_id, tel=tel):
        like = Like(act_id=act_id, tel=tel)
        like.save()
        return HttpResponseRedirect('/detail/?act_id=' + act_id)


def deleteLike(request):
    act_id = request.GET.get('act_id')
    tel = request.GET.get('tel')
    if Like.objects.get(act_id=act_id, tel=tel):
        like = Like.objects.get(act_id=act_id, tel=tel)
        like.delete()
        return HttpResponseRedirect('/detail/?act_id=' + act_id)


def applyInfo(request):
    user = None
    type = request.GET.get('type')
    print type
    if request.user.is_authenticated():
        user = MyUser.objects.get(tel=request.user.tel)

    opendays_end = []
    hackdays_end = []
    opendays = []
    hackdays = []
    now = datetime.datetime.now()
    applys = Apply.objects.filter(tel=request.user.tel).all()
    if len(applys) > 0:
        for apply in applys:
            act = Activity.objects.get(act_id=apply.act_id)
            deadline = datetime.datetime.strptime(str(str(act.act_time)[:10] + " 00:00:00"),
                                                  "%Y-%m-%d %H:%M:%S")
            if now > deadline:
                if act.act_type == '0':
                    opendays_end.append(act)
                else:
                    hackdays_end.append(act)
            else:
                if act.act_type == '0':
                    opendays.append(act)
                else:
                    hackdays.append(act)
    if type == 'end':
        print 'lalala'
        return render_to_response('applyInfo.html',
                                  {'user': user, 'opendays_end': opendays_end, 'hackdays_end': hackdays_end,
                                   'type': type})
    else:
        print 'hehehe'
        return render_to_response('applyInfo.html',
                                  {'user': user, 'opendays': opendays, 'hackdays': hackdays, 'type': type})


def cancel(request):
    if len(request.session['pageStatus'])==16:
        return HttpResponseRedirect('/detail/?act_id='+request.session['pageStatus'])
    else:
        return HttpResponseRedirect('/activity/?type='+request.session['pageStatus'])