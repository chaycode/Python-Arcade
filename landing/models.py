from __future__ import unicode_literals

from django.db import models

class Game(models.Model):
    name = models.CharField(max_length=200)
    descriptions = models.CharField(max_length=500)
    link = models.CharField(max_length=200)
    pic = models.CharField(max_length=20)

    #
    def __str__(self):
        return self.name

class Poll(models.Model):
    game = models.ForeignKey(Game, on_delete=models.CASCADE)
    choice_text = models.CharField(max_length=200)
    votes = models.IntegerField(default=0)

    def __str__(self):
        return self.choice_text
