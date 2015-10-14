#encoding: utf-8
import scrapy
import re
from scrapy.selector import Selector
from ScrapyNews.items import ScrapyNewsItem
from scrapy.contrib.linkextractors import LinkExtractor
from scrapy.contrib.spiders import CrawlSpider,Rule
import psycopg2
class ExampleSpider(CrawlSpider):
    name = "wxNews"
    start_urls=[]
    pgdb_conn = psycopg2.connect(database = 'postgres',user = 'Csd', password = '123456', host = 'localhost')
    pg_cursor = pgdb_conn.cursor()
    pg_cursor1 = pgdb_conn.cursor()
    sql_desc = "select * from urls_reptile where url_type='科技' and url_status='0'"

    pg_cursor.execute(sql_desc)
    for row in pg_cursor:

       start_urls.append(row[0])
       sql_desc1= "update urls_reptile set url_status = '1' where url_urls ='"+row[0]+"'"
       print sql_desc1
       pg_cursor1.execute(sql_desc1)
       pgdb_conn.commit()

    pg_cursor.close()
    pg_cursor1.close()
    pgdb_conn.close()

    # start_urls = ['http://mp.weixin.qq.com/']

    rules=(
        # Rule(LinkExtractor(allow=r"/s\?__biz=\w+==&mid=\d+&idx=\d&sn=\w+&3rd=\w+==&scene=\d+"),
        Rule(LinkExtractor(allow=r""),
        callback="parse_news",follow=False),
    )
    def printcn(uni):
        for i in uni:
            print uni.encode('utf-8')


    def parse_news(self,response):

        item = ScrapyNewsItem()
        self.get_news_id(response,item)
        self.get_news_title(response,item)
        self.get_news_info(response,item)
        self.get_news_content(response,item)
        self.get_news_img(response,item)
        self.get_news_date(response,item)
        self.get_news_source(response,item)
        self.get_news_status(response,item)
        self.get_type_id(response,item)
        self.get_news_url(response,item)

        print(item['news_title'])

        return item

    def get_news_id(self,response,item):
        news_id=response.url
        if news_id:
            # item['news_id']=response.url.strip().split('/')[-1][:5]
            item['news_id']='WX'+news_id[-6:]
        else:
            item['news_id']=0
    def get_news_title(self,response,item):
        news_title=response.xpath("//*[@id='activity-name']/text()").extract()
        if news_title:
            item['news_title']=news_title[0]

    def get_news_info(self,response,item):
        news_info=response.xpath("//*[@id='js_content']/descendant::text()").extract()
        if news_info:
            item['news_info']=news_info
        else:
            item['news_info']='我是概要'

    def get_news_content(self,response,item):
        news_content=response.xpath("//*[@id='js_content']/p/descendant::text()").extract()
        if news_content:
            item['news_content']=news_content
        else:
            item['news_content']='我是内容'

    def get_news_img(self,response,item):
        news_img=response.xpath("//*[@id='js_content']/descendant::img/@data-src").extract()
        if news_img:
            item['news_img']=news_img
        else:
            item['news_img']='nd'

    def get_news_date(self,response,item):
        news_date=response.xpath("//*[@id='post-date']/text()").extract()
        if news_date:
            item['news_date']=news_date[0]
        else:
            item['news_date']=0

    def get_news_source(self,response,item):
        news_source=response.xpath("//*[@id='endText']/div[2]/span/text()").extract()
        item['news_source']='微信'
    def get_news_status(self,response,item):
        news_status=response.url
        item['news_status']=0
    def get_type_id(self,response,item):
        type_id=response.xpath("//*[@id='J_Article_Wrap']/div[1]/p/a/text()").extract()
        if type_id:
            item['type_id']=type_id
        else:
            item['type_id']=0

    def get_news_url(self,response,item):

        item['news_url']=response.url