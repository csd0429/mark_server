#encoding: utf-8
import scrapy
import re
from scrapy.selector import Selector
from ScrapyNews.items import ScrapyNewsItem
from scrapy.contrib.linkextractors import LinkExtractor
from scrapy.contrib.spiders import CrawlSpider,Rule
class ExampleSpider(CrawlSpider):
    name = "163News"
    allowed_domains = ["news.163.com"]
    start_urls = ['http://j.news.163.com/']
    rules=(
        Rule(LinkExtractor(allow=r"/*/\d+/\d{10}/\w+.html+/*"),
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
        news_id=response.url
        if news_id:
            item['news_id']=news_id[-26:-10]

    def get_news_title(self,response,item):
        news_title=response.xpath("/html/head/title/text()").extract()
        if news_title:
            item['news_title']=news_title[0][:-5]

    def get_news_info(self,response,item):
        news_info=response.xpath("//div[@class='left']/a/text()").extract()
        item['news_info']='我是概要'

    def get_news_content(self,response,item):
        news_content=response.xpath("//div[@id='endText']/p/descendant::text()").extract()
        if news_content:
            item['news_content']=news_content

    def get_news_img(self,response,item):
        news_img=response.xpath("//*[@id='endText']/descendant::img/@src").extract()
        if news_img:
            item['news_img']=news_img
        else:
            item['news_img']='没有图片'

    def get_news_date(self,response,item):
        news_date=response.xpath("//*[@id='epContentLeft']/div[2]/div/div/text()").extract()
        if news_date:
            item['news_date']=news_date[0][:10]

    def get_news_source(self,response,item):
        news_source=response.xpath("//*[@id='endText']/div[2]/span/text()").extract()
        item['news_source']='网易'

    def get_news_status(self,response,item):
        news_status=response.url
        item['news_status']=0

    def get_type_id(self,response,item):
        type_id=response.url
        item['type_id']=0
    def get_news_url(self,response,item):

        item['news_url']=response.url