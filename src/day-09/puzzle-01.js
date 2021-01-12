const fs = require('fs');
const filename = 'src/day-09/input.txt';
const input = fs.readFileSync(filename, 'utf8').split('\n');

function runProgram(input, preamble) {
  for (let index = preamble; index < input.length; index++) {
    let isValidNumber = false;
    const targetValue = input[index];

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

// output answer
console.log(runProgram(input, 25));
