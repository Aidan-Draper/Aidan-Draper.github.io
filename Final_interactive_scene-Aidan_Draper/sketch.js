// Memory match(interactive scene)
// Aidan Draper
// October 13, 2022
//
// Extra for Experts:
// - To take this project above and beyond, not only did I make each size variable in accordance with the tab size, so that this programme runs in almost any tab size, but I also researched how to use the html and css tools to my advantage in this game by watching tutorials and fixing issues and errors with the help of the w3schools reference.


//Creating global variables to use throughout
//Creating state so that we can switch between screens
let state = "start";

//Element placement variables to have a point of reference in the resizing
let xCenter, yCenter;

//Background element variables
let questionMark, x, y, x2, y2, questionMarkWidth, questionMarkHeight;
let questionMarkScalar = 0.25;
let dx = 4;
let dy = 5;

//Start screen variables
let titleSize = 1;

//Create main game variables
let cardData;
let playerLives = 5;
let boxColor = "aquamarine";

//Grab the section from html to use to present game
const section = document.querySelector("section");

//Preload images and lists needed
//Preload the background image to use in our animation
function preload() {
  questionMark = loadImage("questionMark.png");
}

//Generate the card data
const getData = () => [
  {imgSrc: "heartCard.png", name: "heart"},
  {imgSrc: "lightningCard.png", name: "lightning"},
  {imgSrc: "plusCard.png", name: "plus"},
  {imgSrc: "starCard.png", name: "star"},
  {imgSrc: "treeCard.png", name: "tree"},
  {imgSrc: "waterDropCard.png", name: "water"},
  {imgSrc: "heartCard.png", name: "heart"},
  {imgSrc: "lightningCard.png", name: "lightning"},
  {imgSrc: "plusCard.png", name: "plus"},
  {imgSrc: "starCard.png", name: "star"},
  {imgSrc: "treeCard.png", name: "tree"},
  {imgSrc: "waterDropCard.png", name: "water"},
];


//Running our code through setup and draw functions
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

  //shuffle cards
  cardData = shuffle(getData());
}

//constantly running code depending on the state
function draw() {
  if (state !== "main") {
    generalBackground();
  }
  if (state === "start") {
    startScreen();
  }
  else if (state === "instructions") {
    instructions();
  }
  else if (state === "main") {
    runGame();
    lifeBox();
  }
}


//Create functions to use throughout the code
//Creating a function to write text with the following inputs rather than input them each time
function writeText(color, font, size, theText, textX, textY, wrapWidth, wrapHeight) {
  fill(color);
  textFont(font);
  textSize(size);
  text(theText, textX, textY, wrapWidth, wrapHeight);
}

//Creating a function to draw an ellipse with the following inputs rather than input them each time
function createEllipse(color, ellispeX, ellipseY, ellipseWidth, ellipseHeight){
  fill(color);
  ellipse(ellispeX, ellipseY, ellipseWidth, ellipseHeight);
}

//Creating a function to draw a rectangle with the following inputs rather than input them each time
function createRectangle(color, rectX, rectY, rectWidth, rectHeight, roundedCornerRadius) {
  fill(color);
  rect(rectX, rectY, rectWidth, rectHeight, roundedCornerRadius);
}

//Identifying whether the mouse is in the rectangle given the center coordinates and the size
function mouseInRect(rectX, rectY, rectWidth, rectHeight) {
  return mouseX >= rectX - rectWidth / 2 && mouseX <= rectX + rectWidth / 2 && mouseY >= rectY - rectHeight / 2 && mouseY <= rectY + rectHeight / 2;
}

//Creating a rectangle that uses mouse detection to change if it is hovered over
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

//Identifying if the mouse was pressed and the location to determine if a button was pressed
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

//Identifying if a key is pressed, and if it is one that we have associated controles and executing those controles
function keyPressed() {
  if (state ==="main" && keyCode === 82) {
    restart("Good luck this time");
  }
  else if (state === "main" && keyCode === 73){
    section.classList.add("hidden");
    state = "instructions";
  }
}


//Setting up the background for the majority of states
//Writing the main background function that combines the others
function generalBackground() {
  background("#4c4cb8");
  drawQuestionMarks();
  moveQuestionMarks();
  bounceIfNeeded();
}

//Make  list of the different spawm locations for the image
const coordinateList = () => [
  {theX: x, theY: y}, {theX: x2, theY: y2}, {theX: x2, theY: y}, {theX: x, theY: y2},
];

//Spawning the image
const drawQuestionMarks = () => {
  let theList = coordinateList();
  theList.forEach((element, index) => {
    image(questionMark, element.theX, element.theY, questionMarkWidth, questionMarkHeight);
  });
};

//Moving the image
function moveQuestionMarks() {
  x += dx;
  y += dy;
  x2 -= dx;
  y2 -= dy;
}

//Bouncing the images off one another and the wall
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


//Start Screen
//Running other start functions and making a start button
function startScreen() {
  startText();
  animateStartText();
  makeButton(xCenter, yCenter + height / 6, width / 8, height / 8, "black", "grey", "white", width/25, "cursive", "start");

}

//Making title text in an ellipse
function startText() {
  createEllipse("yellow", xCenter, yCenter - height / 4, titleSize * 8, titleSize * 3);
  writeText("black", "cursive",titleSize,"Memory Match", xCenter, yCenter - height / 4);
}

//Animating the title text
function animateStartText() {
  if (titleSize < width / 20) {
    titleSize++;
  }
}


//Displaying the instructions to the game
function instructions() {
  createRectangle("black", xCenter, yCenter, width / 3, height / 2);
  writeText("white", "cursive", width / 18, "Instructions", xCenter, height * 0.33);
  writeText("white", "cursive", width / 42, "Make pairs by flipping 2 cards at a time with the mouse and GO SLOW. Use the R key to restart and the I key to view the instructions", xCenter, height * 0.56, width / 3, height / 2);
}

//Main game
//Create the Lives at the bottom of the screeen
function lifeBox() {
  createRectangle(boxColor, xCenter, height/10, width/5, height/10);
  writeText("black", "cursive", width/50, "Lives: " + playerLives, xCenter, height/10, width/5, height/10);
}

//Running all of the card code to create the game
const runGame = () => {
  background("#4c4cb8");//set background
  section.classList.remove("hidden");//unhiddinng the section part of the html so that we can use it
  //Generate HTML/Create a card with each element of the card list
  cardData.forEach((element, index) => {
    //Making card with front and back face
    const card = document.createElement("div");
    const face = document.createElement("img");
    const back = document.createElement("img");
    //Giving them a class to identify when it's flipped
    card.classList = "card";
    face.classList = "face";
    back.classList = "back";
    //Attach the info to the cards
    face.src = element.imgSrc;
    back.src = "backOfCard.png";
    card.setAttribute("name", element.name);
    //Attach the cards to the section
    section.appendChild(card);
    card.appendChild(face);
    card.appendChild(back);
    //Checking if the card is clicked and flipping it
    card.addEventListener("click", (e) =>{
      card.classList.toggle("toggleCard");
      checkCards(e);
    });
  });
};

//Checking if the cards got flipped and what to do about it
const checkCards = (e) => {
  const clickedCard = e.target;
  clickedCard.classList.add("flipped");
  const flippedCards = document.querySelectorAll(".flipped");
  const toggleCard = document.querySelectorAll(".toggleCard");
  //Logic
  //Seeing if two were flipped and checking if they match
  if (flippedCards.length === 2) {
    if (flippedCards[0].getAttribute("name") === flippedCards[1].getAttribute("name")){
      flippedCards.forEach(card => {
        //if they match, make them unflippable
        card.classList.remove("flipped");
        card.style.pointerEvents = "none";
      });
    }
    else {
      //flipping the unmatched pair back
      flippedCards.forEach(card => {
        card.classList.remove("flipped");
        setTimeout(() => card.classList.remove("toggleCard"), 1500);
      });
      //Making the lives red to warn you that you're low on lives
      playerLives--;
      if (playerLives < 3) {
        boxColor = "red";
      }
      //restarting after the player loses
      if (playerLives === 0) {
        setTimeout(() => {
          restart("Try again");
        }, 1000);
      }
    }
  }
  //Run a check to see if you won and restarting if you did
  if(toggleCard.length === 12) {
    setTimeout(() => {
      restart("You won");
    }, 1000);
  }
};

//Restart by resetting all variables and shuffling the deck
const restart = (text) => {
  cardData = shuffle(getData());
  let faces = document.querySelectorAll(".face");
  let cards = document.querySelectorAll(".card");
  section.style.pointerEvents = "none";
  cardData.forEach((element, index) => {
    //Waiting until the other stuff is finnished before making the cards clickable
    setTimeout(() => {
      cards[index].classList.remove("toggleCard");
    }, 100);
    setTimeout(() => {
      cards[index].style.pointerEvents = "all";
      faces[index].src = element.imgSrc;
      cards[index].setAttribute("name", element.name);
    }, 1000);
  });
  //Resetting life box
  playerLives = 5;
  boxColor = "aquamarine";
  //Giving the given window alert
  setTimeout(() => window.alert(text), 100);

};

//Changing the game window in accordance with the browser window
function windowResized() {
  setup();
}