//counting functions
function equalizeArrValuelengths(arr) {
    const maxElementLength = Math.max(...arr.map((value) => value.length));
    arr.map((value) => {
        while (value.length !== maxElementLength) {
            value.unshift(" ");
        }
        return value;
    })
}

function getLeftClues(arr) {
    //сюда кладем поле с ответом соответствующей игры
    let resultArr = [];
    for (let i = 0; i < arr.length; i += 1) {
        let rowArr = [];
        let sum = 0;
        for (let j = 0; j < arr.length; j += 1) {
            if (arr[i][j] === 1) {
                sum += 1;
                if (j + 1 === arr.length) {
                    rowArr.push(sum);
                }
            } else {
                if (sum > 0) {
                    rowArr.push(sum);
                    sum = 0;
                }
            }

        }
        resultArr.push(rowArr);
    }
    equalizeArrValuelengths(resultArr);
    return resultArr;
}

function getTopClues(arr) {
    let resultArr = [];
    for (let i = 0; i < arr[0].length; i += 1) {
        let columnArr = [];
        let sum = 0;
        for (let j = 0; j < arr.length; j += 1) {
            if (arr[j][i] === 1) {
                sum += 1;
                if (j + 1 === arr[0].length) {
                    columnArr.push(sum);
                }
            } else {
                if (sum > 0) {
                    columnArr.push(sum);
                    sum = 0;
                }
            }

        }
        resultArr.push(columnArr);
    }
    equalizeArrValuelengths(resultArr);
    return resultArr;
}

export function getAnswers(arr) {
    return arr.map((value) => (value.answer));
}

export function getSpecificLeftClues(arr, index) {
    const answersForTop = getAnswers(arr);
    const answersForTopIndexed = answersForTop[index];
    return getLeftClues(answersForTopIndexed);
}

export function getSpecificTopClues(arr, index) {
    const answersForTop = getAnswers(arr);
    const answersForTopIndexed = answersForTop[index];
    return getTopClues(answersForTopIndexed);
}

export function getLevels(arr) {
    return Array.from(new Set(arr.map((value) => value.level)));
}

export function shuffleByTime(arr) {
        return arr.sort(compareNumeric);
}

function compareNumeric(a, b) {
    if (a[2] > b[2]) return 1;
    if (a[2] === b[2]) return 0;
    if (a[2] < b[2]) return -1;
}


function setArrForShuffle(arr) {
    const numbers = [];
    for (let i = 0; i < arr.length; i += 1) {
        numbers.push(i);
    }
    return numbers;
}

export function shuffle(arrayOfGames) {
  const array =  setArrForShuffle(arrayOfGames);
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

export function setTimeOnCorrectFormat(arraySorted) {
    const resultArray = [];
    for (let i = 0; i < arraySorted.length; i += 1) {
        let resultRow = [];
        for(let j = 0; j < arraySorted[i].length; j +=1) {
            const resultCell = ((typeof(arraySorted[i][j]))=== "number")? toDateStingXXXX(arraySorted[i][j]):arraySorted[i][j];
            resultRow.push(resultCell);
        }
        resultArray.push(resultRow);
    }
    return resultArray;
}

function toDateStingXXXX(num){
    let date = new Date(0);
    date.setSeconds(num); // specify value for SECONDS here
    let timeString = num > 3599 ? date.toISOString().substring(11, 19) : date.toISOString().substring(14, 19);
    return timeString;
}
