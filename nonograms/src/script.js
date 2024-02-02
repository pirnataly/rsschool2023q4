import { addWrapper,addMessage,addTopButtonsContainer,
    addLevelButtonContainer,addLevelButton,addLevelDropdownList,addTimerContainer,addContinueButton,
    addDropDownListitem, addGameListAccordingToSize,elements,setLeftAndMaxWidth,setClassname,addGameListAccordingToSizeItem } from "./generating.js";

import {getSpecificTopClues, getLevels} from "./counting.js"



async function getData() {
    const nonogramsDataSrc = 'data.json';
    const res = await fetch(nonogramsDataSrc);
    const nonogramsData = await res.json();
    return [...nonogramsData];
}

let nonogramsIndex = 0;

getData().then((nonograms)=> {
    const topCluesValues = getSpecificTopClues(nonograms, nonogramsIndex);
    const levelArray = getLevels(nonograms);
    addWrapper();
    addMessage();
    addTopButtonsContainer();
    addLevelButtonContainer();
    addLevelButton();
    addLevelDropdownList();
    addTimerContainer();
    addContinueButton();
    addDropDownListitem(levelArray,renderGameListAccordingToSize,nonograms);
    addGameListAccordingToSize();
    // console.log(nonograms.filter((value)=> value.level === 'small'));
});








//eventFunction for dropdown-list-item
function renderGameListAccordingToSize(event,nonograms) {
    setClassname(elements.gameListAccordingToSize, "game-list-according-to-size");
    setLeftAndMaxWidth();
    const gamesOfClickedSized = nonograms.filter((value) => value.level === event.target.dataset.value);
    addGameListAccordingToSizeItem(gamesOfClickedSized);
}





//         let d = document.querySelector(".game-list-according-to-size_disabled");
//         console.log(JSON.stringify(d));
    // const dropDownListItem = document.querySelector(".dropdown__list-item");
    // console.log(dropDownListItem);
    // const levelButtonContainer = document.querySelector(".select-wrapper");
    // const levelDropdownList = document.querySelector(".dropdown__list");
    // // дописать функцию создания списка с играми...........
    // dropDownListItem.addEventListener('click', (ev)=> {
    //     const propForList = getComputedStyle(levelButtonContainer);
    //     gameListAccordingToSize.style.left = parseFloat(propForList.width) + "px";
    //     gameListAccordingToSize.style.maxWidth = parseFloat(propForList.width) + "px";
    //
    //     console.log(ev.target.dataset.value);
    // })












//открытие меню с выбором уровня
// levelButton.addEventListener("click",(event)=>{
//     levelDropdownList.classList.toggle("dropdown__list_hidden");
// })

//закрытие меню с выбором уровня по клику вне кнопки
// document.addEventListener("click", (event)=>{
//     if (event.target !== levelButton && event.target !==levelDropdownList && !event.target.classList.contains("dropdown__list-item")) {
//         levelDropdownList.classList.add("dropdown__list_hidden");
//     }
// })



















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
//
// let nonograms;




//
// async function fillClues() {
//     const nonogramsData = 'data.json';
//     const res = await fetch(nonogramsData);
//     const data = await res.json();
//     nonograms = [...data];
//     //заполнение верхних подсказок
//     for (let childrenRow = 0; childrenRow < topClue.children.length; childrenRow += 1) {
//         for (let tailInChildrenRow = 0; tailInChildrenRow < topClue.children[childrenRow].children.length; tailInChildrenRow += 1) {
//             topClue.children[childrenRow].children[tailInChildrenRow].textContent = nonograms[0].topClue[childrenRow][tailInChildrenRow];
//         }
//         //заполнение левых подсказок
//         for (let tailInChildrenRow = 0; tailInChildrenRow < leftClue.children[childrenRow].children.length; tailInChildrenRow += 1) {
//             leftClue.children[childrenRow].children[tailInChildrenRow].textContent = nonograms[0].leftClue[childrenRow][tailInChildrenRow];
//         }
//     }
//
// }
//
// fillClues();

