// Start Screen Demo
// Aidan Draper
// October 3, 2022

let state = "start";
let card;
let scalar = 0.1;

function preload(){
  card = loadImage("card.jpg");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  if (state === "start") {
    startScreen();
  }
  if (state === "main"){
    image(card, 0, 0, scalar*card.width, scalar*card.height);
  }
}

function mousePressed() {
  if (state === "start" && mouseInButton(400, 700, 400, 550)){
    state = "main";
  }
}
function startScreen(){
  if (mouseInButton(400, 700, 400, 550)) {
    fill("grey");
  }
  else {
    fill("black");
  }
  rect(400, 400, 300, 150);
  fill("white");
  textSize(50);
  text("start", 500, 500);

}

function mouseInButton(left, right, top, bottom){
  return mouseX >= left && mouseX <= right && mouseY >= top && mouseY <= bottom;
}
