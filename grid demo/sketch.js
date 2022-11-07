// Basic grid demo
// Aidan Draper
// october 25, 2022

let gridSize = [12, 8];
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
        fill("green");
      }
      else if (grid[y][x] === 1) {
        fill("red");
      }
      else if (grid[y][x] === 2) {
        fill("lightblue");
      }
      else if (grid[y][x] === 3) {
        fill("grey");
      }
      else if (grid[y][x] === 4) {
        fill("black");
      }
      else if (grid[y][x] === 5) {
        fill("navy");
      }
      rect(x*cellHeight, y*cellHeight, cellHeight, cellHeight);
    }
  }
}

function mousePressed() {
  let x = Math.floor(mouseX/cellHeight);
  let y = Math.floor(mouseY/cellHeight);

  if (grid[y][x] === 5){
    grid[y][x] = 0;
  }
  else{
    grid[y][x] += 1;
  }
}
