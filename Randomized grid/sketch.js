// Randomized 2d grid
// Aidan
// october 26, 2022

const ROWS = 40;
const COLS = 40;
let grid;
let cellWidth;
let cellHeight;

function setup() {
  createCanvas(windowWidth, windowHeight);
  cellWidth = width/COLS;
  cellHeight = height/ROWS;
  grid = createRandom2dArray(ROWS, COLS);
}

function draw() {
  background(220);
  displayGrid(grid);
}

function displayGrid(grid) {
  for (let y = 0; y<ROWS; y++) {
    for (let x = 0; x<COLS; x++) {
      if (grid[y][x] === 0) {
        fill("white");
      }
      else if (grid[y][x] === 1) {
        fill("black");
      }
      rect(x*cellWidth, y*cellHeight, cellWidth, cellHeight);
    }
  }
}

function create2dArray(COLS, ROWS) {
  let emptyArray = [];
  for(let y = 0; y<ROWS; y++){
    emptyArray.push([]);
    for(let x = 0; x<COLS; x++){
      emptyArray[y].push(0);
    }
  }
  return emptyArray;
}

function createRandom2dArray(COLS, ROWS) {
  let emptyArray = [];
  let theNumber = 0;
  for(let y = 0; y<ROWS; y++){
    emptyArray.push([]);
    for(let x = 0; x<COLS; x++){
      if (random(100) < 50){
        theNumber = 1;
      }
      else{
        theNumber = 0;
      }
      emptyArray[y].push(theNumber);
    }
  }
  return emptyArray;
}

function mousePressed() {
  let x = Math.floor(mouseX/cellWidth);
  let y = Math.floor(mouseY/cellHeight);

  if(grid[y][x] ===1){
    grid[y][x] = 0;
  }
  else if(grid[y][x] ===0){
    grid[y][x] = 1;
  }

}
