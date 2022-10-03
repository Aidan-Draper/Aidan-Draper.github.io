// Practice
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"
let cardImage, x, y, cardWidth, cardHeight, distanceFromEdge;
let scalar = 0.15;

function preload(){
  cardImage = loadImage("card_back_purple.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background("white");
  drawCards();
}

function drawCards(){
  cardWidth = cardImage.width*scalar;
  cardHeight = cardImage.height*scalar;
  distanceFromEdge = 100;
  for (x = distanceFromEdge; x < windowWidth - cardWidth; x+= cardWidth) {
    for (y = distanceFromEdge; y < windowHeight - cardHeight; y+= cardHeight) {
      image(cardImage, x, y, cardWidth, cardHeight);
    }
  }
}

function windowResized() {
  setup();
}

