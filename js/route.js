'use strict';

function Route(name, htmlName, isDefault=false) {
    try {
        if(!name || !htmlName) {
            throw 'error: name and htmlName params are mandatories';
        }
        this.constructor(name, htmlName, isDefault);
    } catch(e) {
        console.error(e);
    }
}

Route.prototype = {
    name: undefined,
    htmlName: undefined,
    isDefault: undefined,
    constructor: function (name, htmlName, isDefault) {
        this.name = name;
        this.htmlName = htmlName;
        this.isDefault = isDefault;
    },
    isActiveRoute: function (hashedPath) {
        return hashedPath.replace('#', '') === this.name;
    }
}