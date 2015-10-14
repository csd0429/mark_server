#encoding: utf-8
import scrapy
import re
from scrapy.selector import Selector
from ScrapyNews.items import ScrapyNewsItem
from scrapy.contrib.linkextractors import LinkExtractor
from scrapy.contrib.spiders import CrawlSpider,Rule
import random,string,datetime
class ExampleSpider(CrawlSpider):
    name = "xzw"
    allowed_domains = ["m.xzw.com"]
    start_urls = ['http://m.xzw.com/']
    rules=(
        Rule(LinkExtractor(allow=r"/astro/\w+/\d{4}/\d{4}/\d{6}.html"),
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
        item['news_id']='XZ'+response.url[-11:-5]

    def get_news_title(self,response,item):
        news_title=response.xpath("//*[@id='main']/div[1]/div[2]/h2/text()").extract()
        if news_title:
            item['news_title']=news_title[0]

    def get_news_info(self,response,item):

        news_info=response.xpath("//*[@id='main']/div[1]/div[4]/descendant::text()").extract()
        item['news_info']=news_info

    def get_news_content(self,response,item):
        item['news_content']=response.url

    def get_news_img(self,response,item):
        news_img=response.xpath("//*[@id='main']/div[1]/div[4]/descendant::img/@src").extract()

        if news_img:
            item['news_img']='{http://m.xzw.com'+str(news_img[0])+'}'

    def get_news_date(self,response,item):
        news_date=response.xpath("//*[@id='main']/div[1]/div[2]/div[1]/text()[1]").extract()
        item['news_date']=news_date[0][17:-1]

    def get_news_source(self,response,item):
        item['news_source']='星座屋'
    def get_news_status(self,response,item):
        item['news_status']=0
    def get_type_id(self,response,item):
        item['type_id']='XZOO'

    def get_news_url(self,response,item):

        item['news_url']=response.url