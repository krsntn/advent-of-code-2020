const fs = require('fs');
const filename = 'src/day-09/input.txt';
const input = fs.readFileSync(filename, 'utf8').split('\n');

function findInvalidNumber(input, preamble) {
  for (let index = preamble; index < input.length; index++) {
    let isValidNumber = false;
    const targetValue = +input[index];

    const previousValues = [];
    for (let i = index - preamble; i < index; i++) {
      previousValues.push(+input[i]);
    }

    for (let index = 0; index < previousValues.length; index++) {
      const curItem = previousValues[index];
      const remaining = targetValue - curItem;
      if (curItem !== remaining && previousValues.indexOf(remaining) >= 0) {
        isValidNumber = true;
        break;
      }
    }

    if (!isValidNumber) {
      return targetValue;
    }
  }
}

function runProgram(input, invalidNumber) {
  const filterInput = input.slice(0, input.indexOf(invalidNumber));

  for (let i = filterInput.length - 1; i >= 0; i--) {
    let smallest, largest;
    for (let j = i, remaining = invalidNumber; remaining > 0; j--) {
      const item = +filterInput[j];

      smallest = smallest === undefined || item < smallest ? item : smallest;
      largest = largest === undefined || item > largest ? item : largest;

      remaining -= item;

      if (remaining === 0 && smallest !== largest) {
        return smallest + largest;
      }
    }
  }
}

// output answer
const invalidNumber = findInvalidNumber(input, 25);
console.log(runProgram(input, invalidNumber));
