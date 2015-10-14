# -*- coding: utf-8 -*-

# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: http://doc.scrapy.org/en/latest/topics/item-pipeline.html
import settings
from sqlalchemy.orm import sessionmaker
from models import News, db_connect,create_deals_table

class ScrapyNewsPipeline(object):
    # def process_item(self, item, spider):
    #     return item



    def __init__(self):                            #初始化连接mysql的数据库相关信息
        engine=db_connect()
        create_deals_table(engine)
        self.Session=sessionmaker(bind=engine)


    # pipeline dafault function                    #这个函数是pipeline默认调用的函数
    def process_item(self, item, spider):
        session=self.Session()
        deal=News(**item)
        try:
            session.add(deal)
            session.commit()
        except:
            session.rollback()
            raise
        finally:
            session.close()
        return item