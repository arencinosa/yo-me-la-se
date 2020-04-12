'use strict';

var _game_data = {};
function initGameData(callback) {
    fetch('data/dataset.json?rnd=' + Math.random())
    .then((response) => {
        return response.json();
    })
    .then((json) => {
        var gd = {};
        Object.keys(json).forEach(cat => {
            var qs = json[cat].filter(x => x.question != null && x.question != "");
            if (qs.length > 0) {
                gd[cat] = shuffle(qs);
            }
        })
        _game_data = gd;
        callback();
    });
}

class GameStats extends GenericEventHandler {
    static get STATS_CHANGED_EVENT() { return 'stats_changed'};

    get totalAnswers() {
        return this.correctAnswers + this.wrongAnswers;
    }
    get correctness() {
        return (this.correctAnswers / this.totalAnswers).toFixed(2);
    }

    constructor() {
        super();
        this.wrongAnswers = 0;
        this.correctAnswers = 0;
    }

    newWrongAnswer() {
        this.wrongAnswers++;
        this.trigger(GameStats.STATS_CHANGED_EVENT, {
            instance: this,
            event: GameStats.STATS_CHANGED_EVENT,
            causedBy: this.newWrongAnswer.name,
            oldValue: this.wrongAnswers-1,
            newValue: this.wrongAnswers
        });
    }

    newCorrectAnswer() {
        this.correctAnswers++;
        this.trigger(GameStats.STATS_CHANGED_EVENT, {
            instance: this,
            event: GameStats.STATS_CHANGED_EVENT,
            causedBy: this.newCorrectAnswer.name,
            oldValue: this.correctAnswers-1,
            newValue: this.correctAnswers
        });
    }
}

class Game {
    static get WILDCARD_CATEGORY() { return '*' };
    static get _data() { return _game_data; };
    static get categories() {
        return Object.keys(Game._data);
    }
    static getQuizzesAmount(category) {
        var quizzes = Game._data[category];
        if (quizzes) {
            return quizzes.length;
        }
        return 0;
    }

    constructor(category=null) {
        this.currentCategory = category;

        this.reset();
    }

    reset() {
        var category = this.currentCategory || Game.WILDCARD_CATEGORY;
        if ( !(category in Game.categories) ) {
            this.setCurrentCategory(Game.categories[0]);
        }
        this.setCurrentCategory(category);
    }

    getQuizzes(category=null) {
        category = category || this.currentCategory;
        return Game._data[category];
    }

    setCurrentCategory(category) {
        this.currentCategory = category;
        this.currentIndex = -1;
    }

    currentQuiz() {
        try {
            return Game._data[this.currentCategory][this.currentIndex];
        } catch (e) {
            return null;
        }
    }

    nextQuiz() {
        this.currentIndex++;
        return this.currentQuiz();
    }

    checkAnswer(answer, gameStats=null) {
        if (answer == this.currentQuiz().options[0]) {
            if (gameStats) {
                gameStats.newCorrectAnswer();
            }
            return true;
        }
        if (gameStats) {
            gameStats.newWrongAnswer();
        }
        return false;
    }
}