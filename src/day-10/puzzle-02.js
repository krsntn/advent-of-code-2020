const fs = require('fs');
const filename = 'src/day-10/input.txt';
const input = fs
  .readFileSync(filename, 'utf8')
  .split('\n')
  .map((x) => +x)
  .sort((a, b) => a - b);

function runProgram(input) {
  let arr = [0, ...input, Math.max(...input) + 3];

  const inBetween = arr.map((i) => {
    return arr.filter((x) => i > x && i - 3 <= x).length;
  });

  for (let i = 0; i < inBetween.length; i++) {
    const previous = inBetween.slice(i - inBetween[i], i);

    inBetween[i] = previous.length ? previous.reduce((a, b) => a + b) : 1;
  }

  return inBetween.slice(-1)[0];
}

// output answer
console.log(runProgram(input));
