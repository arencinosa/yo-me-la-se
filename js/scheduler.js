'use strict';

class Scheduler {
    get wildcardGame() { return this.games[Game.WILDCARD_CATEGORY]; }
    
    constructor(gameName, players=null, randomize=true) {
        this.gameName = gameName;
        Math.seedrandom(gameName);

        this.games = {};
        this.games[Game.WILDCARD_CATEGORY] = new Game(Game.WILDCARD_CATEGORY);
        this.init(0, players, randomize);
    }

    init(rounds, players=null, randomize=true) {
        var wcGame = this.wildcardGame;
        wcGame.reset();
        this.games = {};
        this.games[Game.WILDCARD_CATEGORY] = wcGame;
        this.wildcardTurn = false;
        this.players = [];

        if (!players) {
            return;
        }

        deepCopy(players).forEach(player => {
            player.stats = new GameStats();
            
            if (this.games[player.category]) {
                this.games[player.category].players.push(player);
                return;
            }
            this.games[player.category] = new Game(player.category);
            this.games[player.category].players = [ player ];
        });
        this.rounds = rounds;
        this.totalRounds = rounds;

        var categories = Object.keys(this.games).filter(x => x != '*');
        categories.forEach(cat => {
            if (cat == Game.WILDCARD_CATEGORY) {
                return;
            }
            this.rounds = Math.min(
                            this.rounds, 
                            Math.floor(
                                this.games[cat].getQuizzes().length 
                                / 
                                this.games[cat].players.length
                            )
                        );
        });
        if (randomize == true || randomize.shuffleCategories) {
            shuffle(categories);
        }
        if (randomize == true || randomize.shufflePlayers) {
            categories.forEach(cat => {
                shuffle(this.games[cat].players);
            });
        }
        if (randomize == true || randomize.mergeCategories) {
            // I will over-complicate this in order
            // to be as respectful as possible with
            // the expected behavior (couldn't find
            // a better way)
            var playersList = [];
            categories.forEach(cat => {
                playersList.push(this.games[cat].players);
            });
            var i;
            while (playersList.length != 0) {
                i = randInt(0, playersList.length-1);
                this.players.push(playersList[i].shift());
                if (playersList[i].length == 0) {
                    playersList.splice(i,1);
                }
            }
        } else {
            categories.forEach(cat => {
                this.games[cat].players.forEach(player => {
                    this.players.push(player);
                });
            });
        }

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

    getCurrentRound() {
        return this.totalRounds - this.rounds + 1;
    }

    getTotalRounds() {
        return this.totalRounds;
    }

    getTotalPlayers(){
        return this.players.length;
    }

    reScheduleQuiz() {
        if (this.currentGame().reScheduleQuiz()) {
            return true;
        }
        var g = (this.wildcardTurn)
                    ? this.games[this.currentPlayer().category]
                    : this.wildcardGame;
        if (g.reScheduleQuiz()) {
            this.wildcardTurn = !this.wildcardTurn;
            return true;
        }

        return false;
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