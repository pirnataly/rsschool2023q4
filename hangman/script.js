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

async function makeWord() {
    const data = await getQuestionsData();
    const ans = data[questionNum].answer.join('');
    answer = ans;
    console.log('Ответ на вопрос:',ans);
    const answerLength = ans.length;
    for (let i = 0; i < answerLength; i += 1) {
        const letterBox = document.createElement('span');
        letterBox.className = 'letter-box';
        secretWord.append(letterBox);
    }
}

makeWord();