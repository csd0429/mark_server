#encoding:utf-8

from sqlalchemy.ext.declarative import declarative_base
import os,time
from PIL import Image
from django.views.decorators.csrf import csrf_exempt
import db
from news.download import Image as Image_



Base = declarative_base()


@csrf_exempt
def upload(request):
    file=request.FILES['Filedata']
    
    session=db.db_createSession()
    
    # 创建Query查询，filter是where条件，最后调用one()返回唯一行，如果调用all()则返回所有行:
    img = session.query(Image_).filter(Image_.news_id==file.name[:-6]).all()
    if img:
        img[0].news_cover=file.name
        session.add(img[0])
        session.commit()
        session.close()
    
    ext_allowed=['gif','jpg','jpeg','png']
    max_size=2621440
    save_dir='/usr/workspace/news/static/images/'
    save_path=save_dir
    if not file.name:
        print '文件不存在！'
    ext=file.name.split('.').pop()
    print file.name
    if ext not in ext_allowed:
        print '不是所要求的图片格式！'
    if file.size>max_size:
        print '文件太大！'
    if not os.path.isdir(save_path):
        os.makedirs(save_path)
        new_file='%s.%s'%(int(time.time()),ext)
    t=save_path+str(file)
    # k=t[-46:]
    im=Image.open(file)
    # im.thumbnail((132,132))
    im.save(t)
    print 'save ok!'


    from boto.s3.connection import S3Connection,OrdinaryCallingFormat,Location
    from boto.s3.key import Key

    from filechunkio import FileChunkIO
    print 'a'
    conn=S3Connection('AKIAPAH5ZK4LC32GKVKA','TR3unyBnwuv577UYYPXGOXGkcY7OEFSsBuwpjFlx')
    print 'b'
    print conn.bucket_class

    bucket=conn.get_bucket('markbucket')
    print bucket
    print bucket.get_all_keys()
    k=Key(bucket,'a1')
    print 'a'
    k.set_contents_from_filename('/usr/workspace/news/static/images/'+file.name)
    print 'b'