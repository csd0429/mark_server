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
    name = "ysoo_lofter"
    allowed_domains = ["wangyiyuanchuang719.lofter.com"]
    start_urls = ['http://wangyiyuanchuang719.lofter.com/',]
    rules=(
        Rule(LinkExtractor(allow=r"/post/\w{14}"),
        callback="parse_news",follow=True),
    )
    for i in range(1,10):
        start_urls.append('http://wangyiyuanchuang719.lofter.com/?page='+str(i))
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
        item['news_id']='LF'+response.url[-6:]

    def get_news_title(self,response,item):
        news_title=response.xpath("/html/body/div/div[2]/div[2]/div[1]/div[2]/div[1]/div/div/h2/a/text()").extract()
        if news_title:
            item['news_title']=news_title[0]

    def get_news_info(self,response,item):
        news_info=response.xpath("/html/body/div/div[2]/div[2]/div[1]/div[2]/div[1]/div/div/descendant::text()").extract()
        if news_info:
            item['news_info']=news_info

    def get_news_content(self,response,item):
        item['news_content']=response.url

    def get_news_img(self,response,item):
        news_img=response.xpath("/html/body/div/div[2]/div[2]/div[1]/div[2]/div[1]/div/div/p/img/@src").extract()
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
        news_date=response.xpath("/html/body/div/div[2]/div[2]/div[1]/div[2]/div[2]/div/a/text()").extract()
        if news_date:
            date=news_date[0]+' '+str(random.randint(0,23))+':'+str(random.randint(0,59))+':'+str(random.randint(0,59))
            newsdate=datetime.datetime.strptime(date,"%Y-%m-%d %H:%M:%S")
            today=datetime.datetime.today()
            daterange=today-datetime.timedelta(days=300)

            if newsdate>daterange:
                rd= random.uniform(0.0001,1)
                item['news_date']=str(newsdate)+str(rd)[1:6]

    def get_news_source(self,response,item):
        item['news_source']='全球电影资讯网'

    def get_news_status(self,response,item):
        item['news_status']=0

    def get_type_id(self,response,item):
        item['type_id']='YSOO'

    def get_news_url(self,response,item):

        item['news_url']=response.url