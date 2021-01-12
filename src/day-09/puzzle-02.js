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
      const invalidNumber = input[index];

      for (let i = index - 1; i >= 0; i--) {
        const range = [];
        for (let j = i, remaining = invalidNumber; remaining > 0; j--) {
          range.push(input[j]);
          remaining -= input[j];

          if (remaining === 0) {
            return Math.min(...range) + Math.max(...range);
          }
        }
      }
    }
  }
}

// output answer
console.log(runProgram(input, 25));
