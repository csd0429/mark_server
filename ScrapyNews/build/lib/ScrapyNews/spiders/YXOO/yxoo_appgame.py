#encoding: utf-8
import scrapy
import re
from scrapy.selector import Selector
from ScrapyNews.items import ScrapyNewsItem
from scrapy.contrib.linkextractors import LinkExtractor
from scrapy.contrib.spiders import CrawlSpider,Rule
import random,string,datetime
class ExampleSpider(CrawlSpider):
    name = "appgame"
    allowed_domains = ["www.appgame.com"]
    start_urls = ['http://www.appgame.com/',]
    rules=(
        Rule(LinkExtractor(allow=r"/archives/\d{6}.html"),
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
        return item

    def get_news_id(self,response,item):
        item['news_id']='AG'+response.url[-11:-5]

    def get_news_title(self,response,item):
        news_title=response.xpath("//*[@id='post-"+response.url[-11:-5]+"']/header/h1/text()").extract()
        if news_title:
            item['news_title']=news_title[0]

    def get_news_info(self,response,item):
        news_info=response.xpath("//*[@id='appgameshareImg']/p/descendant::text()").extract()
        item['news_info']=news_info

    def get_news_content(self,response,item):
        item['news_content']=response.url

    def get_news_img(self,response,item):
        news_img=response.xpath("//*[@id='appgameshareImg']/p/descendant::img/@src").extract()
        if news_img:
            item['news_img']=news_img
        else:
            item['news_img']=0

    def get_news_date(self,response,item):
        now=datetime.datetime.now()
        item['news_date']=now

    def get_news_source(self,response,item):
        item['news_source']='appgame'
    def get_news_status(self,response,item):
        item['news_status']=0
    def get_type_id(self,response,item):
        item['type_id']='YXOO'

    def get_news_url(self,response,item):

        item['news_url']=response.url