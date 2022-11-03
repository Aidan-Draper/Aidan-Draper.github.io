//Terrain generation
//Aidan Draper
//Oct 21, 2022

let theHeights = [];
let startingLocation = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  theHeights = generateHeights(width*10);
}

function draw() {
  background(220);
  for(let i = startingLocation; i < startingLocation + width; i++){
    displayRectangle(i-startingLocation, theHeights[i], 1);
  }

  if(keyIsPressed) {
    startingLocation+= 50;
  }
}

function displayRectangle(x, rectheight, rectWidth){
  let y = height - rectheight;
  rect(x, y, rectWidth, rectheight);
}

function generateHeights(howMany){
  let temporaryArray = [];
  let time = random(10000);
  for(let i =0; i< howMany; i++) {
    temporaryArray.push(noise(time)*height);
    time += 0.001;
  }
  return temporaryArray;
}