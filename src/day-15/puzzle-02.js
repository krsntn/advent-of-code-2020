const fs = require('fs');
const filename = 'src/day-15/input.txt';
const input = fs
  .readFileSync(filename, 'utf8')
  .split(',')
  .map((x) => +x);

function runProgram(input, size) {
  // const arr = input;
  const history = new Map();

  for (let i = 1; i <= input.length; i++) {
    history.set(input[i - 1], [i]);
  }

  let counter = input[input.length - 1];

  for (let i = input.length; i < size; i++) {
    obj = history.get(counter);
    if (obj && obj.length === 2) {
      const [prev2, prev1] = obj;
      const newValue = prev1 - prev2;

      if (history.has(newValue)) {
        history.set(newValue, [
          history.get(newValue)[1] || history.get(newValue)[0],
          i + 1,
        ]);
      } else {
        history.set(newValue, [i + 1]);
      }
      counter = newValue;
    } else {
      if (history.has(0)) {
        history.set(0, [history.get(0)[1] || history.get(0)[0], i + 1]);
      } else {
        history.set(0, [i + 1]);
      }
      counter = 0;
    }
  }

  return counter;
}

// output answer
console.log(runProgram(input, 30000000));
