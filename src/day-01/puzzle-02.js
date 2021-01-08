const fs = require('fs');
const filename = './input.txt';
const inputList = fs
  .readFileSync(filename, 'utf8')
  .split('\n')
  .map((num) => Number(num));

const sumTotal = 2020;

function find2Entries(inputList, sumTotal) {
  for (let index = 0; index < inputList.length; index++) {
    const remaining = sumTotal - inputList[index];
    if (inputList.includes(remaining)) {
      return [inputList[index], remaining];
    }
  }
}

function find3Entries(inputList, sumTotal) {
  for (let index = 0; index < inputList.length; index++) {
    const remaining = sumTotal - inputList[index];

    const list = inputList.slice(index + 1);
    const twoEntries = find2Entries(list, remaining);
    if (twoEntries) {
      return [inputList[index], ...twoEntries];
    }
  }
}

const threeEntries = find3Entries(inputList, sumTotal);

const answer = threeEntries.reduce((a, b) => a * b);

// output answer
console.log(answer);
