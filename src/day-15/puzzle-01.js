const fs = require('fs');
const filename = 'src/day-15/input.txt';
const input = fs
  .readFileSync(filename, 'utf8')
  .split(',')
  .map((x) => +x);

function runProgram(input) {
  const arr = input;
  for (let i = input.length; i < 2020; i++) {
    const counter = arr[i - 1];
    const previousArr = arr.slice(0, -1);
    if (previousArr.includes(counter)) {
      const index = previousArr.lastIndexOf(counter);
      arr.push(i - (index + 1));
    } else {
      arr.push(0);
    }
  }

  return arr.slice(-1);
}

// output answer
console.log(runProgram(input));
