from django.db import models
from django.contrib.auth import models as auth_models

# Create your models here.

class ThreadColor(models.Model):
    class Meta:
        verbose_name_plural = 'Thread Colors'

    brand = models.CharField(max_length=50)
    name = models.CharField(max_length=50)
    brand_number = models.CharField(max_length=10)

    hex_value = models.CharField(max_length=6)
    
    def __str__(self):
        return "{} {}: {}".format(self.brand, self.brand_number, self.name)

class UserThread(models.Model):
    class Meta:
        verbose_name_plural = 'User Threads'

    thread_data = models.ForeignKey(ThreadColor, on_delete=models.PROTECT)
    owner = models.ForeignKey(auth_models.User, on_delete=models.CASCADE)
    skeins_owned = models.DecimalField(max_digits=5, decimal_places=2, default=0.0)

    def __str__(self):
        return "[{}] {} ({} skeins)".format(str(self.owner), str(self.thread_data), self.skeins_owned)    