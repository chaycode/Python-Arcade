from django.conf.urls import url
from . import views

app_name = 'landing'

urlpatterns = [
    #/
    url(r'^$', views.index, name='index'),

    #/413/favorite
    # url(r'^(?P<game_id>[0-9]+)/favorite/$', views.favorite, name='detail' ),

    url(r'^(?P<game_id>[0-9]+)/vote/$', views.vote, name='vote'),

    #/413
    url(r'^(?P<game_id>[0-9]+)$', views.detail, name='detail' ),

    url(r'^(?P<game_id>[0-9]+)/result/$', views.result, name='result'),

    url(r'^play_turd/$', views.flappy_turd, name='flappy')

]
