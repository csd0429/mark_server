#encoding: utf-8
import scrapy
import time,datetime
from scrapy.selector import Selector
from ScrapyNews.items import ScrapyNewsItem
from scrapy.contrib.linkextractors import LinkExtractor
from scrapy.contrib.spiders import CrawlSpider,Rule

class ExampleSpider(CrawlSpider):

    name = "sinaNews"
    allowed_domains = ["sina.com.cn"]
    start_urls = ['http://edu.sina.com.cn/']
    rules=(
        Rule(LinkExtractor(allow=r"/*/2015+[-]+\d+[-]+\d+/\d+/*"),
        callback="parse_news",follow=True),
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
        self.get_news_url(response,item)
        self.get_news_date(response,item)
        self.get_news_source(response,item)
        self.get_news_status(response,item)
        self.get_type_id(response,item)
        print(item['news_title'])
        print(item['news_date'])
        return item

    def get_news_id(self,response,item):
        news_id=response.url
        if news_id:
            item['news_id']='XL'+news_id[-12:-6]

    def get_news_title(self,response,item):
        news_title=response.xpath("//*[@id='artibodyTitle']/text()").extract()
        if news_title:
            item['news_title']=news_title[0]

    def get_news_info(self,response,item):
        news_info=response.xpath("//div[@class='left']/a/text()").extract()
        item['news_info']='我是概要'

    def get_news_content(self,response,item):
        news_content=response.xpath("//*[@id='artibody']/p/text()").extract()
        if news_content:
            item['news_content']=news_content

    def get_news_img(self,response,item):
        news_img=response.xpath("//*[@id='artibody']/descendant::img/@src").extract()
        if news_img:
            item['news_img']=news_img
        else:
            item['news_img']=0

    # def get_news_date(self,response,item):
    #     news_date=response.xpath("//*[@id='pub_date']/text()").extract()
    #     if news_date:
    #         item['news_date']=news_date[0][:11]

    def get_news_date(self,response,item):
        news_date=response.xpath("//*[@id='pub_date']/text()").extract()


        if news_date:

            year=news_date[0][0:4]
            month=news_date[0][5:7]
            day=news_date[0][8:10]
            hour=news_date[0][11:13]
            minute=news_date[0][14:16]
            # second=news_date[0][17:19]
            # unittime=datetime.datetime(1970,1,1)
            newstime=datetime.datetime(int(year),int(month),int(day),int(hour),int(minute),00)
        #     difference=(newstime-unittime).days*24*60*60*1000+(newstime-unittime).seconds*1000+(newstime-unittime).microseconds/1000

            item['news_date']=newstime

    def get_news_source(self,response,item):
        news_source=response.xpath("//*[@id='endText']/div[2]/span/text()").extract()
        item['news_source']='新浪'

    def get_news_status(self,response,item):
        news_status=response.url
        item['news_status']=9

    def get_type_id(self,response,item):
        type_id=response.xpath("//*[@id='J_Article_Wrap']/div[1]/p/a/text()").extract()
        if type_id:
            item['type_id']=type_id
        else:
            item['type_id']=0

    def get_news_url(self,response,item):

        item['news_url']=response.url