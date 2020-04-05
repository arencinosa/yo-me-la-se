'use strict';

class Scheduler {
    get wildcardGame() { return this.games[Game.WILDCARD_CATEGORY]; }
    
    constructor(gameName, players=null) {
        this.gameName = gameName;
        Math.seedrandom(gameName);

        this.games = {};
        this.games[Game.WILDCARD_CATEGORY] = new Game(Game.WILDCARD_CATEGORY);
        this.init(0, players);
    }

    init(rounds, players=null) {
        var wcGame = this.wildcardGame;
        wcGame.reset();
        this.games = {};
        this.games[Game.WILDCARD_CATEGORY] = wcGame;
        this.wildcardTurn = false;

        this.players = (players) ? shuffle(deepCopy(players)) : [];
        this.players.forEach(player => {
            player.stats = new GameStats();
            
            if (this.games[player.category]) {
                this.games[player.category].activePlayers++;
                return;
            }
            this.games[player.category] = new Game(player.category);
            this.games[player.category].activePlayers = 1;
        });
        if (!players) {
            return;
        }

        this.rounds = rounds;
        Object.keys(this.games).forEach(cat => {
            if (cat == Game.WILDCARD_CATEGORY) {
                return;
            }
            this.rounds = Math.min(
                            this.rounds, 
                            Math.floor(
                                this.games[cat].getQuizzes().length 
                                / 
                                this.games[cat].activePlayers
                            )
                        );
        });
        this.players[this.players.length-1].stats.addEventListener(
            GameStats.STATS_CHANGED_EVENT, 
            function() {
                scheduler.rounds--;
            }
        );
        this.currentIndex = -1;
    }

    next() {
        if (this.rounds == 0) {
            // i.e., no rounds left
            return null;
        }

        // for simplicity, let's say we are just round-robin'ing
        // between players, moving forward to the next question
        // on his/her category (or, if any, from those in the
        // wildcard game)
        this.currentIndex = (this.currentIndex + 1) % this.players.length;
        
        var arr = [
            this.games[this.currentPlayer().category],
            this.wildcardGame
        ];
        var rnd = Math.random();
        if (rnd >= 0.7) {
            // let's try first with default (wildcard) game
            arr = [
                arr[1],
                arr[0]
            ];
        }
        for (var i = 0; i < arr.length; i++) {
            if (!arr[i]) {
                continue;
            }
            var quiz = arr[i].nextQuiz();
            if (quiz) {
                this.wildcardTurn = (arr[i] == this.wildcardGame);
                return {
                    player: this.currentPlayer(),
                    quiz: quiz
                }
            }
        }
        return null;
    }

    currentPlayer() {
        return this.players[this.currentIndex];
    }

    currentPlayerIndex() {
        return this.currentIndex;
    }

    currentGame() {
        if (this.wildcardTurn) {
            return this.wildcardGame;
        }
        return this.games[this.currentPlayer().category];
    }
}