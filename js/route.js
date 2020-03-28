'use strict';

class Route {
    constructor(name, htmlName, isDefault=false) {
        if(!name || !htmlName) {
            throw 'error: name and htmlName params are mandatories';
        }
        this.name = name;
        this.htmlName = htmlName;
        this.isDefault = isDefault;
    }

    isActiveRoute(hashedPath) {
        return hashedPath.replace('#', '') === this.name;
    }
}