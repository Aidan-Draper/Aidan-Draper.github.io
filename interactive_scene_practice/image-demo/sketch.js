// Image Demo
// Aidan Draper
// Sept 22, 2022
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"
let dog;


function preload(){
  dog = loadImage("dog.jpg");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER);
}

function draw() {
  background(220);
  image(dog, mouseX, mouseY, 1000, 500);
}
