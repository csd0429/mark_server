# encoding:utf-8
from django.http import HttpResponse
import json
from sqlalchemy import Column, String
import datetime
from sqlalchemy.ext.declarative import declarative_base
from django.views.decorators.csrf import csrf_exempt
import db
import smtplib
from email.mime.text import MIMEText
from django.shortcuts import render_to_response
from token import *
import string


Base = declarative_base()


class User(Base):
    # 表的名字:
    __tablename__ = 'app_user'

    # 表的结构:
    user_id = Column(String, primary_key=True)
    user_pwd = Column('user_pwd', String, nullable=True)
    user_date = Column('user_date', String, nullable=True)
    user_type = Column('user_type', String, nullable=True)
    user_name = Column('user_name', String, nullable=True)
    user_email = Column('user_email', String, nullable=True)
    token_id = Column('token_id', String, nullable=True)


class TelCode(Base):
    __tablename__ = 'app_telcode'

    user_id = Column('user_id', String, primary_key=True)
    tel_code = Column('tel_code', String, nullable=True)


class Invite(Base):
    __tablename__ = 'app_invite'

    user_id = Column('user_id', String, primary_key=True)
    user_email = Column('user_email', String, nullable=True)
    invite_code = Column('invite_code', String, nullable=True)


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
    blog_time=Column('blog_status', String, nullable=False)

#
# @csrf_exempt
# def check(request):
# check = request.POST.get('user_id')
# token_id = request.POST.get('token_id')
#
#     print token_id
#     newToken = ''
#     if not checkToken(token_id):
#         deleteToken(token_id)
#         newToken = updateToken('create',None,None)
#         print newToken
#     if len(check) == 11:
#         session = db.db_createSession()
#         user = session.query(User).filter(User.user_id == check).all()
#         if user:
#             return HttpResponse(json.dumps({"result": 'registered', "newToken": newToken}),
#                                 content_type="application/json")
#         else:
#             return HttpResponse(json.dumps({"result": 'unregistered', "newToken": newToken}),
#                                 content_type="application/json")

@csrf_exempt
def check(request):
    user_id = request.POST.get('user_id')
    token_id = request.POST.get('token_id')
    invite_code = request.POST.get('invite_code')
    print invite_code
    print token_id
    newToken = ''
    if not checkToken(token_id):
        deleteToken(token_id)
        newToken = updateToken('create', None, None)
        print newToken
    if len(user_id) == 11:
        session = db.db_createSession()
        user = session.query(User).filter(User.user_id == user_id).all()
        if user:
            return HttpResponse(json.dumps({"result": 'registered', "newToken": newToken}),
                                content_type="application/json")
        else:
            invite = session.query(Invite).filter(Invite.user_id == user_id, Invite.invite_code == invite_code).all()
            if len(invite) == 1:
                return HttpResponse(json.dumps({"result": 'unregistered', "newToken": newToken}),
                                    content_type="application/json")
            else:
                return HttpResponse(json.dumps({"result": 'error', "newToken": newToken}),
                                    content_type="application/json")


# @csrf_exempt
# def register(request):
#     user_id = request.POST.get('user_id')
#     user_pwd = request.POST.get('user_pwd')
#     user_type = request.POST.get('user_type')
#     token_id = request.POST.get('token_id')
#
#     newToken = ''
#     session = db.db_createSession()
#     user = session.query(User).filter(User.user_id == user_id).all()
#     # 创建Query查询，filter是where条件，最后调用one()返回唯一行，如果调用all()则返回所有行:
#     if user:
#         print user[0].user_id
#         return HttpResponse(json.dumps([{"result": 'failed', }, ]) + '}',
#                             content_type="application/json")
#     else:
#         if len(user_id) == 11 and 6 <= len(user_pwd) <= 16:
#             user = User()
#             user.user_id = user_id
#             user.user_pwd = user_pwd
#             user.user_type = user_type
#             if checkToken(token_id):
#                 user.token_id = token_id
#             else:
#                 deleteToken(token_id)
#                 newToken = updateToken('create',None,None)
#                 user.token_id = newToken
#             now = datetime.datetime.now().date()
#             user.user_date = now
#             session.add(user)
#             session.commit()
#             session.close()
#             return HttpResponse(json.dumps({"result": 'succeed', "newToken": newToken}),
#                                 content_type="application/json")
#         else:
#             return HttpResponse(json.dumps({"result": 'failed', }),
#                                 content_type="application/json")
@csrf_exempt
def register(request):
    print 'a'
    user_id = request.POST.get('user_id')
    user_pwd = request.POST.get('user_pwd')
    user_type = request.POST.get('user_type')
    token_id = request.POST.get('token_id')
    print user_id, user_pwd, user_type, token_id
    newToken = ''
    session = db.db_createSession()
    user = session.query(User).filter(User.user_id == user_id).all()
    invite = session.query(Invite).filter(Invite.user_id == user_id).all()

    # 创建Query查询，filter是where条件，最后调用one()返回唯一行，如果调用all()则返回所有行:
    if user:
        print user[0].user_id
        return HttpResponse(json.dumps([{"result": 'failed', }, ]) + '}',
                            content_type="application/json")
    else:
        if len(user_id) == 11 and 6 <= len(user_pwd) <= 16:
            user = User()
            user.user_id = user_id
            user.user_pwd = user_pwd
            user.user_type = user_type

            if checkToken(token_id):
                user.token_id = token_id
            else:
                deleteToken(token_id)
                newToken = updateToken('create', None, None)
                user.token_id = newToken
            now = datetime.datetime.now().date()
            user.user_date = now
            print invite[0].user_email
            user.user_email = invite[0].user_email
            print 'a'
            session.add(user)
            print 'b'
            session.commit()
            print 'c'
            session.close()
            return HttpResponse(json.dumps({"result": 'succeed', "newToken": newToken}),
                                content_type="application/json")
        else:
            return HttpResponse(json.dumps({"result": 'failed', "newToken": newToken}),
                                content_type="application/json")


@csrf_exempt
def login(request):
    user_id = request.POST.get('user_id')
    user_pwd = request.POST.get('user_pwd')
    user_type = request.POST.get('user_type')
    token_id = request.POST.get('token_id')
    newToken = ''
    print user_id, user_pwd, user_type, token_id
    session = db.db_createSession()
    user = session.query(User).filter(User.user_id == user_id, User.user_type == user_type).all()
    print 'a'
    if user:
        print 'sdf'
        if user[0].user_pwd == user_pwd:
            print 'df'
            if checkToken(token_id):
                user[0].token_id = token_id
            else:
                print 'ab'
                deleteToken(token_id)
                print 'bc'
                newToken = updateToken('create', None, None)
                print 'sss'
                user[0].token_id = newToken
            print 'sdfdsf'
            session.add(user[0])
            session.commit()
            print 'ss'
            if user[0].user_name:
                if user[0].user_email:
                    print 'sdfd'
                    return HttpResponse('{"user":' + json.dumps({"user_name": user[0].user_name,
                                                                  "user_email": user[0].user_email})
                                        + ',"result":"succeed","newToken":"' + newToken + '"}',
                                        content_type="application/json")
                else:
                    return HttpResponse('{"user":' + json.dumps(
                        {"user_name": user[0].user_name,
                          "user_email": ''}) + ',"result":"succeed","newToken":"' + newToken + '"}',
                                        content_type="application/json")
            else:
                if user[0].user_email:
                    return HttpResponse('{"user":' + json.dumps(
                        {"user_name": '',
                          "user_email": user[0].user_email}) + ',"result":"succeed","newToken":"' + newToken + '"}',
                                        content_type="application/json")
                else:
                    return HttpResponse(
                        '{"user":' + json.dumps(
                            {"user_name": '', "user_email": ''}) + ',"result":"succeed","newToken":"' + newToken + '"}',
                        content_type="application/json")
        else:
            return HttpResponse('{"result":"failed","newToken":"' + newToken + '"}', content_type="application/json")
    else:
        return HttpResponse('{"result":"failed","newToken":"' + newToken + '"}', content_type="application/json")


@csrf_exempt
def changePwd(request):
    user_id = request.POST.get('user_id')
    new_pwd = request.POST.get('new_pwd')
    old_pwd = request.POST.get('old_pwd')
    user_type = request.POST.get('user_type')
    token_id = request.POST.get('token_id')
    print user_id,new_pwd,old_pwd,user_type,token_id
    newToken = ''
    session = db.db_createSession()
    user = session.query(User).filter(User.user_id == user_id, User.user_type == user_type,
                                      User.user_pwd == old_pwd, User.token_id == token_id).all()
    if user and 6 <= len(new_pwd) <= 16:
        if not checkToken(token_id):
            deleteToken(token_id)
            newToken = updateToken('create', None, None)
            user[0].token_id = newToken
        user[0].user_pwd = new_pwd
        session.add(user[0])
        session.commit()
        session.close()
        return HttpResponse(json.dumps({"result": 'succeed', "newToken": newToken}),
                            content_type="application/json")
    else:
        return HttpResponse(json.dumps({"result": 'failed', "newToken": newToken}),
                            content_type="application/json")


@csrf_exempt
def changeName(request):
    user_id = request.POST.get('user_id')
    user_name = request.POST.get('user_name')
    token_id = request.POST.get('token_id')
    print user_id,user_name,token_id
    newToken = ''
    session = db.db_createSession()
    user = session.query(User).filter(User.user_name == user_name, User.token_id == token_id).all()
    if not user and 6 <= len(user_name) <= 16:
        user = session.query(User).filter(User.user_id == user_id).one()
        user.user_name = user_name
        if not checkToken(token_id):
            deleteToken(token_id)
            newToken = updateToken('create', None, None)
            user.token_id = newToken

        session.add(user)
        session.commit()
        session.close()
        return HttpResponse(json.dumps({"result": 'succeed', "newToken": newToken}),
                            content_type="application/json")
    else:
        return HttpResponse(json.dumps({"result": 'failed', "newToken": newToken}),
                            content_type="application/json")


@csrf_exempt
def sendEmail(request):
    user_id = request.POST.get('user_id')
    user_email = request.POST.get('user_email')

    session = db.db_createSession()
    user = session.query(User).filter(User.user_email == user_email).all()
    session.close()
    if len(user) == 0:
        mailto_list = [user_email]
        mail_host = "smtp.163.com"
        mail_user = "pig0928@163.com"
        mail_pass = "zhutou"
        mail_postfix = "163.com"
        content = "Please click this url:" + "http://54.223.148.123:8090/user/checkEmail/?user_id=" + user_id + "&user_email=" + user_email + "&time=" + str(
            datetime.datetime.now())[:-7].replace(' ', 'T')
        me = mail_user + "<" + mail_user + "@" + mail_postfix + ">"
        msg = MIMEText(content, _charset='gbk')
        msg['Subject'] = "mark邮箱验证"
        msg['From'] = "pig0928@163.com"
        msg['To'] = ";".join(mailto_list)
        try:
            s = smtplib.SMTP()
            s.connect(mail_host)
            s.login(mail_user, mail_pass)
            s.sendmail(me, mailto_list, msg.as_string())
            s.close()
            return HttpResponse('{"result":"succeed"}', content_type="application/json")
        except Exception, e:
            return HttpResponse('{"result":"' + str(e) + '"}', content_type="application/json")
    else:
        return HttpResponse('{"result":"exist"}', content_type="application/json")


def checkEmail(request):
    user_id = request.GET.get('user_id')
    user_email = request.GET.get('user_email')
    time = request.GET.get('time')
    now = datetime.datetime.now()
    time = datetime.datetime.strptime(time, "%Y-%m-%dT%H:%M:%S")
    if time > now - datetime.timedelta(minutes=1000):
        session = db.db_createSession()
        user = session.query(User).filter(User.user_id == user_id).all()
        if len(user) == 1 and not user[0].user_email:
            user[0].user_email = user_email
            session.add(user[0])
            session.commit()
            session.close()
            print user_id
            print user_email
            return render_to_response('email-succeed.html', {"user_id": user_id, "user_email": user_email})
        else:
            return render_to_response('email-failed.html')
    else:
        return render_to_response('email-failed.html')


import Image, ImageDraw, ImageFont, random
import cStringIO, hashlib


# @csrf_exempt
def resIdCode(request):
    token_id = request.GET.get('token_id')
    im = Image.open('/usr/workspace/news/static/test.png')
    draw = ImageDraw.Draw(im)
    mp = hashlib.md5()
    mp.update(str(datetime.datetime.now()))
    mp_src = mp.hexdigest()
    rand_str = mp_src[0:4]
    draw.text((30, 0), rand_str[0],
              font=ImageFont.truetype("/usr/workspace/news/static/DejaVuSans-Bold.ttf",
                                      random.randrange(70, 110)))
    draw.text((78, 0), rand_str[1],
              font=ImageFont.truetype("/usr/workspace/news/static/DejaVuSans-Bold.ttf",
                                      random.randrange(70, 110)))
    draw.text((135, 0), rand_str[2],
              font=ImageFont.truetype("/usr/workspace/news/static/DejaVuSans-Bold.ttf",
                                      random.randrange(70, 110)))
    draw.text((185, 0), rand_str[3],
              font=ImageFont.truetype("/usr/workspace/news/static/DejaVuSans-Bold.ttf",
                                      random.randrange(70, 110)))
    del draw
    request.session['checkcode'] = rand_str
    buf = cStringIO.StringIO()
    im.save(buf, 'png')
    session = db.db_createSession()
    print token_id
    token = session.query(Token).filter(Token.token_id == token_id).all()
    if len(token) == 1:
        print rand_str
        token[0].code_id = rand_str
        session.add(token[0])
        session.commit()
        session.close()
    return HttpResponse(buf.getvalue(), 'image/png')


@csrf_exempt
def forgetSMS(request):
    user_id = request.POST.get('user_id')
    code_id = request.POST.get('code_id')
    token_id = request.POST.get('token_id')
    print user_id
    print code_id
    print token_id
    newToken = ''

    session = db.db_createSession()
    token = session.query(Token).filter(Token.token_id == token_id).all()
    if len(token) == 1:
        print 'a'
        if token[0].code_id == code_id:
            telcode=session.query(TelCode).filter(TelCode.user_id==user_id).all()
            if len(telcode)==0:
                print 'b'
                mp = hashlib.md5()
                mp.update(str(datetime.datetime.now()))
                mp_src = mp.hexdigest()
                telcode = mp_src[:10]
                newTelCode = TelCode()
                newTelCode.user_id = user_id
                newTelCode.tel_code = telcode
                session.add(newTelCode)
                session.commit()
            else:
                print 'c'
                telcode=telcode[0].tel_code
            if not checkToken(token_id):
                deleteToken(token_id)
                newToken = updateToken('create', None, None)
            return HttpResponse('{"result":"' + telcode + '","newToken":"' + newToken + '"}',
                                content_type="application/json")
        else:
            print 'c'
            token[0].code_id = None
            session.add(token[0])
            session.commit()
            session.close()
            if not checkToken(token_id):
                deleteToken(token_id)
                newToken = updateToken('create', None, None)
            return HttpResponse('{"result":"error","newToken":"' + newToken + '"}', content_type="application/json")
    else:
        print 'sd'
        newToken = updateToken('create', None, None)
        return HttpResponse('{"result":"error","newToken":"' + newToken + '"}', content_type="application/json")


def forgetPwd(request):
    tel_code = request.GET.get('tel_code')
    time = request.GET.get('time')
    print tel_code
    print time
    now = datetime.datetime.now()
    time = datetime.datetime.strptime(time, "%Y-%m-%dT%H:%M:%S")
    if time > now - datetime.timedelta(minutes=1000):
        session = db.db_createSession()
        telcode = session.query(TelCode).filter(TelCode.tel_code == tel_code).all()
        if len(telcode) == 1:
            user_id = telcode[0].user_id
            return render_to_response('resetPwd.html', {"user_id": user_id})
        else:
            return render_to_response('pwd-failed.html')
    else:
        return render_to_response('pwd-failed.html')


@csrf_exempt
def resetPwd(request):
    pwd_1 = request.POST.get('pwd_1')
    pwd_2 = request.POST.get('pwd_2')
    user_id = request.POST.get('user_id')
    print pwd_1
    print pwd_2
    print user_id
    if pwd_1 == pwd_2:
        if 6 <= len(pwd_1) <= 16 and 6 <= len(pwd_2) <= 16:
            session = db.db_createSession()
            user = session.query(User).filter(User.user_id == user_id).all()
            if len(user) == 1:
                user[0].user_pwd = pwd_1
                session.add(user[0])
                telcode = session.query(TelCode).filter(TelCode.user_id == user_id).all()
                session.delete(telcode)
                session.commit()
                session.close()
                return render_to_response('pwd-succeed.html', {"user_id": user_id})
            else:
                return render_to_response('pwd-failed.html')
        else:
            return render_to_response('resetPwd.html', {"user_id": user_id, "error": "密码长度应在6~16位之间"})
    else:
        return render_to_response('resetPwd.html', {"user_id": user_id, "error": "两次密码输入不一致，请重新输入！"})


def getInviteCode(request):
    user_id = request.GET.get('user_id')
    user_email = request.GET.get('user_email')
    print user_id
    print user_email
    if len(user_id) == 11 and user_email:
        session = db.db_createSession()
        invite = session.query(Invite).filter(Invite.user_id == user_id).all()
        if len(invite) == 1:
            if not invite[0].invite_code:
                chars = string.ascii_letters + string.digits
                inviteCode = ''.join([random.choice(chars) for i in range(11)])
                print inviteCode
                invite[0].invite_code = inviteCode
                invite[0].user_email = user_email
                session.add(invite[0])
                session.commit()
                session.close()
            elif invite[0].user_email == user_email:
                inviteCode = invite[0].invite_code
            else:
                response = HttpResponse(json.dumps('{"result":"invalid"}'))
                response.__setitem__("Content-type", "application/json")
                response.__setitem__("Access-Control-Allow-Origin", "*")
                return response

            response = HttpResponse(json.dumps('{"result":"' + inviteCode + '"}'))
            response.__setitem__("Content-type", "application/json")
            response.__setitem__("Access-Control-Allow-Origin", "*")
            return response
        else:

            response = HttpResponse(json.dumps('{"result":"invalid"}'))
            response.__setitem__("Content-type", "application/json")
            response.__setitem__("Access-Control-Allow-Origin", "*")
            return response

    else:
        response = HttpResponse(json.dumps('{"result":"invalid"}'))
        response.__setitem__("Content-type", "application/json")
        response.__setitem__("Access-Control-Allow-Origin", "*")
        return response

#
# def website(request):
#     print 'a'
#     return render_to_response('website.html',{"result":"invalid"})

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
        if checkBlog(session,blog_id):
            print 'sdfsdfewf---'
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
    with open('/usr/workspace/news/static/images/'+file_name,'wb+') as destination:
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


def checkBlog(session,blog_id):

    user = session.query(Blog).filter(Blog.blog_id == blog_id).all()
    if len(user)==0:
        print 'asssdfdsfdsfdsf'
        return True
    else:
        print 'sdfdsfewfsdfdsf'
        return False

def website(request):

    print 'a'
    return render_to_response("base.html",content_type="text/html")