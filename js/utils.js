'use strict';

function $(id) {
    return document.getElementById(id);
}

function insertHTML(html, dest, append=false){
    // if no append is requested, clear the target element
    if(!append) dest.innerHTML = '';
    // create a temporary container and insert provided HTML code
    let container = document.createElement('div');
    container.innerHTML = html;
    // cache a reference to all the scripts in the container
    let scripts = container.querySelectorAll('script');
    // get all child elements and clone them in the target element
    let nodes = container.childNodes;
    for( let i=0; i< nodes.length; i++) dest.appendChild( nodes[i].cloneNode(true) );
    // force the found scripts to execute...
    for( let i=0; i< scripts.length; i++){
        let script = document.createElement('script');
        script.type = scripts[i].type || 'text/javascript';
        if( scripts[i].hasAttribute('src') ) script.src = scripts[i].src;
        script.innerHTML = scripts[i].innerHTML;
        document.head.appendChild(script);
        document.head.removeChild(script);
    }
    // done!
    return true;
}

function shuffle(arr) {
    for (var i = arr.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
    // ...I know, I did it in-place,
    // but returning the same array
    // is very convenient, isn't it?
    return arr;
}

function deepCopy(arr) {
    // ugly, I know, but this is the best
    // "deep copy" version I found
    return JSON.parse(JSON.stringify(arr));
}

function randomIndexes(top) {
    var arr = Array.apply(0, Array(top)).map(function(v,i) {
        return i;
    });
    return shuffle(arr);
}

function fade(elem, increment, target, callback=null) {
    var i = Number(getComputedStyle(elem).opacity) + increment;
    i = Math.max(0, Math.min(1, i));
    elem.style.opacity = i;

    if (
        (increment > 0 && i < target)
        ||
        (increment < 0 && i > target)
       ) {
        
        setTimeout(function(){
            fade(elem, increment, target, callback);
        }, 100);
        return;
    }
    
    if (callback) {
        callback();
    }
}

function generateBlocker() {
    var div = document.createElement('div');
    div.style.position = 'fixed';
    div.style.left = 0;
    div.style.top = 0;
    div.style.width = '100%';
    div.style.height = '100%';
    return div;
}

function fadeIn(elem, callback=null) {
    var div = generateBlocker();
    $('app').appendChild(div);
    fade(elem, 0.1, 1, function(){
        $('app').removeChild(div);
        if (callback) {
            callback();
        }
    });
}

function fadeOut(elem, callback=null) {
    var div = generateBlocker();
    $('app').appendChild(div);
    fade(elem, -0.1, 0, function(){
        $('app').removeChild(div);
        if (callback) {
            callback();
        }
    });
}

function pluralize(amount, singular, plural=null) {
    if (amount == 1) {
        return amount + ' ' + singular;
    }
    if (plural) {
        return amount + ' ' + plural;
    }
    var ending = 's';
    if (singular.substr(-1) == 's') {
        ending = 'es';
    }
    return amount + ' ' + singular + ending;
}