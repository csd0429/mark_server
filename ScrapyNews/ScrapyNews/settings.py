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
        'host':'markdb.ctltwc1dor1y.rds.cn-north-1.amazonaws.com.cn',
        'port':'5432',
        'username':'markuser',
        'password':'m4BunFfEtyns9c',
        'database':'markdb'
}

ITEM_PIPELINES=[
    'ScrapyNews.pipelines.ScrapyNewsPipeline',
]

COOKIES_ENABLES=False
TIME_ZONE = 'Asia/Shanghai'

COMMANDS_MODULE = 'ScrapyNews.commands'

DOWNLOAD_DELAY=0.25 #下载间隔为250ms