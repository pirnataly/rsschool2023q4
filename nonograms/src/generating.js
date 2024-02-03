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
    elements.timerContainer.textContent = "123";
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
    const audio = new Audio("./assets/clicking-sound.mp3");
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
            audio.play();
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
        setClassname(topRow,"topClue__row");
        appending(elements.topClueField,topRow);
        for(let j = 0; j < arr[0].length; j += 1) {
            let rowTile = create("div");
            setClassname(rowTile, "tile");
            appending(topRow,rowTile);
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
    setClassname(elements.leftClueField,"leftClue");
    appending(elements.game,elements.leftClueField);
}

export function addLeftCluesRowsAndTiles(arr) {
    for (let i = 0; i < arr.length; i += 1) {
        let leftRow = create("div");
        setClassname(leftRow,"leftClue__row");
        appending(elements.leftClueField,leftRow);
        for(let j = 0; j < arr[0].length; j += 1) {
            let rowTile = create("div");
            setClassname(rowTile, "tile");
            appending(leftRow,rowTile);
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

