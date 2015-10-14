#encoding: utf-8
import scrapy
import re
from scrapy.selector import Selector
from ScrapyNews.items import ScrapyNewsItem
from scrapy.contrib.linkextractors import LinkExtractor
from scrapy.contrib.spiders import CrawlSpider,Rule
import random,string
class ExampleSpider(CrawlSpider):
    name = "dailyvtm_ss"
    allowed_domains = ["www.dailyvitamin.cn"]
    start_urls = ['http://www.dailyvitamin.cn/fashion/',]
    rules=(
        Rule(LinkExtractor(allow=r"/fashion/\d{8}/\d{3}.html"),
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
        item['news_id']='DV'+response.url[-12:-9]+response.url[-8:-5]

    def get_news_title(self,response,item):
        news_title=response.xpath("//*[@id='page-title']/text()").extract()
        if news_title:
            item['news_title']=news_title[0]

    def get_news_info(self,response,item):

        news_info=response.xpath("//*[@id='node-"+response.url[-8:-5]+"']/div[2]/div[1]/div/div/descendant::text()").extract()
        item['news_info']=news_info

    def get_news_content(self,response,item):
        item['news_content']=response.url

    def get_news_img(self,response,item):
        news_img=response.xpath("//*[@id='node-"+response.url[-8:-5]+"']/div[2]/descendant::img/@data-src").extract()

        if news_img:
            item['news_img']='{'+'http://www.dailyvitamin.cn'+news_img[0]+'}'

    def get_news_date(self,response,item):
        news_date=response.xpath("//*[@id='node-"+response.url[-8:-5]+"']/div[1]/div[2]/text()").extract()
        if news_date:
            item['news_date']=news_date[0][:16]

    def get_news_source(self,response,item):
        item['news_source']='daily vitamin'
    def get_news_status(self,response,item):
        news_status=response.url
        item['news_status']=0
    def get_type_id(self,response,item):
        item['type_id']='SSOO'

    def get_news_url(self,response,item):

        item['news_url']=response.url