//Fireworks OOP
//Aidan Draper

class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.diameter = random(1, 3);
    this.dx = random(-5, 5);
    this.dy = random(-5, 5);
    this.r = 255;
    this.g = 0;
    this.b = 0;
    this.alpha = 255;
    this.color = color(this.r, this.g, this.b, this.alpha);
  }

  update() {
    //move
    this.x += this.dx;
    this.y += this.dy;
    
    //making more transparent
    this.alpha--;
    this.color = color(this.r, this.g, this.b, this.alpha);
  }

  display() {
    stroke(this.color);
    fill(this.color);
    circle(this.x, this.y, this.diameter);
  }
}

let theFireworks = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background("black");
  for (let i = 0; i < theFireworks.length; i++){
    theFireworks[i].update();
    theFireworks[i].display();
  }
}

function mousePressed() {
  for (let i = 0; i< 101; i++) {
    let someParticle = new Particle(mouseX, mouseY);
    theFireworks.push(someParticle);
  }
}

