from django.db import models
from django.contrib.auth import models as auth_models
from django.core.validators import MinValueValidator, MaxValueValidator

class Brand(models.Model):
    class Meta:
        verbose_name_plural = 'Brands'
    
    name = models.CharField(max_length=50, unique=True)
    def __str__(self):
        return self.name


class ThreadColor(models.Model):
    class Meta:
        verbose_name_plural = 'Thread Colors'
        constraints = [
            models.UniqueConstraint(fields=['brand', 'brand_number'], name='unique_brand_number'),
            models.UniqueConstraint(fields=['brand', 'name'], name='unique_brand_color_name')
        ]

    brand = models.ForeignKey(Brand, on_delete=models.PROTECT)
    name = models.CharField(max_length=50)
    brand_number = models.CharField(max_length=10)

    hex_value = models.CharField(max_length=6)
    
    def __str__(self):
        return "{} {}: {}".format(self.brand, self.brand_number, self.name)

class UserThread(models.Model):
    class Meta:
        verbose_name_plural = 'User Threads'
        constraints = [
            models.UniqueConstraint(fields=['thread_color', 'owner'], name='unique_user_thread')
        ]

    thread_color = models.ForeignKey(ThreadColor, on_delete=models.PROTECT)
    owner = models.ForeignKey(auth_models.User, on_delete=models.CASCADE)
    skeins_owned = models.DecimalField(max_digits=5, decimal_places=2, default=-1.0, validators=[
        MinValueValidator(0), MaxValueValidator(999.99)
    ])

    def __str__(self):
        return "[{}] {} ({} skeins)".format(str(self.owner), str(self.thread_color), self.skeins_owned)    