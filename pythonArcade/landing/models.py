from __future__ import unicode_literals

from django.db import models

class Game(models.Model):
    name = models.CharField(max_length=200)
    descriptions = models.CharField(max_length=500)
    #
    def __str__(self):
        return self.name

class Poll(models.Model):
    game = models.ForeignKey(Game, on_delete=models.CASCADE)
    good = models.IntegerField()
    bad = models.IntegerField()
    meh = models.IntegerField()
    
