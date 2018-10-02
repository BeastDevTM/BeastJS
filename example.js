//BEAST JS EXAMPLE:

//STARTS THE INTERVAL:
Beast.init("gcanvas");

//CREATES THE OBJECT AND GIVES IT COLOR:
Beast.CO("box1", 0, 0, 200, 200);
Beast.AA("box1", "COLOR", "blue");

var whattodo = 0;
while(1 === 1) {
  if(whattodo === 1) {
    Beast.AA("box1", "GRAVITY", 1);
    Beast.RO("box1", "PUSHRIGHT", 10);
  }
}

