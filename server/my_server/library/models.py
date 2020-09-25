from django.db import models

genderChoices = ['Gender1', 'Gender2', 'Gender3', 'Gender4']


class Book(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(null=True, blank=True)
    possessed = models.BooleanField(default=False)
    gender = models.CharField(max_length=20, default=0, null=True,
                              choices=[(i, genderChoices[i]) for i in range(len(genderChoices))])