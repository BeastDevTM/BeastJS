/*
 ____  ____   __   ____  ____          __  ____
(  _ \(  __) / _\ / ___)(_  _)       _(  )/ ___)
 ) _ ( ) _) /    \\___ \  )(    _   / \) \\___ \
(____/(____)\_/\_/(____/ (__)  (_)  \____/(____/v0.0.1r

*/
window.Beast = (function() {
//when I declare "box", it means the "holder" or box for this function.
    let box = {};
    //box.Objects stores all of the objects that this function makes.
    box.objects = [];
    box.init = function(canvas) {
        //you could remove this if you want :P 
        console.log('<!> BEAST.JS RUNNING <!>');
        //box.screen is basicly a fancy name for "context".
        box.screen = document.getElementById(canvas).getContext('2d');
        //sets the update interval
        setInterval(box.update, 10);
    }
    //parameter specifications for box.CO function:
    /**
     * @param {string} name
     * @param {number} x
     * @param {number} y
     * @param {number} w
     * @param {number} h
     */
    //CO stands for "Create Object".
    box.CO = function(name, x, y, w, h) {
        //eo stands for "empty object".
        let eo = {
            name : name, //basically the id, but name looks better
            x : x,
            y : y,
            width : w,
            height : h
        };
        // this is what the main "box.update" function will call,
        // when it goes through each object and updates it.
        eo.update = function() {
            //attr functions:
            eo.setColor();
            //draws the object on the Canvas / box.screen
            box.screen.fillRect(eo.x, eo.y, eo.width, eo.height);
        }
        eo.setColor = function() {
            // checks if color has been added or not:
            if(eo.color !== undefined) {
                box.screen.fillStyle = eo.color;
            } else {   
                //if it hasnt, the program wont do anything.
                return null;
            }
        }
        //adds the object to the main list of objects.
        box.objects.push(eo);
    }
    //parameter specs for box.AA function:
    /**
     * @param {object} obj
     * @param {string} attr
     */
    //AA stands for "Add Attribute".
    box.AA = function(obj, attr, value) {
        //  XXXXXXXXXXXXXXXXXXXXXXX
        //  XX List of attrs are XX
        //  XX found in readme   XX
        //  XXXXXXXXXXXXXXXXXXXXXXX
	    for(i in box.objects) {
            //If the Selection is valid:
		    if(box.objects[i].name === obj) {
                console.log("<*> Found object <*>");
                //Here is where the "FUN" begins:
                    //sets the color for the target object:
                if(attr === "COLOR") {
                    box.objects[i].color = value;
                }   
            }
	    }
    }
    //Main update loop:
    box.update = function() {
        //clears the screen before everythings draws again, so nothing overlaps.
        box.screen.clearRect(0, 0, box.screen.width, box.screen.height);
        //cycles through each object
        for(i in box.objects) {
            box.objects[i].update();
        }
    }
    // returns the whole function, to make it accessible.
    return box;
}());