from sqlalchemy import create_engine, Column, Integer, String
# from sqlalchemy.dialects.postgresql import JSON
from sqlalchemy.orm import mapper
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.engine.url import URL
# from JSONUnicode import JSONUnicode
import settings


DeclarativeBase=declarative_base()

def db_connect():
    return create_engine(URL(**settings.DATABASES),client_encoding='utf-8')

def create_deals_table(engine):
    DeclarativeBase.metadata.create_all(engine)

class News(DeclarativeBase):

    __tablename__="app_news"

    news_id = Column(String,primary_key=True)
    news_title = Column('news_title',String,nullable=True)
    news_info = Column('news_info',String,nullable=True)
    news_content = Column('news_content',String,nullable=True)
    news_img = Column('news_img',String,nullable=True)
    news_date = Column('news_date',String,nullable=True)
    news_source = Column('news_source',String,nullable=True)
    news_url = Column('news_url',String,nullable=True)
    news_status = Column('news_status',String,nullable=True)
    type_id = Column('type_id',String,nullable=True)
