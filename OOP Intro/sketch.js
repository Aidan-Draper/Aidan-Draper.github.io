// OOP Intro
// Aidan
// november 14, 2022
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

//capitalise class
class Dog {
  constructor(name) {
    //this. = variables
    this.name = name;
    this.age = 0;
  }

  bark(){
    console.log("Woof! says "  + this.name);
  }

}

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
}
