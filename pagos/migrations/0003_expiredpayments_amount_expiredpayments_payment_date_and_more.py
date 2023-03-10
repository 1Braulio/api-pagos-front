# Generated by Django 4.1.4 on 2022-12-30 00:02

import datetime
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('pagos', '0002_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='expiredpayments',
            name='amount',
            field=models.FloatField(default=0),
        ),
        migrations.AddField(
            model_name='expiredpayments',
            name='payment_date',
            field=models.DateTimeField(default=datetime.datetime(2022, 12, 29, 19, 2, 29, 522335)),
        ),
        migrations.AddField(
            model_name='expiredpayments',
            name='service_id',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, related_name='expired_payments_services', to='pagos.services'),
        ),
        migrations.AlterField(
            model_name='paymentuser',
            name='amount',
            field=models.FloatField(default=0),
        ),
        migrations.AlterField(
            model_name='paymentuser',
            name='payment_date',
            field=models.DateTimeField(auto_now_add=True),
        ),
    ]
