'use strict';

// const game = new Game(gameName, function(g) {
    // game.setCurrentCategory('prescolar');
// });

const scheduler = new Scheduler();

const router = new Router([
    new Route('home', 'home.html', false),
    new Route('game', 'game.html', true),
]);