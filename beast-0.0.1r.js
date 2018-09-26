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
    box.Objects = []; 

    box.init = (canvas) => {
        //fancy smanshy stuff:
        console.log('%c**BEAST.JS RUNNING**', 'background: red; color: black; display: block; font-weight: bold;');
        
        //box.screen is basicly a fancy name for "context".
        box.screen = document.getElementById(canvas)
            .getContext('2d');

        //sets the update interval
        setInterval(box.update, 10);
    };

    //CO stands for "Create Object".
    box.CO = (x, y, w, h) => {
        let eo = {
            x : x,
            y : y,
            w : w,
            h : h
        };
    };

    //AA stands for "Add Attribute".
    box.AA = (obj, att) => {

    };

    //Main update loop:
    box.update = () => {

    };

    //
    return box;
}());