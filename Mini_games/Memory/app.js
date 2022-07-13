// Selectors
const cardArray = [
    {name: 'shezlongi', class: 'beach-chair',},
    {name: 'pliazi', class: 'beach',},
    {name: 'delphini', class: 'delphine',},
    {name: 'chustebi',class: 'flip-flops',},
    {name: 'nayini',class: 'ice-cream',},
    {name: 'qvishissasaxle',class: 'sand-castle',},
    {name: 'maika',class: 'shirt',},
    {name: 'sazamtro',class: 'watermelon',},
    {name: 'shezlongi', class: 'beach-chair',},
    {name: 'pliazi', class: 'beach',},
    {name: 'delphini', class: 'delphine',},
    {name: 'chustebi',class: 'flip-flops',},
    {name: 'nayini',class: 'ice-cream',},
    {name: 'qvishissasaxle',class: 'sand-castle',},
    {name: 'maika',class: 'shirt',},
    {name: 'sazamtro',class: 'watermelon',},

]
var gridDisplay = document.querySelector('#grid');
var startBtn = document.querySelector('.start-btn');
var restartBtn = document.querySelector('.restart-btn');
var time = document.querySelector('.time-span');
var movesGame = document.querySelector('.move-span');
var chosenCard = [];
var chosenClass = [];
var chosenCardId = [];
var matchedCards = [];
var eTime = 0
var moves = 0
var gameOnOff = -1;

// Event Listeners
startBtn.addEventListener('click', gameStart);
restartBtn.addEventListener('click', gameRestart);
gridDisplay.addEventListener('click', mainFunctionActivator);
// Functions
// randomize array layout
cardArray.sort(()=> 0.5 - Math.random());
// Create board function
function createBoard () {
    for (let i = 0; i < 16; i++) {
       const card =  document.createElement('div')
       card.classList.add('blank')
       card.setAttribute('data-id', i)
       gridDisplay.appendChild(card)
    }
}
createBoard() 
// create all card (div) tag to use on them forEach
let cards = document.querySelectorAll('#grid > div') 
/* in css i made whole #grid div unclickable so now i made only cards clickable
if i woud not done it than when i woud click on emty space between cards whole
board woud rotate */
cards.forEach((card)=>{
    card.style.pointerEvents = 'all'
})  
// start btn (start game)
function gameStart () {
    gameOnOff = 0
    startBtn.style.opacity = '0.1'
    startBtn.style.pointerEvents = 'none'
    restartBtn.style.pointerEvents = 'all'
    restartBtn.style.opacity = '1'
    stopWatch()
} 
// restart game
function gameRestart () {
    location.reload()
}
// make code posible to run and than end it
function mainFunctionActivator(e) {
    var clicked = e.target
    if (gameOnOff !== -1) {
        cardClick(clicked)
    }
}
// on click rotate card and check match
function cardClick(e) {
    // clicked div
    var clickedCard = e
    //clicked div data-id
    var clickedCardDataId = clickedCard.getAttribute('data-id');
    // this if needed to no click on alredy clicked image again
    if (clickedCard.classList.length <= 1){
    // turn on picture on clicked div
    clickedCard.classList.add('rotate')
    clickedCard.onanimationend = () => {
        clickedCard.classList.remove('rotate')
    }
    setTimeout(()=>{
        clickedCard.classList.add(cardArray[clickedCardDataId].class);
    },240)
    // push data in array
    chosenCard.push(cardArray[clickedCardDataId].name);
    chosenClass.push(cardArray[clickedCardDataId].class);
    chosenCardId.push(clickedCardDataId);
    /* siwtch function that have 1 case, that will help us to use code down 
    below only if we have chosen 2 cards */
    switch (chosenCard.length) {
        case 2:
            // if we alredy chose 2 card we can not click on other one for 1s
            cards.forEach((card)=>{
                card.style.pointerEvents = 'none'
            })
            // checks if chosen cards ar match if yes make them oppacity 0.7
           if(chosenCard[0] === chosenCard[1]){
            cards[chosenCardId[0]].style.opacity = '0.7';
            cards[chosenCardId[1]].style.opacity = '0.7';
            // count matched cards
            matchedCards.push(chosenCard[0])
            matchedCards.push(chosenCard[1])
            //clear counter arrays to do same on another click
            chosenCard = [];
            chosenCardId = [];
            chosenClass = [];
            moves += 1;
            movesGame.innerHTML = moves
            //if cards are not matched make tham face down agains
        } else {
            setTimeout(()=>{
                cards[chosenCardId[0]].classList.remove(chosenClass[0])
                cards[chosenCardId[1]].classList.remove(chosenClass[1])
                chosenCard = [];
                chosenCardId = [];
                chosenClass = [];
                moves += 1;
                movesGame.innerHTML = moves
            }, 1000)
           
        }
        // enables cards to be clickable again (read row 78)
        setTimeout(()=>{
            cards.forEach((card)=>{
            card.style.pointerEvents = 'all'
            })
        }, 1000)
        break;

}
        if (matchedCards.length === 16) {
            setTimeout(()=>{
                alert(`Your time is ${eTime}s\nMove count: ${moves}`)
                gameOnOff = -1;
            }, 500)
        }
}}
// Stopwatch for game score
function stopWatch () {
    const interval = setInterval(()=>{
        eTime += 1
        time.innerHTML = eTime
        if (gameOnOff == -1) {
            clearInterval(interval)
            moves = 0;
            eTime = 0;
            time.innerHTML = eTime;
            movesGame.innerHTML = moves;
        }
    },1000)

}