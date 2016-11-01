from django.http import Http404
from django.http import HttpResponse
from django.shortcuts import render
from .models import Game

def index(request):
    all_games = Game.objects.all()
    return render(request, 'landing/index.html', {'all_games': all_games})

def detail(request, game_id):
    try:
        game = Game.objects.get(pk=game_id)
    except Game.DoesNotExist:
        raise Http404('Game does not exist!')
    return render(request, 'landing/detail.html', {'game': game})
