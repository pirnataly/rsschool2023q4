const overlay = document.createElement('div');
overlay.className = 'overlay';
document.body.append(overlay);

const wrapper = document.createElement('div');
wrapper.className = 'wrapper';
document.body.append(wrapper);


const gameContainer = document.createElement('div');
gameContainer.className = 'container game-container';
wrapper.append(gameContainer);

const gallowsPart = document.createElement('div');
gallowsPart.className = 'gallows-part';
gameContainer.append(gallowsPart);

const gallowsImage = document.createElement('div');
gallowsImage.className = 'gallows-part__image gallows-image';

function appendGallows() {
    gallowsPart.append(gallowsImage);
}

appendGallows();
let hangmanImages = [];
for (let i = 0; i < 7; i += 1) {
    const hangmanImage = document.createElement('img');
    hangmanImage.src = `./assets/hangman${i}.png`;
    hangmanImage.alt = '';
    hangmanImage.className = 'hangman-image';
    hangmanImages.push(hangmanImage);
}

const quizPart = document.createElement('div');
quizPart.className = 'quiz-part';
gameContainer.append(quizPart);

const maxWrongAnswers = 6;

let clickCounter = 0;

function freeTheGallows() {
    gallowsImage.append(hangmanImages[clickCounter]);
}

freeTheGallows();

const question = document.createElement('div');
question.className = 'quizPart__question question';

function appendQuestion() {
    quizPart.append(question);
}

appendQuestion();

const secretWordContainer = document.createElement('div');
secretWordContainer.className = 'container secret';

function appendSecretWordContainer() {
    quizPart.append(secretWordContainer);
}

appendSecretWordContainer();

const secretWord = document.createElement('div');
secretWord.className = 'secret__word';
secretWordContainer.append(secretWord);


let questionNum;

async function getQuestionsData() {
    const questions = 'hangman-questions.json';
    const res = await fetch(questions);
    const data = await res.json();
    return data;
}

async function showQuestion() {
    const data = await getQuestionsData();
    question.textContent = data[questionNum].text;
}

function getRandomQuestionNum() {
    questionNum = Math.floor(Math.random() * 10);
}

getRandomQuestionNum();
getQuestionsData();
showQuestion();

let answer;
let spanArray;
let letterArray = [];

async function makeWord() {
    const data = await getQuestionsData();
    const ans = data[questionNum].answer.join('');
    answer = ans;
    word.textContent = `The correct answer is ${answer.toUpperCase()}`;
   console.log('Ответ на вопрос:', ans);
    const answerLength = ans.length;
    for (let i = 0; i < answerLength; i += 1) {
        const letterBox = document.createElement('span');
        letterBox.className = 'letter-box';
        letterBox.textContent = ' ';
        secretWord.append(letterBox);
    }
    spanArray = document.querySelectorAll('.letter-box');
    return answer;
}

makeWord();

const guesses = document.createElement('p');
guesses.className = 'guesses';

function showIncorrectGuesses() {
    guesses.innerHTML = `Incorrect guesses <i class="incorrectGuesses">${clickCounter}</i> / 6`;
}

showIncorrectGuesses();

const message = document.createElement('div');
message.className = 'message message_disabled';
const messageHeading = document.createElement('h1');
messageHeading.className = 'message__heading heading';

message.append(messageHeading);
const word = document.createElement('h2');
word.className = 'message__word';
const messageButton = document.createElement('button');
messageButton.className = 'message__button button';
messageButton.textContent = 'Play again';
messageButton.addEventListener('click', () => {
    console.clear();
    gallowsImage.innerHTML = '';
    quizPart.innerHTML = '';
    secretWord.innerHTML = '';
    clickCounter = 0;
    guesses.innerHTML = '';
    document.body.classList.remove('overlay');
    showIncorrectGuesses();
    freeTheGallows();
    letterArray.length = 0;
    appendGallows();
    appendQuestion();
    getRandomQuestionNum();
    getQuestionsData();
    showQuestion();
    appendSecretWordContainer();
    Keyboard.init(makeWord());
    Keyboard.elements.main.prepend(guesses);
    document.body.append(message);
    overlay.classList.remove('body__background');
    overlay.classList.remove('lock');
    closeMessage();
});
message.append(word);
message.append(messageButton);

function showMessage() {
    message.classList.remove('message_disabled');
}

function closeMessage() {
    message.classList.add('message_disabled');
}

const Keyboard = {
    elements: {
        main: null,
        keysContainer: null,
        keys: [],
    },
    init() {
        this.elements.main = document.createElement('div');
        this.elements.keysContainer = document.createElement('div');
        this.elements.main.classList.add('keyboard');
        this.elements.keysContainer.classList.add('keyboard__keys');
        this.elements.keysContainer.append(this.createKeys());
        this.elements.keys = this.elements.keysContainer.querySelectorAll('.keyboard__key');
        this.elements.main.append(this.elements.keysContainer);
        quizPart.append(this.elements.main);
        return Keyboard;
    },

    createKeys() {
        const fragment = document.createDocumentFragment();
        const keyLayout = [
            {eng: 'q', rus: 'й', code: 'KeyQ'},
            {eng: 'w', rus: 'ц', code: 'KeyW'},
            {eng: 'e', rus: 'у', code: 'KeyE'},
            {eng: 'r', rus: 'к', code: 'KeyR'},
            {eng: 't', rus: 'е', code: 'KeyT'},
            {eng: 'y', rus: 'н', code: 'KeyY'},
            {eng: 'u', rus: 'г', code: 'KeyU'},
            {eng: 'i', rus: 'ш', code: 'KeyI'},
            {eng: 'o', rus: 'щ', code: 'KeyO'},
            {eng: 'p', rus: 'з', code: 'KeyP'},
            {eng: 'a', rus: 'ф', code: 'KeyA'},
            {eng: 's', rus: 'ы', code: 'KeyS'},
            {eng: 'd', rus: 'в', code: 'KeyD'},
            {eng: 'f', rus: 'а', code: 'KeyF'},
            {eng: 'g', rus: 'п', code: 'KeyG'},
            {eng: 'h', rus: 'р', code: 'KeyH'},
            {eng: 'j', rus: 'о', code: 'KeyJ'},
            {eng: 'k', rus: 'л', code: 'KeyK'},
            {eng: 'l', rus: 'д', code: 'KeyL'},
            {eng: 'z', rus: 'я', code: 'KeyZ'},
            {eng: 'x', rus: 'ч', code: 'KeyX'},
            {eng: 'c', rus: 'с', code: 'KeyC'},
            {eng: 'v', rus: 'м', code: 'KeyV'},
            {eng: 'b', rus: 'и', code: 'KeyB'},
            {eng: 'n', rus: 'т', code: 'KeyN'},
            {eng: 'm', rus: 'ь', code: 'KeyM'},
        ];
        keyLayout.forEach((key) => {
            const keyElement = document.createElement('button');
            keyElement.setAttribute('type', 'button');
            keyElement.classList.add('keyboard__key', `${key.code}`);
            keyElement.textContent = key["eng"].toLowerCase();
            keyElement.addEventListener('click', () => {
                keyElement.setAttribute('disabled', 'disabled');
                keyElement.classList.add('disabled');
                if (answer.includes(key["eng"].toLowerCase())) {
                    for (let i = 0; i < answer.length; i += 1) {
                        if (answer[i] === key['eng']) {
                            spanArray[i].textContent = key['eng'].toUpperCase();
                            spanArray[i].style.borderBottom = 'none';
                            letterArray.push(spanArray[i].textContent);
                            if (letterArray.length === answer.length) {
                                messageHeading.textContent = 'Congratulations!';
                                const keyboardKeys = document.querySelectorAll('.keyboard__key');
                                keyboardKeys.forEach((key) => {
                                    key.setAttribute('disabled', 'disabled');
                                    setTimeout(showMessage,300);
                                });

                            }
                        }
                    }
                } else {
                    const incorrectGuesses = document.querySelector('.incorrectGuesses');
                    gallowsImage.innerHTML = '';
                    gallowsImage.append(hangmanImages[clickCounter + 1]);
                    clickCounter++;
                    incorrectGuesses.textContent = clickCounter;
                    if (clickCounter === maxWrongAnswers) {
                        messageHeading.textContent = "You lost!";
                        const keyboardKeys = document.querySelectorAll('.keyboard__key');
                        keyboardKeys.forEach((key) => {
                            key.setAttribute('disabled', 'disabled')
                        });
                        setTimeout(showMessage,500);
                    }
                }
                ;

            })
            fragment.appendChild(keyElement);
        })
        return fragment;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    Keyboard.init();
    Keyboard.elements.main.prepend(guesses);
    document.body.append(message);
});