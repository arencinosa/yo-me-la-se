'use strict';

const StopWatch = class extends GenericEventHandler {
    constructor(tickEvery=null, timeOut=null) {
        // this._events = new GenericEventHandler();
        super();

        this.TICK_EVENT = 'tick';
        this.TIMEOUT_EVENT = 'timeout';

        this.RUNNING = 'running';
        this.IN_PAUSE = 'in-pause';
        this.STOPPED = 'stopped';

        this._ticker = null;
        this.tickEvery = 100;
        this.timeOut = null;

        this.reset(tickEvery, timeOut);
    }

    // addEventListener(event, callback) {
        // this._events.addEventListener(event, callback);
    // }

    // removeEventListener(event, callback) {
        // this._events.removeEventListener(event, callback);
    // }

    _computeTimeOut(lapse) {
        var tOut = this.tickEvery - (Math.ceil(lapse) % this.tickEvery);
        if (this.timeOut) {
            tOut = Math.min(this.timeOut - lapse, tOut);
        }
        return tOut;
    }

    _tick() {
        this._ticker = null;

        var lapse = this.currentTime();
        if (this.timeOut && lapse >= this.timeOut) {
            this.stop();
        } else {
            this._ticker = setTimeout(this._tick.bind(this), this._computeTimeOut(lapse));
        }

        // this._events.trigger(this.TICK_EVENT, {
        this.trigger(this.TICK_EVENT, {
            instance: this,
            event: this.TICK_EVENT,
            lapse: lapse
        });
        if (this.timeOut && lapse >= this.timeOut) {
            // this._events.trigger(this.TIMEOUT_EVENT, {
            this.trigger(this.TIMEOUT_EVENT, {
                instance: this,
                event: this.TIMEOUT_EVENT,
                lapse: lapse
            });
        }
    }

    reset(tickEvery=null, timeOut=null) {
        if (this._ticker) {
            clearTimeout(this._ticker);
        }
        if (tickEvery) {
            this.tickEvery = tickEvery;
        }
        if (timeOut) {
            this.timeOut = timeOut;
        }

        this.startTime = 0;
        this.stopTime = 0;
        this.status = this.STOPPED;
    }

    start() {
        if (this.status == this.RUNNING) {
            // raise some error?
            return;
        }

        if (this.status == this.STOPPED) {
            this.reset();
        }
        var lapse = this.stopTime - this.startTime;
        this.startTime = performance.now() - lapse;
        this.stopTime = null;
        this.status = this.RUNNING;

        if (this.tickEvery) {
            this._ticker = setTimeout(this._tick.bind(this), this._computeTimeOut(lapse));
        }
    }

    pause() {
        if (this.status == this.IN_PAUSE) {
            // should it toggle the status?
            return;
        }

        this.stopTime = performance.now();
        this.status = this.IN_PAUSE;
        
        if (this._ticker) {
            clearTimeout(this._ticker);
        }   
    }

    stop() {
        this.pause();
        this.status = this.STOPPED;
    }

    currentTime() {
        var spTime = (this.status == this.RUNNING) ? performance.now() : this.stopTime;
        return spTime - this.startTime;
    }
}