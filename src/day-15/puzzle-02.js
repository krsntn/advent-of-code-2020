const fs = require('fs');
const filename = 'src/day-15/input.txt';
const input = fs
  .readFileSync(filename, 'utf8')
  .split(',')
  .map((x) => +x);

function runProgram(input, size) {
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

      const prevObj = history.get(newValue);
      history.set(
        newValue,
        prevObj ? [prevObj[1] || prevObj[0], i + 1] : [i + 1]
      );
      counter = newValue;
    } else {
      const prevObj = history.get(0);
      history.set(0, prevObj ? [prevObj[1] || prevObj[0], i + 1] : [i + 1]);
      counter = 0;
    }
  }

  return counter;
}

// output answer
console.log(runProgram(input, 30000000));
