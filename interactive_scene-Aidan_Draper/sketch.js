// Memory Match
// Aidan Draper
// September 27, 2022
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let state = "start";
let xCenter, yCenter, startWidth, startHeight, card, backOfCard, cardWidth, cardHeight;
let scalar = 0.2;

function preload(){
  backOfCard = loadImage("cardBackSide.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);
  textAlign(CENTER, CENTER);
  imageMode(CENTER);
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
  if (mouseInRect(xCenter - startWidth/2, xCenter + startWidth/2, yCenter - startHeight/2, yCenter + startHeight/2)) {
    fill("grey");
  }
  else {
    fill("black");
  }
  rect(xCenter, yCenter, startWidth, startHeight);
  fill("white");
  textSize((startWidth+startHeight)/4);
  text("start", xCenter, yCenter);
}

function mouseInRect(left, right, top, bottom){
  return mouseX >= left && mouseX <= right && mouseY >= top && mouseY <= bottom;
}

function mousePressed() {
  if (state === "start" && mouseInRect(xCenter - startWidth/2, xCenter + startWidth/2, yCenter - startHeight/2, yCenter + startHeight/2)){
    state = "main";
  }
  if (state === "main" && mouseInRect(xCenter - cardWidth/2, xCenter + cardWidth/2, yCenter - cardHeight/2, yCenter + cardHeight/2)){
    state = "flip";
  }
}

function placeCards(){
  cardWidth = backOfCard.width*scalar;
  cardHeight = backOfCard.height*scalar;
  image(backOfCard, xCenter, yCenter, cardWidth, cardHeight);
}

function windowResized() {
  setup();
}
