from django.shortcuts import render, get_object_or_404
from .models import Game, Poll
from django.http import HttpResponseRedirect
from django.urls import reverse

def index(request):
    all_games = Game.objects.all()
    return render(request, 'landing/index.html', {'all_games': all_games})

def flappy_turd(request):
    return render(request, 'landing/flappy_turd.html')

def spacegame(request):
    return render(request, 'landing/spacegame.html')

def detail(request, game_id):
    game = get_object_or_404(Game, pk=game_id)
    return render(request, 'landing/detail.html', {'game': game})

def result(request, game_id):
    game = get_object_or_404(Game, pk=game_id)
    return render(request, 'landing/result.html', {'game': game})


def vote(request, game_id):
    game = get_object_or_404(Game, pk=game_id)
    try:
        selected_choice = game.poll_set.get(pk=request.POST['choice'])
    except (KeyError, choice.DoesNotExist):
        # Redisplay the question voting form.
        return render(request, 'polls/detail.html', {
            'game': game,
            'error_message': "You didn't select a choice.",
        })
    else:
        selected_choice.votes += 1
        selected_choice.save()
        # Always return an HttpResponseRedirect after successfully dealing
        # with POST data. This prevents data from being posted twice if a
        # user hits the Back button.

        return HttpResponseRedirect(reverse('landing:result', args=(game.id,)))
