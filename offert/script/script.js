window.onload = function() {
    gridDefine();
    setup();
}

function gridDefine() {
    const root = document.getElementById('container-root');
    const width = window.innerWidth;
    const height = window.innerHeight;
    columnNumber = 8;
    rowNumber = 8;

    columnSize = Math.floor(width / columnNumber) -6;
    row = Math.floor(height / rowNumber) -6;

    root.style.gridTemplateColumns = `repeat(${columnNumber}, ${columnSize}px)`;
    root.style.gridTemplateRows = `repeat(${rowNumber}, ${row}px)`;

    console.log(`Grid defined: ${columnSize}px columns, ${row}px rows`);
    console.log(`Margin defined: ${marginSize}px`);
}

function setup() {
  var lineCanvas = createCanvas(window.innerWidth, 400);
  lineCanvas.parent("line-canvas-container");
}

function mousePressed() {
    flower(mouseX);
}

function flower(x) {
    numero = Math.floor(Math.random() * 21);
    altura = Math.floor(Math.random() * 300) + 100;

    /* let img = document.createElement("img");
    img.src = `./media/flores-seuil/flores${numero}.jpg`;
    img.style.position = "absolute";
    img.style.border = 'solid 0.5px black';

    img.style.mixBlendMode = 'difference'; */

    let img = document.createElement("img");
    img.src = `./media/flores-satura/flores${numero}.png`;
    img.style.position = "absolute";
    img.style.height = `${altura}px`;
    img.style.left = `${x - altura/2}px`;
    img.style.bottom = 0;

    let rectangle = document.createElement("div");
    rectangle.style.position = "absolute";
    rectangle.style.left = `${x - altura/1.5}px`;
    rectangle.style.bottom = 0;
    rectangle.style.width = `${altura}px`;
    rectangle.style.height = `${altura}px`;
    rectangle.style.backgroundColor = "red";
    rectangle.style.zIndex = 998;

	document.getElementById('florero').appendChild(img);
    document.getElementById('recta').appendChild(rectangle);
}