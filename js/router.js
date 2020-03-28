'use strict';

class Router {
    constructor(routes) {
        if(!routes) {
            throw 'error: routes param is mandatory';
        }

        this.routes = routes;
        this.rootElem = document.getElementById('app');
        
        this.init();
    }

    init() {
        var r = this.routes;
        (function(scope, r){
            window.addEventListener('hashchange', function(e){
                scope.hasChanged(scope, r);
            });
        })(this, r);
        this.hasChanged(this, r);
    }
    
    hasChanged(scope, r) {
        if (window.location.hash.length == 0) {
            // looking for default route
            for (var i = 0; i < r.length; i++) {
                var route = r[i];
                if (route.isDefault) {
                    window.location.hash = '#' + route.name;
                    return;
                }
            }
            // fallback: first route
            window.location.hash = '#' + r[0].name;
            return;
        }

        for (var i = 0; i < r.length; i++) {
            var route = r[i];
            if (route.isActiveRoute(window.location.hash.substr(1))) {
                scope.goToRoute(route.htmlName);
            }
        }
    }

    // redirectTo(obj) {
        // if 
    // }

    goToRoute(htmlName) {
        (function(scope) {
            var url = 'views/' + htmlName + '?rnd=' + Math.random();
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState === 4 && this.status === 200) {
                    // scope.rootElem.innerHTML = this.responseText;
                    insertHTML(this.responseText, scope.rootElem);
                }
            };
            xhttp.open('GET', url, true);
            xhttp.send();
        })(this);
    }
}