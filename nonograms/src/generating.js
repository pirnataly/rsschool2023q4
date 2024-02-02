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
    wrapper:create("div"),
    message:create("div"),
    topButtonsContainer:create("div"),
    levelButtonContainer:create("div"),
    levelDropdownList:create("div"),
    levelButton:create("button"),
    timerContainer:create("div"),
    continueButton:create("button"),
    gameListAccordingToSize:create("div"),
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
 elements.levelButton.addEventListener("click",(event)=>{
     elements.levelDropdownList.classList.toggle("dropdown__list_hidden");
})
}


export function addLevelDropdownList() {
    setClassname(elements.levelDropdownList, "dropdown__list dropdown__list_hidden");
    appending(elements.levelButtonContainer, elements.levelDropdownList);
}

export function addTimerContainer() {
    setClassname(elements.timerContainer,"timer-container");
    elements.timerContainer.textContent = "123";
    appending(elements.topButtonsContainer,elements.timerContainer);
}

export function addContinueButton() {
    setClassname(elements.continueButton,"continue-button button disabled");
    elements.continueButton.textContent = "Continue last game";
    appending(elements.topButtonsContainer,elements.continueButton)
}


export function addGameListAccordingToSize() {
    setClassname(elements.gameListAccordingToSize,"game-list-according-to-size game-list-according-to-size_disabled");
    appending(elements.levelDropdownList,elements.gameListAccordingToSize);
}


export function addDropDownListitem(arr,eventFunction,...arg) {
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
        accordingToSizeGameItem.addEventListener('click',(ev)=> {
            elements.gameListAccordingToSize.innerText="";
            elements.gameListAccordingToSize.classList.add("game-list-according-to-size_disabled");
            elements.levelDropdownList.classList.add("dropdown__list_hidden");
            //добавить функцию отрисовки выбранной игры
            console.log(ev.target.textContent);
        });
    }

}




function getProperties(element) {
    return getComputedStyle(element);
}

function setPropAccordingToParentWidth(parent,prop) {
    elements.gameListAccordingToSize.style[prop] = parseFloat((getProperties(parent)).width) + "px";
}

export function setLeftAndMaxWidth() {
    setPropAccordingToParentWidth(elements.levelButtonContainer,"left");
    setPropAccordingToParentWidth(elements.levelButtonContainer,"maxWidth");
}