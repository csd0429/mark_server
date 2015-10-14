# -*- coding: utf-8 -*-
# Define here the models for your scraped items
#
# See documentation in:
# http://doc.scrapy.org/en/latest/topics/items.html

import scrapy



class ScrapyNewsItem(scrapy.Item):
    # define the fields for your item here like:
    # name = scrapy.Field()
    news_id=scrapy.Field()
    news_title = scrapy.Field()
    news_info=scrapy.Field()
    news_content = scrapy.Field()
    news_img=scrapy.Field()
    news_date=scrapy.Field()
    news_source=scrapy.Field()
    news_status=scrapy.Field()
    news_img_cover=scrapy.Field()
    news_url=scrapy.Field()
    type_id=scrapy.Field()
