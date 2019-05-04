//BEAST JS
//AUTHOR : BEASTDEV
//STARTED ON : FRIDAY MAY 3, 2019
//PURPOSE : Simplify HTML AND CSS using Bootstrap

(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = global || self, factory(global.Beast = {}));
}(this, function (exports) {
    'use strict'

    var link = document.createElement("link");
    link.href = "https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css";
    link.type = "text/css";
    link.rel = "stylesheet";
    document.getElementsByTagName("head")[0].appendChild(link)

    var Elements = [];

    /**
     * @author BeastDev
     * @date Friday May 4th 2019
     */

    var Container = (id) => {
        var cont = document.createElement("div")
        cont.className = "container";
        cont.id = id;

        Elements.push(InitElement(id, cont))
        document.body.appendChild(cont)
    };

    /**
     * @author BeastDev
     * @date Friday May 4th 2019
     */

    var Bigscreen = (id) => {
        var bigscreen = document.createElement("div")
        bigscreen.className = "jumbotron";
        bigscreen.id = id;

        Elements.push(InitElement(id, bigscreen))
        document.body.appendChild(bigscreen)
    }

    /**
     * @author BeastDev
     * @date Friday May 4th 2019
     */

    var Header = (id, size, text) => {
        var header = document.createElement("h1")
        header.innerText = text;
        header.className = `display-${size}`;
        header.id = id;

        Elements.push(InitElement(id, header))
        document.body.appendChild(header)
    }

    function InitElement(id, raw) {
        return {
            id: id,
            raw: raw
        };
    }

    /**
     * @author BeastDev
     * @date Friday May 4th 2019
     */

    var Insert = (IN, SELECTED) => {
        var selected = undefined;
        var insertselected = undefined

        for(var e in Elements){
            if(Elements[e].id === IN) {
                selected = Elements[e].raw;
            }

            if(Elements[e].id === SELECTED) {
                insertselected = Elements[e].raw;
            }
        }

        if(selected === undefined) return;
        if(insertselected === undefined) return;

        var selectedElement = document.getElementById(IN);
        var selectedInsert = document.getElementById(SELECTED);

        selectedInsert.remove()

        selectedElement.appendChild(selectedInsert);
    }

    exports.Container = Container;
    exports.Bigscreen = Bigscreen;
    exports.Header = Header;
    exports.Insert = Insert;

    Object.defineProperty(exports, '__esModule', { value: true });
}))

//example:
Beast.Bigscreen(1)
Beast.Container(0)

Beast.Header(2, 3, "Hello World!")

Beast.Insert(0, 1)
Beast.Insert(1, 2)
