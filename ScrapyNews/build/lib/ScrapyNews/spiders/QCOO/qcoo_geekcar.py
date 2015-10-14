#encoding: utf-8
import scrapy
import re
from scrapy.selector import Selector
from ScrapyNews.items import ScrapyNewsItem
from scrapy.contrib.linkextractors import LinkExtractor
from scrapy.contrib.spiders import CrawlSpider,Rule
import random,string
class ExampleSpider(CrawlSpider):
    name = "geekcar"
    allowed_domains = ["geekcar.net"]
    start_urls = ['http://geekcar.net/',]
    rules=(
        Rule(LinkExtractor(allow=r"/*"),
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
        numOfNum=random.randint(1,6)
        numOfLetter=6-numOfNum
        slcNum=[random.choice(string.digits)for i in range(numOfNum)]
        slcLetter=[random.choice(string.ascii_letters)for i in range(numOfLetter)]
        slcChar=slcNum+slcLetter
        random.shuffle(slcChar)
        id=''.join([i for i in slcChar])
        item['news_id']='GC'+id

    def get_news_title(self,response,item):
        news_title=response.xpath("/html/body/main/div/div/div[1]/article/header/h1/text()").extract()
        if news_title:
            item['news_title']=news_title[0]

    def get_news_info(self,response,item):

        news_info=response.xpath("/html/body/main/div/div/div[1]/article/div[3]/p/descendant::text()").extract()
        item['news_info']=news_info

    def get_news_content(self,response,item):
        item['news_content']=response.url

    def get_news_img(self,response,item):
        news_img=response.xpath("/html/body/main/div/div/div[1]/article/div[1]/descendant::img/@src").extract()

        if news_img:
            item['news_img']=news_img
        else:
            item['news_img']=0

    def get_news_date(self,response,item):
        news_date=response.xpath("/html/body/main/div/div/div[1]/article/header/div/div/span[3]/@datetime").extract()
        if news_date:
            item['news_date']=news_date[0][:25]

    def get_news_source(self,response,item):
        item['news_source']='geekcar'
    def get_news_status(self,response,item):
        item['news_status']=0
    def get_type_id(self,response,item):
        item['type_id']='QCOO'

    def get_news_url(self,response,item):

        item['news_url']=response.url