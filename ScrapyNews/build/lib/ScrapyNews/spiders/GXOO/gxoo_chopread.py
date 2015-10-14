#encoding: utf-8
import scrapy
import re
from scrapy.selector import Selector
from ScrapyNews.items import ScrapyNewsItem
from scrapy.contrib.linkextractors import LinkExtractor
from scrapy.contrib.spiders import CrawlSpider,Rule
import random,string,datetime
class ExampleSpider(CrawlSpider):
    name = "chopread"
    allowed_domains = ["www.chopread.com"]
    start_urls = ['http://www.chopread.com/',]
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
        item['news_id']='CR'+id

    def get_news_title(self,response,item):
        news_title=response.xpath("/html/body/div[1]/div[2]/div[1]/div/section[1]/div/h1/text()").extract()
        if news_title:
            item['news_title']=news_title[0]

    def get_news_info(self,response,item):

        news_info=response.xpath("/html/body/div[1]/div[2]/div[1]/div/section[2]/div/p/descendant::text()").extract()
        item['news_info']=news_info

    def get_news_content(self,response,item):
        item['news_content']=response.url

    def get_news_img(self,response,item):
        news_img=response.xpath("//*[@id='gallery-1']/div/descendant::img/@src").extract()

        if news_img:
            item['news_img']=news_img

    def get_news_date(self,response,item):
        news_date=response.xpath("/html/body/div[1]/div[2]/div[1]/div/section[1]/div/div/span[1]/text()").extract()
        if news_date:
            year=news_date[0][9:13]
            month=news_date[0][14:-8].encode('utf-8').split("月")[0]
            day=news_date[0][14:-8].encode('utf-8').split("月")[1]
            date=datetime.datetime(int(year),int(month),int(day))
            item['news_date']=date

    def get_news_source(self,response,item):
        item['news_source']='ChopRead'
    def get_news_status(self,response,item):
        item['news_status']=0
    def get_type_id(self,response,item):
        item['type_id']='GXOO'

    def get_news_url(self,response,item):

        item['news_url']=response.url