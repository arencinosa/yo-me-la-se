'use strict;'

const Scheduler = class {
    constructor(gameName) {
        this.gameName = gameName;
        Math.seedrandom(gameName);
    }

    init(players) {
        // ugly, I know, but this is the best "deep copy" version I found
        this.players = shuffle(JSON.parse(JSON.stringify(players)));
        
        this.games = {};
        this.players.forEach(player => {
            player.stats = new GameStats();
            
            if (this.games[player.category]) {
                return;
            }
            this.games[player.category] = new Game(this.gameName, function(game) {
                game.setCurrentCategory(player.category);
            });
        });
        this.currentIndex = -1;
    }

    next() {
        // for simplicity, let's say we are just round-robin'ing
        // between players, moving forward to the next question
        // on his/her category
        this.currentIndex = (this.currentIndex + 1) % this.players.length;
        return {
            player: this.currentPlayer(),
            question: this.currentGame().nextQuestion()
        }
    }

    currentPlayer() {
        return this.players[this.currentIndex];
    }

    currentPlayerIndex() {
        return this.currentIndex;
    }

    currentGame() {
        return this.games[this.currentPlayer().category];
    }
}