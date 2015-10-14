#encoding: utf-8
import scrapy
import re
from scrapy.selector import Selector
from ScrapyNews.items import ScrapyNewsItem
from scrapy.contrib.linkextractors import LinkExtractor
from scrapy.contrib.spiders import CrawlSpider,Rule
import random
import cStringIO,urllib2,datetime
from PIL import Image
class ExampleSpider(CrawlSpider):
    name = "xwoo_gmw"
    allowed_domains = ["m.gmw.cn"]
    start_urls = ['http://m.gmw.cn/']
    rules=(
        Rule(LinkExtractor(allow=r"/\d{4}-\d{2}/\d{2}"),
        callback="parse_news",follow=True),
    )

    for i in range(1,5):
        start_urls.append('http://m.gmw.cn/node_32337_'+str(i)+'.htm')
        start_urls.append('http://m.gmw.cn/node_32338_'+str(i)+'.htm')

    def parse_news(self,response):
        item = ScrapyNewsItem()
        self.get_news_id(response,item)
        self.get_news_title(response,item)
        self.get_news_info(response,item)
        self.get_news_content(response,item)
        self.get_news_img(response,item)
        self.get_news_url(response,item)
        self.get_news_date(response,item)
        self.get_news_source(response,item)
        self.get_news_status(response,item)
        self.get_type_id(response,item)
        return item

    def get_news_id(self,response,item):
        item['news_id']='GM'+response.url[37:43]

    def get_news_title(self,response,item):
        news_title=response.xpath("//*[@id='articleTitle']/text()").extract()
        if news_title:
            item['news_title']=news_title[0][5:-2]

    def get_news_info(self,response,item):
        news_info=response.xpath("//*[@id='contentMain']/p/descendant::text()").extract()
        if news_info:
            item['news_info']=news_info

    def get_news_content(self,response,item):
        item['news_content']=response.url

    def get_news_img(self,response,item):
        news_img=response.xpath("//*[@id='contentMain']/descendant::img/@src").extract()

        if news_img:
            result='{'
            count=0
            for img in news_img:
                file=urllib2.urlopen(img)
                tmpIm=cStringIO.StringIO(file.read())
                im=Image.open(tmpIm)
                if im.size[0]>=400 and im.size[1]>=400:
                    result+=img+','
                    count+=1
                if count==3:
                    result=result[:-1]+'}'
                    item['news_img']=result
                    break
                if img==news_img[len(news_img)-1] and count!=0:
                    result=result[:-1]+'}'
                    item['news_img']=result
                    break

    def get_news_date(self,response,item):
        news_date=response.xpath("//*[@id='pubTime']/text()").extract()
        if news_date:
            newsdate=datetime.datetime.strptime(str(news_date[0]),"%Y-%m-%d %H:%M")
            today=datetime.datetime.today()
            daterange=today-datetime.timedelta(days=30)

            if newsdate>daterange:
                rd= random.uniform(10.0001,60)
                item['news_date']=news_date[0]+':'+str(rd)[:7]

    def get_news_source(self,response,item):
        item['news_source']='光明网'

    def get_news_status(self,response,item):
        item['news_status']=0

    def get_type_id(self,response,item):
        item['type_id']='XWOO'

    def get_news_url(self,response,item):

        item['news_url']=response.url