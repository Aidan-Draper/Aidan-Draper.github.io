//Perland noise demo

let allCircles = [];

function mousePressed(){
  let theBall = {
    x: random(width),
    y: random(height),
    radius: random(50, 100),
    time: random(5000),
    theColor: color(random(255), random(255), random(255), random(255)),
  };
  allCircles.push(theBall);
}

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  noStroke();
  allCircles.forEach((element) =>{
    element.x = noise(element.time)* width;
    element.y = noise(element.time+5000)* height;
    
    //increase time along noise
    element.time += 0.01;

    fill(element.theColor);
    circle(element.x, element.y, element.radius*2);
  });
}


