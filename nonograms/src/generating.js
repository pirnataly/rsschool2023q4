import { getAnswers, getSpecificLeftClues, getSpecificTopClues, shuffleByTime } from "./counting.js";
import { changeGameIndex, game, nonogramsIndex } from "./script.js";

const newArray = [];

export function setClassname(el, val) {
    el.className = val;
}

function appending(where, what) {
    where.append(what);
}

function create(tagname) {
    return document.createElement(tagname);
}


//page blocks
export const elements = {
    wrapper: create("div"),
    message: create("div"),
    topButtonsContainer: create("div"),
    levelButtonContainer: create("div"),
    levelDropdownList: create("div"),
    levelButton: create("button"),
    timerContainer: create("div"),
    continueButton: create("button"),
    gameListAccordingToSize: create("div"),
    gameContainer: create("div"),
    game: create("div"),
    emptySpace: create("div"),
    topClueField: create("div"),
    leftClueField: create("div"),
    gameField: create("div"),
    bottomButtons: create("div"),
    resetButton: create("button"),
    saveButton: create("button"),
    randomButton: create("button"),
    solutionButton: create("button"),
    resultBlock: create("div"),
    settings: create("div"),
    soundSettings: create("form"),
    soundsHeading: create("span"),
    labelForOn: create("label"),
    onSound: create("input"),
    labelForOff:create("label"),
    offSound: create("input"),
    themeSettings: create("span"),


}

export const timerProperties =
    {
        number: 0,
        gameFieldClick: 0,
        timer: 0,
    }

export const musicProperties = {
    audioclick: new Audio("./assets/clicking-sound.mp3"),
    audioEvenClick: new Audio("./assets/evenclick.wav"),
    audioRightClick: new Audio("./assets/rightClick.wav"),
    audioWinning: new Audio("./assets/win.wav"),
}


export function addWrapper() {
    setClassname(elements.wrapper, "wrapper");
    document.body.prepend(elements.wrapper);
}


export function addMessage() {
    setClassname(elements.message, "message message__disabled");
    appending(elements.wrapper, elements.message);
}


export function addTopButtonsContainer() {
    setClassname(elements.topButtonsContainer, "top-buttons");
    appending(elements.wrapper, elements.topButtonsContainer);
}

export function addLevelButtonContainer() {
    setClassname(elements.levelButtonContainer, "select-wrapper");
    appending(elements.topButtonsContainer, elements.levelButtonContainer);
}

export function addLevelButton() {
    setClassname(elements.levelButton, "level-button button");
    elements.levelButton.textContent = "Level";
    appending(elements.levelButtonContainer, elements.levelButton);
    //открытие меню с выбором уровня
    elements.levelButton.addEventListener("click", () => {
        elements.levelButton.classList.add("level-button_active");
        gameListClearAndHide();
        elements.levelDropdownList.classList.toggle("dropdown__list_hidden");
    })
}

export function addLevelDropdownList() {
    setClassname(elements.levelDropdownList, "dropdown__list dropdown__list_hidden");
    appending(elements.levelButtonContainer, elements.levelDropdownList);
}

export function addTimerContainer() {
    setClassname(elements.timerContainer, "timer-container");
    elements.timerContainer.textContent = "00:00";
    appending(elements.topButtonsContainer, elements.timerContainer);
}

export function addContinueButton() {
    setClassname(elements.continueButton, "continue-button button disabled");
    elements.continueButton.textContent = "Continue last game";
    elements.continueButton.setAttribute("disabled", "disabled");
    appending(elements.topButtonsContainer, elements.continueButton)
}


export function addGameListAccordingToSize() {
    setClassname(elements.gameListAccordingToSize, "game-list-according-to-size game-list-according-to-size_disabled");
    appending(elements.levelDropdownList, elements.gameListAccordingToSize);
}

export function addDropDownListitem(arr, eventFunction, ...arg) {
    for (let i = 0; i < arr.length; i += 1) {
        const dropDownListItem = create("button");
        setClassname(dropDownListItem, "dropdown__list-item");
        dropDownListItem.setAttribute("data-value", arr[i]);
        dropDownListItem.textContent = arr[i];
        appending(elements.levelDropdownList, dropDownListItem);
        //обработчик по клику на список с размерами игры
        dropDownListItem.addEventListener('click', (e) => eventFunction(e, ...arg));
    }
}

export function addGameListAccordingToSizeItem(arr, array) {
    for (let i = 0; i < arr.length; i += 1) {
        const accordingToSizeGameItem = create("button");
        setClassname(accordingToSizeGameItem, "dropdown__list-item");
        accordingToSizeGameItem.setAttribute("data-name", arr[i]);
        accordingToSizeGameItem.textContent = arr[i].name;
        appending(elements.gameListAccordingToSize, accordingToSizeGameItem);
        accordingToSizeGameItem.addEventListener('click', (ev) => {
            elements.saveButton.classList.remove("disabled");
            elements.saveButton.removeAttribute("disabled");
            localStorage.setItem("numberOfCurrentGame", nonogramsIndex);
            localStorage.setItem("isShown", "false");
            elements.levelButton.classList.remove("level-button_active");
            elements.levelButton.textContent = ev.target.textContent;
            closeLevelMenu();
            //функция отрисовки выбранной игры
            for (let i = 0; i < array.length; i += 1) {
                if (ev.target.textContent === array[i].name) {
                    localStorage.setItem("numberOfCurrentGame", i);
                    if ((Number(localStorage.getItem("shownGameNumber") || 16) === Number(localStorage.getItem("numberOfCurrentGame")))) {
                        localStorage.setItem("isShown", "true");
                    }
                    changeGameIndex(i);
                    clearCluesAndGameField();
                    resetToZeroTimerProperties();
                    elements.game.addEventListener("click", setTimerAfterFirstClick);
                    elements.game.addEventListener("contextmenu", setTimerAfterFirstClick);
                    renderNewGame(array, i);
                }
            }
            ;
        })

    }
}

export function addGameContainer() {
    setClassname(elements.gameContainer, "game-container");
    appending(elements.wrapper, elements.gameContainer);
}

export function addGame() {
    setClassname(elements.game, "game");
    appending(elements.gameContainer, elements.game);
    elements.game.addEventListener("click", setTimerAfterFirstClick);
    elements.game.addEventListener("contextmenu", setTimerAfterFirstClick)

}

export function addEmptySpace() {
    setClassname(elements.emptySpace, "empty-space");
    appending(elements.game, elements.emptySpace);
}


//верхние подсказки
export function addTopCluesField() {
    setClassname(elements.topClueField, "topClue");
    appending(elements.game, elements.topClueField);
}

export function addTopCluesRowsAndTiles(arr) {
    for (let i = 0; i < arr.length; i += 1) {
        let topRow = create("div");
        setClassname(topRow, "topClue__row");
        appending(elements.topClueField, topRow);
        for (let j = 0; j < arr[0].length; j += 1) {
            let rowTile = create("div");
            setClassname(rowTile, "tile");
            appending(topRow, rowTile);
            rowTile.addEventListener("contextmenu", (event) => {
                event.preventDefault();
            })
        }
    }
}

export function fillTopClues(arr) {
    for (let childrenRow = 0; childrenRow < elements.topClueField.children.length; childrenRow += 1) {
        for (let tailInChildrenRow = 0; tailInChildrenRow < elements.topClueField.children[childrenRow].children.length; tailInChildrenRow += 1) {
            elements.topClueField.children[childrenRow].children[tailInChildrenRow].textContent = arr[childrenRow][tailInChildrenRow];
        }
    }
}

//левые подсказки
export function addLeftCluesField() {
    setClassname(elements.leftClueField, "leftClue");
    appending(elements.game, elements.leftClueField);
}

export function addLeftCluesRowsAndTiles(arr) {
    for (let i = 0; i < arr.length; i += 1) {
        let leftRow = create("div");
        setClassname(leftRow, "leftClue__row");
        appending(elements.leftClueField, leftRow);
        for (let j = 0; j < arr[0].length; j += 1) {
            let rowTile = create("div");
            setClassname(rowTile, "tile");
            appending(leftRow, rowTile);
            rowTile.addEventListener("contextmenu", (event) => {
                event.preventDefault();
            })
        }
    }
}

export function fillLeftClues(arr) {
    for (let childrenRow = 0; childrenRow < elements.leftClueField.children.length; childrenRow += 1) {
        for (let tailInChildrenRow = 0; tailInChildrenRow < elements.leftClueField.children[childrenRow].children.length; tailInChildrenRow += 1) {
            elements.leftClueField.children[childrenRow].children[tailInChildrenRow].textContent = arr[childrenRow][tailInChildrenRow];
        }
    }
}

//игровое поле
export function addGameField(arr, index) {
    setClassname(elements.gameField, "gameField");
    appending(elements.game, elements.gameField);
}


//функция по отрисовке
export function addGameRowsAndTiles(arr, index, args) {
    const notEndedGame = args || [];
    const cgangedDirectionArray = changeDirection(notEndedGame)
    const gameBoard = [];
    const answersForIndexedGame = getAnswers(arr)[index];
    const solutionPositions = getSolutionPositions(answersForIndexedGame);
    for (let x = 0; x < answersForIndexedGame.length; x += 1) {
        const row = [];
        const gameFieldRow = create("div");
        setClassname(gameFieldRow, "gameField__row");
        appending(elements.gameField, gameFieldRow);
        for (let y = 0; y < answersForIndexedGame.length; y += 1) {
            const element = create("div");
            element.dataset.status = "hidden";
            setClassname(element, "tile");
            appending(gameFieldRow, element);
            const tile = {
                element,
                x,
                y,
                isSolution: solutionPositions.some(positionMatch.bind(null, {x, y})),
            };
            if (notEndedGame.length !== 0) {

                tile.element.dataset.status = cgangedDirectionArray[y][x][0];
                tile.element.textContent = cgangedDirectionArray[y][x][1];
            }
            row.push(tile)
        }
        gameBoard.push(row);
    }
    gameBoard.forEach((row) => {
        row.forEach((tile) => {
            tile.element.addEventListener("click", (ev) => {
                let arrOfSolutions = [];
                let arrOfIncorrectOpenTiles = [];
                changeTileView(ev);
                if(elements.onSound.classList.contains("music-on")) {
                    playClickMusic(tile);
                }
                for (let i = 0; i < gameBoard.length; i += 1) {
                    let sumOfRestSolutions = 0;
                    let sumOfIncorrectOpenTilse = 0;
                    //проверка победы
                    for (let j = 0; j < gameBoard.length; j += 1) {
                        if (gameBoard[i][j].element.dataset.status === "hidden" && gameBoard[i][j].isSolution === true) {
                            sumOfRestSolutions += 1;
                            arrOfSolutions.push(sumOfRestSolutions);
                        }
                        if (gameBoard[i][j].element.dataset.status === "open" && gameBoard[i][j].isSolution === false) {
                            sumOfIncorrectOpenTilse += 1;
                            arrOfIncorrectOpenTiles.push(sumOfIncorrectOpenTilse);
                        }
                    }
                }
                if (arrOfSolutions.length === 0 && arrOfIncorrectOpenTiles.length === 0) {
                    const resultOfGame = [];
                    const isShown = (localStorage.getItem("isShown")) ? JSON.parse(localStorage.getItem("isShown")) : false;
                    if ((Boolean(isShown)) === false) {
                        resultOfGame.push(arr[index].name, arr[index].level, timerProperties.number);
                    }

                    if ((Boolean(isShown)) === false) {
                        newArray.push(resultOfGame);
                    }
                    if (newArray.length === 6) {
                        newArray.shift()
                    }

                    localStorage.setItem('arr5', JSON.stringify(newArray));

                    setShuffledresults ();
                    if(elements.onSound.classList.contains("music-on")) {
                        playWin();
                    }
                    clearInterval(timerProperties.timer);
                    elements.saveButton.classList.add("disabled");
                    elements.saveButton.setAttribute("disabled", "disabled");
                    //вставить функцию открытия сообщения о победе (с задержкой 0.5сек)
                     setTimeout(() => {
                            alert(`Great! You have solved the nonogram in ${timerProperties.number} seconds!`)
                        }
                        , 1);
                    clearInterval(timerProperties.timer);

                }

            });
            tile.element.addEventListener("contextmenu", (event) => {
                event.preventDefault();
                tile.element.dataset.status = "hidden";
                tile.element.textContent = (tile.element.textContent === "x") ? "" : "x";
                if(elements.onSound.classList.contains("music-on")) {
                    playRightClickMusic(tile);
                }
            })
        })
    })
    return gameBoard;
}

export function addBottomButtons() {
    setClassname(elements.bottomButtons, "bottom-buttons");
    appending(elements.wrapper, elements.bottomButtons);
    addSolutionButton();
    addResetButton();
    addSaveButton();
    addRandomButton();
}

function addResetButton() {
    setClassname(elements.resetButton, "bottoms-buttons__button bottom-buttons__reset reset-button button");
    elements.resetButton.textContent = "Reset game";
    appending(elements.bottomButtons, elements.resetButton);
}

function addSolutionButton(ind) {
    setClassname(elements.solutionButton, "bottoms-buttons__button bottom-buttons__solution solution-button button");
    elements.solutionButton.textContent = "Show solution";
    appending(elements.bottomButtons, elements.solutionButton);
    }

function addSaveButton() {
    setClassname(elements.saveButton, "bottoms-buttons__button bottom-buttons__save save-button button");
    elements.saveButton.textContent = "Save game";
    appending(elements.bottomButtons, elements.saveButton);
}

function addRandomButton() {
    setClassname(elements.randomButton, "bottoms-buttons__button bottom-buttons__random random-button button");
    elements.randomButton.textContent = "Random game";
    appending(elements.bottomButtons, elements.randomButton);
}

//вспомогательные функции
export function closeLevelMenu() {
    gameListClearAndHide();
    levelListHide();
}

function gameListClearAndHide() {
    elements.gameListAccordingToSize.innerText = "";
    elements.gameListAccordingToSize.classList.add("game-list-according-to-size_disabled");
}

function levelListHide() {
    elements.levelDropdownList.classList.add("dropdown__list_hidden");
}

function getProperties(element) {
    return getComputedStyle(element);
}

function setPropAccordingToParentWidth(parent, prop) {
    elements.gameListAccordingToSize.style[prop] = parseFloat((getProperties(parent)).width) + "px";
}

export function setLeftAndMaxWidth() {
    setPropAccordingToParentWidth(elements.levelButtonContainer, "left");
    setPropAccordingToParentWidth(elements.levelButtonContainer, "maxWidth");
}

function positionMatch(a, b) {
    return a.x === b.x && a.y === b.y;
}

function getSolutionPositions(arr) {
    const solutionPositions = [];
    for (let i = 0; i < arr.length; i += 1) {
        for (let j = 0; j < arr[i].length; j += 1) {
            if (arr[i][j] === 1) {
                solutionPositions.push({x: j, y: i})
            }
        }
    }
    return solutionPositions;
}

export function clearCluesAndGameField() {
    elements.topClueField.innerText = "";
    elements.leftClueField.innerText = "";
    clearGameField();
}

export function clearGameField() {
    elements.gameField.innerText = "";
}

//установка таймера по клику на поле
export function setTimer() {
    timerProperties.timer = setInterval(function () {
        let date = new Date(0);
        timerProperties.number += 1;
        date.setSeconds(timerProperties.number); // specify value for SECONDS here
        let timeString = timerProperties.number > 3599 ? date.toISOString().substring(11, 19) : date.toISOString().substring(14, 19);
        elements.timerContainer.textContent = timeString;

    }, 1000);
}

function setTimerAfterFirstClick(event) {
    if (elements.gameField.contains(event.target)) {
        timerProperties.gameFieldClick += 1;
    }
    if (timerProperties.gameFieldClick === 1) {
        setTimer();
    }

}

export function resetToZeroTimerProperties() {
    timerProperties.number = 0;
    elements.timerContainer.textContent = "00:00";
    timerProperties.gameFieldClick = 0;
    clearInterval(timerProperties.timer);
}

//main function for cell

export function changeTileView(ev) {
    const clickedTile = ev.target;
    clickedTile.textContent = "";
    setDataSet(clickedTile);

}

function setDataSet(el) {
    if (el.dataset.status !== "hidden") {
        el.dataset.status = "hidden";
    } else {
        el.dataset.status = "open";
    }
}

export function checkWin(arr) {
    for (let i = 0; i < arr.length; i += 1) {
        for (let j = 0; j < arr.length; j += 1) {
            if ((arr[i][j].element.dataset.status === "hidden" && arr[i][j].element.isSolution === true)) {
                return true
            }
        }

    }
    return false;
}


//music
export function playClickMusic(el) {
    if (el.element.dataset.status !== "hidden") {
        musicProperties.audioclick.play();
    } else {
        musicProperties.audioEvenClick.play()
    }
}

export function playRightClickMusic(el) {
    if (el.element.textContent === "x") {
        musicProperties.audioRightClick.play();
    } else {
        musicProperties.audioEvenClick.play()
    }
}

export function playWin() {
    musicProperties.audioWinning.play();
}

export function renderNewGame(gameArray, indexOfGameArray, args) {
    const leftCluesValues = getSpecificLeftClues(gameArray, indexOfGameArray);//массив левых подсказок
    const topCluesValues = getSpecificTopClues(gameArray, indexOfGameArray);//массив верхних подсказок
    addTopCluesRowsAndTiles(topCluesValues);
    fillTopClues(topCluesValues);
    addLeftCluesRowsAndTiles(leftCluesValues);
    fillLeftClues(leftCluesValues);
    addGameRowsAndTiles(gameArray, indexOfGameArray, args);
}

export function setLocalStorage(item, value) {
    localStorage.setItem(item, value)
}

export function getLocalStorage() {
    if (localStorage.getItem("savedGameArray")) {
        return JSON.parse(localStorage.getItem("savedGameArray"));
    }
}

export function showAnswers(arr, index) {
    const gameBoard = [];
    const answersForIndexedGame = getAnswers(arr)[index];
    const solutionPositions = getSolutionPositions(answersForIndexedGame);
    for (let x = 0; x < answersForIndexedGame.length; x += 1) {
        const row = [];
        const gameFieldRow = create("div");
        setClassname(gameFieldRow, "gameField__row");
        appending(elements.gameField, gameFieldRow);
        for (let y = 0; y < answersForIndexedGame.length; y += 1) {
            const element = create("div");
            setClassname(element, "tile");
            appending(gameFieldRow, element);
            const tile = {
                element,
                x,
                y,
                isSolution: solutionPositions.some(positionMatch.bind(null, {x, y})),
            };
            tile.isSolution === true ? tile.element.dataset.status = "open" : tile.element.dataset.status = "hidden";
            row.push(tile)
        }
        gameBoard.push(row);
    }
    elements.game.removeEventListener("click", setTimerAfterFirstClick);
    elements.game.removeEventListener("contextmenu", setTimerAfterFirstClick);
    return gameBoard;
}


function changeDirection(arr) {
    let newarr = [];
    for (let i = 0; i < arr.length; i += 1) {
        const newarrRow = [];
        for (let j = 0; j < arr.length; j += 1) {
            newarrRow.push(arr[j][i])
        }
        newarr.push(newarrRow);
    }
    return newarr;
}

export function setGameEventListeneres(condition) {
    if (condition) {
        elements.game.addEventListener("click", setTimerAfterFirstClick);
        elements.game.addEventListener("contextmenu", setTimerAfterFirstClick);
    }
}

export function setGameByCurrentNumber(array) {
    elements.saveButton.classList.remove("disabled");
    elements.saveButton.removeAttribute("disabled");
    const currentGameNumber = localStorage.getItem("numberOfCurrentGame");
    const gameListeneresDenied = localStorage.getItem("isShown");
    resetToZeroTimerProperties();
    clearGameField();
    addGameRowsAndTiles(array, currentGameNumber);
    setGameEventListeneres(gameListeneresDenied);
}

export function addResultBlock() {
    setClassname(elements.resultBlock, "result-block");
    appending(elements.wrapper, elements.resultBlock);
    elements.resultHeading = create("heading");
    setClassname(elements.resultHeading, "result-heading")
    elements.resultHeading.textContent = "Results";
    appending(elements.resultBlock, elements.resultHeading);
    elements.blockForResultRows = create("div");
    setClassname(elements.blockForResultRows, "result-rows-container");
    appending(elements.resultBlock, elements.blockForResultRows);
    for (let i = 0; i < 5; i += 1) {
        const resultRow = create("div");
        setClassname(resultRow, "result-row");
        appending(elements.blockForResultRows, resultRow);
        for (let j = 0; j < 3; j += 1) {
            const resultColumn = create("div");
            setClassname(resultColumn, "result-column");
            appending(resultRow, resultColumn);
        }
    }
}

export function setShuffledresults () {
    const newarray1 = JSON.parse(localStorage.getItem("arr5") || "[]");
    if (newarray1.length) {
        const copyNewArray = [...newarray1]
        const shuffledByTime = shuffleByTime(copyNewArray);
        for (let i = 0; i < shuffledByTime.length; i += 1) {
            for(let j = 0; j < 3; j += 1) {
                elements.blockForResultRows.children[i].children[j].textContent="";
                elements.blockForResultRows.children[i].children[j].textContent=shuffledByTime[i][j];
            }
        }
    }
}

export function clearResultsOfLocalStorage() {
    localStorage.removeItem("arr5");
}

export function clearResultsAfterRebooting(){
    for(let i = 0; i < 5; i +=1 ) {
         for(let i = 0; i < 3; i += 1) {
            elements.blockForResultRows.children[i].children[i].textContent="";
        }
    }
}

export function addSettingsBlock() {
    setClassname(elements.settings, "settings");
    appending(elements.wrapper,elements.settings);
    addSoundsSettings();
    addThemeSettings();


}
function addSoundsSettings() {
    setClassname(elements.soundSettings, "sound-settings");
    appending(elements.settings, elements.soundSettings);
    elements.soundsHeading.textContent = "Sounds";
    setClassname(elements.soundsHeading,"sounds-heading");
    appending(elements.soundSettings,elements.soundsHeading);
    addOnSound();
    addOffSound();

}

function addThemeSettings() {
    setClassname(elements.themeSettings, "theme-settings");
    appending(elements.settings, elements.themeSettings);
}




function addOnSound(){
    elements.labelForOn.setAttribute("for","on");
    elements.labelForOn.textContent = "on";
    appending(elements.soundSettings,elements.labelForOn);
    elements.onSound.setAttribute("type","radio");
    elements.onSound.setAttribute("checked","checked");
    setClassname(elements.onSound,"music-on");
    elements.onSound.name = "sound";
    elements.onSound.value = "on";
    elements.onSound.id = "on";
    appending(elements.labelForOn,elements.onSound);

}

function addOffSound() {
    elements.labelForOff.setAttribute("for","off");
    elements.labelForOff.textContent = "off";
    appending(elements.soundSettings,elements.labelForOff);
    elements.offSound.setAttribute("type","radio");
    elements.offSound.name="sound";
    elements.offSound.value = "off";
    elements.offSound.id ="off";
    appending(elements.labelForOff,elements.offSound);
}

elements.onSound.addEventListener("input",()=>{
    elements.onSound.classList.add("music-on");
    })
elements.offSound.addEventListener("input",()=>{
    elements.onSound.classList.remove('music-on');
})
