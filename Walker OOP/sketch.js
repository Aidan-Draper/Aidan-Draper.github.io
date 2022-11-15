// Walker OOP Arrays
// Aidan Draper
// november 14, 2022
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

class Walker {
  constructor(x, y){
    this.x = x;
    this.y = y;
    this.color = color(random(255), random(255), random(255));
    this.speed = 5;
    this.radius = 2;
  }

  display() {
    stroke(this.color);
    fill(this.color);
    circle(this.x, this.y, this.radius*2);
  }

  move() {
    let choice = random(100);
    if (choice < 25){
      this.y -= this.speed;
    }
    else if (choice < 50){
      this.y += this.speed;
    }
    else if (choice < 75){
      this.x -= this.speed;
    }
    else if (choice < 100) {
      this.x += this.speed;
    }
  }
}

let walkerArray = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  spawnWalker();
}

function draw() {
  for(let i = 0; i < walkerArray.length; i++){
    walkerArray[i].move();
    walkerArray[i].display();
  }

}

function spawnWalker() {
  let john = new Walker(random(width), random(height));
  walkerArray.push(john);
}

function keyPressed() {
  spawnWalker();
}