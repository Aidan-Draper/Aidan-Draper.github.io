// Practice
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

//Grab a couple of things
const section = document.querySelector("section");
const playerLivesCount = document.querySelector("span");
let playerLives = 6;

//Link text
playerLivesCount.textContent = playerLives;

//set up other variables
let cardData;

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

const cardGenerator = () => {
  //Generate HTML
  cardData.forEach((element, index) => {
    const card = document.createElement("div");
    const face = document.createElement("img");
    const back = document.createElement("div");
    card.classList = "card";
    face.classList = "face";
    back.classList = "back";
    //Attach the info to the cards
    face.src = element.imgSrc;
    card.setAttribute("name", element.name);
    //Attach the cards to the section
    section.appendChild(card);
    card.appendChild(face);
    card.appendChild(back);

    card.addEventListener("click", (e) =>{
      card.classList.toggle("toggleCard");
      checkCards(e);
    });
  });
};

//Check cards
const checkCards = (e) => {
  const clickedCard = e.target;
  clickedCard.classList.add("flipped");
  const flippedCards = document.querySelectorAll(".flipped");
  const toggleCard = document.querySelectorAll(".toggleCard");
  //Logic
  if (flippedCards.length === 2) {
    if (flippedCards[0].getAttribute("name") === flippedCards[1].getAttribute("name")){
      flippedCards.forEach(card => {
        card.classList.remove("flipped");
        card.style.pointerEvents = "none";
      });
    }
    else {
      flippedCards.forEach(card => {
        card.classList.remove("flipped");
        setTimeout(() => card.classList.remove("toggleCard"), 1000);
      });
      playerLives--;
      playerLivesCount.textContent = playerLives;
      if (playerLives === 0) {
        restart("Try again");
      }
    }
  }
  //Run a check to see if you won
  if(toggleCard.length === 12) {
    restart("You won");
  }
};

//Restart
const restart = (text) => {
  cardData = shuffle(getData());
  let faces = document.querySelectorAll(".face");
  let cards = document.querySelectorAll(".card");
  section.style.pointerEvents = "none";
  cardData.forEach((element, index) => {
    cards[index].classList.remove("toggleCard");
    //Randomize
    setTimeout(() => {
      cards[index].style.pointerEvents = "all";
      faces[index].src = element.imgSrc;
      cards[index].setAttribute("name", element.name);
    }, 1000);
  });
  playerLives = 6;
  playerLivesCount.textContent = playerLives;
  setTimeout(() => window.alert(text), 100);

};

function setup() {
  createCanvas(windowWidth, windowHeight);

  //shuffle cards
  cardData = shuffle(getData());

  //Generate cards
  cardGenerator();
}

function draw() {

}



