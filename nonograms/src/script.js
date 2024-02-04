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
    renderNewGame
} from "./generating.js";

import { getSpecificLeftClues, getSpecificTopClues, getLevels } from "./counting.js"

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
    renderNewGame(nonograms,nonogramsIndex);//отрисовка подсказок и поля для игра по индексу

})

//eventFunction for dropdown-list-item
function renderGameListAccordingToSize(event, nonograms) {
    elements.gameListAccordingToSize.innerText = "";
    setClassname(elements.gameListAccordingToSize, "game-list-according-to-size");
    setLeftAndMaxWidth();
    const gamesOfClickedSized = nonograms.filter((value) => value.level === event.target.dataset.value);
    addGameListAccordingToSizeItem(gamesOfClickedSized,nonograms);
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
    nonogramsIndex=index;

}








