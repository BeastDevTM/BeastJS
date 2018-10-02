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
                    friction : 1
                },

                //const_velocity is for "constant rate of motion :P  "
                const_velocity : {
                    right : 0,
                    left : 0,
                    up : 0
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

                        //sets y equal to the screen height, because if the gravity does not,
                        //equal out to be the exact height of the canvas, this rounds it up or down:
                        eo.y = box.ncscreen.height- eo.height;
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
                    eo.gravity = false;
                    eo.velocity.up -= eo.velocity.friction / 8;
                    if(eo.velocity.up <= 0) {
                        eo.velocity.up = 0;
                        eo.gravity = true;
                    }

                    eo.y -= eo.velocity.up;
                }

                //the following 3 if statements will be for constant rate of velocity:
                if(eo.const_velocity.right !== 0) {
                    eo.x += eo.const_velocity.right;
                }

                if(eo.const_velocity.up !== 0) {
                    eo.gravity = false;
                    eo.y -= eo.const_velocity.up;
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

                    /*
                        the following 4 "if statements" add constant rate of motion to an object,
                        if the opposite motion is added on top of the other motion, they will cancel out,
                        if not specifyed otherwise.
                    */

                    if(attr === "CONSTRIGHT") {
                        box.objects[i].const_velocity.right = value;
                    }

                    if(attr === "CONSTLEFT") {
                        box.objects[i].const_velocity.left = value;
                    }

                    if(attr === "CONSTUP") {
                        box.objects[i].const_velocity.up = value;
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

            //draws the background:
            if(box.background.color !== null) {
                box.screen.fillStyle = box.background.color;
                box.screen.fillRect(0, 0, box.ncscreen.width, box.ncscreen.height);
            }

            //cycles through and updates each object
            for(i in box.objects) {
                box.objects[i].update();
            }

        }

        // returns the whole function, to make it accessible.
        return box;
    }());