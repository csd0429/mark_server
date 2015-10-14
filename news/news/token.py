#encoding:utf-8

from django.http import HttpResponse
from sqlalchemy import Column, String
from sqlalchemy.ext.declarative import declarative_base
import db
import random,string
import datetime

Base = declarative_base()



class User(Base):
    # 表的名字:
    __tablename__ = 'app_user'
    
    # 表的结构:
    user_id = Column(String,primary_key=True)
    user_pwd = Column('user_pwd',String,nullable=True)
    user_date = Column('user_date',String,nullable=True)
    user_type = Column('user_type',String,nullable=True)
    user_name = Column('user_name',String,nullable=True)
    user_email = Column('user_email',String,nullable=True)
    token_id=Column('token_id',String,nullable=True)



class Token(Base):
    
    __tablename__ = 'app_token'
    
    token_id=Column('token_id',String,primary_key=True)
    token_time=Column('token_time',String,nullable=False)
    code_id=Column('code_id',String,nullable=True)

def getToken(request):
    # user_id=request.GET.get('user_id')
    # print user_id
    session=db.db_createSession()
    # now=datetime.datetime.now()
    # tokens=session.query(Token).all()
    # if len(tokens)>0:
    #     for token in tokens:
    #         if datetime.datetime.strptime(token.token_time,"%Y-%m-%d %H:%M:%S")<now:
    #             session.delete(token)
    #             session.commit()
    chars=string.ascii_letters+string.digits
    token_rand=''.join([random.choice(chars) for i in range(8)])
    time=datetime.datetime.now()+datetime.timedelta(hours=1)
    newtoken=Token()
    newtoken.token_id=token_rand
    newtoken.token_time=str(time)[:19]
    session.add(newtoken)

    # if len(user_id)>0:
    #     user=session.query(User).filter(User.user_id==user_id).all()
    #     if len(user)==1:
    #         user[0].token_id=token_rand
    #         session.add(user[0])
    session.commit()
    session.close()
    # return HttpResponse('{"token":"'+token_rand+'","time":"'+str(time)[:19]+'"}', content_type="application/json")
    return HttpResponse('{"token_id":"'+token_rand+'"}', content_type="application/json")

def checkToken(token_id):
    session=db.db_createSession()
    token=session.query(Token).filter(Token.token_id==token_id).all()
    now=datetime.datetime.now()
    print 'check a'
    if len(token)==1:
        print 'check b'
        if datetime.datetime.strptime(token[0].token_time,"%Y-%m-%d %H:%M:%S")>now:
            print 'check aaa'
            return True
        else:
            print 'check ada'
            return False
    else:
        print 'check aqa'
        return False

def updateToken(type,user_id,token_id):
    if type=='create':
        session=db.db_createSession()
        chars=string.ascii_letters+string.digits
        token_rand=''.join([random.choice(chars) for i in range(8)])
        time=datetime.datetime.now()+datetime.timedelta(hours=1)
        newtoken=Token()
        newtoken.token_id=token_rand
        newtoken.token_time=str(time)[:19]
        session.add(newtoken)
        session.commit()
        session.close()
        return token_rand
    if type=='instead':
        session=db.db_createSession()
        user=session.query(User).filter(User.user_id==user_id).all()
        if len(user)==1:
            user[0].token_id=token_id
            session.add(user[0])
            session.commit()
            session.close()


def deleteToken(token_id):
    session=db.db_createSession()
    token=session.query(Token).filter(Token.token_id==token_id).all()
    session.delete(token[0])
    session.commit()
    session.close()


def checkUserToken(user_id,token_id):
    session=db.db_createSession()
    token=session.query(User).filter(User.user_id==user_id,User.token_id==token_id).all()
    if len(token)==1:
        return True
    else:
        return False