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
            box.ncscreen = document.getElementById(canvas);
            box.screen = box.ncscreen.getContext('2d');

            //box.background is for reference to background color, and collision bounds.
            box.background = {
                color : null,
                //Bounds are for collision detection
                bounds : {
                    x1 : 0,
                    y1 : 0,
                    x2 : box.ncscreen.width,
                    y2 : box.ncscreen.height
                }
            };

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
                height : h,
                gravityENABLED : false, gravity : 0, gspeed : 0,
                //stuff for RO FUNCTION: push:

                velocity : {
                    right : 0,
                    left : 0,
                    up : 0,
                    down : 0,
                    friction : 1
                },

                //const_velocity is for "constant rate of motion :P  "
                const_velocity : {
                    right : 0,
                    left : 0,
                    up : 0,
                    down : 0,
                    friction : 1
                }
            };
            // this is what the main "box.update" function will call,
            // when it goes through each object and updates it.
            eo.update = function() {

                //attr functions:
                eo.setColor();

                //gravity stuff:
                if(eo.gravityENABLED === true) {

                    //accelaration stuff
                    eo.gravity += eo.gspeed / 4;
                    if(eo.gravity >= eo.gspeed * 10) {
                        eo.gravity -=eo.gspeed / 4;
                    }

                    eo.y += eo.gravity;
                    //if object is out of bounds:
                    if(eo.y >= box.background.bounds.y2 - eo.height) {
                        eo.y -= eo.gravity;
                    }
                }

                //the following are push functions
                if(eo.velocity.right !== 0) {
                    eo.velocity.right -= eo.velocity.friction / 8;
                    if(eo.velocity.right <= 0) {
                        eo.velocity.right = 0;
                    }
                    
                    eo.x += eo.velocity.right;
                }

                if(eo.velocity.left !== 0) {
                    eo.velocity.left -= eo.velocity.friction / 8;
                    if(eo.velocity.left <= 0) {
                        eo.velocity.left = 0;
                    }
                    
                    eo.x -= eo.velocity.left;
                }

                if(eo.velocity.up !== 0) {
                    eo.velocity.up -= eo.velocity.friction / 16;
                    if(eo.velocity.up <= 0) {
                        eo.velocity.up = 0;
                    }

                    eo.y -= eo.velocity.up;
                }

                //draws the object on the Canvas / box.screen
                box.screen.fillRect(eo.x, eo.y, eo.width, eo.height);
            }

            //sets the color, duh.
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
                    //Here is where the "FUN" begins:
                        //sets the color for the target object:
                    if(attr === "COLOR") {
                        box.objects[i].color = value;
                    }

                    //Adds gravity(constant rate of downward force + acceleration) to an object:
                    if(attr === "GRAVITY") {
                        box.objects[i].gravityENABLED = true;
                        box.objects[i].gspeed = value;
                    }

                    if(attr === "CONSTRIGHT") {
                        box.objects[i].const_velocity.right = value;
                    }

                }
            }
        }

        /**
         * @param {object} obj
         * @param {string} attr
         */

        //"RO" stands for "RUN ONCE"
        box.RO = function(obj, attr, value) {

            //same stuff thats in box.AA:
            for(i in box.objects) {
                if(box.objects[i].name = obj) {

                    if(attr === "PUSHRIGHT") {

                        //adds velocity to the selected object:
                        box.objects[i].velocity.right = value;
                    }
                    
                    if(attr === "PUSHLEFT") {
                        
                        box.objects[i].velocity.left = value;
                    }

                    if(attr === "PUSHUP") {
                        box.objects[i].velocity.up = value;
                    }
                }
            }
        }

        //Main update loop:
        box.update = function() {

            //clears the screen before everythings draws again, so nothing overlaps:
            box.screen.clearRect(0, 0, 9999, 9999);

            //cycles through and updates each object
            for(i in box.objects) {
                box.objects[i].update();
            }
        }

        // returns the whole function, to make it accessible.
        return box;
    }());