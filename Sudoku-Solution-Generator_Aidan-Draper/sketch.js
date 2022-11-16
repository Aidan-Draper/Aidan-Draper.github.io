// Sudoku Solution Generator
// Aidan Draper
// November 14, 2022
//
// Extra for Experts:
// - To go above and beyond in this project, I taught myself how to use recursion for my function swapUntilNumberFound(y, x), which I belive was one of the best ways to do it
// - In addition I figured out all of the math to convert between row, box and column coordinates with my arrays

//setting up variables to use throughout the program
let unmixedList = [1, 2, 3, 4, 5, 6, 7, 8, 9];
let rows, boxes, columns;
let paper, borderPaper;
let cellSideLength;
let timesRun;

//preloading the background images
function preload() {
  paper = loadImage("paper.jpg");
  borderPaper = loadImage("borderPaper.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  //algning the text in the middle of the squares
  textAlign(CENTER, CENTER);

  //aligning button center
  rectMode(CENTER);

  //loads a random sudoku
  for(let i=0; i<1000; i++){
    load();
  }


  //setting the box size in accordance with the window size
  if (width >= height) {
    cellSideLength = height/rows.length;
  }
  else if (height >= width) {
    cellSideLength = width/rows.length;
  }
}

function draw() {
  background(220);
  //displaying grid
  displayGrid(rows);
  makeButton(width - width/8, height/2, width/8, height/8, "red", "blue", "black", width/40, "calibri", "Generate another");
}


//DISPLAYING GRID
function displayGrid(grid) {
  //putting a square paper for every square in the grid
  for (let y = 0; y<grid.length; y++) {
    for (let x = 0; x<grid.length; x++) {
      image(paper, x*cellSideLength, y*cellSideLength, cellSideLength, cellSideLength);
    }
  }

  //placing the border paper for every 3x3 grid
  for (let y = 0; y<3; y++) {
    for (let x = 0; x<3; x++) {
      image(borderPaper, x*cellSideLength*3, y*cellSideLength*3, cellSideLength*3, cellSideLength*3);
    }
  }

  //placing the numbers in the squares
  for (let y = 0; y<grid.length; y++) {
    for (let x = 0; x<grid.length; x++) {
      textSize(cellSideLength/4);
      text(grid[y][x], x*cellSideLength + cellSideLength/2, y*cellSideLength +cellSideLength/2);
    }
  }
}


//SET UP THE BUTTON
//creating a function to write text with the following inputs rather than input them each time
function writeText(color, font, size, theText, textX, textY, wrapWidth, wrapHeight) {
  fill(color);
  textFont(font);
  textSize(size);
  text(theText, textX, textY, wrapWidth, wrapHeight);
}

//creating a function to draw a rectangle with the following inputs rather than input them each time
function createRectangle(color, rectX, rectY, rectWidth, rectHeight) {
  fill(color);
  rect(rectX, rectY, rectWidth, rectHeight);
}

//identifying whether the mouse is in the rectangle given the center coordinates and the size
function mouseInRect(rectX, rectY, rectWidth, rectHeight) {
  return mouseX >= rectX - rectWidth / 2 && mouseX <= rectX + rectWidth / 2 && mouseY >= rectY - rectHeight / 2 && mouseY <= rectY + rectHeight / 2;
}

//creating a rectangle that uses mouse detection to change if it is hovered over
function makeButton(buttonX, buttonY, buttonWidth, buttonHeight, color, hoverColor, textColor, widthOfText, font, theText) {
  let rectColor;
  if (mouseInRect(buttonX, buttonY, buttonWidth, buttonHeight)) {
    rectColor = hoverColor;
  }
  else {
    rectColor = color;
  }
  createRectangle(rectColor, buttonX, buttonY, buttonWidth, buttonHeight);
  writeText(textColor, font, widthOfText, theText, buttonX, buttonY, buttonWidth, buttonHeight);
}

//identifying if the mouse was pressed and the location to determine if a button was pressed
function mousePressed() {
  //generate a new sudoku when the button is pressed
  if (mouseInRect(width - width/10, height/2, width/8, height/8)) {
    load();
  }
}


//RUNNING THE FUNCTIONS BELLOW TO LOAD A SUDOKU
function load(){

  //setting/reseting rows to be an empty array
  rows = [];

  //setting/reseting our infinite loop check to 0
  timesRun = 0;

  //generating a list of the 9 rows with each containing the numbers 1-9
  generateRandomRows(rows, unmixedList);
  console.log(rows);//print rows array in console for easy access

  //obtaining the list of the 9 boxes and the numbers they each contain
  boxes = obtainBoxArrays(rows);
  console.log(boxes);//print boxes array in console for easy access

  //obtaining the list of the 9 columns and the numbers they contain
  columns = obtainColumnArrays(rows);
  console.log(columns);//print columns array in console for easy access
  
  //sort the boxes
  sortBoxes();

  //sort the columns
  sortColumns();

  //this is purely a double check, even though the other functions will produce a perfect sudoku everytime
  //you could delete this and the isPerfect function, the only difference is that you would have to manually verify
  if (isPerfect){
    console.log("Perfect");
  }
  else{
    console.log("fail");
  }

}


//GETTING THE ARRAYS
//given an emptyArray and an array, this function produces a 2D array filled with shuffled versions of the original array given
function generateRandomRows(emptyArray, array){
  //for each element in the array, push a shuffled version of that array into the emptyArray
  for (let i = 0; i < array.length; i++){
    emptyArray.push(shuffle(array));
  }
}

//get the box arrays from the row arrays we just made
function obtainBoxArrays() {
  //make an outer array to push the individual box arrays into
  let tempOuterArray = [];

  //going through every element in the rows (9x9) array
  for (let y = 0; y<rows.length; y++) {
    for (let x = 0; x<rows[y].length; x++) {

      //if the element is the middle of a 3x3 box then...
      if((y=== 1 || y=== 4 || y=== 7) && (x=== 1 || x=== 4 || x=== 7)){

        //create a new array to put the box's values into
        let tempInnerArray = [];

        //push every element in that box into the array
        for(let i = y-1; i<=y+1; i++){
          for(let j = x-1; j<=x+1; j++){
            tempInnerArray.push(rows[i][j]);
          }
        }

        //push the inner array into the outer array
        tempOuterArray.push(tempInnerArray);
      }
    }
  }
  //return the 2D array of the boxes
  return tempOuterArray;
}

//get the column arrays from the row arrays we just made
function obtainColumnArrays() {
  //make an outer array to push the individual column arrays into
  let tempOuterArray = [];

  //going through every element in the rows (9x9) array
  for(let y=0; y < rows.length; y++){

    //creating an inner array to store each individual column before pushing it and moving on
    let tempInnerArray = [];

    //for every x y coordinate, push the opposite, because columns are the opposite indeces as the rows
    for(let x=0; x < rows[y].length; x++){
      tempInnerArray.push(rows[x][y]);
    }

    //push the inner array to the outer array
    tempOuterArray.push(tempInnerArray);
  }
  //return the outer array with all the individual columns in it
  return tempOuterArray;
}


//MAKING FUNCTIONS TO USE THROUGHOUT THE SORTING PROCESS
//given a box coordinate, this function converts it to it's row coordinate
function convertBoxCoordinateToRowCoordinate(y, x){
  //multipling y/3 floored by 3 gives you which level box you are in, either 0, 3 or 6
  //then dividing x by 3 tells you which row it is of the three in the box, either 0, 3 or 6
  //and adding them together gives you the y coordinate
  let tempY = 3*Math.floor(y/3) + Math.floor(x/3);

  //multiplying 3 by y%3 gives you which column box you are in, either 0, 1 or 2
  //then getting the remainder of x/3 tells you which column in the box you are in either 0, 1 or 2
  //and adding them together gives you the x coordinate
  let tempX = x % 3 + 3 * (y % 3);

  //returning the row y, x coordinate for the number
  return {y: tempY, x: tempX};
}

//given a column coordinate, this function converts it to it's row coordinate by flipping it around
function convertColumnCoordinateToRowCoordinate(y, x){
  let tempY = x;// y = x
  let tempX = y;// x = y
  return {y: tempY, x: tempX};
}

//given an array and an index, this function goes through and checks if there are multiples
//it records the amount in excess and the indices of each multiple and the originals indeces
function checkNumberMultiples(array, index){

  //make object to record the amount extra and the indeces
  let numberMultiples = {amount: 0, firstIndex: index};

  //going throught to see if any number matches it
  for(let i = 0; i<array.length; i++){

    if(i !== index){//not counting self

      //checking if it's the same number
      if(array[i] === array[index]){

        //checking if it's the first or second multiple of that number in the array and gig=ving it the correct index association
        if(numberMultiples.amount !== 1){
          numberMultiples.secondIndex = i;
        }
        else{
          numberMultiples.thirdIndex = i;
        }

        //adding to the amount of multiples
        numberMultiples.amount ++;
      }
    }
  }
  //returning the object containing the amount and the indeces
  return numberMultiples;
}

//swapping two numbers in an array
function swapNumbers(array, index1, index2){
  //make a new variable so that you don't end up with two of the same number
  let originalIndex1Value = array[index1];

  array[index1] = array[index2];
  array[index2] = originalIndex1Value;

  //returning the new array
  return array;
}


//SORT THE SUDOKU
//sort the boxes array
function sortBoxes(){
  //for each number in the box, check if it has any number multiples
  for (let y = 0; y < boxes.length; y++){
    for (let x = 0; x < boxes[y].length; x++){
      let numberMultiples = checkNumberMultiples(boxes[y], x);
      if (numberMultiples.amount !== 0){

        //if the number has multiples then convert the first and second indeces into their row coordinates through variables
        let rowCoor = convertBoxCoordinateToRowCoordinate(y, numberMultiples.firstIndex);
        let rowCoor2 = convertBoxCoordinateToRowCoordinate(y, numberMultiples.secondIndex);

        //swap the second occurence of the number with a different number in that row that isn't in the box if possible
        boxSwapIfPossible(rowCoor2, y);

        //if all of the numbers in the multiples second indeces are already in the box, then you revert back to the first occurence of that number
        if(rowCoor === rowCoor2){
          //swap the first occurence of the number with a different number in that row that isn't in the box if possible
          boxSwapIfPossible(rowCoor, y);
        }
      }
    }
  } 
}


function boxSwapIfPossible(rowCoordinate, y){
  //look at every number in that row after this one
  for (let i = rowCoordinate.x + 1; i < rows[y].length; i++){
    //if that number isn't in the box then swap them and change the array to the new one
    if (!boxes[y].includes(rows[rowCoordinate.y][i])){
      rows[rowCoordinate.y] = swapNumbers(rows[rowCoordinate.y], rowCoordinate.x, i);

      //update the boxes
      boxes = obtainBoxArrays(rows);

      //break the loop
      break;
    }
  }
}

//sort the columns
function sortColumns(){

  //sort the columns similar to how the boxes were sorted
  standardSort();

  //for every number in the column, if it has a multiple, swap with the number to it's right until it finds an unregistered number
  for (let y = 0; y < columns.length; y++){
    for (let x = 0; x < columns[y].length; x++){
      swapUntilNumberFound(y, x);
    }
  }
}

function standardSort(y, x){
  //for every number in the columns array sort it in a similar way to how we sorted the boxes
  for (let y = 0; y < columns.length; y++){
    for (let x = 0; x < columns[y].length; x++){

      //check if the number has any multiples
      let numberMultiples = checkNumberMultiples(columns[y], x);

      if(numberMultiples.amount !== 0){
        // if the number has multiples, convert the first and second indeces to their row coordinates   
        let rowCoor = convertColumnCoordinateToRowCoordinate(y, numberMultiples.firstIndex);
        let rowCoor2 = convertColumnCoordinateToRowCoordinate(y, numberMultiples.secondIndex);

        //determining whether you can switch with 1 or 2 numbers to the right
        if(rowCoor2.x%3 === 0){//can swap with 2 to the right

          //if it found a number not in the column, is swaps places
          columnSwapIfPossible(rowCoor2, y, 2);

          //if it didn't with the second indeces, it tries with the first
          if (rowCoor === rowCoor2){
            columnSwapIfPossible(rowCoor, y, 2);
          }
        }
        else if(rowCoor2.x%3 === 1){//can swap with one to the right

          //if it found a number not in the column, is swaps places
          columnSwapIfPossible(rowCoor2, y, 1);

          //if it didn't with the second indeces, it tries with the first
          if (rowCoor === rowCoor2){
            columnSwapIfPossible(rowCoor, y, 1);
          }
        }
      }
    }
  }

}

function columnSwapIfPossible(rowCoordinate, y, number){
  //look at every number in the box after this one
  for (let i = rowCoordinate.x + 1; i <= rowCoordinate.x + number; i++){
    //if that number isn't in the column then swap them and change the array to the new one
    if (!columns[y].includes(rows[rowCoordinate.y][i])){
      rows[rowCoordinate.y] = swapNumbers(rows[rowCoordinate.y], rowCoordinate.x, i);

      //update the columns
      columns = obtainColumnArrays(rows);

      //break the loop
      break;
    }
  }
}

//this function uses recursion to swap a multiple of another number with the number to it's right until it finds an unregistered number
function swapUntilNumberFound(y, x){

  //make a variable with the amount of multiples of thath number and their indeces
  let numberMultiples = checkNumberMultiples(columns[y], x);

  //if the number has multiples then...
  if(numberMultiples.amount !== 0) {

    //convert the second indeces coordinate to a row coordinate
    let rowCoor = convertColumnCoordinateToRowCoordinate(y, numberMultiples.secondIndex);

    //if the number to it's right isn't in the column, switch
    if (!columns[y].includes(rows[rowCoor.y][rowCoor.x+1])){
      rows[rowCoor.y] = swapNumbers(rows[rowCoor.y], rowCoor.x, rowCoor.x+1);
      columns = obtainColumnArrays(rows);
    }

    //otherwise as long as we haven't passed the infinite loop check, we swap the second indeces with the number to it's right and we run the function again with that number
    else{
      if (timesRun < 108){//I chose 108 because theoretically every first or second row could get hung up until it finds the 18th number, that's 6 rows, 6x18 =108
        
        //swap with the number next to it and update the array
        rows[rowCoor.y] = swapNumbers(rows[rowCoor.y], rowCoor.x, rowCoor.x+1);

        //update the columns
        columns = obtainColumnArrays(rows);

        //add to the infinite loop check
        timesRun++;

        //run the function again with the new number
        swapUntilNumberFound(y, numberMultiples.secondIndex);
      }

      //if it's an infinite loop, log that it was abandoned and restart the whole process
      else{
        console.log("abandoned");
        load();
      }
    }
  }
}


//DOUBLE CHECK
//this function is not necessary, and could be removed at anytime (as long as you remove when it was called)
//it purely provides a double check
function isPerfect(){
  //set a variable to true, and if anything goes wrong, change it to false
  let perfect = true;
  //check rows
  for (let y = 0; y < rows.length; y++){
    for (let x = 0; x < rows[y].length; x++){
      let multiples = checkNumberMultiples(rows[y], x);
      if (multiples.amount !== 0){
        perfect = false;
      }
    }
  }
  //check boxes
  for (let y = 0; y < boxes.length; y++){
    for (let x = 0; x < boxes[y].length; x++){
      let multiples = checkNumberMultiples(boxes[y], x);
      if (multiples.amount !== 0){
        perfect = false;
      }
    }
  }
  //check columns
  for (let y = 0; y < columns.length; y++){
    for (let x = 0; x < columns[y].length; x++){
      let multiples = checkNumberMultiples(columns[y], x);
      if (multiples.amount !== 0){
        perfect = false;
      }
    }
  }
  //return the variable
  return perfect;
}
