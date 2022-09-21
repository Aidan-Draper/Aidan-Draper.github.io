// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"
let img;

function preload(){
  img = loadImage("card_back_purple.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background("white");
  image(img, windowWidth/2, windowHeight/2, 100, 150);
}

function windowResized() {
  setup();
}

