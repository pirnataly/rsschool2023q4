import { getAnswers } from "./counting.js";


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
}

export const timerProperties =
    {
        number: 0,
        gameFieldClick: 0,
        timer:0,
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
    elements.levelButton.addEventListener("click", (event) => {
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

export function addGameListAccordingToSizeItem(arr) {

    for (let i = 0; i < arr.length; i += 1) {
        const accordingToSizeGameItem = create("button");
        setClassname(accordingToSizeGameItem, "dropdown__list-item");
        accordingToSizeGameItem.setAttribute("data-name", arr[i]);
        accordingToSizeGameItem.textContent = arr[i].name;
        appending(elements.gameListAccordingToSize, accordingToSizeGameItem);
        accordingToSizeGameItem.addEventListener('click', (ev) => {
            elements.levelButton.classList.remove("level-button_active");
            elements.levelButton.textContent = ev.target.textContent;
            closeLevelMenu();

           //добавить функцию отрисовки выбранной игры
            console.log(ev.target.textContent);
        });
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
    elements.game.addEventListener("contextmenu",setTimerAfterFirstClick)

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
            rowTile.addEventListener("contextmenu",(event)=>{
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
            rowTile.addEventListener("contextmenu",(event)=>{
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

export function addGameRowsAndTiles(arr, index) {
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
            // element.addEventListener('click',clickTile);
            setClassname(element, "tile");
            appending(gameFieldRow, element);
            const tile = {
                element,
                x,
                y,
                isSolution: solutionPositions.some(positionMatch.bind(null, {x, y})),
            };
            row.push(tile)
        }
        gameBoard.push(row);
    }
    return gameBoard;
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

//установка таймера по клику на поле
function setTimer() {
    timerProperties.timer = setInterval(function () {
        let date = new Date(0);
        timerProperties.number += 1;
        date.setSeconds(timerProperties.number); // specify value for SECONDS here
        let timeString = timerProperties.number > 3599 ? date.toISOString().substring(11, 19) : date.toISOString().substring(14, 19);
        // elements.timerContainer.textContent = "";
        elements.timerContainer.textContent = timeString;

    }, 1000);
}

function setTimerAfterFirstClick(event){
    if (elements.gameField.contains(event.target)) {
        timerProperties.gameFieldClick += 1;
    }
    if (timerProperties.gameFieldClick === 1) {
        setTimer();
    }
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
                console.log(true)
                return true
            }
        }

    }

    console.log(false)
    return false;
}


//music
export function playClickMusic(el){
    if(el.element.dataset.status !== "hidden"){
        musicProperties.audioclick.play();
    }
    else {
        musicProperties.audioEvenClick.play()
    }
}

export function playRightClickMusic(el) {
    if(el.element.textContent === "x"){
        musicProperties.audioRightClick.play();
    }
    else {
        musicProperties.audioEvenClick.play()
    }
}

export function playWin() {
    musicProperties.audioWinning.play();
}