// Button OOP
//Aidan Draper

class Button {
  constructor(x, y, w, h, theColor, hoverColor, theState){
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
    this.color = theColor;
    this.hoverColor = hoverColor;
    this.state = theState;
  }

  mouseInButton() {
    return mouseX >= this.x - this.width / 2 && mouseX <= this.x + this.width / 2 && mouseY >= this.y - this.height / 2 && mouseY <= this.y + this.height / 2;
  }

  display() {
    if(this.mouseInButton()) {
      fill(this.hoverColor);
    }
    else {
      fill(this.color);
    }
    rect(this.x, this.y, this.width, this.height);
  }
}

let backgroundColor = "lightgrey";
let state = "main";
let buttonArray = [];
let buttonOne = new Button(500, 500, 150, 100, "blue", "red", "orange");
let buttonTwo = new Button(1000, 500, 150, 100, "purple", "yellow", "pink");

function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);
  textAlign(CENTER, CENTER);
  buttonArray.push(buttonOne, buttonTwo);
}

function draw() {
  background(backgroundColor);
  for(let i = 0; i < buttonArray.length; i++){
    buttonArray[i].display();
  }
  if (state === "main"){
    backgroundColor = "lightgrey";
  }
  else if (state === "orange"){
    backgroundColor = "orange";
  }
  else if (state === "pink"){
    backgroundColor = "pink";
  }
}

function mousePressed(){
  for(let i = 0; i < buttonArray.length; i++){
    if(buttonArray[i].mouseInButton()){
      state = buttonArray[i].state;
    }
  }
}
