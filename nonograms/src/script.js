const wrapper = document.createElement("div");
wrapper.className = "wrapper";
document.body.prepend(wrapper);

const message = document.createElement("div");
message.className = "message message__disabled";
wrapper.append(message);

const topButtonsContainer = document.createElement("div");
topButtonsContainer.className = "top-buttons";
wrapper.append(topButtonsContainer);

const levelButtonContainer = document.createElement("div");
levelButtonContainer.className = "select-wrapper";
topButtonsContainer.append(levelButtonContainer);

const levelButton = document.createElement("button");
levelButton.className = "level-button button";
levelButton.textContent = "Level";
levelButtonContainer.append(levelButton);

const levelDropdownList = document.createElement("div");
levelDropdownList.className = "dropdown__list dropdown__list_hidden";
levelButtonContainer.append(levelDropdownList);

const gameSize = ["small","medium","large"];

for (let i = 0; i < gameSize.length; i += 1) {
    const dropDownListitem = document.createElement("button");
    dropDownListitem.className = "dropdown__list-item";
    dropDownListitem.setAttribute("data-value",gameSize[i]);
    dropDownListitem.textContent = gameSize[i];
    levelDropdownList.append(dropDownListitem);
    dropDownListitem.addEventListener('click', (ev)=> {
        const gameListAccordingToSize = document.createElement("div");
        // дописать функцию создания списка с играми...........
        console.log(ev.target.dataset.value);
    })
}



const timerContainer = document.createElement("div");
timerContainer.className = "timer-container";
timerContainer.textContent = "123";
topButtonsContainer.append(timerContainer);

const continueButton = document.createElement("button");
continueButton.className = "continue-button button disabled";
continueButton.textContent = "Continue last game";
topButtonsContainer.append(continueButton);








//открытие меню с выбором уровня
levelButton.addEventListener("click",(event)=>{
    levelDropdownList.classList.toggle("dropdown__list_hidden");
})

//закрытие меню с выбором уровня по клику вне кнопки
document.addEventListener("click", (event)=>{
    if (event.target !== levelButton && event.target !==levelDropdownList && !event.target.classList.contains("dropdown__list-item")) {
        levelDropdownList.classList.add("dropdown__list_hidden");
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

