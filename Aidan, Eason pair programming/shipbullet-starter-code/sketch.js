// OOP Pair Programming Starter Code
// Aidan, Eason
// 25 november, 2022


// ------------------------------------------------------------------------- //
// You don't need to edit this section...

let enterprise;
let shipImage, bulletImage;

function preload() {
  shipImage = loadImage("assets/enterprise.png");
  bulletImage = loadImage("assets/laser-shot.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  enterprise = new Ship(width/2, height/2, shipImage, bulletImage, LEFT_ARROW, RIGHT_ARROW, UP_ARROW, DOWN_ARROW, 45);
  enterprise2 = new Ship(width/3, height/3, shipImage, bulletImage, 65, 68, 87, 83, 32);
}

function draw() {
  background("black");
  enterprise.update();
  enterprise.display();
  enterprise2.update();
  enterprise2.display();
}

function keyPressed() {
  enterprise.handleKeyPress();
  enterprise2.handleKeyPress();
}

// ------------------------------------------------------------------------- //
// Start editing here!

class Ship {
  constructor(x, y, theImage, bulletImg, leftKey, rightKey, upKey, downKey, fireKey) {
    // define the variables needed for this ship
    this.x = x;
    this.y = y;
    this.dx = 5;
    this.dy = 5;
    this.width = 50;
    this.height = 100;
    this.image = theImage;
    this.bulletImg = bulletImg;
    this.bulletArray = [];
    this.left = leftKey;
    this.right = rightKey;
    this.up = upKey;
    this.down = downKey;
    this.fire = fireKey;
  }

  update() {
    // move ship -- you might want to use the keyIsDown() function here
    if(keyIsDown(this.left)){
      this.x -= this.dx;
    }
    else if(keyIsDown(this.right)){
      this.x += this.dx;
    }
    if(keyIsDown(this.up)){
      this.y -= this.dy;
    }
    if(keyIsDown(this.down)){
      this.y += this.dy;
    }
    // if doing extra for experts, show bullet(s)
    for (let i = this.bulletArray.length-1; i>0; i--) {
      if(!this.bulletArray[i].isOnScreen()){
        this.bulletArray.splice(i, 1);
      }
      else {
        this.bulletArray[i].update(); 
        this.bulletArray[i].display();
      }
    }
  }

  display() {
    // show the ship
    image(this.image, this.x, this.y, this.width, this.height);
  }

  handleKeyPress() {
    // you only need to use this if you are doing the extra for experts...
    // if you are, you should make a bullet if the space key was pressed
    if(keyIsDown(this.fire)){
      this.bulletArray.push(new Bullet(this.x + this.width/2, this.y - this.height/10, 0, 1, this.bulletImg));
    }
  }
}

// ------------------------------------------------------------------------- //

// Extra for Experts 
//  - you can instantiate a bullet (or a bullet array) within the Ship class,
//    and call the display and update functions in the logical location of the 
//    Ship class. If you create an array of bullets, you might want to think about
//    when the bullets should be removed from the array...

class Bullet {
  constructor(x, y, dx, dy, theImage) {
    // define the variables needed for the bullet here
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.image  = theImage;
    this.width = 5;
    this.height = 10;
  }

  update() {
    // what does the bullet need to do during each frame? how do we know if it is off screen?
    this.y -= this.dy;
  }

  display() {
    // show the bullet
    image(this.image, this.x, this.y, this.width, this.height);
  }

  isOnScreen() {
    // check if the bullet is still on the screen
    return this.y >= 0;
  }
}

