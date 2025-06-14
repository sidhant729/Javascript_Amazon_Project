# Generated by Django 3.1.12 on 2025-05-25 05:35

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0005_auto_20250525_1010'),
    ]

    operations = [
        migrations.CreateModel(
            name='Products',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('image', models.CharField(max_length=100)),
                ('name', models.CharField(max_length=100)),
                ('rating', models.JSONField()),
                ('priceCents', models.IntegerField()),
                ('keywords', models.JSONField()),
            ],
        ),
        migrations.DeleteModel(
            name='Person',
        ),
    ]
