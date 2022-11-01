// Sudoku Generator
// Aidan Draper
// October 31, 2022
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let cellSideLength;
let unmixedBox = [1, 2, 3, 4, 5, 6, 7, 8, 9];
let sudoku = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  textAlign(CENTER, CENTER);

  generateRandomRows(sudoku, unmixedBox);
  console.log(sudoku);//checking progress
  
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

function displayGrid(grid) {
  for (let y = 0; y<grid.length; y++) {
    for (let x = 0; x<grid.length; x++) {
      rect(x*cellSideLength, y*cellSideLength, cellSideLength, cellSideLength);
      textSize(cellSideLength/4);
      text(grid[y][x], x*cellSideLength + cellSideLength/2, y*cellSideLength +cellSideLength/2);

      // let tempArray = [];
      // if(y%2){
      // //look at all cells surounding the middle of the array
      //   for(let i = y-1; i<= y+1; i++){
      //     for(let  j= x-1; j<= x+1; j++){
      //       tempArray.push(grid[i][j]);
      //     }
      //   }
      //   console.log(tempArray);
      // }
    }
  }
}

