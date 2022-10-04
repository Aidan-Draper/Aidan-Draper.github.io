// Memory Match
// Aidan Draper
// September 27, 2022
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let state = "start";
let xCenter, yCenter, startWidth, startHeight, card, backOfCard;
let scalar = 0.1;

function preload(){
  backOfCard = loadImage("cardBackSide");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  xCenter = width/2;
  yCenter = height/2;
  startWidth = width/8;
  startHeight = height/8;
}

function draw(){
  background(220);
  if (state === "start") {
    startScreen();
  }
  if (state === "main") {
    placeCards();
  }
}

function startScreen(){
  if (mouseInRect()) {
    fill("grey");
  }
  else {
    fill("black");
  }
  rect(xCenter, yCenter, startWidth, startHeight);
  fill("white");
  textSize(startWidth);
  text("start", xCenter, yCenter);
}

function mouseInRect(left, right, top, bottom){
  return mouseX >= left && mouseX <= right && mouseY >= top && mouseY <= bottom;
}
