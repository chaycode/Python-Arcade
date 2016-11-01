from __future__ import unicode_literals

from django.db import models

class Game(models.Model):
    name = models.CharField(max_length=200)
    upvotes = models.IntegerField()
    #
    def __str__(self):
        return self.name
