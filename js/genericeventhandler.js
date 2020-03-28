'use strict';

class GenericEventHandler {
    constructor() {
        this._triggers = {};
    }

    addEventListener(event, callback) {
        if (!this._triggers[event]) {
            this._triggers[event] = [];
        }
        this._triggers[event].push(callback);
        return true;
    }

    removeEventListener(event, callback) {
        if (!this._triggers[event]) {
            return false;
        }
        for (var i = 0; i < this._triggers[event].length; i++) {
            if (this._triggers[event][i] == callback) {
                this._triggers[event].splice(i, 1);
                return true;
            }
        }
        return false;
    }

    trigger(event, params) {
        if (!this._triggers[event]) {
            return;
        }
        this._triggers[event].forEach(callback => {
            callback(params);
        });
    }
}