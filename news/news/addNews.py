#encoding:utf8

from django.http import HttpResponse
from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine, Column, Integer, String
import json
from django.views.decorators.csrf import csrf_exempt
from sqlalchemy.orm import mapper
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.engine.url import URL
import settings
from download import Image
Base = declarative_base()
import db,urllib

class News(Base):
    # 表的名字:
    __tablename__ = 'app_news'
    
    # 表的结构:
    news_id = Column(Integer,primary_key=True)
    news_title = Column('news_title',String,nullable=True)
    news_info = Column('news_info',String,nullable=True)
    news_content = Column('news_content',String,nullable=True)
    news_img = Column('news_img',String,nullable=True)
    news_date = Column('news_date',String,nullable=True)
    news_source = Column('news_source',String,nullable=True)
    news_status = Column('news_status',String,nullable=True)
    news_url = Column('news_url',String,nullable=True)
    type_id = Column('type_id',String,nullable=True)



def addNews(request):
    news_id=request.GET.get('news_id')
    news_title=urllib.unquote(request.GET.get('news_title'))
    news_info=urllib.unquote(request.GET.get('news_info'))
    news_img=request.GET.get('news_img')
    news_date=request.GET.get('news_date')
    news_source=urllib.unquote(request.GET.get('news_source'))
    news_url=request.GET.get('news_url')
    type_id=request.GET.get('type_id')
    session=db.db_createSession()
    
    news = session.query(News).filter(News.news_id==news_id).all()
    if len(news)==0 and len(news_id)==8:
        
        newNews=News()
        newNews.news_id=news_id
        newNews.news_title=news_title
        newNews.news_info=news_info
        newNews.news_content=news_url
        newNews.news_img='{'+news_img+'}'
        newNews.news_date=news_date
        newNews.news_source=news_source
        newNews.news_url=news_url
        newNews.news_status=0
        newNews.type_id=type_id
        session.add(newNews)
        session.commit()
        session.close()
        response=HttpResponse('succeed')
        response.__setitem__('Access-Control-Allow-Origin','http://54.223.148.123:8070')
        return response
    else:
        response=HttpResponse('failed')
        response.__setitem__('Access-Control-Allow-Origin','http://54.223.148.123:8070')
        return response
