#encoding:utf8

from django.http import HttpResponse
from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine, Column, Integer, String
import json

from sqlalchemy.orm import mapper
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.engine.url import URL
import settings
from download import Image
Base = declarative_base()
import db

class News(Base):
    # 表的名字:
    __tablename__ = 'app_news'

    # 表的结构:
    news_id = Column(Integer,primary_key=True)
    news_title = Column('news_title',String,nullable=True)
    news_info = Column('news_info',String,nullable=True)
    news_content = Column('news_content',String,nullable=True)
    news_img = Column('news_img',String,nullable=True)
    # news_img_cover = Column('news_img_cover',String,nullable=True)
    news_date = Column('news_date',String,nullable=True)
    news_source = Column('news_source',String,nullable=True)
    news_status = Column('news_status',String,nullable=True)
    news_url = Column('news_url',String,nullable=True)
    type_id = Column('type_id',String,nullable=True)



def headinfo(request):

    type_id=request.GET.get('type_id')

    session=db.db_createSession()
    
    # 创建Query查询，filter是where条件，最后调用one()返回唯一行，如果调用all()则返回所有行:
    newses = session.query(News).filter(News.news_status=='3').all()
    results=[]
    for news in newses:
    # 打印类型和对象的name属性:
        if type_id in news.type_id.split(','):
            image=session.query(Image).filter(Image.news_id==news.news_id).one()
            result=[
                    {"news_id":news.news_id,
                    "news_title":news.news_title,
                    "news_info":news.news_info,
                    "news_content":news.news_content,
                    "news_img":"http://54.223.148.123:8090/static/images/"+image.news_cover,
                    "type_id":type_id,
                    },
                    ]
            print result
            results+=result
    # 关闭Session:

    session.close()
    response=HttpResponse('{"news":'+json.dumps(results)+'}', content_type="application/json")
    response.__setitem__("Access-Control-Allow-Origin","*")
    return response



