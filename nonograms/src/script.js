const timerContainer = document.querySelector('.timer-container');

let number = 0;
let gameFieldClick = 0;

function setTimer() {
    let timer = setInterval(function () {
        let date = new Date(0);
        number += 1;
        date.setSeconds(number); // specify value for SECONDS here
        let timeString = number > 3599 ? date.toISOString().substring(11, 19) : date.toISOString().substring(14, 19);
        timerContainer.textContent = timeString;

    }, 1000);
}

const game = document.querySelector('.game');
const gameField = document.querySelector('.gameField');
const leftClue = document.querySelector('.leftClue');
const topClue = document.querySelector('.topClue');

game.addEventListener('click', (event) => {
       if (gameField.contains(event.target)) {
        gameFieldClick += 1;
    }
    if (gameFieldClick === 1) {
        setTimer();
    }
});

let nonograms;

async function getData() {
    const nonogramsData = 'data.json';
    const res = await fetch(nonogramsData);
    const data = await res.json();
    nonograms = [...data];
    //заполнение верхних подсказок
     for (let childrenRow = 0; childrenRow < topClue.children.length; childrenRow += 1) {
        for (let tailInChildrenRow = 0; tailInChildrenRow < topClue.children[childrenRow].children.length; tailInChildrenRow += 1) {
            topClue.children[childrenRow].children[tailInChildrenRow].textContent=nonograms[0].topClue[childrenRow][tailInChildrenRow];
        }
        //заполнение левых подсказок
        for (let tailInChildrenRow = 0;tailInChildrenRow < leftClue.children[childrenRow].children.length;tailInChildrenRow += 1 ) {
            leftClue.children[childrenRow].children[tailInChildrenRow].textContent=nonograms[0].leftClue[childrenRow][tailInChildrenRow];
        }
    }
console.log(nonograms[0]);
}

getData();

