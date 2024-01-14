const wrapper = document.createElement('div');
wrapper.className = 'wrapper';
document.body.prepend(wrapper);

const gameContainer = document.createElement('div');
gameContainer.className = 'container game-container';
wrapper.append(gameContainer);

const gallowsPart = document.createElement('div');
gallowsPart.className = 'gallows-part';
gameContainer.append(gallowsPart);

const gallowsImage = document.createElement('div');
gallowsImage.className = 'gallows-part__image gallows-image';
gallowsPart.append(gallowsImage);

let hangmanImages = [];
for (let i = 0; i < 7; i += 1) {
    const hangmanImage = document.createElement('img');
    hangmanImage.src = `./assets/hangman${i}.png`;
    hangmanImage.alt = '';
    hangmanImage.style.width = '300px';
    hangmanImage.style.height = '477px';
    hangmanImages.push(hangmanImage);
}

const quizPart = document.createElement('div');
quizPart.className = 'quiz-part';
gameContainer.append(quizPart);


let clickCounter = 0;
gallowsImage.append(hangmanImages[clickCounter]);


const question = document.createElement('div');
question.className = 'quizPart__question question';
quizPart.append(question);

const secretWordContainer = document.createElement('div');
secretWordContainer.className = 'container secret'
quizPart.append(secretWordContainer);

const secretWord = document.createElement('div');
secretWord.className = 'secret__word';
secretWordContainer.append(secretWord);


let questionNum;

async function getQuestionsData(){
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

async function makeWord() {
    const data = await getQuestionsData();
    const ans = data[questionNum].answer.join('');
    answer = ans;
    console.log('Ответ на вопрос:',ans);
    const answerLength = ans.length;
    for (let i = 0; i < answerLength; i += 1) {
        const letterBox = document.createElement('span');
        letterBox.className = 'letter-box';
        letterBox.textContent = ' ';
        secretWord.append(letterBox);
    }
    spanArray = document.querySelectorAll('.letter-box');
}

makeWord();

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
        secretWordContainer.after(this.elements.main);
    },

    createKeys() {
        const fragment = document.createDocumentFragment();
        const keyLayout = [
            { eng: 'q', rus: 'й', code: 'KeyQ' },
            { eng: 'w', rus: 'ц', code: 'KeyW' },
            { eng: 'e', rus: 'у', code: 'KeyE' },
            { eng: 'r', rus: 'к', code: 'KeyR' },
            { eng: 't', rus: 'е', code: 'KeyT' },
            { eng: 'y', rus: 'н', code: 'KeyY' },
            { eng: 'u', rus: 'г', code: 'KeyU' },
            { eng: 'i', rus: 'ш', code: 'KeyI' },
            { eng: 'o', rus: 'щ', code: 'KeyO' },
            { eng: 'p', rus: 'з', code: 'KeyP' },
            { eng: 'a', rus: 'ф', code: 'KeyA' },
            { eng: 's', rus: 'ы', code: 'KeyS' },
            { eng: 'd', rus: 'в', code: 'KeyD' },
            { eng: 'f', rus: 'а', code: 'KeyF' },
            { eng: 'g', rus: 'п', code: 'KeyG' },
            { eng: 'h', rus: 'р', code: 'KeyH' },
            { eng: 'j', rus: 'о', code: 'KeyJ' },
            { eng: 'k', rus: 'л', code: 'KeyK' },
            { eng: 'l', rus: 'д', code: 'KeyL' },
            { eng: 'z', rus: 'я', code: 'KeyZ' },
            { eng: 'x', rus: 'ч', code: 'KeyX' },
            { eng: 'c', rus: 'с', code: 'KeyC' },
            { eng: 'v', rus: 'м', code: 'KeyV' },
            { eng: 'b', rus: 'и', code: 'KeyB' },
            { eng: 'n', rus: 'т', code: 'KeyN' },
            { eng: 'm', rus: 'ь', code: 'KeyM' },
        ];

        keyLayout.forEach((key) => {
            const keyElement = document.createElement('button');
            keyElement.setAttribute('type', 'button');
            keyElement.classList.add('keyboard__key', `${key.code}`);
            keyElement.textContent = key["eng"].toLowerCase();
            keyElement.addEventListener('click', () => {
                if(answer.includes(key["eng"].toLowerCase())) {
                   for (let i = 0; i < answer.length; i +=1) {
                        if (answer[i] === key['eng']) {
                            spanArray[i].textContent = key['eng'].toUpperCase();
                            spanArray[i].style.borderBottom = 'none';
                        }
                    }
                }
                else {
                    gallowsImage.innerHTML = '';
                    gallowsImage.append(hangmanImages[clickCounter+1]);
                    clickCounter++;
                };

            })
            fragment.appendChild(keyElement);
            })

        return fragment;
   }
}

    document.addEventListener('DOMContentLoaded', () => {
        Keyboard.init();
    });