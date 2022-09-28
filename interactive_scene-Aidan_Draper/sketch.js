// Memory Match
// Aidan Draper
// September 27, 2022
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let cardImage, scalar, x, y, cardWidth, cardHeight;

function preload(){
  cardImage = loadImage("card_back_purple.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  cardWidth = cardImage.width*scalar;
  cardHeight = cardImage.height*scalar;
}

function draw() {
  background(220);
  drawCard();
}

function drawCard(){

}