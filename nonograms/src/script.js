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
    timerProperties,
    musicProperties,
    setLeftAndMaxWidth,
    setClassname,
    addGameListAccordingToSizeItem,
    closeLevelMenu,
    addGameContainer,
    addGame,
    addEmptySpace,
    addTopCluesField,
    addLeftCluesField,
    addGameField,
    renderNewGame,
    addBottomButtons,
    setLocalStorage,
    getLocalStorage,
    addGameRowsAndTiles,
    resetToZeroTimerProperties,
    clearGameField,
    showAnswers, setTimer, setGameEventListeneres
} from "./generating.js";

import { getLevels } from "./counting.js"

// const arrayForFiveLastResults = [];
// console.log(arrayForFiveLastResults.length);

async function getData() {
    const nonogramsDataSrc = 'data.json';
    const res = await fetch(nonogramsDataSrc);
    const nonogramsData = await res.json();
    return [...nonogramsData];
}


export let nonogramsIndex = 0;
localStorage.setItem("numberOfCurrentGame",nonogramsIndex);
export let game;
let isShown = (localStorage.getItem("isShown"))?localStorage.getItem("isShown"):false;
console.log(isShown, 'isshown');


getData().then((nonograms) => {
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
    addLeftCluesField();
    addGameField(nonograms, nonogramsIndex);
    renderNewGame(nonograms, nonogramsIndex);//отрисовка подсказок и поля для игра по индексу
    addBottomButtons();
    //Кнопка показать решение
    elements.solutionButton.addEventListener('click', () => {
        localStorage.setItem('shownGameNumber',nonogramsIndex);
        isShown = true;
        localStorage.setItem("isShown",isShown);
        elements.continueButton.classList.remove("disabled");
        localStorage.setItem('lastGameTime', JSON.stringify(timerProperties));
        clearInterval(timerProperties.timer);
        // resetToZeroTimerProperties();
        const savedGame = [];
        const currentGame = document.querySelectorAll(".gameField__row");
        for (let i = 0; i < currentGame.length; i += 1) {
            const rowShowed = [];
            const row = currentGame[i];
            for (let child = 0; child < row.children.length; child += 1) {
                const tile = row.children[child];
                rowShowed.push([tile.dataset.status, tile.textContent]);
            }
            savedGame.push(rowShowed);
            setLocalStorage("savedGameArray", JSON.stringify(savedGame));
            clearGameField();
        }
        showAnswers(nonograms, nonogramsIndex);
    });

    //кнопка продолжить игру
    elements.continueButton.addEventListener("click", () => {
        const savedGameArr = getLocalStorage();
      clearInterval(timerProperties.timer);
        clearGameField();
        addGameRowsAndTiles(nonograms, nonogramsIndex, savedGameArr);
        setTimer();
    });

//кнопка начать игру заново
    elements.resetButton.addEventListener("click", () => {
        const currentGameNumber = localStorage.getItem("numberOfCurrentGame");
        const gameListeneresDenied = localStorage.getItem("isShown");
        console.log(gameListeneresDenied,'gamelisteneresDenied');
        console.log(currentGameNumber);
        resetToZeroTimerProperties();
        clearGameField();
        addGameRowsAndTiles(nonograms,currentGameNumber);
   setGameEventListeneres(gameListeneresDenied);
    });

    //кнопка случайная игра
    elements.randomButton.addEventListener("click",()=>{
        //в зависимости от текущей игры поставить в локал сторидж(смотреть в item of dropdown list according...)
        localStorage.setItem("isShown", "false");
    })

})

//eventFunction for dropdown-list-item
function renderGameListAccordingToSize(event, nonograms) {
    elements.gameListAccordingToSize.innerText = "";
    setClassname(elements.gameListAccordingToSize, "game-list-according-to-size");
    setLeftAndMaxWidth();
    const gamesOfClickedSized = nonograms.filter((value) => value.level === event.target.dataset.value);
    addGameListAccordingToSizeItem(gamesOfClickedSized, nonograms);
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


export function changeGameIndex(index) {
    nonogramsIndex = index;
}








