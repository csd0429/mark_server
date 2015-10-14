#encoding:utf-8
from django.db import models

# Create your models here.


class Image(models.Model):
    news_id=models.CharField('编号',max_length=50,unique=True)
    news_cover=models.CharField('封面',max_length=200,null=True)
    news_img=models.CharField('图片',max_length=200,null=True)

class Send(models.Model):
    send_user_id=models.CharField('用户',max_length=11,null=False)
    send_type_id=models.CharField('类型',max_length=4,null=False)
    send_latest=models.DateTimeField('最新节点',null=True)
    send_oldest=models.DateTimeField('最旧节点',null=True)

class Token(models.Model):
    token_id=models.CharField('token',max_length=8,unique=True)
    token_time=models.CharField('有效时间',max_length=30,null=False)
    code_id=models.CharField('验证码',max_length=4,null=True)

class TelCode(models.Model):
    user_id=models.CharField('用户',max_length=11,unique=True)
    tel_code=models.CharField('随机码',max_length=10,null=False)


class invite(models.Model):
    user_id=models.CharField('用户',max_length=11,unique=True)
    user_email=models.EmailField(null=True)
    invite_code=models.CharField('邀请码',max_length=11,null=True)

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

class Activity(models.Model):
    act_id=models.CharField('编号',max_length=16)
    act_title=models.CharField('标题',max_length=30)
    # act_cover = models.ImageField('封面')
    act_summary = models.CharField('概要', max_length=250)
    act_content = models.CharField('内容', max_length=10000)
    act_time = models.DateTimeField('时间')
    act_type = models.CharField('类型', max_length=2)
