#encoding:utf8

from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.engine.url import URL
import settings
def db_createSession():
    DeclarativeBase=declarative_base()
    engine=create_engine(URL(**settings.DATABASES1),client_encoding='utf-8')
    DeclarativeBase.metadata.create_all(engine)
    DBSession=sessionmaker(bind=engine)
    session=DBSession()
    return session


