// Memory Match
// Aidan Draper
// September 27, 2022
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

//background element variables\
let questionMark, x, y, x2, y2, questionMarkWidth, questionMarkHeight;
let questionMarkScalar = 0.25;
let dx = 4;
let dy = 5;

//state variable
let state = "start";

//element placement variables
let xCenter, yCenter;

//start Screen variables
let titleSize = 1;

//main game variables
let cardScalar, backOfCard, heartCard, lightningCard, plusCard, starCard, treeCard, waterDropCard;
let tries = 6;
let pairsMade = 0;

function preload() {
  questionMark = loadImage("questionMark.png");
  backOfCard = loadImage("backOfCard.png");
  heartCard = loadImage("heartCard.png");
  lightningCard = loadImage("lightningCard.png");
  plusCard = loadImage("plusCard.png");
  starCard = loadImage("starCard.png");
  treeCard = loadImage("treeCard.png");
  waterDropCard = loadImage("waterDropCard.png");
}

function setup() {

  //creating the canvas
  createCanvas(windowWidth, windowHeight);

  //centering the x and y coordinates of the elements and figuring out the center of the window
  rectMode(CENTER);
  textAlign(CENTER, CENTER);
  imageMode(CENTER);
  xCenter = width / 2;
  yCenter = height / 2;

  //setting up background variables
  questionMarkWidth = questionMark.width * questionMarkScalar;
  questionMarkHeight = questionMark.height * questionMarkScalar;
  x = questionMarkWidth / 2;
  y = questionMarkHeight / 2;
  x2 = width - questionMarkWidth / 2;
  y2 = height - questionMarkHeight / 2;

  //setting shape border thickness
  strokeWeight(3);

  //setting up card scalar size
  cardScalar = 0.55/width*height;
}

function draw() {
  generalBackground();
  if (state === "start") {
    startScreen();
  }
  else if (state === "instructions") {
    instructions();
  }
  else if (state === "main") {
    game();
  }
}

function generalBackground() {
  background("blue");
  drawQuestionMarks();
  moveQuestionMarks();
  bounceIfNeeded();
}

function drawQuestionMarks() {
  image(questionMark, x, y, questionMarkWidth, questionMarkHeight);
  image(questionMark, x2, y2, questionMarkWidth, questionMarkHeight);
  image(questionMark, x2, y, questionMarkWidth, questionMarkHeight);
  image(questionMark, x, y2, questionMarkWidth, questionMarkHeight);
}

function moveQuestionMarks() {
  x += dx;
  y += dy;
  x2 -= dx;
  y2 -= dy;
}

function bounceIfNeeded() {
  if (collideRectRect(x, y, questionMarkWidth / 2, questionMarkHeight / 2, x, y2, questionMarkWidth / 2, questionMarkHeight / 2)) {
    dy *= -1;
  }
  else if (collideRectRect(x, y, questionMarkWidth / 2, questionMarkHeight / 2, x2, y, questionMarkWidth / 2, questionMarkHeight / 2)) {
    dx *= -1;
  }
  //bounce off right wall
  else if (x >= width - questionMarkWidth / 4) {
    dx *= -1;
  }
  //bounce off left wall
  else if (x <= 0 + questionMarkWidth / 4) {
    dx *= -1;
  }
  //bounce off bottom wall
  else if (y >= height - questionMarkHeight / 4) {
    dy *= -1;
  }
  //bounce off top wall
  else if (y <= 0 + questionMarkHeight / 4) {
    dy *= -1;
  }
}

function startScreen() {
  startText();
  animateStartText();
  makeButton(xCenter, yCenter + height / 6, width / 8, height / 8, "black", "grey", "white", width/25, "cursive", "start");

}

function startText() {
  createEllipse("yellow", xCenter, yCenter - height / 4, titleSize * 8, titleSize * 3);
  writeText("black", "cursive",titleSize,"Memory Match", xCenter, yCenter - height / 4);
}

function animateStartText() {
  if (titleSize < width / 20) {
    titleSize++;
  }
}

function instructions() {
  createRectangle("black", xCenter, yCenter, width / 3, height / 2);
  writeText("white", "cursive", width / 18, "Instructions", xCenter, height * 0.35);
  writeText("white", "cursive", width / 42, "By using the letter keys to select cards, try to match as many pairs as possible in the turns allowed", xCenter, height * 0.55, width / 3, height / 2);
}

function game() {

  //make game box
  createRectangle("red", xCenter, yCenter, width / 2, height / 1.2);

  let w = xCenter - backOfCard.width*cardScalar*1.5;
  for (let b = 0; b < 4; b++) {
    let h = height/4;
    for (let i = 0; i < 3; i++) {
      placeCard(backOfCard, w, h);
      h += backOfCard.height*cardScalar;
    }
    w += backOfCard.width*cardScalar;
  }

  //see instructions button
  makeButton(width*0.87, height*0.85, width/5, height/5, "pink", "purple", "black", width/ 30, "cursive", "See instructions");
  
  //restart button
  makeButton(width*0.87, height*0.15, width/5, height/5, "pink", "purple", "black", width/ 30, "cursive", "Restart");
  
  //number of tries
  createRectangle("white", width*0.87, yCenter, width/5, height/4);
  writeText("black", "cursive", width/30, "Tries: " + tries,width*0.87, yCenter, width/5, height/4);
  
  //pairs made
  createRectangle("white", width*0.13, height*0.2, width/5, height/4);
  writeText("black", "cursive", width/30, "Pairs Made " + pairsMade, width*0.13, height*0.2, width/5, height/4);
}

// function keyPressed() {
//   if (state ==="main" && keyCode === 65) {
//     flipCard(a);
// }
// }

function placeCard(card, cardX, cardY) {
  image(card, cardX, cardY, backOfCard.width*cardScalar, backOfCard.height*cardScalar);
}

function makeButton(buttonX, buttonY, buttonWidth, buttonHeight, color, hoverColor, textColor, widthOfText, font, theText) {
  let rectColor;
  if (mouseInRect(buttonX, buttonY, buttonWidth, buttonHeight)) {
    rectColor = hoverColor;
  }
  else {
    rectColor = color;
  }
  createRectangle(rectColor, buttonX, buttonY, buttonWidth, buttonHeight);
  writeText(textColor, font, widthOfText, theText, buttonX, buttonY, buttonWidth, buttonHeight);
}

//identifying if the mouse was pressed
function mousePressed() {
  //starting the game if the mouse was pressed in the start button
  if (state === "start" && mouseInRect(xCenter, yCenter + height / 6, width / 8, height / 8)) {
    state = "instructions";
  }
  else if (state === "instructions") {
    state = "main";
  }
  else if (state === "main" && mouseInRect(width*0.87, height*0.85, width/5, height/5)) {
    state = "instructions";
  }
  else if (state === "main" && mouseInRect(width*0.87, height*0.15, width/5, height/5)) {
    state = "start";
  }
}

//identifying whether the mouse is in the rectangle given the center coordinates and the size
function mouseInRect(rectX, rectY, rectWidth, rectHeight) {
  return mouseX >= rectX - rectWidth / 2 && mouseX <= rectX + rectWidth / 2 && mouseY >= rectY - rectHeight / 2 && mouseY <= rectY + rectHeight / 2;
}

function writeText(color, font, size, theText, textX, textY, wrapWidth, wrapHeight) {
  fill(color);
  textFont(font);
  textSize(size);
  text(theText, textX, textY, wrapWidth, wrapHeight);
}

function createRectangle(color, rectX, rectY, rectWidth, rectHeight, roundedCornerRadius) {
  fill(color);
  rect(rectX, rectY, rectWidth, rectHeight, roundedCornerRadius);
}

function createEllipse(color, ellispeX, ellipseY, ellipseWidth, ellipseHeight){
  fill(color);
  ellipse(ellispeX, ellipseY, ellipseWidth, ellipseHeight);
}

//changing the game window in accordance with the browser window
function windowResized() {
  setup();
}