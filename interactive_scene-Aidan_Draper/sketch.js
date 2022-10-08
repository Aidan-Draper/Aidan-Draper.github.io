// Memory Match
// Aidan Draper
// September 27, 2022
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

//background element variables\
let questionMark, x, y, x2, y2, questionMarkWidth, questionMarkHeight;
let questionMarkScalar = 0.25;
let dx = 4;
let dy = 5;

//state variable
let state = "start";

//element placement variables
let xCenter, yCenter;

//start Screen variables
let startButtonWidth, startButtonHeight;

function preload(){
  questionMark = loadImage("questionMark.png");
}

function setup() {

  //creating the canvas
  createCanvas(windowWidth, windowHeight);

  //centering the x and y coordinates of the elements and figuring out the center of the window
  rectMode(CENTER);
  textAlign(CENTER, CENTER);
  imageMode(CENTER);
  xCenter = width/2;
  yCenter = height/2;

  //setting up background variables
  questionMarkWidth = questionMark.width*questionMarkScalar;
  questionMarkHeight = questionMark.height*questionMarkScalar;
  x = questionMarkWidth/2;
  y = questionMarkHeight/2;
  x2 = width - questionMarkWidth/2;
  y2 = height - questionMarkHeight/2;

  //setting the size of the start button in accordance with the window
  startButtonWidth = width/8;
  startButtonHeight = height/8;
}

function draw(){
  generalBackground();
  if (state === "start") {
    startScreen();
  }
}

function generalBackground() {
  background("blue");
  drawQuestionMarks();
  moveQuestionMarks();
  bounceIfNeeded();
}

function drawQuestionMarks() {
  image(questionMark, x , y, questionMarkWidth, questionMarkHeight);
  image(questionMark, x2 , y2, questionMarkWidth, questionMarkHeight);
  image(questionMark, x2 , y, questionMarkWidth, questionMarkHeight);
  image(questionMark, x , y2, questionMarkWidth, questionMarkHeight);
}

function moveQuestionMarks() {
  x += dx;
  y += dy;
  x2 -= dx;
  y2 -= dy;
}

function bounceIfNeeded() {
  if (collideRectRect(x , y, questionMarkWidth/2, questionMarkHeight/2, x , y2, questionMarkWidth/2, questionMarkHeight/2)) {
    dy *= -1;
  }
  else if (collideRectRect(x , y, questionMarkWidth/2, questionMarkHeight/2, x2 , y, questionMarkWidth/2, questionMarkHeight/2)) {
    dx *= -1;
  }
  //bounce off right wall
  else if ( x >= width - questionMarkWidth/4) {
    dx *= -1;
  }
  //bounce off left wall
  else if ( x <= 0 + questionMarkWidth/4) {
    dx *= -1;
  }
  //bounce off bottom wall
  else if ( y >= height - questionMarkHeight/4) {
    dy *= -1;
  }
  //bounce off top wall
  else if ( y <= 0 + questionMarkHeight/4) {
    dy *= -1;
  }
}

function startScreen() {
  fill("white");
  textSize(width/16);
  textFont("cursive");
  text("Memory Match", xCenter, yCenter - height/4);
}

//identifying if the mouse is touching/inside of a rectangle
function mouseInRect(left, right, top, bottom){
  return mouseX >= left && mouseX <= right && mouseY >= top && mouseY <= bottom;
}

//identifying if the mouse was pressed
function mousePressed() {
  //starting the game if the mouse was pressed in the start button
  if (state === "start" && mouseInRect(xCenter - startButtonWidth/2, xCenter + startButtonWidth/2, yCenter - startButtonHeight/2, yCenter + startButtonHeight/2)){
    state = "instructions";
  }
}

//changing the game window in accordance with the browser window
function windowResized() {
  setup();
}