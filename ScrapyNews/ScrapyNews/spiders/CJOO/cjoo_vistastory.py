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
    name = "cjoo_vistastory"
    allowed_domains = ["vistastory.com"]
    start_urls = ['http://www.vistastory.com/caijing/index.html',]
    rules=(
        Rule(LinkExtractor(allow=r"/a/\d{6}/\d{5}.html"),
        callback="parse_news",follow=True),
    )

    for i in range(1,5):
        start_urls.append('http://www.vistastory.com/caijing/list_14_'+str(i)+'.html')


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
        item['news_id']='VTS'+response.url[-10:-5]

    def get_news_title(self,response,item):
        news_title=response.xpath("/html/body/div[2]/div[2]/div[1]/h1/text()").extract()
        print news_title
        if news_title:
            item['news_title']=news_title[0]

    def get_news_info(self,response,item):

        news_info=response.xpath("/html/body/div[2]/div[2]/div[2]/p/descendant::text()").extract()
        if news_info:
            item['news_info']=news_info

    def get_news_content(self,response,item):
        item['news_content']=response.url

    def get_news_img(self,response,item):
        news_img=response.xpath("/html/body/div[2]/div[2]/div[2]/p/descendant::img/@src").extract()

        if news_img:
            result='{'
            count=0
            for img in news_img:
                file=urllib2.urlopen('http://www.vistastory.com'+img)
                tmpIm=cStringIO.StringIO(file.read())
                im=Image.open(tmpIm)
                if im.size[0]>=400 and im.size[1]>=400:
                    result+='http://www.vistastory.com'+img+','
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
        news_date=response.xpath("/html/body/div[2]/div[2]/div[1]/div/span[1]/text()").extract()
        if news_date:
            newsdate=datetime.datetime.strptime(str(news_date[0]),"%Y-%m-%d %H:%M")
            today=datetime.datetime.today()
            daterange=today-datetime.timedelta(days=30)

            if newsdate>daterange:
                rd= random.uniform(10.0001,60)
                item['news_date']=news_date[0]+':'+str(rd)[:7]

    def get_news_source(self,response,item):
        item['news_source']='看天下'

    def get_news_status(self,response,item):
        item['news_status']=0

    def get_type_id(self,response,item):
        item['type_id']='CJOO'

    def get_news_url(self,response,item):

        item['news_url']=response.url