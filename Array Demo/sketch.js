// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let theCircles = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  displayCircles();
}

function spawnCircle(){
  let thisCircle = {
    x:mouseX,
    y:mouseY,
    diameter:random(25, 75),
    theColor: color(random(255), random(255), random(255), random(255))
  };
  theCircles.push(thisCircle);
}

function mouseDragged(){
  spawnCircle();
}

function displayCircles(){
  theCircles.forEach((element) => {
    noStroke();
    fill(element.theColor);
    circle(element.x, element.y, element.diameter);
  });
}
