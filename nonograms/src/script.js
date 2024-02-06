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
    showAnswers,
    setTimer,
    setGameEventListeneres,
    clearCluesAndGameField,
    setGameByCurrentNumber,
    addResultBlock,
    setShuffledresults,
    clearResultsAfterRebooting,
    clearResultsOfLocalStorage,
    addSettingsBlock
} from "./generating.js";

import { getLevels, shuffle } from "./counting.js"

async function getData() {
    const nonogramsDataSrc = 'data.json';
    const res = await fetch(nonogramsDataSrc);
    const nonogramsData = await res.json();
    return [...nonogramsData];
}


export let nonogramsIndex = 0;
localStorage.setItem("numberOfCurrentGame", nonogramsIndex);
export let game;
let isShown = false;
localStorage.setItem("isShown", isShown);

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
    addResultBlock();
    clearResultsAfterRebooting();
    clearResultsOfLocalStorage();
    addSettingsBlock();

    //Кнопка показать решение
    elements.solutionButton.addEventListener('click', () => {
        elements.saveButton.classList.add("disabled");
        elements.saveButton.setAttribute("disabled", "disabled");
        localStorage.setItem('shownGameNumber', nonogramsIndex);
        // localStorage.setItem('savedGameNumber',nonogramsIndex);
        const numberCurrent = localStorage.getItem("numberOfCurrentGame");
        // localStorage.setItem("isShown", "true");
        // elements.continueButton.classList.remove("disabled");
        // elements.continueButton.removeAttribute("disabled");
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
        showAnswers(nonograms, numberCurrent);
    });

    //кнопка продолжить игру
    elements.continueButton.addEventListener("click", () => {
        const savedGameArr = getLocalStorage();
        const numberOfSavedGame = localStorage.getItem("savedGameNumber");
        localStorage.setItem("numberOfCurrentGame", numberOfSavedGame);
        const savedTimerProperties = JSON.parse(localStorage.getItem("lastGameTime"));
        clearInterval(timerProperties.timer);
        elements.levelButton.textContent = nonograms[numberOfSavedGame].name;
        timerProperties.number = savedTimerProperties.number;
        timerProperties.gameFieldClick = 1;

        clearCluesAndGameField();
        renderNewGame(nonograms, numberOfSavedGame, savedGameArr);
        // addGameRowsAndTiles(nonograms, nonogramsIndex, savedGameArr);
        setTimer();
    });

//кнопка начать игру заново
    elements.resetButton.addEventListener("click", () => {
        setGameByCurrentNumber(nonograms)
    });

    //кнопка случайная игра
    elements.randomButton.addEventListener("click", () => {
        resetToZeroTimerProperties();
        const gameListeneresDenied = localStorage.getItem("isShown");
        setGameEventListeneres(gameListeneresDenied);
        elements.saveButton.classList.remove("disabled");
        elements.saveButton.removeAttribute("disabled");
        const randomGameNumber = shuffle(nonograms)[0];
        localStorage.setItem("numberOfCurrentGame", randomGameNumber);
        const currentGameNumber = localStorage.getItem("numberOfCurrentGame");
        clearInterval(timerProperties.timer);
        elements.levelButton.textContent = nonograms[currentGameNumber].name;
        clearCluesAndGameField();
        renderNewGame(nonograms, currentGameNumber);
        localStorage.setItem("isShown", "false");
    })

//кнопка сохранить игру
    elements.saveButton.addEventListener("click", () => {
        const currentGameNumber = localStorage.getItem("numberOfCurrentGame");
        localStorage.setItem('savedGameNumber', currentGameNumber);
        elements.continueButton.classList.remove("disabled");
        elements.continueButton.removeAttribute("disabled");
        localStorage.setItem('lastGameTime', JSON.stringify(timerProperties));
        clearInterval(timerProperties.timer);
        timerProperties.gameFieldClick = 0;
        setGameEventListeneres(true);
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

        }
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








