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

export function createWordCard(node: HTMLElement, shuffledSentence: string[]) {
  for (let i = 0; i < shuffledSentence.length; i += 1) {
    const wordCard = document.createElement('div');
    wordCard.classList.add('word-card');
    wordCard.textContent = shuffledSentence[i];
    node.append(wordCard);
  }
}

export function clickAppending(arr: Element[], arr2: Element[]) {
  for (let i = 0; i < arr.length; i += 1) {
    arr[i].addEventListener('click', () => {
      for (let j = 0; j < arr2.length; j += 1) {
        if (!arr2[j].firstElementChild) {
          arr2[j].append(arr[i]);
          break;
        }
      }
    });
  }
}

export function makeWordsContainer(node: Element, countOfWordsInSentence: number) {
  for (let i = 0; i < countOfWordsInSentence; i += 1) {
    const wordContainer = document.createElement('div');
    wordContainer.classList.add('result-word-container');
    node.append(wordContainer);
  }
}
