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


