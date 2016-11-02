from django.shortcuts import render, get_object_or_404
from .models import Game, Poll

def index(request):
    all_games = Game.objects.all()
    return render(request, 'landing/index.html', {'all_games': all_games})

def detail(request, game_id):
    game = get_object_or_404(Game, pk=game_id)
    return render(request, 'landing/detail.html', {'game': game})
