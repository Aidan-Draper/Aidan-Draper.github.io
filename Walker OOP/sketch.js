// Walker OOP
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
    this.speed = random(10);
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

let john;
let katherine;
let aidan;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(220);
  john = new Walker(width/2, height/2);
  katherine = new Walker(width/3, height/3);
  aidan = new Walker(width-150, height-150);
}

function draw() {
  john.display();
  katherine.display();
  aidan.display();

  john.move();
  katherine.move();
  aidan.move();
}
