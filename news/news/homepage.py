#encoding:utf-8

from django.http import HttpResponse
import json
from sqlalchemy import Column, String
from sqlalchemy import desc
from resNews import News
from sqlalchemy.ext.declarative import declarative_base
from download import Image
import db
import random,string
import datetime
from django.views.decorators.csrf import csrf_exempt
from token import *

Base = declarative_base()

class Send(Base):
    # 表的名字:
    __tablename__ = 'app_send'
    
    # 表的结构:
    id = Column('id',String,primary_key=True)
    send_user_id = Column('send_user_id',String,nullable=True)
    send_type_id = Column('send_type_id',String,nullable=True)
    send_latest = Column('send_latest',String,nullable=True)
    send_oldest = Column('send_oldest',String,nullable=True)

class Token(Base):
    
    __tablename__ = 'app_token'
    
    token_id=Column('token_id',String,primary_key=True)
    token_time=Column('token_time',String,nullable=False)
    code_id=Column('code_id',String,nullable=True)


@csrf_exempt
def init(request):
    
    type_id=request.POST.get('type_id')
    user_id=request.POST.get('user_id')
    count=request.POST.get('count')
    token_id=request.POST.get('token_id')
    print type_id,user_id,count,token_id
    if checkUserToken(user_id,token_id):
        print 'a'
        newToken=''
        if not checkToken(token_id):
            print 'sb'
            deleteToken(token_id)
            newToken=updateToken('create',None,None)
            updateToken('instead',user_id,newToken)
            print 'd'
        session=db.db_createSession()
        # 创建Query查询，filter是where条件，最后调用one()返回唯一行，如果调用all()则返回所有行:
        num=0
        results=[]
        send=session.query(Send).filter(Send.send_user_id==user_id,Send.send_type_id==type_id).all()
        print 'ss'
        if len(send)==0:
            send=Send()
            send.send_user_id=user_id
            send.send_type_id=type_id
        else:
            print 's'
            send=send[0]
    #    newses = session.query(News).filter(News.news_status=='3', News.type_id==type_id).order_by(desc(News.news_date)).all()
    #    newses = session.query(News).filter(News.news_status=='3').order_by(desc(News.news_date)).all()
        newses = session.query(News).filter(News.news_status=='3').order_by(desc(News.news_date)).all()

        for news in newses:
            if type_id in news.type_id.split(','):
                if num==0:
                    send.send_latest=news.news_date

                image=session.query(Image).filter(Image.news_id==news.news_id).one()
                if type_id=='RDOO':
                    result=[
                            {
                            "news_id":news.news_id,
                            "news_title":news.news_title,
                            "news_info":news.news_info,
                            "news_content":news.news_content,
                            "news_img":"http://54.223.148.123:8090/static/images/"+image.news_cover,
                            "type_id":news.type_id[:4],
                            },
                            ]
                else:
                    result=[
                            {
                            "news_id":news.news_id,
                            "news_title":news.news_title,
                            "news_info":news.news_info,
                            "news_content":news.news_content,
                            "news_img":"http://54.223.148.123:8090/static/images/"+image.news_cover,
                            },
                            ]
                results+=result
                num+=1
                if num==int(count) and int(count)<len(newses):
                    send.send_oldest=news.news_date
                    break

                if num==len(newses) and int(count)>=len(newses):
                    send.send_oldest=news.news_date
                    break

        session.add(send)
        session.commit()
        session.close()

        status='succeed'
        return HttpResponse('{"news":'+json.dumps(results)+',"result":"'+status+'","newToken":"'+newToken+'"}', content_type="application/json")

@csrf_exempt
def delete(request):
    
    type_id=request.POST.get('type_id')
    user_id=request.POST.get('user_id')
    token_id=request.POST.get('token_id')
    if checkUserToken(user_id,token_id):
        newToken=''
        if not checkToken(token_id):
            deleteToken(token_id)
            newToken=updateToken('create',None,None)
            updateToken('instead',user_id,newToken)


        session=db.db_createSession()
        # 创建Query查询，filter是where条件，最后调用one()返回唯一行，如果调用all()则返回所有行:
        send=session.query(Send).filter(Send.send_user_id==user_id,Send.send_type_id==type_id)
        if send:
            send.delete()
            session.commit()
            session.close()
            return HttpResponse('{"result":"succeed","newToken":"'+newToken+'"}', content_type="application/json")
        else:
            return HttpResponse('{"result":"failed","newToken":"'+newToken+'"}', content_type="application/json")


@csrf_exempt
def fresh(request):
    
    type_id=request.POST.get('type_id')
    user_id=request.POST.get('user_id')
    token_id=request.POST.get('token_id')
    if checkUserToken(user_id,token_id):
        newToken=''
        if not checkToken(token_id):
            deleteToken(token_id)
            newToken=updateToken('create',None,None)
            updateToken('instead',user_id,newToken)
        session=db.db_createSession()
        # 创建Query查询，filter是where条件，最后调用one()返回唯一行，如果调用all()则返回所有行:
        sends=session.query(Send).filter(Send.send_user_id==user_id,Send.send_type_id==type_id).one()
        num=0
        results=[]
        newses = session.query(News).filter(News.news_status=='3', News.type_id==type_id,News.news_date>sends.send_latest).order_by(desc(News.news_date)).all()

        if 0<len(newses):
            status='get'
            for news in newses:
                if num==0:
                    sends.send_latest=news.news_date
                image=session.query(Image).filter(Image.news_id==news.news_id).one()
                result=[
                        {
                        "news_id":news.news_id,
                        "news_title":news.news_title,
                        "news_info":news.news_info,
                        "news_content":news.news_content,
                        "news_img":"http://54.223.148.123:8090/static/images/"+image.news_cover,
                        },
                        ]
                results+=result
                num+=1
                session.add(sends)
                session.commit()

        else:
            status='none'
        session.close()
        # results=results+[{"status":status}]
        return HttpResponse('{"news":'+json.dumps(results)+',"status":"'+status+'","newToken":"'+newToken+'"}', content_type="application/json")

@csrf_exempt
def loading(request):
    type_id=request.POST.get('type_id')
    user_id=request.POST.get('user_id')
    count=request.POST.get('count')
    token_id=request.POST.get('token_id')
    print type_id,user_id,count,token_id
    if checkUserToken(user_id,token_id):
        newToken=''
        if not checkToken(token_id):
            deleteToken(token_id)
            newToken=updateToken('create',None,None)
            updateToken('instead',user_id,newToken)
        session=db.db_createSession()
        # 创建Query查询，filter是where条件，最后调用one()返回唯一行，如果调用all()则返回所有行:
        num=0
        results=[]
        sends=session.query(Send).filter(Send.send_user_id==user_id,Send.send_type_id==type_id).one()
        newses = session.query(News).filter(News.news_status=='3', News.type_id==type_id , News.news_date<sends.send_oldest).order_by(desc(News.news_date)).all()
        if len(newses)>=int(count):
            print 'a'
            for news in newses:

                image=session.query(Image).filter(Image.news_id==news.news_id).one()
                result=[
                        {
                        "news_id":news.news_id,
                        "news_title":news.news_title,
                        "news_info":news.news_info,
                        "news_content":news.news_content,
                        "news_img":"http://54.223.148.123:8090/static/images/"+image.news_cover,
                        },
                        ]
                results+=result
                num+=1
                if num==int(count):
                    sends.send_oldest=news.news_date
                    break
        elif 0<len(newses)<int(count):
            print 'b'
            for news in newses:
                image=session.query(Image).filter(Image.news_id==news.news_id).one()
                result=[
                        {
                        "news_id":news.news_id,
                        "news_title":news.news_title,
                        "news_info":news.news_info,
                        "news_content":news.news_content,
                        "news_img":"http://54.223.148.123:8090/static/images/"+image.news_cover,
                        },
                        ]
                results+=result
                num+=1
                if num==len(newses):
                    sends.send_oldest=news.news_date
                    break

        session.merge(sends)
        session.commit()
        session.close()

        return HttpResponse('{"news":'+json.dumps(results)+',"newToken":"'+newToken+'"}', content_type="application/json")


