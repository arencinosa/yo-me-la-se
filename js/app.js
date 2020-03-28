'use strict';

var routes = {
    home: new Route('home', 'home.html', true),
    game: new Route('game', 'game.html', false),
    summary: new Route('summary', 'summary.html', false)
};

var router = null;
var scheduler = null;

function initApp() {
    initGameData(function() {
        fadeOut($('app'), function(){
            scheduler = new Scheduler();
            router = new Router(Object.keys(routes).map(i => routes[i]));
        });
    });
}