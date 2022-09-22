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
  drawCards();
}

function drawCards(){
  for (let x = 100; x < windowWidth - 100; x+= 100) {
    for (let y = 100; y < windowHeight - 150; y+= 150) {
      image(img, x, y, 100, 150);
    }
  }
}

function windowResized() {
  setup();
}

