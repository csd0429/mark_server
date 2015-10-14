#encoding: utf-8
import scrapy
import re
from scrapy.selector import Selector
from ScrapyNews.items import ScrapyNewsItem
from scrapy.contrib.linkextractors import LinkExtractor
from scrapy.contrib.spiders import CrawlSpider,Rule
import random,string
class ExampleSpider(CrawlSpider):
    name = "cool3c"
    allowed_domains = ["www.cool3c.com"]
    start_urls = ['http://www.cool3c.com/',]
    rules=(
        Rule(LinkExtractor(allow=r"/article/\d{5}"),
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
        numOfNum=random.randint(1,1)
        numOfLetter=1-numOfNum
        slcNum=[random.choice(string.digits)for i in range(numOfNum)]
        slcLetter=[random.choice(string.ascii_letters)for i in range(numOfLetter)]
        slcChar=slcNum+slcLetter
        random.shuffle(slcChar)
        id=''.join([i for i in slcChar])
        item['news_id']='3C'+id+response.url[-5:]

    def get_news_title(self,response,item):
        news_title=response.xpath("//*[@id='node-"+response.url[-5:]+"']/div/header/h2/a/text()").extract()
        if news_title:
            item['news_title']=news_title[0]

    def get_news_info(self,response,item):
        news_info=response.xpath("//*[@id='node-"+response.url[-5:]+"']/div/div[3]/div/div[1]/p/descendant::text()").extract()
        item['news_info']=news_info

    def get_news_content(self,response,item):
            item['news_content']=response.url

    def get_news_img(self,response,item):
        news_img=response.xpath("//*[@id='node-"+response.url[-5:]+"']/div/div[3]/div/div[1]/p/descendant::img/@src").extract()

        if news_img:
            item['news_img']=news_img

    def get_news_date(self,response,item):
        news_date=response.xpath("//*[@id='node-"+response.url[-5:]+"']/div/footer/div/time/@datetime").extract()
        if news_date:
            item['news_date']=news_date[0]

    def get_news_source(self,response,item):
        item['news_source']='瘾科技'
    def get_news_status(self,response,item):
        news_status=response.url
        item['news_status']=0
    def get_type_id(self,response,item):
        item['type_id']='SMOO'

    def get_news_url(self,response,item):

        item['news_url']=response.url