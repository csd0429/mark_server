# encoding:utf-8

from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin

class MyUserManager(BaseUserManager):
    def create_user(self, tel, password, type):
        print tel
        if not tel:
            raise ValueError('Users must have a tel')
        print str(type)
        if type == 1:
            user = self.model(tel=tel, type=type)
            user.set_password(password)
            user.save(using=self._db)
            return user
        elif type == 2:
            user = self.model(tel=tel, type=type)
            user.set_password(password)
            user.save(using=self._db)
            return user
        elif type == 0:
            user = self.model(tel=tel, type=type, is_superuser=True)
            user.set_password(password)
            user.save(using=self._db)
            return user


    def create_superuser(self, tel, password, type):
        user = self.create_user(tel, password=password, type=type)
        user.is_superuser = True
        user.save(using=self._db)
        return user


class MyUser(AbstractBaseUser):
    tel = models.CharField(unique=True,max_length=11)
    type = models.IntegerField(max_length=1)
    is_superuser = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)

    objects = MyUserManager()

    USERNAME_FIELD = 'tel'
    REQUIRED_FIELDS = ['type']

    def get_full_name(self):
        return self.tel

    def get_short_name(self):
        return self.tel

    def __str__(self):
        return self.tel

    def has_perm(self, perm, obj=None):
        "Does the user have a specific permission?"
        return True

    def has_module_perms(self, app_label):
        "Does the user have permissions to view the app 'app_lable'?"
        return True

    @property
    def is_staff(self):
        "Is the user a member of staff?"
        return self.is_superuser


class Blog(models.Model):
    blog_id=models.CharField('编号',max_length=15)
    blog_title = models.CharField('标题', max_length=30)
    blog_content = models.CharField('内容', max_length=1000)
    # blog_img = models.CharField('图片', max_length=2)
    blog_tel = models.CharField('手机号', max_length=11)
    blog_name = models.CharField('用户名', max_length=16)
    blog_role = models.CharField('身份', max_length=2)
    blog_time=models.DateTimeField('时间')
    blog_status=models.CharField('状态',max_length=1)


class Activity(models.Model):
    act_id=models.CharField('编号',max_length=16)
    act_title=models.CharField('标题',max_length=30)
    # act_cover = models.ImageField('封面')
    act_summary = models.CharField('概要', max_length=250)
    act_content = models.CharField('内容', max_length=10000000)
    act_time = models.DateTimeField('时间')
    act_type = models.CharField('类型', max_length=2)

class Comment(models.Model):
    act_id=models.CharField('活动编号',max_length=16)
    tel = models.CharField('手机号',max_length=11)
    com_time=models.DateTimeField('时间')
    com_content=models.CharField('评论内容',max_length=120)
    com_name=models.CharField('名字',max_length=10)
    com_head=models.CharField('头像',max_length=2)

class Apply(models.Model):
    act_id=models.CharField('活动编号',max_length=16)
    tel = models.CharField('手机号',max_length=11)

class Like(models.Model):
    act_id=models.CharField('活动编号',max_length=16)
    tel = models.CharField('手机号',max_length=11)