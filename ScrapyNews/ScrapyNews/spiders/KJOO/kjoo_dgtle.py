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
    name = "kjoo_dgtle"
    allowed_domains = ["www.dgtle.com"]
    start_urls = ['http://www.dgtle.com/',]
    rules=(
        Rule(LinkExtractor(allow=r"/*.html"),
        callback="parse_news",follow=True),
    )
    for i in range(1,50):
        start_urls.append('http://www.dgtle.com/portal.php?page='+str(i))

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

        item['news_id']='DG00'+response.url[-11:-7]

    def get_news_title(self,response,item):
        news_title=response.xpath("//*[@id='ct']/div[2]/div/div/h1/a/text()").extract()
        if news_title:
            item['news_title']=news_title[0]



    def get_news_info(self,response,item):
        news_info=response.xpath("//*[@id='view_content']/descendant::text()").extract()
        if news_info:
            item['news_info']=news_info

    def get_news_content(self,response,item):
            item['news_content']=response.url

    def get_news_img(self,response,item):

        news_img=response.xpath("//*[@id='view_content']/descendant::img/@src").extract()
        if news_img:
            result='{'
            count=0
            for img in news_img:
                file=urllib2.urlopen(img[:-6])
                tmpIm=cStringIO.StringIO(file.read())
                im=Image.open(tmpIm)
                if im.size[0]>=400 and im.size[1]>=400:
                    result+=img[:-6]+','
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
        news_date=response.xpath("//*[@id='ct']/div[1]/div/div[2]/div[1]/text()").extract()
        print news_date[1][3:13]
        if news_date[1][3:13]:
            newsdate=datetime.datetime(int(news_date[1][3:13].split('-')[0]),int(news_date[1][3:13].split('-')[1]),int(news_date[1][3:13].split('-')[2]),random.randint(0,23),random.randint(0,59),random.randint(0,59))
            today=datetime.datetime.today()
            daterange=today-datetime.timedelta(days=200)

            if newsdate>daterange:
                rd= random.uniform(0.0001,1)
                item['news_date']=str(newsdate)+str(rd)[1:6]

    def get_news_source(self,response,item):
        item['news_source']='数字尾巴'

    def get_news_status(self,response,item):
        news_status=response.url
        item['news_status']=0

    def get_type_id(self,response,item):
        item['type_id']='KJOO'

    def get_news_url(self,response,item):

        item['news_url']=response.url