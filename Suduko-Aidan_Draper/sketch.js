// Sudoku Generator
// Aidan Draper
// October 31, 2022
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let cellSideLength;
let unmixedBox = [1, 2, 3, 4, 5, 6, 7, 8, 9];
let sudoku = [];
let boxArrayList, columnArrayList;

function setup() {
  createCanvas(windowWidth, windowHeight);
  textAlign(CENTER, CENTER);

  //generating a list of the 9 rows with each containing the numbers 1-9
  generateRandomRows(sudoku, unmixedBox);
  console.log(sudoku);//checking progress

  //obtaining the list of the 9 boxes and the numbers they each contain
  boxArrayList = obtainBoxArrays(sudoku);
  console.log(boxArrayList);//checking progress

  //obtaining the list of the 9 columns and the numbers they contain
  columnArrayList = obtainColumnArrays(sudoku);
  console.log(columnArrayList);//checking progress
  
  //setting the sudoku size in accordance with the window size
  if (width >= height) {
    cellSideLength = height/sudoku.length;
  }
  else if (height >= width) {
    cellSideLength = width/sudoku.length;
  }
}

function draw() {
  background(220);
  displayGrid(sudoku);
}

function generateRandomRows(grid, row){
  row.forEach((element, index) => {
    grid.push(shuffle(row));
  });
}

function obtainBoxArrays(grid) {
  let tempOuterArray = [];
  for (let y = 0; y<grid.length; y++) {
    for (let x = 0; x<grid[y].length; x++) {
      if((y=== 1 || y=== 4 || y=== 7) && (x=== 1 || x=== 4 || x=== 7)){
        let tempInnerArray = [];
        for(let i = y-1; i<=y+1; i++){
          for(let j = x-1; j<=x+1; j++){
            tempInnerArray.push(grid[i][j]);
          }
        }
        tempOuterArray.push(tempInnerArray);
      }
    }
  }
  return tempOuterArray;
}

function obtainColumnArrays(grid) {
  let tempOuterArray = [];
  for(let i=0; i<grid.length; i++){
    let tempInnerArray = [];
    for(let j=0; j<grid[i].length; j++){
      tempInnerArray.push(grid[j][i]);
    }
    tempOuterArray.push(tempInnerArray);
  }
  return tempOuterArray;
}

function displayGrid(grid) {
  let tempOuterArray = [];
  for (let y = 0; y<grid.length; y++) {
    for (let x = 0; x<grid.length; x++) {
      rect(x*cellSideLength, y*cellSideLength, cellSideLength, cellSideLength);
      textSize(cellSideLength/4);
      text(grid[y][x], x*cellSideLength + cellSideLength/2, y*cellSideLength +cellSideLength/2);
    }
  }
}

