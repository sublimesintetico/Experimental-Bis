window.onload = function() {
    setup();
}

function setup() {
  var lineCanvas = createCanvas(window.innerWidth, window.innerHeight);
  lineCanvas.parent("line-canvas-container");
}

function mousePressed() {
    
    cruz(mouseX, mouseY);
}

function cruz(x, y) {
    var lineCanvas = document.getElementById("line-canvas-container").querySelector("canvas");
    var ctx = lineCanvas.getContext("2d");
    
    if (y < window.innerWidth / 2) {
        square.strokeStyle = "black";
        square.x = x - 20;
        square.y = y - 20;
        square.width = 40;
        square.height = 40;
    } else {
        square.strokeStyle = "red";
        square.x = x - 20;
        square.y = y - 20;
        square.width = 40;
        square.height = 40;
    }     

}

