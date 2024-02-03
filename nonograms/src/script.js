import {
    addWrapper,
    addMessage,
    addTopButtonsContainer,
    addLevelButtonContainer,
    addLevelButton,
    addLevelDropdownList,
    addTimerContainer,
    addContinueButton,
    addDropDownListitem,
    addGameListAccordingToSize,
    elements,
    setLeftAndMaxWidth,
    setClassname,
    addGameListAccordingToSizeItem,
    closeLevelMenu,
    addGameContainer,
    addGame,
    addEmptySpace,
    addTopCluesField,
    addTopCluesRowsAndTiles,
    fillTopClues,
    addLeftCluesField,
    addLeftCluesRowsAndTiles,
    fillLeftClues,
    addGameField,
    addGameRowsAndTiles, clickTile,
} from "./generating.js";

import { getSpecificLeftClues, getSpecificTopClues, getLevels } from "./counting.js"


async function getData() {
    const nonogramsDataSrc = 'data.json';
    const res = await fetch(nonogramsDataSrc);
    const nonogramsData = await res.json();
    return [...nonogramsData];
}

let nonogramsIndex = 9;
let game;


getData().then((nonograms) => {
    const leftCluesValues = getSpecificLeftClues(nonograms, nonogramsIndex);//массив левых подсказок
    const topCluesValues = getSpecificTopClues(nonograms, nonogramsIndex);//массив верхних подсказок
    const levelArray = getLevels(nonograms);
    addWrapper();
    addMessage();
    addTopButtonsContainer();
    addLevelButtonContainer();
    addLevelButton();
    addLevelDropdownList();
    addTimerContainer();
    addContinueButton();
    addDropDownListitem(levelArray, renderGameListAccordingToSize, nonograms);
    addGameListAccordingToSize();
    addGameContainer();
    addGame();
    addEmptySpace();
    addTopCluesField();
    addTopCluesRowsAndTiles(topCluesValues);
    fillTopClues(topCluesValues);
    addLeftCluesField();
    addLeftCluesRowsAndTiles(leftCluesValues);
    fillLeftClues(leftCluesValues);
    addGameField(nonograms, nonogramsIndex);
    game = addGameRowsAndTiles(nonograms, nonogramsIndex);
    console.log(game);
    game.forEach((row) => {
        row.forEach((tile) => {
            tile.element.addEventListener("click", (ev) => {
                let arr = [];
                clickTile(ev);
                for (let i = 0; i < game.length; i += 1) {
                    let sum = 0;
                    for (let j = 0; j < game.length; j += 1) {
                        if ((game[i][j].element.dataset.status === "hidden" && game[i][j].isSolution === true)) {
                            sum += 1;
                           arr.push(sum)
                        }
                    }
                }
           if(arr.length===0) {
               //вставить функцию открытия сообщения о победе (с задержкой 0.5сек)
               alert('Победа!')
           }

            })

        })
    });
})

//eventFunction for dropdown-list-item
function renderGameListAccordingToSize(event, nonograms) {
    elements.gameListAccordingToSize.innerText = "";
    setClassname(elements.gameListAccordingToSize, "game-list-according-to-size");
    setLeftAndMaxWidth();
    const gamesOfClickedSized = nonograms.filter((value) => value.level === event.target.dataset.value);
    addGameListAccordingToSizeItem(gamesOfClickedSized);
}


//Add event listeners
//закрытие меню с выбором уровня по клику вне кнопки
document.addEventListener("click", (event) => {
    if (event.target !== elements.levelButton && event.target !== elements.levelDropdownList && !event.target.classList.contains("dropdown__list-item")) {
        closeLevelMenu();
        elements.levelButton.classList.remove("level-button_active");
    }
})


//закрытие меню по клику escape
document.addEventListener('keydown', function (e) {
    if (e.key === 'Tab' || e.key === 'Escape') {
        closeLevelMenu();
        elements.levelButton.classList.remove("level-button_active");
    }
})


// const timerContainer = document.querySelector('.timer-container');
//
// const timerProperties =
//     {
//         number: 0,
//         gameFieldClick: 0,
//     }
//
// function setTimer() {
//     let timer = setInterval(function () {
//         let date = new Date(0);
//         timerProperties.number += 1;
//         date.setSeconds(timerProperties.number); // specify value for SECONDS here
//         let timeString = timerProperties.number > 3599 ? date.toISOString().substring(11, 19) : date.toISOString().substring(14, 19);
//         timerContainer.textContent = timeString;
//
//     }, 1000);
//
// }
//
// const game = document.querySelector('.game');
// const gameField = document.querySelector('.gameField');
// const leftClue = document.querySelector('.leftClue');
// const topClue = document.querySelector('.topClue');
//
// game.addEventListener('click', (event) => {
//     if (gameField.contains(event.target)) {
//         timerProperties.gameFieldClick += 1;
//     }
//     if (timerProperties.gameFieldClick === 1) {
//         setTimer();
//     }
// });






