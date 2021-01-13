const fs = require('fs');
const filename = 'src/day-10/input.txt';
const input = fs
  .readFileSync(filename, 'utf8')
  .split('\n')
  .map((x) => +x)
  .sort((a, b) => a - b);

function runProgram(input) {
  const arr = [0, ...input, Math.max(...input) + 3];

  let jolt1 = 0,
    jolt3 = 0;
  for (let i = 1; i < arr.length; i++) {
    const diff = arr[i] - arr[i - 1];
    if (diff === 1) jolt1++;
    if (diff === 3) jolt3++;
  }
  return jolt1 * jolt3;
}

// output answer
console.log(runProgram(input));
