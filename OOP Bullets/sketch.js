// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

class Bullet {
  constructor(x, y){
    this.x = x;
    this.y = y;
    this.radius = 10;
    this.dx = 20;
    this.theColor = "brown";
  }

  display() {
    stroke(this.theColor);
    fill(this.theColor);
    circle(this.x, this.y, this.radius*2);
  }

  move() {
    this.x += this.dx;
  }

  isDead() {
    return this.x >= width;
  }
}

let theBullets = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  rect(500, 500, 50, 200);
  for (let i = 0; i < theBullets.length; i++){
    theBullets[i].move();
    if (theBullets[i].isDead()){
      theBullets.splice(i, 1);
    }
    else {
      theBullets[i].display();
    }
  }
}

function mousePressed() {
  for (let i = 0; i< 101; i++) {
    let someBullet = new Bullet(500, 500);
    theBullets.push(someBullet);
  }
}
