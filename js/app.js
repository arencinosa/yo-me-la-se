'use strict';

var routes = {
    home: new Route('setup', 'setup.html', true),
    game: new Route('game', 'game.html', false),
    summary: new Route('summary', 'summary.html', false)
};

var router = null;
var scheduler = null;

function initApp() {
    initGameData(function() {
        var div = document.createElement('div');
        div.style.position = 'fixed';
        div.style.top = 0;
        div.style.left = 0;
        div.style.width = '100%';
        div.style.height = '100%';
        div.style.opacity = 0.5;
        div.style.cursor = 'pointer';

        var app = $('app');

        div.addEventListener('click', function(){
            fadeOut($('app'), function(){
                scheduler = new Scheduler();
                router = new Router(Object.keys(routes).map(i => routes[i]), app);
            });
        });
        $('app').appendChild(div);
        $('progress-text').textContent = '(click para continuar)';
        $('progress-text').classList.add('flashing');
    });
}