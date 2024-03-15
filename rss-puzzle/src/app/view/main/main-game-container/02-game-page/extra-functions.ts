import { CurrentRound, Rounds } from '../../../../../interfaces/types';

// Rounds - массив игр (объектов)

// levelId = выбранный раунд
export function getChosenGameObj(arrayOfGames: Rounds, levelId: string = '1_01') {
  let obj;
  for (let i = 0; i < arrayOfGames.length; i += 1) {
    if (arrayOfGames[i].levelData.id === levelId) {
      obj = {
        currentRound: arrayOfGames[i], // объект игры с level-данными и массивом из 10 предложпений
        nextGame: i + 1,
      };
      break;
    }
  }
  return obj;
}

// numberOfGame - ссылка на текущую игру, будет меняться при выборе из списка и при переходе на след. раунд
export function getCurrentSentence(
  obj: CurrentRound | undefined,
  numberOfGame: number = 0,
): Array<string> {
  const sentence = obj?.currentRound.words[numberOfGame].textExample;
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

export function clickAppend(e: Event, result: Element[], source: Element[]) {
  const wordEl = e.currentTarget as HTMLElement;
  if (wordEl.closest('.source-block')) {
    for (let j = 0; j < result.length; j += 1) {
      if (!result[j].firstElementChild) {
        result[j].append(wordEl);
        break;
      }
    }
  } else {
    for (let i = 0; i < source.length; i += 1) {
      if (source[i] && !source[i].firstElementChild) {
        source[i].append(wordEl);
        break;
      }
    }
  }
}
