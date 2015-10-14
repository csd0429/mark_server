# -*- coding: utf-8 -*-

# Scrapy settings for ScrapyNews project
#
# For simplicity, this file contains only the most important settings by
# default. All the other settings are documented here:
#
#     http://doc.scrapy.org/en/latest/topics/settings.html
#

BOT_NAME = 'ScrapyNews'

SPIDER_MODULES = ['ScrapyNews.spiders']
NEWSPIDER_MODULE = 'ScrapyNews.spiders'

# Crawl responsibly by identifying yourself (and your website) on the user-agent
#USER_AGENT = 'ScrapyNews (+http://www.yourdomain.com)'
#
# DATABASES = {
#         'drivername':'postgres',
#         'host':'localhost',
#         'port':'5432',
#         'username':'Csd',
#         'password':'123456',
#         'database':'postgres'
# }
DATABASES = {
        'drivername':'postgres',
        'host':'121.41.73.85',
        'port':'5432',
        'username':'mark',
        'password':'123456',
        'database':'markdb'
}

ITEM_PIPELINES=[
    'ScrapyNews.pipelines.ScrapyNewsPipeline',
]

COOKIES_ENABLES=False
TIME_ZONE = 'Asia/Shanghai'

COMMANDS_MODULE = 'ScrapyNews.commands'