const fs = require('fs');
const filename = 'src/day-01/input.txt';
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

const twoEntries = find2Entries(inputList, sumTotal);

const answer = twoEntries.reduce((a, b) => a * b);

// output answer
console.log(answer);
