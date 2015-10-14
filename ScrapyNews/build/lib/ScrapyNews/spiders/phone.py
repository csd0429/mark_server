#encoding: utf-8
import scrapy
import time,datetime
from scrapy.selector import Selector
from ScrapyNews.items import ScrapyNewsItem
from scrapy.contrib.linkextractors import LinkExtractor
from scrapy.contrib.spiders import CrawlSpider,Rule

class ExampleSpider(CrawlSpider):

    name = "phoneNews"
    # allowed_domains = ["sina.cn"]
    # start_urls = ['http://news.sina.cn/?vt=4&wm=4007']
    # rules=(
    #     Rule(LinkExtractor(allow=r"/\w+/2015+[-]+\d+[-]+\d+/\w+[-]+\w+.d.html\?vt=\d&pos=\d+&wm=\d+"),
    #     callback="parse_news",follow=True),
    # )
    allowed_domains = ["163.com"]
    start_urls = ['http://3g.163.com/']
    rules=(
        Rule(LinkExtractor(allow=r"/\w+/\d{2}/\d{4}/\d{2}/\w+.html"),
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
        return item

    def get_news_id(self,response,item):
        news_id=response.url
        if news_id:
            item['news_id']='MP'+news_id[-11:-5]

    def get_news_title(self,response,item):
        news_title=response.xpath("/html/body/div[3]/text()").extract()
        if news_title:
            item['news_title']=news_title[0]

    def get_news_info(self,response,item):
        news_info=response.xpath("/html/body/div[6]/p/text()").extract()
        if news_info:
            item['news_info']=news_info

    def get_news_content(self,response,item):
        item['news_content']=response.url

    def get_news_img(self,response,item):
        news_img=response.xpath("/html/body/div[6]/p/img/@src").extract()
        if news_img:
            item['news_img']='{http://'+news_img[0][24:-17]+'}'
    # def get_news_date(self,response,item):
    #     news_date=response.xpath("//*[@id='pub_date']/text()").extract()
    #     if news_date:
    #         item['news_date']=news_date[0][:11]

    def get_news_date(self,response,item):
        news_date=response.xpath("/html/body/div[4]/text()").extract()

        if news_date:

            item['news_date']=news_date[0][6:17]

    def get_news_source(self,response,item):
        item['news_source']='网易手机'

    def get_news_status(self,response,item):
        item['news_status']=0

    def get_type_id(self,response,item):
        type_id=response.xpath("//*[@id='J_Article_Wrap']/div[1]/p/a/text()").extract()
        if type_id:
            item['type_id']=type_id
        else:
            item['type_id']=0

    def get_news_url(self,response,item):

        item['news_url']=response.url