//Bullets
//Aidan

class Bullet {
  constructor(x, y, image){
    this.x = x;
    this.y = y;
    this.radius = 10;
    this.dx = 20;
    this.theColor = "black";
    this.image = image;
  }

  display() {
    image(this.image, this.x, this.y, this.image.width*0.1, this.image.height*0.1);
  }

  move() {
    this.x += this.dx;
  }

  isDead() {
    return this.x >= width;
  }
}

let theBullets = [];
let bulletImage;

function preload (){
  bulletImage = loadImage("bullet.png");
}

function setup() {
  rectMode(CENTER);
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  fill("red");
  rect(475, 600, 50, 200);
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
    let someBullet = new Bullet(500, 500, bulletImage);
    theBullets.push(someBullet);
  }
}
