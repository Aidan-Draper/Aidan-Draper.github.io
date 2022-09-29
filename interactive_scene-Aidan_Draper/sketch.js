// Memory Match
// Aidan Draper
// September 27, 2022
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let theImage, cardImage, otherSide, scalar, x, y, cardWidth, cardHeight;

function preload(){
  cardImage = loadImage("card_back_purple.png");
  otherSide = loadImage("playing_card.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  scalar = 0.15;
  cardWidth = cardImage.width*scalar;
  cardHeight = cardImage.height*scalar;
  theImage = cardImage;
  x = 10;
  y = 10;
}

function draw() {
  background(220);
  drawCard();
}

function drawCard(){
  image(theImage, x, y, cardWidth, cardHeight);
}

function mousePressed(){
  if (mouseX > x && mouseX <= cardWidth && mouseY > y && mouseY >= cardHeight){
    theImage = otherSide;
  }
}

function windowResized() {
  setup();
}
