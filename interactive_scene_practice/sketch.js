// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"
let cardImage;
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
  let cardWidth = cardImage.width*scalar;
  let cardHeight = cardImage.height*scalar;
  let distanceFromEdge = 100;
  for (let x = distanceFromEdge; x < windowWidth - cardWidth; x+= cardWidth) {
    for (let y = distanceFromEdge; y < windowHeight - cardHeight; y+= cardHeight) {
      image(cardImage, x, y, cardWidth, cardHeight);
    }
  }
}

function windowResized() {
  setup();
}

