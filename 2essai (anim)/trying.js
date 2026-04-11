function gridDefine() {
    const root = document.getElementById('container-root');
    const width = window.innerWidth;
    const height = window.innerHeight;

    rowNumber = 50;
    rowSize = Math.floor(height / rowNumber) -1;

    columnNumber = Math.floor(width / rowSize);
    columnSize = Math.floor(width / columnNumber) -1;

    root.style.gridTemplateColumns = `repeat(${columnNumber}, ${columnSize}px)`;
    root.style.gridTemplateRows = `repeat(${rowNumber}, ${rowSize}px)`;

    console.log(`Grid defined: ${columnSize}px columns, ${rowSize}px rows`);
}

window.onload = function() {
    gridDefine();
};