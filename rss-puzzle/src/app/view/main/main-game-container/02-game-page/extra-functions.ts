import { CurrentRound, Round, Rounds } from '../../../../../interfaces/types';
import ContinueCheckButton from '../../../button/continue-check-button';

export function getChosenGameObj(
  arrayOfGames: Rounds,
  levelId: string,
): { currentRound: Round; currentGameIndex: number } | undefined {
  let obj;
  for (let i = 0; i < arrayOfGames.length; i += 1) {
    if (arrayOfGames[i].levelData.id === levelId) {
      obj = {
        currentRound: arrayOfGames[i], // объект игры с level-данными и массивом из 10 предложпений
        currentGameIndex: i, // номер игры в массиве data
      };
      break;
    }
  }
  return obj;
}

export function getCurrentSentence(
  obj: CurrentRound | undefined,
  numberOfSentenceInRaund: number = 0,
): Array<string> {
  const sentence = obj?.currentRound.words[numberOfSentenceInRaund].textExample;
  return sentence!.split(' ');
}

export function shuffleSentence(arr: string[]): void {
  const arrayForShuffle = arr;
  for (let i = arrayForShuffle.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [arrayForShuffle[i], arrayForShuffle[j]] = [arrayForShuffle[j], arrayForShuffle[i]];
  }
}

export function createWordCard(nodeCollection: HTMLCollection, shuffledSentence: string[]) {
  const nodeList = Array.from(nodeCollection);
  for (let i = 0; i < shuffledSentence.length; i += 1) {
    const wordCard = document.createElement('div');
    wordCard.classList.add('word-card');
    wordCard.textContent = shuffledSentence[i];

    nodeList[i].append(wordCard);
  }
}

export function makeWordsContainer(node: Element, countOfWordsInSentence: number) {
  for (let i = 0; i < countOfWordsInSentence; i += 1) {
    const wordContainer = document.createElement('div');
    wordContainer.classList.add('word-container');
    node.append(wordContainer);
  }
}

function isNoEmpty(element: string) {
  return element.length > 0;
}

function removeDeisabled(button: ContinueCheckButton) {
  button.getHtmlelement().removeAttribute('disabled');
}

function addCheckText(buttonCheck: ContinueCheckButton) {
  const button = buttonCheck;
  button.getHtmlelement().textContent = 'Check';
  removeDeisabled(button);
}

function addContinueText(buttonCheck: ContinueCheckButton) {
  const button = buttonCheck;
  button.getHtmlelement().textContent = 'Continue';
  removeDeisabled(button);
}

function makeGameButton(
  resultArray: Element[],
  currSentence: Array<string>,
  button: ContinueCheckButton,
) {
  const tempArray = resultArray.map((item: Element) => (item as HTMLElement).innerText);
  for (let i = 0; i < currSentence.length; i += 1) {
    if (tempArray.every(isNoEmpty)) {
      if (tempArray.toString() === currSentence.toString()) {
        resultArray.forEach((wordContainer) => {
          if (wordContainer.firstElementChild) {
            const containerForWord = wordContainer;
            (containerForWord.firstElementChild as HTMLElement).onclick = null;
          }
        });
        addContinueText(button);
      } else {
        addCheckText(button);
      }
    }
  }
  return null;
}

export function clickAppend(
  e: Event,
  result: Element[],
  source: HTMLElement[],
  currSentence: Array<string>,
  button: ContinueCheckButton,
): void {
  const wordEl = e.currentTarget as HTMLElement;

  if (wordEl.closest('.source-block')) {
    for (let j = 0; j < result.length; j += 1) {
      if (!result[j].firstElementChild) {
        result[j].append(wordEl);

        break;
      }
    }
    makeGameButton(result, currSentence, button);
  } else {
    for (let i = 0; i < source.length; i += 1) {
      if (!source[i].firstElementChild) {
        source[i].append(wordEl);
        break;
      }
    }
  }
}
