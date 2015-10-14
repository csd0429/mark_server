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
    name = "gxoo_chopread"
    allowed_domains = ["www.chopread.com"]
    start_urls = ['http://www.chopread.com/topics/life/funny/',]
    rules=(
        Rule(LinkExtractor(allow=r"/*"),
        callback="parse_news",follow=True),
    )

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

        item['news_id']='CR'+response.url[-7:-1]

    def get_news_title(self,response,item):
        news_title=response.xpath("/html/body/div[1]/div[2]/div[1]/div/section[1]/div/h1/text()").extract()
        if news_title:
            item['news_title']=news_title[0]

    def get_news_info(self,response,item):

        news_info=response.xpath("/html/body/div[1]/div[2]/div[1]/div/section[2]/div/p/descendant::text()").extract()
        if news_info:
            item['news_info']=news_info

    def get_news_content(self,response,item):
        item['news_content']=response.url

    def get_news_img(self,response,item):
        news_img=response.xpath("//*[@id='gallery-1']/div/descendant::img/@src").extract()
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
        news_date=response.xpath("/html/body/div[1]/div[2]/div[1]/div/section[1]/div/div/span[1]/text()").extract()
        if news_date:
            year=news_date[0][9:13]
            month=news_date[0][14:-8].encode('utf-8').split("月")[0]
            day=news_date[0][14:-8].encode('utf-8').split("月")[1]
            newsdate=datetime.datetime(int(year),int(month),int(day),random.randint(0,23),random.randint(0,59),random.randint(0,59))

            today=datetime.datetime.today()
            daterange=today-datetime.timedelta(days=200)
            if newsdate>daterange:
                rd= random.uniform(0.0001,1)
                item['news_date']=str(newsdate)+str(rd)[1:6]

    def get_news_source(self,response,item):
        item['news_source']='ChopRead'

    def get_news_status(self,response,item):
        item['news_status']=0

    def get_type_id(self,response,item):
        item['type_id']='GXOO'

    def get_news_url(self,response,item):

        item['news_url']=response.url