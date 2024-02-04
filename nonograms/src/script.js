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
    elements, timerProperties, musicProperties,
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
    renderNewGame, addBottomButtons, setLocalStorage, getLocalStorage, addGameRowsAndTiles
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


export let nonogramsIndex = 1;
export let game;


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
    elements.solutionButton.addEventListener('click', () => {
        // console.log(nonogramsIndex);
        const shownGame = [];
        const currentGame = document.querySelectorAll(".gameField__row");
        // console.log(currentGame.length);
        for (let i = 0; i < currentGame.length; i += 1) {
            const rowShowed = [];
            const row = currentGame[i];
            for (let child = 0; child < row.children.length; child += 1) {
                const tile = row.children[child];
                rowShowed.push([tile.dataset.status, tile.textContent]);
                console.log(tile.textContent, 'tile');
            }
            shownGame.push(rowShowed);
            setLocalStorage("shownGameArray", JSON.stringify(shownGame));
        }

    });

    elements.resetButton.addEventListener("click",()=> {
       const shownGameArr = getLocalStorage();
       console.log(shownGameArr);
       // addGameRowsAndTiles(nonograms,nonogramsIndex,shownGameArr)
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








