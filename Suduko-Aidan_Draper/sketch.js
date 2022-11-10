// Sudoku Generator
// Aidan Draper
// October 31, 2022
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

//ideas
//make functions to figure out the index in the row array given the one form the box or column arrays
//make register number funtion

let cellSideLength;
let unmixedBox = [1, 2, 3, 4, 5, 6, 7, 8, 9];
let rows = [];
let boxes, columns;
let paper, borderPaper;

function preload() {
  paper = loadImage("paper.jpg");
  borderPaper = loadImage("borderPaper.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  textAlign(CENTER, CENTER);

  //generating a list of the 9 rows with each containing the numbers 1-9
  generateRandomRows(rows, unmixedBox);
  console.log(rows);//checking progress

  //obtaining the list of the 9 boxes and the numbers they each contain
  boxes = obtainBoxArrays(rows);
  console.log(boxes);//checking progress

  //obtaining the list of the 9 columns and the numbers they contain
  columns = obtainColumnArrays(rows);
  console.log(columns);//checking progress
  
  //setting the rows size in accordance with the window size
  if (width >= height) {
    cellSideLength = height/rows.length;
  }
  else if (height >= width) {
    cellSideLength = width/rows.length;
  }
}

function draw() {
  background(220);
  displayGrid(rows);
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

function checkNumberMultiples(array, index){
  let numberMultiples = {amount: 0, firstIndex: index};
  for(let i = 0; i<array.length; i++){
    if(i !== index){//not counting self
      if(array[i] === array[index]){//checking if it's the same number
        if(numberMultiples.amount !== 1){//checking if it's the first or second multiple of that number in the array
          numberMultiples.secondIndex = i;
        }
        else{
          numberMultiples.thridIndex = i;
        }
        numberMultiples.amount ++;
      }
    }
  }
  return numberMultiples;
}

function swapNumbers(array, index1, index2){
  let originalIndex1Value = array[index1];
  array[index1] = array[index2];
  array[index2] = originalIndex1Value;
  return array;
}

function displayGrid(grid) {
  for (let y = 0; y<grid.length; y++) {
    for (let x = 0; x<grid.length; x++) {
      image(paper, x*cellSideLength, y*cellSideLength, cellSideLength, cellSideLength);
    }
  }
  for (let y = 0; y<3; y++) {
    for (let x = 0; x<3; x++) {
      image(borderPaper, x*cellSideLength*3, y*cellSideLength*3, cellSideLength*3, cellSideLength*3);
    }
  }
  for (let y = 0; y<grid.length; y++) {
    for (let x = 0; x<grid.length; x++) {
      textSize(cellSideLength/4);
      text(grid[y][x], x*cellSideLength + cellSideLength/2, y*cellSideLength +cellSideLength/2);
    }
  }
}


