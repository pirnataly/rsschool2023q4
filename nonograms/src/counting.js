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
                if( j + 1 === arr.length){
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
                if( j + 1 === arr[0].length){
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
    return arr.map((value)=>(value.answer));
}

export function getSpecificLeftClues(arr,index) {
    const answersForTop = getAnswers(arr);
    const answersForTopIndexed = answersForTop[index];
    return getLeftClues(answersForTopIndexed);
}

export function getSpecificTopClues(arr,index) {
    const answersForTop = getAnswers(arr);
    const answersForTopIndexed = answersForTop[index];
    return getTopClues(answersForTopIndexed);
}

export function getLevels(arr) {
    return Array.from(new Set(arr.map((value)=>value.level)));
}


