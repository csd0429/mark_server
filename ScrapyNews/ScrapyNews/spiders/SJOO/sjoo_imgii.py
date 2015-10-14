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
    name = "sjoo_imgii"
    allowed_domains = ["www.imgii.com"]
    start_urls = ['http://www.imgii.com/',]
    rules=(
        Rule(LinkExtractor(allow=r"/archives/\d{5}"),
        callback="parse_news",follow=True),
    )
    for i in range(1,48):
        start_urls.append('http://www.imgii.com/archives/category/news/page/'+str(i))
    for i in range(1,24):
        start_urls.append('http://www.imgii.com/archives/category/tips/page/'+str(i))
    for i in range(1,153):
        start_urls.append('http://www.imgii.com/archives/category/photography/page/'+str(i))

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
        item['news_id']='II0'+response.url[-5:]

    def get_news_title(self,response,item):
        news_title=response.xpath("//*[@id='post-"+response.url[-5:]+"']/h1/text()").extract()
        if news_title:
            item['news_title']=news_title[0]

    def get_news_info(self,response,item):
        news_info=response.xpath("//*[@id='post-"+response.url[-5:]+"']/div[2]/p/descendant::text()").extract()
        if news_info:
            item['news_info']=news_info

    def get_news_content(self,response,item):
        item['news_content']=response.url

    def get_news_img(self,response,item):
        news_img=response.xpath("//*[@id='post-"+response.url[-5:]+"']/div[2]/p/descendant::img/@src").extract()
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
        now=datetime.datetime.now()
        item['news_date']=str(now)[:-2]

    def get_news_source(self,response,item):
        item['news_source']='imgii'

    def get_news_status(self,response,item):
        item['news_status']=0

    def get_type_id(self,response,item):
        item['type_id']='SJOO'

    def get_news_url(self,response,item):

        item['news_url']=response.url