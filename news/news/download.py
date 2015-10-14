#encoding:utf8

from django.http import HttpResponse
from sqlalchemy import Column, String
import json
from sqlalchemy.ext.declarative import declarative_base
import os,urllib
import db




Base = declarative_base()

class Image(Base):
    # 表的名字:
    __tablename__ = 'app_image'

    # 表的结构:
    # image_id = Column(String,primary_key=True)
    news_id = Column(String,primary_key=True)
    news_cover = Column('news_cover',String)
    news_img = Column('news_img',String)


def setCover(request):
    print 'a'
    news_id=request.GET.get('news_id')
    image_id=request.GET.get('image_id')
    news_img=request.GET.get('news_img')
    print 'news_id:'+news_id
    print 'image_id:'+image_id
    print 'news_img:'+news_img
    file_name=news_id+'_'+image_id+'.'+news_img.split('.').pop().lower()
    # file_name=news_id+'_'+image_id+'.jpg'
    print 'here:'+file_name
    # 创建Session:
    session=db.db_createSession()

    # 创建Query查询，filter是where条件，最后调用one()返回唯一行，如果调用all()则返回所有行:
    img = session.query(Image).filter(Image.news_id==news_id).all()
    if img:
        img[0].news_cover=file_name
        session.add(img[0])
        session.commit()
        session.close()
    else:
        img=Image()
        img.news_id=news_id
        img.news_cover=file_name
        session.add(img)
        session.commit()
        session.close()
    response = HttpResponse(file_name)
    response.__setitem__("Access-Control-Allow-Origin", "*")

    return response


def addImg(request):
    news_id=request.GET.get('news_id')
    image_id=request.GET.get('image_id')
    news_img=request.GET.get('news_img')
    print 'news_id:'+news_id
    print 'image_id:'+image_id
    print 'news_img:'+news_img

    path=r'/usr/workspace/news/static/images/'
    file_name=news_id+'_'+image_id+'.'+news_img.split('.').pop().lower()
    # file_name=news_id+'_'+image_id+'.jpg'
    print file_name

    dest_dir=os.path.join(path,file_name)

    url=news_img
    try:
        urllib.urlretrieve(url,dest_dir)
    except:
        print '\tError retrieving the URL:',dest_dir

    # 创建Session:
    session=db.db_createSession()

    # 创建Query查询，filter是where条件，最后调用one()返回唯一行，如果调用all()则返回所有行:
    img = session.query(Image).filter(Image.news_id==news_id).all()
    if img:
        if img[0].news_img:
            imgs = img[0].news_img[1:-1].split(',')
        else:
            imgs =[]
        file_name=news_id+'_'+image_id+'.'+news_img.split('.').pop().lower()
        # file_name=news_id+'_'+image_id+'.jpg'
        # if imgs:
        imgs.append(file_name)
        img[0].news_img=imgs
        # else:
        session.add(img[0])
        session.commit()
        session.close()

        # return HttpResponse("192.168.1.104:8080/static/images/"+file_name)
    else:
        img=Image()
        img.image_id=news_id
        img.news_img=[file_name]
        session.add(img)
        session.commit()
        session.close()

    resJSON='{"newUrl":"http://54.223.148.123:8090/static/images/'+file_name+'","image_id":"'+image_id+'"}'
    # response = HttpResponse("http://192.168.1.104:8080/static/images/"+file_name)
    response = HttpResponse(json.dumps(resJSON))
    response.__setitem__("Content-type", "application/json")
    response.__setitem__("Access-Control-Allow-Origin", "*")

    return response


def showCover(request):
    news_id=request.GET.get('news_id')
    print 'news_id:'+news_id
    # 创建Session:
    session=db.db_createSession()
    
    # 创建Query查询，filter是where条件，最后调用one()返回唯一行，如果调用all()则返回所有行:
    img = session.query(Image).filter(Image.news_id==news_id).one()
    if img:
        resJSON='{"cover":"http://54.223.148.123:8090/static/images/'+img.news_cover+'"}'
    else:
        resJSON='{"cover":"none"}'
    
    response = HttpResponse(json.dumps(resJSON))
    response.__setitem__("Content-type", "application/json")
    response.__setitem__("Access-Control-Allow-Origin", "*")
    session.close()
    return response

def deleteCover(request):
    news_id=request.GET.get('news_id')
    print 'news_id:'+news_id
    # 创建Session:
    session=db.db_createSession()
    
    # 创建Query查询，filter是where条件，最后调用one()返回唯一行，如果调用all()则返回所有行:
    img = session.query(Image).filter(Image.news_id==news_id).one()
    if img:
        rm='/usr/workspace/news/static/images/'+img.news_cover
        os.remove(rm)
        imgs = img.news_img[1:-1].split(',')
        imgs.remove(img.news_cover)
        img.news_img=imgs
        img.news_cover=''
        session.add(img)
        session.commit()
        session.close()
        resJSON='{"result":"succeed"}'
    else:
        resJSON='{"result":"failed"}'
    
    response = HttpResponse(json.dumps(resJSON))
    response.__setitem__("Content-type", "application/json")
    response.__setitem__("Access-Control-Allow-Origin", "*")

    return response



