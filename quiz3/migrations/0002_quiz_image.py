# Generated by Django 4.2.4 on 2023-09-01 14:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('quiz3', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='quiz',
            name='image',
            field=models.ImageField(blank=True, null=True, upload_to='quiz_images/'),
        ),
    ]
