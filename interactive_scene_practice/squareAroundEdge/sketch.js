// Square around edge
// Aidan Draper
// Sept 26, 2022
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let x, y, squareSize, speed, state;

function setup() {
  createCanvas(windowWidth, windowHeight);
  x = 0;
  y = 0;
  squareSize = windowWidth/8;
  speed = 5;
  state = "right";
}

function draw() {
  background(220);
  drawSquare();
  moveSquare();
}

function drawSquare(){
  fill("black");
  square(x, y, squareSize);
}

function moveSquare(){
  if (state === "right"){
    x += speed;
    if (x + squareSize >= windowWidth){
      x = windowWidth - squareSize; //don't fall off edge
      state = "down";
    }
  }
  else if (state === "down"){
    y += speed;
    if (y + squareSize >= windowHeight){
      y = windowHeight - squareSize; //don't fall off edge
      state = "left";
    }
  }
  else if (state === "left"){
    x -= speed;
    if (x <= 0){
      x = 0; //don't fall off edge
      state = "up";
    }
  }
  else if (state === "up"){
    y -= speed;
    if (y <= 0){
      y = 0; //don't fall off edge
      state = "right";
    }
  }
}