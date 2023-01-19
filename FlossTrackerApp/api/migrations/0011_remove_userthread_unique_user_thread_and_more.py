# Generated by Django 4.1.5 on 2023-01-19 21:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0010_alter_userthread_skeins_owned'),
    ]

    operations = [
        migrations.RemoveConstraint(
            model_name='userthread',
            name='unique_user_thread',
        ),
        migrations.RenameField(
            model_name='userthread',
            old_name='thread_data',
            new_name='thread_color',
        ),
        migrations.AddConstraint(
            model_name='userthread',
            constraint=models.UniqueConstraint(fields=('thread_color', 'owner'), name='unique_user_thread'),
        ),
    ]
