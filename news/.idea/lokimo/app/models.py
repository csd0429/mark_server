# encoding:utf-8

from django.db import models

class Blog(models.Model):
    blog_id=models.CharField('编号',max_length=15)
    blog_title = models.CharField('标题', max_length=30)
    blog_content = models.CharField('内容', max_length=1000)
    # blog_img = models.CharField('图片', max_length=2)
    blog_tel = models.CharField('手机号', max_length=11)
    blog_name = models.CharField('用户名', max_length=16)
    blog_role = models.CharField('身份', max_length=2)
    blog_time=models.DateField('时间')
    blog_status=models.CharField('状态',max_length=1)