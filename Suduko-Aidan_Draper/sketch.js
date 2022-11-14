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
let unmixedList = [1, 2, 3, 4, 5, 6, 7, 8, 9];
let rows = [];
let boxes, columns;
let paper, borderPaper;
let timesRun = 0;

function preload() {
  paper = loadImage("paper.jpg");
  borderPaper = loadImage("borderPaper.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  textAlign(CENTER, CENTER);

  //generating a list of the 9 rows with each containing the numbers 1-9
  generateRandomRows(rows, unmixedList);
  console.log(rows);//checking progress

  //obtaining the list of the 9 boxes and the numbers they each contain
  boxes = obtainBoxArrays(rows);
  console.log(boxes);//checking progress

  //obtaining the list of the 9 columns and the numbers they contain
  columns = obtainColumnArrays(rows);
  console.log(columns);//checking progress
  
  //sort the boxes
  sortBoxes();

  //sort the columns
  sortColumns();

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

// make this look better
function generateRandomRows(grid, row){
  for (let i = 0; i < row.length; i++){
    grid.push(shuffle(row));
  }
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
  for(let y=0; y < grid.length; y++){
    let tempInnerArray = [];
    for(let x=0; x < grid[y].length; x++){
      tempInnerArray.push(grid[x][y]);
    }
    tempOuterArray.push(tempInnerArray);
  }
  return tempOuterArray;
}

function convertBoxCoordinateToRowCoordinate(y, x){
  let tempY = 3*Math.floor(y/3) + Math.floor(x/3);
  let tempX = x % 3 + 3 * (y % 3);
  return {y: tempY, x: tempX};
}

function convertColumnCoordinateToRowCoordinate(y, x){
  let tempY = x;
  let tempX = y;
  return {y: tempY, x: tempX};
}

function convertColumnCoordinateToBoxCoordinate(y, x){
  let tempY = Math.floor(y/3) + 3*Math.floor(x/3);
  let tempX = y % 3 + 3 * (x % 3);
  return {y: tempY, x: tempX};
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
          numberMultiples.thirdIndex = i;
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

function sortBoxes(){
  for (let y = 0; y < boxes.length; y++){
    for (let x = 0; x < boxes[y].length; x++){
      let numberMultiples = checkNumberMultiples(boxes[y], x);
      if (numberMultiples.amount !== 0){
        let rowCoor = convertBoxCoordinateToRowCoordinate(y, numberMultiples.firstIndex);
        let rowCoor2 = convertBoxCoordinateToRowCoordinate(y, numberMultiples.secondIndex);
        boxSwapIfPossible(rowCoor2, y);
        //if all of the numbers in the multiples second indeces are already in the box, then you revert back to the first occurence of that number
        if(rowCoor === rowCoor2){
          boxSwapIfPossible(rowCoor, y);
        }
      }
    }
  } 
}

function boxSwapIfPossible(rowCoordinate, y){
  for (let i = rowCoordinate.x + 1; i < rows[y].length; i++){
    if (!boxes[y].includes(rows[rowCoordinate.y][i])){
      rows[rowCoordinate.y] = swapNumbers(rows[rowCoordinate.y], rowCoordinate.x, i);
      boxes = obtainBoxArrays(rows);
      break;
    }
  }
}

function sortColumns(){
  for (let y = 0; y < columns.length; y++){
    for (let x = 0; x < columns[y].length; x++){
      sortWithRecursion(y, x);
    }
  }
  for (let y = 0; y < columns.length; y++){
    for (let x = 0; x < columns[y].length; x++){
      swapUntilNumberFound(y, x);
    }
  }
}

function sortWithRecursion(y, x){
  let numberMultiples = checkNumberMultiples(columns[y], x);
  let rowCoor = convertColumnCoordinateToRowCoordinate(y, numberMultiples.firstIndex);
  let rowCoor2 = convertColumnCoordinateToRowCoordinate(y, numberMultiples.secondIndex);
  if(numberMultiples.amount !== 0){
    if(rowCoor2.x%3 === 0){
      columnSwapIfPossible(rowCoor2, y, 2);
      if (rowCoor === rowCoor2){
        columnSwapIfPossible(rowCoor, y, 2);
      }
    }
    else if(rowCoor2.x%3 === 1){
      columnSwapIfPossible(rowCoor2, y, 1);
      if (rowCoor === rowCoor2){
        columnSwapIfPossible(rowCoor, y, 1);
      }
    }

    if (rowCoor === rowCoor2){
      rows[rowCoor.y] = swapNumbers(rows[rowCoor.y], rowCoor.x+1);
      columns = obtainColumnArrays(rows);
      sortWithRecursion(y, x);
    }
  }
}


function swapUntilNumberFound(y, x){
  let numberMultiples = checkNumberMultiples(columns[y], x);
  let rowCoor = convertColumnCoordinateToRowCoordinate(y, numberMultiples.secondIndex);
  if (numberMultiples.amount === 0){
    return "hazza";
  }
  else {
    if (!columns[y].includes(rows[rowCoor.y][rowCoor.x+1])){
      rows[rowCoor.y] = swapNumbers(rows[rowCoor.y], rowCoor.x, rowCoor.x+1);
      columns = obtainColumnArrays(rows);
    }
    else{
      if (timesRun < 19){
        rows[rowCoor.y] = swapNumbers(rows[rowCoor.y], rowCoor.x, rowCoor.x+1);
        columns = obtainColumnArrays(rows);
        timesRun++;
        swapUntilNumberFound(y, numberMultiples.secondIndex);
      }
      else{
        abandon();
      }
    }
  }
}

function abandon(){
  console.log("abandoning");
  rows = [];
  //generating a list of the 9 rows with each containing the numbers 1-9
  generateRandomRows(rows, unmixedList);
  console.log(rows);//checking progress

  //obtaining the list of the 9 boxes and the numbers they each contain
  boxes = obtainBoxArrays(rows);
  console.log(boxes);//checking progress

  //obtaining the list of the 9 columns and the numbers they contain
  columns = obtainColumnArrays(rows);
  console.log(columns);//checking progress
  
  //sort the boxes
  sortBoxes();

  //sort the columns
  sortColumns();
}

function columnSwapIfPossible(rowCoordinate, y, number){
  for (let i = rowCoordinate.x + 1; i <= rowCoordinate.x + number; i++){
    if (!columns[y].includes(rows[rowCoordinate.y][i])){
      rows[rowCoordinate.y] = swapNumbers(rows[rowCoordinate.y], rowCoordinate.x, i);
      columns = obtainColumnArrays(rows);
      break;
    }
  }
}

function isPerfect(){
  let perfect = true;
  for (let y = 0; y < rows.length; y++){
    for (let x = 0; x < rows[y].length; x++){
      let multiples = checkNumberMultiples(rows[y], x);
      if (multiples.amount !== 0){
        perfect = false;
      }
    }
  }
  for (let y = 0; y < boxes.length; y++){
    for (let x = 0; x < boxes[y].length; x++){
      let multiples = checkNumberMultiples(boxes[y], x);
      if (multiples.amount !== 0){
        perfect = false;
      }
    }
  }
  for (let y = 0; y < columns.length; y++){
    for (let x = 0; x < columns[y].length; x++){
      let multiples = checkNumberMultiples(columns[y], x);
      if (multiples.amount !== 0){
        perfect = false;
      }
    }
  }
  return perfect;
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
