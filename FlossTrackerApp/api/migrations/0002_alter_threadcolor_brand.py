# Generated by Django 4.1.2 on 2022-10-26 18:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='threadcolor',
            name='brand',
            field=models.CharField(max_length=50),
        ),
    ]
