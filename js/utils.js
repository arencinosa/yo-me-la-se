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

function randomIndexes(top) {
    var arr = Array.apply(0, Array(top)).map(function(v,i) {
        return i;
    });
    return shuffle(arr);
}