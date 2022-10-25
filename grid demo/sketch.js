// Basic grid demo
// Aidan Draper
// october 25, 2022

let gridSize = [3, 3];
let grid = [];
for(let i = 0; i<gridSize[0]; i++){
  let innerGrid = [];
  for(let j = 0; j<gridSize[1]; j++){
    innerGrid.push(0);
  }
  grid.push(innerGrid);
}

let cellWidth;
let cellHeight;

function setup() {
  createCanvas(windowWidth, windowHeight);
  cellWidth = width/grid[0].length;
  cellHeight = height/grid.length;
}

function draw() {
  background(220);
  displayGrid(grid);
}

function displayGrid(grid) {
  for (let y = 0; y<grid.length; y++) {
    for (let x = 0; x<grid[y].length; x++) {
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

function mousePressed() {
  let x = Math.floor(mouseX/cellWidth);
  let y = Math.floor(mouseY/cellHeight);

  if (grid[y][x] === 0){
    grid[y][x] = 1;
  }
  else if (grid[y][x] === 1){
    grid[y][x] = 0;
  }
}
