// Selectors + var
var game = document.getElementById('game');
var block1 = document.getElementById('block1');
var block2 = document.getElementById('block2');
var block3 = document.getElementById('block3');
var scoreP = document.querySelector('.score');
var startBtn = document.querySelector('.btn');
var record = document.querySelector('.record');
var road = document.querySelector('.road')
var level = 3;
var score = 0;
var recordGame = 0;
// Event listeners
addEventListener('keydown', jumpOnArrow);
startBtn.addEventListener('click', ()=>{
    startBtn.style.display = 'none'
    block1.style.animation = 'none'
    block2.style.animation = 'none'
    block3.style.animation = 'none'
    block1.style.display = ''
    block2.style.display = ''
    block3.style.display = ''
    blockNumber1 = 0
    road.style.animation = `road ${level}s linear infinite`
});
document.addEventListener('DOMContentLoaded', getRecord);
game.addEventListener('click', mouseJump);
// Functions
// Randomize block spawn number
var blockNumber1 = -1;
function randomizerBlock() {
    if (blockNumber1 >= 0) {
    var blockNumber = Math.floor(Math.random()*3 + 1);
    blockNumber1 = blockNumber;
}
};
// Randomize position of block spawn
var blockPosition1 =  0;
function randomizerPosition() {
    blockPosition = Math.floor(Math.random()*450 + 500);
    blockPosition1 = blockPosition;
}
// test game start
var test3 = setInterval(test1, `${level*1000}`)
function test1 (){
    randomizerBlock();
    createBlock(blockNumber1);
}
// Create number of blocks using randomize()
function createBlock(e) {
    switch (e) {
        case 1:
            road.style.animation = 'none'
            road.style.animation = `road ${level}s linear infinite`
            block1.style.animation = `block ${level}s linear`
            block1.onanimationend = () => {
                score += 100; 
                level -= 0.01;
                scoreP.innerHTML = `Score: ${score}`;
                block1.style.animation = 'none'
            }
            break;
        case 2:
            randomizerPosition();
            road.style.animation = 'none'
            road.style.animation = `road ${level}s linear infinite`
            block1.style.animation = `block ${level}s linear`
            block1.onanimationend = () => {
                score += 100; 
                level -= 0.01;
                scoreP.innerHTML = `Score: ${score}`;
                block1.style.animation = 'none'
            }
            setTimeout(() => {    
                block2.style.animation = `block ${level}s linear`
                block2.onanimationend = () => {
                score += 100; 
                level -= 0.01;
                scoreP.innerHTML = `Score: ${score}`;
                block2.style.animation = 'none'
            }}, blockPosition1)
            break;
        case 3:
            randomizerPosition();
            road.style.animation = 'none'
            road.style.animation = `road ${level}s linear infinite`
            block1.style.animation = `block ${level}s linear`
            block1.onanimationend = () => {
                score += 100; 
                level -= 0.01;
                scoreP.innerHTML = `Score: ${score}`;
                block1.style.animation = 'none'
            }
            setTimeout(() => {    
                block2.style.animation = `block ${level}s linear`
                block2.onanimationend = () => {
                score += 100; 
                level -= 0.01;
                scoreP.innerHTML = `Score: ${score}`;
                block2.style.animation = 'none'
            }}, blockPosition1)
            let time = blockPosition1;
            randomizerPosition();
            setTimeout(() => {   
                block3.style.animation = `block ${level}s linear`
                block3.onanimationend = () => {
                score += 100; 
                level -= 0.01;
                scoreP.innerHTML = `Score: ${score}`;
                block3.style.animation = 'none'
            }}, `${time + blockPosition1}`)
            break;
    }
}
var checkLose = setInterval(()=>{
    var characterPosition = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
    var blockPosition1 = parseInt(window.getComputedStyle(block1).getPropertyValue("left"));
    var blockPosition2 = parseInt(window.getComputedStyle(block2).getPropertyValue("left"));
    var blockPosition3 = parseInt(window.getComputedStyle(block3).getPropertyValue("left"));
    if (blockPosition1 >= 20 && blockPosition1 <= 70 && characterPosition >=300 ||
        blockPosition2 >= 20 && blockPosition2 <= 70 && characterPosition >=300 ||
        blockPosition3 >= 20 && blockPosition3 <= 70 && characterPosition >=300) {
        alert(`Game Over\r\nYour score is: ${score}`);
        block1.style.display = 'none';
        block2.style.display = 'none';
        block3.style.display = 'none';
        road.style.animation = 'none';
        blockNumber1 = -1;
        startBtn.style.display = '';
        if (score > recordGame) {
            let record1;
            if (localStorage.getItem('record') === null) {
                record1 = [];
            } else {
                record1 = JSON.parse(localStorage.getItem('record'))
            }
            record1.pop();
            record1.push(score);
            localStorage.setItem('record', JSON.stringify(record1));
            recordGame = score;
            record.innerHTML = `Hightest Score: ${recordGame}`
        }
        score = 0;
        scoreP.innerHTML = `Score: ${score}`;
        level = 3;
    }
})

function jumpOnArrow(e) {
    const key = e.key
    switch (key) {
        // Jump on W or ArrowUp
        case 'ArrowUp':
            character.classList.add('animatejump');
            character.addEventListener('animationend', () => {
                character.classList.remove('animatejump')
            })
            break;
        case 'w':
            character.classList.add('animatejump');
            character.addEventListener('animationend', () => {
                character.classList.remove('animatejump')
            })
            break;
        // case 'ArrowDown':
        //     character.classList.add('animateduck');
        //     character.addEventListener('animationend', () => {
        //         character.classList.remove('animateduck')
        //     })
        //     break;
        // case 's':
        //     character.classList.add('animateduck');
        //     character.addEventListener('animationend', () => {
        //         character.classList.remove('animateduck')
        //     })
        //     break;
    }
}
function mouseJump() {
    character.classList.add('animatejump');
    character.onanimationend = () => {
        character.classList.remove('animatejump')
    }
}
function getRecord() {
    let record1;
    if (localStorage.getItem('record') === null) {
        record1 = [0];
    } else {
        record1 = JSON.parse(localStorage.getItem('record'))
    }
    record.innerHTML = `Hightest Score: ${record1[0]}`
    recordGame = record1[0];
}
