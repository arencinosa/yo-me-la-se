'use strict';

const GameStats = class {
    constructor() {
        this.wrongAnswers = 0;
        this.correctAnswers = 0;
    }

    newWrongAnswer() {
        this.wrongAnswers++;
    }

    newCorrectAnswer() {
        this.correctAnswers++;
    }
}

const Game = class {
    constructor(name="", callback=undefined) {
        this.name = name;
        this.stats = new GameStats();
        this.currentCategory = undefined;
        this.currentIndex = -1;
        this.data = {};

        (function(self, callback) {
            var url = 'data/dataset.json?rnd=' + Math.random();
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState === 4 && this.status === 200) {
                    self.data = JSON.parse(this.responseText);
                    self.currentCategory = self.getCategories()[0];
                    if (callback) {
                        callback(self);
                    }
                }
            };
            xhttp.open('GET', url, true);
            xhttp.send();
        })(this, callback);
    }

    getCategories() {
        return Object.keys(this.data);
    }

    getQuestions(category) {
        return this.data[category];
    }

    setCurrentCategory(category) {
        this.currentCategory = category;
        this.currentIndex = -1;
    }

    currentQuestion() {
        return this.data[this.currentCategory][this.currentIndex];
    }

    nextQuestion() {
        this.currentIndex++;
        return this.currentQuestion();
    }

    checkAnswer(answer, gameStats=undefined) {
        if (answer == this.currentQuestion().o[0]) {
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