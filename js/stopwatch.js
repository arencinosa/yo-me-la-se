'use strict';

const StopWatch = class {
    constructor() {
        this.RUNNING = 'running';
        this.IN_PAUSE = 'in-pause';
        this.STOPPED = 'stopped';

        this.reset();
    }

    reset() {
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
        this.startTime = performance.now() - (this.stopTime - this.startTime);
        this.stopTime = undefined;
        this.status = this.RUNNING;
    }

    pause() {
        if (this.status == this.IN_PAUSE) {
            // should it toggle the status?
            return;
        }

        this.stopTime = performance.now();
        this.status = this.IN_PAUSE;
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