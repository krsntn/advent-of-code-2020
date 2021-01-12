const fs = require('fs');
const filename = 'src/day-09/input.txt';
const input = fs
  .readFileSync(filename, 'utf8')
  .split('\n')
  .map((x) => +x);

function runProgram(input, preamble) {
  for (let index = preamble; index < input.length; index++) {
    const previousValues = input.slice(index - preamble, index);

    if (
      !previousValues.some((x) =>
        previousValues.filter((y) => y !== x).includes(input[index] - x)
      )
    ) {
      return input[index];
    }
  }
}

// output answer
console.log(runProgram(input, 25));
