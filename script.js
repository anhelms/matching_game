function createNewCard() {
   let cardElement = document.createElement('div');


  cardElement.classList.add("card");

  cardElement.innerHTML += `<div class="card-down"></div>` +
		`<div class="card-up"></div>`;

  return cardElement;

}

createNewCardTest();


function appendNewCard(parentElement) {

  let cardElement = createNewCard();

  parentElement.appendChild(cardElement);

  return cardElement;

}
 appendNewCardTest();


function shuffleCardImageClasses() {

  let cardClasses = _.shuffle(["image-1", "image-1","image-2", "image-2","image-3", "image-3","image-4", "image-4","image-5", "image-5","image-6", "image-6"]);

  return cardClasses;
}
 shuffleCardImageClassesTest()


function createCards(parentElement, shuffledImageClasses) {

  let cardObjects = [];

  for (let i = 0; i < 12; i++) {
  

let newCard = appendNewCard(parentElement);
    
   newCard.classList.add(shuffledImageClasses[i]);
  
   let newObject =
    {index: i,
    element: newCard,
    imageClass: shuffledImageClasses[i],
    }


   cardObjects.push(newObject);

  };


  return cardObjects;
	
}
 createCardsTest();


function doCardsMatch(cardObject1, cardObject2) {

if (cardObject1.imageClass === cardObject2.imageClass) {
  return true;
} else {
  return false;
}
	
}
 doCardsMatchTest();

let counters = {};


function incrementCounter(counterName, parentElement) {


	if (counters[counterName] == undefined) {
  counters[counterName] = 0;}
    counters[counterName]++;
   parentElement.innerHTML = counters[counterName];
}
  

incrementCounterTest();

let lastCardFlipped = null;


function onCardFlipped(newlyFlippedCard) {
  
 let flipCount = document.getElementById("flip-count");


  incrementCounter("flips", flipCount);
  
	if (lastCardFlipped === null) {
    lastCardFlipped = newlyFlippedCard;
    return;
  }
  if (!doCardsMatch(lastCardFlipped, newlyFlippedCard)) {
    lastCardFlipped.element.classList.remove("flipped");
    newlyFlippedCard.element.classList.remove("flipped");
    lastCardFlipped = null;
    return;
  } 

newlyFlippedCard.element.classList.add("border-glow");
lastCardFlipped.element.classList.add("border-glow");


incrementCounter("matches", document.getElementById("match-count"));
  

	if (counters["matches"] == 6) {
    winAudio.play();
  } else {
    matchAudio.play();
  }

 lastCardFlipped = null;
}

function resetGame() {

let cardContainer = document.getElementById('card-container');
	


  while (cardContainer.firstChild) {
  cardContainer.removeChild(cardContainer.firstChild);
    winAudio.pause();
    resetAudio.play();
}


  let flipCount = document.getElementById("flip-count");
	let matchCount = document.getElementById("match-count");
flipCount.innerHTML = 0;
  matchCount.innerHTML = 0;

 counters = {};
	
 lastCardFlipped = null;
  

setUpGame();

}

setUpGame();