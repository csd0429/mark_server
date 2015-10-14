#encoding: utf-8
import scrapy
import time,datetime
from scrapy.selector import Selector
from ScrapyNews.items import ScrapyNewsItem
from scrapy.contrib.linkextractors.sgml import SgmlLinkExtractor
from scrapy.contrib.spiders import CrawlSpider,Rule


class ExampleSpider(CrawlSpider):

    name = "toutiaoNews"
    start_urls = ['http://www.36kr.com/']
    rules=(
        Rule(SgmlLinkExtractor(allow=(r"/*"),restrict_xpaths=('//div[@class="row"]')),
        callback="parse_news",follow=True),
    )
    def printcn(uni):
        for i in uni:
            print uni.encode('utf-8')

    def parse_news(self,response):
        item = ScrapyNewsItem()
        self.get_news_url(response,item)
        return item

    def get_news_url(self,response,item):
        # news_title=response.xpath("/html/body/descendant::a/text()").extract()
        # if 'rss' in news_title:
        print 'yeah'
        print response.url
        item['news_url']=response.url