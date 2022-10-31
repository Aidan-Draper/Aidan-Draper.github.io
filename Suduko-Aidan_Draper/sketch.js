// Sudoku Generator
// Aidan Draper
// October 31, 2022
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

const ROWS = 9;
const COLS = 9;
let cellSideLength;
let unmixedBox = [1, 2, 3, 4, 5, 6, 7, 8, 9];
let sudoku = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  generateRandomBoxes (unmixedBox, sudoku);
  textAlign(CENTER, CENTER);
  console.log(sudoku);//checking progress
  if (width >= height) {
    cellSideLength = height/ROWS;
  }
  else if (height >= width) {
    cellSideLength = width/COLS;
  }
}

function draw() {
  background(220);
  displayGrid(sudoku);
}

function generateRandomBoxes (box, grid){
  box.forEach((element, index) => {
    grid.push(shuffle(box));
  });
}

//displaying each list in a row
function displayGrid(grid) {
  for (let y = 0; y<ROWS; y++) {
    for (let x = 0; x<COLS; x++) {
      rect(x*cellSideLength, y*cellSideLength, cellSideLength, cellSideLength);
      textSize(cellSideLength/4);
      text(grid[y][x], x*cellSideLength + cellSideLength/2, y*cellSideLength +cellSideLength/2);
    }
  }
}
