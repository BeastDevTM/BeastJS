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
        //fancy smanshy stuff:
        console.log('%c**BEAST.JS RUNNING**', 'background: red; color: black; display: block; font-weight: bold;');

        //box.screen is basicly a fancy name for "context".
        box.screen = document.getElementById(canvas)
            .getContext('2d');

        //sets the update interval
        setInterval(box.update, 10);
    };

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

            //draws the object on the Canvas / box.screen
            box.screen.fillRect(eo.x, eo.y, eo.width, eo.height);
        };

        //adds the object to the main list of objects.
        box.objects.push(eo);
    };

    //AA stands for "Add Attribute".
    box.AA = function(obj, att) {
        //  XXXXXXXXXXXXXXXXXXXXXXX
        //  XX List of attrs are XX
        //  XX found in readme   XX
        //  XXXXXXXXXXXXXXXXXXXXXXX

	for(i in box.objects) {
		if(box.objects[i] === obj) {
			console.log("found object");
		}
	}
    };

    //Main update loop:
    box.update = () => {
        box.screen.clearRect(0, 0, box.screen.width, box.screen.height);

        //cycles through each object
        for(i in box.objects) {
            box.objects[i].update();
        };

    };

    // returns the whole function, to make it accessible.
    return box;
}());
